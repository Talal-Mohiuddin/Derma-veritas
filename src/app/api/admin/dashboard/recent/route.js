import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { collection, getDocs, query, orderBy, limit, where, doc, getDoc } from "firebase/firestore";

// Helper function to check if user is admin
async function isAdmin(userId) {
  if (!userId) return false;
  
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) return false;
  
  const userData = userSnap.data();
  return userData.role === "admin";
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    // Check admin access
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID required" },
        { status: 400 }
      );
    }

    // Check if user is admin
    const userIsAdmin = await isAdmin(userId);
    if (!userIsAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }

    // Get recent orders
    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const ordersSnapshot = await getDocs(ordersQuery);
    const recentOrders = [];

    for (const orderDoc of ordersSnapshot.docs) {
      const orderData = orderDoc.data();
      
      // Get user details
      let userDetails = null;
      if (orderData.userId) {
        const userRef = doc(db, "users", orderData.userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          userDetails = {
            name: userData.name,
            email: userData.email,
          };
        }
      }

      recentOrders.push({
        id: orderDoc.id,
        orderNumber: orderData.orderNumber,
        totalAmount: orderData.totalAmount,
        status: orderData.status,
        createdAt: orderData.createdAt?.toDate?.() || orderData.createdAt,
        userDetails,
      });
    }

    // Get recent appointments
    const appointmentsQuery = query(
      collection(db, "appointments"),
      where("deleted", "!=", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const appointmentsSnapshot = await getDocs(appointmentsQuery);
    const recentAppointments = [];

    for (const appointmentDoc of appointmentsSnapshot.docs) {
      const appointmentData = appointmentDoc.data();
      
      // Get user details
      let userDetails = null;
      if (appointmentData.userId) {
        const userRef = doc(db, "users", appointmentData.userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          userDetails = {
            name: userData.name,
            email: userData.email,
          };
        }
      }

      recentAppointments.push({
        id: appointmentDoc.id,
        appointmentNumber: appointmentData.appointmentNumber,
        treatment: appointmentData.treatment,
        status: appointmentData.status,
        createdAt: appointmentData.createdAt?.toDate?.() || appointmentData.createdAt,
        userDetails,
        name: appointmentData.name,
      });
    }

    return NextResponse.json({
      success: true,
      recentOrders,
      recentAppointments,
    });

  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch recent activities" },
      { status: 500 }
    );
  }
}
