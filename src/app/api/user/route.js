import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { collection, getDocs, query, where, orderBy, limit, startAfter, doc, getDoc } from "firebase/firestore";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";
    const status = searchParams.get("status") || "";
    const pageSize = parseInt(searchParams.get("limit")) || 20;
    const lastUserId = searchParams.get("lastUserId");

    const usersRef = collection(db, "users");
    let usersQuery = query(usersRef, orderBy("createdAt", "desc"));

    // Apply filters
    if (role && role !== "all") {
      usersQuery = query(usersRef, where("role", "==", role), orderBy("createdAt", "desc"));
    }

    if (status) {
      const isBanned = status === "banned";
      usersQuery = query(usersRef, where("isBanned", "==", isBanned), orderBy("createdAt", "desc"));
    }

    // Pagination
    if (lastUserId) {
      const lastUserDoc = await getDoc(doc(db, "users", lastUserId));
      if (lastUserDoc.exists()) {
        usersQuery = query(usersQuery, startAfter(lastUserDoc), limit(pageSize));
      }
    } else {
      usersQuery = query(usersQuery, limit(pageSize));
    }

    const querySnapshot = await getDocs(usersQuery);
    let users = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      // Filter out admin users
      if (userData.role !== "admin") {
        users.push({
          id: doc.id,
          ...userData,
          createdAt: userData.createdAt?.toDate?.()?.toISOString() || userData.createdAt,
        });
      }
    });

    // Apply search filter (client-side for simplicity)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      users = users.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower)
      );
    }

    // Get total count for pagination info (excluding admins)
    const totalSnapshot = await getDocs(query(collection(db, "users"), where("role", "!=", "admin")));
    const totalCount = totalSnapshot.size;

    return NextResponse.json({
      users,
      count: users.length,
      totalCount,
      hasMore: users.length === pageSize,
      lastUserId: users.length > 0 ? users[users.length - 1].id : null,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
