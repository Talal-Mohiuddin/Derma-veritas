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
} from "firebase/firestore";

// Helper function to check if user is admin
async function isAdmin(userId) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return false;
  }

  const userData = userSnap.data();
  return userData.role === "admin";
}

// GET - Get appointments
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const getAllAppointments = searchParams.get("all") === "true";
    const userId = searchParams.get("userId");

    let appointmentsQuery;

    if (getAllAppointments) {
      // Admin can get all appointments
      appointmentsQuery = query(
        collection(db, "appointments"),
        orderBy("createdAt", "desc")
      );
    } else if (userId) {
      // Get appointments for specific user
      appointmentsQuery = query(
        collection(db, "appointments"),
        where("userId", "==", userId),
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

    // Generate appointment number
    const timestamp = Date.now();
    const appointmentsCount = (await getDocs(collection(db, "appointments")))
      .size;
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
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "appointments"), newAppointment);

    return Response.json({
      success: true,
      message: "Appointment created successfully",
      appointmentId: docRef.id,
      appointmentNumber,
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

// DELETE - Delete appointment (Admin only)
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

    // Check if appointment exists
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

    // Delete the appointment
    await deleteDoc(appointmentRef);

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
