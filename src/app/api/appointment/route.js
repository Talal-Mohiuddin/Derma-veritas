import { db } from "../../../config/db.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  query,
  orderBy,
  where,
  deleteDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

// GET - Get appointments
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const getAllAppointments = searchParams.get("all") === "true";
    const userId = searchParams.get("userId");

    let appointmentsQuery;

    if (getAllAppointments) {
      // Admin can get all appointments (filter out deleted ones)
      appointmentsQuery = query(
        collection(db, "appointments"),
        where("deleted", "==", false), // Replace '!=' with '=='
        orderBy("createdAt", "desc")
      );
    } else if (userId) {
      // Get appointments for specific user (filter out deleted ones)
      appointmentsQuery = query(
        collection(db, "appointments"),
        where("userId", "==", userId),
        where("deleted", "==", false), // Replace '!=' with '=='
        orderBy("createdAt", "desc")
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    const appointmentsSnap = await getDocs(appointmentsQuery);
    const appointments = [];

    for (const appointmentDoc of appointmentsSnap.docs) {
      const appointmentData = appointmentDoc.data();

      // Get user details
      let userDetails = null;
      if (appointmentData.userId) {
        const userRef = doc(db, "users", appointmentData.userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          userDetails = {
            id: appointmentData.userId,
            name: userData.name,
            email: userData.email,
          };
        }
      }

      appointments.push({
        id: appointmentDoc.id,
        ...appointmentData,
        userDetails,
        createdAt:
          appointmentData.createdAt?.toDate?.() || appointmentData.createdAt,
      });
    }

    return Response.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error getting appointments:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to get appointments",
      },
      { status: 500 }
    );
  }
}

// POST - Create appointment
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (
      !body.userId ||
      !body.treatment ||
      !body.name ||
      !body.email ||
      !body.phone
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Missing required fields: userId, treatment, name, email, phone",
        },
        { status: 400 }
      );
    }

    // Get user data to check referral code usage history
    const userRef = doc(db, "users", body.userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const userData = userSnap.data();
    let referralCodeToProcess = null;
    let referrerData = null;
    let referrerId = null;

    // Handle referral code validation (if provided)
    if (body.referralCode && body.referralCode.trim()) {
      const providedReferralCode = body.referralCode.trim().toUpperCase();
      
      // Check if user is trying to use their own referral code
      if (providedReferralCode === userData.referralCode) {
        return Response.json(
          {
            success: false,
            message: "You cannot use your own referral code. Please remove it or use a different code.",
            errorType: "INVALID_REFERRAL_CODE"
          },
          { status: 400 }
        );
      }

      // Check if user has already used this specific referral code
      const usedReferralCodes = userData.usedReferralCodes || [];
      const hasUsedThisCode = usedReferralCodes.some(
        (usedCode) => usedCode.code === providedReferralCode
      );

      if (hasUsedThisCode) {
        return Response.json(
          {
            success: false,
            message: `You have already used the referral code "${providedReferralCode}" before. Each referral code can only be used once per user. Please remove it or use a different code.`,
            errorType: "REFERRAL_CODE_ALREADY_USED"
          },
          { status: 400 }
        );
      }

      // Validate that the referral code exists and get referrer data
      const referrerQuery = query(
        collection(db, "users"),
        where("referralCode", "==", providedReferralCode)
      );
      const referrerSnapshot = await getDocs(referrerQuery);

      if (referrerSnapshot.empty) {
        return Response.json(
          {
            success: false,
            message: "Invalid referral code. Please check the code and try again, or remove it to continue without a referral.",
            errorType: "INVALID_REFERRAL_CODE"
          },
          { status: 400 }
        );
      }

      // Get referrer information
      const referrerDoc = referrerSnapshot.docs[0];
      referrerId = referrerDoc.id;
      referrerData = referrerDoc.data();
      referralCodeToProcess = providedReferralCode;
    }

    // Check if this is user's first appointment (excluding deleted ones)
    const existingAppointmentsQuery = query(
      collection(db, "appointments"),
      where("userId", "==", body.userId),
      where("deleted", "==", false)
    );
    const existingAppointments = await getDocs(existingAppointmentsQuery);
    const isFirstAppointment = existingAppointments.empty;

    // Generate appointment number
    const timestamp = Date.now();
    const appointmentsCountQuery = query(collection(db, "appointments"));
    const allAppointments = await getDocs(appointmentsCountQuery);
    const appointmentNumber = `APT-${timestamp}-${allAppointments.size + 1}`;

    // Calculate referrer reward (10% of treatment cost)
    let rewardAmount = 0;
    let originalPrice = 0;
    if (body.treatmentDetails?.optionPrice) {
      const priceString = body.treatmentDetails.optionPrice;
      originalPrice = parseFloat(priceString.replace(/[£$,]/g, ""));
      if (!isNaN(originalPrice) && referralCodeToProcess) {
        rewardAmount = Math.round(originalPrice * 0.1 * 100) / 100; // 10% reward for referrer
      }
    }

    // Create appointment document
    const newAppointment = {
      userId: body.userId,
      treatment: body.treatment,
      treatmentOption: body.treatmentOption || null,
      treatmentDetails: body.treatmentDetails || null,
      clientType: body.clientType,
      name: body.name,
      phone: body.phone,
      email: body.email,
      callbackTime: body.callbackTime || null,
      ageConfirm: body.ageConfirm || false,
      newsletter: body.newsletter || false,
      clinic: body.clinic || "main",
      appointmentNumber,
      status: body.status || "pending",
      isFirstAppointment,
      deleted: false,
      // Referral information
      referralCodeUsed: referralCodeToProcess,
      referrerReward: rewardAmount,
      originalPrice,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "appointments"), newAppointment);

    // Process referral reward if a code was used
    let referralRewardProcessed = false;
    if (referralCodeToProcess && referrerData && rewardAmount > 0) {
      try {
        // Create reward entry for the referrer
        const rewardEntry = {
          referredUserId: body.userId,
          referredUserName: body.name,
          referredUserEmail: body.email,
          appointmentId: docRef.id,
          appointmentNumber,
          treatmentName: body.treatmentDetails?.treatmentName || body.treatment,
          treatmentCost: body.treatmentDetails?.optionPrice || "N/A",
          rewardAmount,
          status: "pending", // Admin needs to approve
          referralSource: "booking", // Track where referral came from
          createdAt: new Date(),
        };

        // Update referrer's referrals array
        const currentReferrals = referrerData.referrals || [];
        const updatedReferrals = [
          ...currentReferrals,
          {
            referredUserId: body.userId,
            referredUserName: body.name,
            referredUserEmail: body.email,
            appointmentId: docRef.id,
            appointmentNumber,
            referralSource: "booking",
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ];

        // Update referrer's document with reward
        const referrerRef = doc(db, "users", referrerId);
        await updateDoc(referrerRef, {
          referrals: updatedReferrals,
          rewards: arrayUnion(rewardEntry),
          updatedAt: new Date(),
        });

        referralRewardProcessed = true;
        console.log(`Referral reward of £${rewardAmount} added for referrer ${referrerId}`);
      } catch (error) {
        console.error("Error processing referral reward:", error);
        // Don't fail the appointment creation if referral processing fails
      }
    }

    // Update user's used referral codes if a code was applied
    if (referralCodeToProcess) {
      const updatedUsedCodes = [
        ...(userData.usedReferralCodes || []),
        {
          code: referralCodeToProcess,
          usedAt: new Date(),
          appointmentId: docRef.id,
          appointmentNumber,
          referrerReward: rewardAmount,
        }
      ];

      await updateDoc(userRef, {
        usedReferralCodes: updatedUsedCodes,
        updatedAt: new Date(),
      });
    }

    return Response.json({
      success: true,
      message: "Appointment created successfully",
      appointmentId: docRef.id,
      appointmentNumber,
      isFirstAppointment,
      referralRewardProcessed,
      referrerReward: rewardAmount,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to create appointment",
      },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete appointment (Admin only)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const appointmentId = searchParams.get("id");

    if (!appointmentId) {
      return Response.json(
        {
          success: false,
          message: "Appointment ID is required",
        },
        { status: 400 }
      );
    }

    // Check if appointment exists and is not already deleted
    const appointmentRef = doc(db, "appointments", appointmentId);
    const appointmentSnap = await getDoc(appointmentRef);

    if (!appointmentSnap.exists()) {
      return Response.json(
        {
          success: false,
          message: "Appointment not found",
        },
        { status: 404 }
      );
    }

    const appointmentData = appointmentSnap.data();
    if (appointmentData.deleted) {
      return Response.json(
        {
          success: false,
          message: "Appointment is already deleted",
        },
        { status: 400 }
      );
    }

    // Soft delete the appointment by setting deleted flag
    await updateDoc(appointmentRef, {
      deleted: true,
      deletedAt: new Date(),
      updatedAt: new Date(),
    });

    return Response.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to delete appointment",
      },
      { status: 500 }
    );
  }
}
