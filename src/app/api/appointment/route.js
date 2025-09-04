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
      // Admin can get all appointments (excluding deleted ones)
      appointmentsQuery = query(
        collection(db, "appointments"),
        where("deleted", "!=", true),
        orderBy("deleted", "desc"),
        orderBy("createdAt", "desc")
      );
    } else if (userId) {
      // Get appointments for specific user (excluding deleted ones)
      appointmentsQuery = query(
        collection(db, "appointments"),
        where("userId", "==", userId),
        where("deleted", "!=", true),
        orderBy("deleted", "desc"),
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

    // Check if this is user's first appointment (excluding deleted ones)
    const existingAppointmentsQuery = query(
      collection(db, "appointments"),
      where("userId", "==", body.userId),
      where("deleted", "!=", true)
    );
    const existingAppointments = await getDocs(existingAppointmentsQuery);
    const isFirstAppointment = existingAppointments.empty;

    // Generate appointment number
    const timestamp = Date.now();
    const appointmentsCountQuery = query(
      collection(db, "appointments"),
      where("deleted", "!=", true)
    );
    const appointmentsCount = (await getDocs(appointmentsCountQuery)).size;
    const appointmentNumber = `APT-${timestamp}-${appointmentsCount + 1}`;

    // Create appointment document with explicit field mapping
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
      deleted: false, // Add deleted flag
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "appointments"), newAppointment);

    // Handle referral rewards if this is the first appointment
    if (isFirstAppointment) {
      try {
        // Get user data to check if they were referred
        const userRef = doc(db, "users", body.userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          if (userData.referredBy) {
            // Find the referrer user
            const referrerQuery = query(
              collection(db, "users"),
              where("referralCode", "==", userData.referredBy)
            );
            const referrerSnapshot = await getDocs(referrerQuery);

            if (!referrerSnapshot.empty) {
              const referrerDoc = referrerSnapshot.docs[0];
              const referrerId = referrerDoc.id;
              const referrerData = referrerDoc.data();

              // Calculate 10% reward from treatment cost
              let rewardAmount = 0;
              if (body.treatmentDetails?.optionPrice) {
                // Extract numeric value from price string (e.g., "£250" -> 250)
                const priceString = body.treatmentDetails.optionPrice;
                const numericPrice = parseFloat(
                  priceString.replace(/[£$,]/g, "")
                );
                if (!isNaN(numericPrice)) {
                  rewardAmount = Math.round(numericPrice * 0.1 * 100) / 100; // 10% with 2 decimal places
                }
              }

              if (rewardAmount > 0) {
                // Create reward entry
                const rewardEntry = {
                  referredUserId: body.userId,
                  referredUserName: body.name,
                  referredUserEmail: body.email,
                  appointmentId: docRef.id,
                  appointmentNumber,
                  treatmentName:
                    body.treatmentDetails?.treatmentName || body.treatment,
                  treatmentCost: body.treatmentDetails?.optionPrice || "N/A",
                  rewardAmount,
                  status: "pending", // Admin needs to approve
                  createdAt: new Date(),
                };

                // Get current referrals array and update the matching referral
                const currentReferrals = referrerData.referrals || [];
                const updatedReferrals = currentReferrals.map((referral) => {
                  if (referral.referredUserId === body.userId) {
                    return {
                      ...referral,
                      appointmentId: docRef.id,
                      appointmentNumber,
                      updatedAt: new Date(),
                    };
                  }
                  return referral;
                });

                // Update referrer's document
                const referrerRef = doc(db, "users", referrerId);
                await updateDoc(referrerRef, {
                  referrals: updatedReferrals,
                  rewards: arrayUnion(rewardEntry),
                  updatedAt: new Date(),
                });

                console.log(
                  `Referral reward of £${rewardAmount} added for referrer ${referrerId}`
                );
              }
            }
          }
        }
      } catch (error) {
        console.error("Error processing referral reward:", error);
        // Don't fail the appointment creation if referral processing fails
      }
    }

    return Response.json({
      success: true,
      message: "Appointment created successfully",
      appointmentId: docRef.id,
      appointmentNumber,
      isFirstAppointment,
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
