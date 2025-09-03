import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { collection, getDocs, query, where, orderBy, limit, doc, getDoc } from "firebase/firestore";

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
    if (!userId || !(await isAdmin(userId))) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }

    // Get current date for monthly comparison
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Fetch users data
    const usersQuery = query(collection(db, "users"), where("role", "!=", "admin"));
    const usersSnapshot = await getDocs(usersQuery);
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    const totalUsers = users.length;
    const thisMonthUsers = users.filter(user => 
      user.createdAt?.toDate?.() >= firstDayThisMonth
    ).length;
    const lastMonthUsers = users.filter(user => {
      const createdAt = user.createdAt?.toDate?.();
      return createdAt >= firstDayLastMonth && createdAt < firstDayThisMonth;
    }).length;
    
    const userChange = lastMonthUsers > 0 
      ? Math.round(((thisMonthUsers - lastMonthUsers) / lastMonthUsers) * 100)
      : thisMonthUsers > 0 ? 100 : 0;

    // Fetch products data
    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    const totalProducts = products.length;
    const thisMonthProducts = products.filter(product => 
      product.createdAt?.toDate?.() >= firstDayThisMonth
    ).length;
    const lastMonthProducts = products.filter(product => {
      const createdAt = product.createdAt?.toDate?.();
      return createdAt >= firstDayLastMonth && createdAt < firstDayThisMonth;
    }).length;
    
    const productChange = lastMonthProducts > 0 
      ? Math.round(((thisMonthProducts - lastMonthProducts) / lastMonthProducts) * 100)
      : thisMonthProducts > 0 ? 100 : 0;

    // Fetch appointments data
    const appointmentsQuery = query(
      collection(db, "appointments"),
      where("deleted", "!=", true)
    );
    const appointmentsSnapshot = await getDocs(appointmentsQuery);
    const appointments = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    const totalAppointments = appointments.length;
    const thisMonthAppointments = appointments.filter(appointment => 
      appointment.createdAt?.toDate?.() >= firstDayThisMonth
    ).length;
    const lastMonthAppointments = appointments.filter(appointment => {
      const createdAt = appointment.createdAt?.toDate?.();
      return createdAt >= firstDayLastMonth && createdAt < firstDayThisMonth;
    }).length;
    
    const appointmentChange = lastMonthAppointments > 0 
      ? Math.round(((thisMonthAppointments - lastMonthAppointments) / lastMonthAppointments) * 100)
      : thisMonthAppointments > 0 ? 100 : 0;

    // Fetch orders data
    const ordersSnapshot = await getDocs(collection(db, "orders"));
    const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    const totalOrders = orders.length;
    const thisMonthOrders = orders.filter(order => 
      order.createdAt?.toDate?.() >= firstDayThisMonth
    ).length;
    const lastMonthOrders = orders.filter(order => {
      const createdAt = order.createdAt?.toDate?.();
      return createdAt >= firstDayLastMonth && createdAt < firstDayThisMonth;
    }).length;
    
    const orderChange = lastMonthOrders > 0 
      ? Math.round(((thisMonthOrders - lastMonthOrders) / lastMonthOrders) * 100)
      : thisMonthOrders > 0 ? 100 : 0;

    // Calculate total revenue
    const totalRevenue = orders
      .filter(order => order.paymentStatus === 'completed' || order.status === 'delivered')
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Get status breakdowns
    const appointmentStatuses = {
      pending: appointments.filter(a => a.status === 'pending').length,
      confirmed: appointments.filter(a => a.status === 'confirmed').length,
      completed: appointments.filter(a => a.status === 'completed').length,
      cancelled: appointments.filter(a => a.status === 'cancelled').length,
    };

    const orderStatuses = {
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
    };

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalAppointments,
        totalOrders,
        totalRevenue,
        userChange: userChange > 0 ? `+${userChange}%` : `${userChange}%`,
        productChange: productChange > 0 ? `+${productChange}%` : `${productChange}%`,
        appointmentChange: appointmentChange > 0 ? `+${appointmentChange}%` : `${appointmentChange}%`,
        orderChange: orderChange > 0 ? `+${orderChange}%` : `${orderChange}%`,
        appointmentStatuses,
        orderStatuses,
      }
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}
