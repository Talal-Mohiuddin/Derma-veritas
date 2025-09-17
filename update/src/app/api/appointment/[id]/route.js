import { db } from "../../../../config/db.js";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// GET - Get appointment by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const appointmentRef = doc(db, "appointments", id);
    const appointmentSnap = await getDoc(appointmentRef);
    
    if (!appointmentSnap.exists()) {
      return Response.json({
        success: false,
        message: "Appointment not found"
      }, { status: 404 });
    }

    const appointmentData = appointmentSnap.data();
    
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
          email: userData.email
        };
      }
    }

    const appointment = {
      id: appointmentSnap.id,
      ...appointmentData,
      userDetails,
      createdAt: appointmentData.createdAt?.toDate?.() || appointmentData.createdAt
    };

    return Response.json({
      success: true,
      appointment
    });

  } catch (error) {
    console.error("Error getting appointment:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to get appointment"
    }, { status: 500 });
  }
}

// PUT - Update appointment status (Admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    if (!body.status) {
      return Response.json({
        success: false,
        message: "Status is required"
      }, { status: 400 });
    }

    const appointmentRef = doc(db, "appointments", id);
    const appointmentSnap = await getDoc(appointmentRef);
    
    if (!appointmentSnap.exists()) {
      return Response.json({
        success: false,
        message: "Appointment not found"
      }, { status: 404 });
    }

    // Update appointment status
    await updateDoc(appointmentRef, {
      status: body.status,
      updatedAt: new Date()
    });

    // Get updated appointment data
    const updatedSnap = await getDoc(appointmentRef);
    const updatedData = updatedSnap.data();

    return Response.json({
      success: true,
      message: "Appointment status updated successfully",
      appointment: {
        id: updatedSnap.id,
        ...updatedData,
        createdAt: updatedData.createdAt?.toDate?.() || updatedData.createdAt
      }
    });

  } catch (error) {
    console.error("Error updating appointment status:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to update appointment status"
    }, { status: 500 });
  }
}

// DELETE - Delete appointment (Admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const appointmentRef = doc(db, "appointments", id);
    const appointmentSnap = await getDoc(appointmentRef);
    
    if (!appointmentSnap.exists()) {
      return Response.json({
        success: false,
        message: "Appointment not found"
      }, { status: 404 });
    }

    // Delete the appointment
    await deleteDoc(appointmentRef);

    return Response.json({
      success: true,
      message: "Appointment deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting appointment:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to delete appointment"
    }, { status: 500 });
  }
}
