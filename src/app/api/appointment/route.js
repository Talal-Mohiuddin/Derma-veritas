import { db } from "../../../config/db.js";
import { collection, getDocs, doc, getDoc, addDoc, query, orderBy, where } from "firebase/firestore";

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
    const getAllAppointments = searchParams.get('all') === 'true';
    const userId = searchParams.get('userId');
    
    let appointmentsQuery;
    
    if (getAllAppointments) {
      // Admin can get all appointments
      appointmentsQuery = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
    } else if (userId) {
      // Get appointments for specific user
      appointmentsQuery = query(
        collection(db, "appointments"), 
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
    } else {
      return Response.json({
        success: false,
        message: "User ID is required"
      }, { status: 400 });
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
            email: userData.email
          };
        }
      }

      appointments.push({
        id: appointmentDoc.id,
        ...appointmentData,
        userDetails,
        createdAt: appointmentData.createdAt?.toDate?.() || appointmentData.createdAt
      });
    }

    return Response.json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error("Error getting appointments:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to get appointments"
    }, { status: 500 });
  }
}

// POST - Create appointment
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.userId || !body.treatment || !body.name || !body.email || !body.phone) {
      return Response.json({
        success: false,
        message: "Missing required fields: userId, treatment, name, email, phone"
      }, { status: 400 });
    }

    // Generate appointment number
    const timestamp = Date.now();
    const appointmentsCount = (await getDocs(collection(db, "appointments"))).size;
    const appointmentNumber = `APT-${timestamp}-${appointmentsCount + 1}`;

    // Create appointment document
    const newAppointment = {
      ...body,
      appointmentNumber,
      status: body.status || "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(collection(db, "appointments"), newAppointment);

    return Response.json({
      success: true,
      message: "Appointment created successfully",
      appointmentId: docRef.id,
      appointmentNumber
    });

  } catch (error) {
    console.error("Error creating appointment:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to create appointment"
    }, { status: 500 });
  }
}
