import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { collection, getDocs, query, where, orderBy, limit, startAfter, doc, getDoc, updateDoc } from "firebase/firestore";

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

    // Get referrer information for each user
    for (const userDoc of querySnapshot.docs) {
      const userData = userDoc.data();
      
      // Filter out admin users
      if (userData.role !== "admin") {
        let referrerInfo = null;
        
        // If user was referred, get referrer information
        if (userData.referredBy) {
          const referrerQuery = query(
            collection(db, "users"), 
            where("referralCode", "==", userData.referredBy)
          );
          const referrerSnapshot = await getDocs(referrerQuery);
          
          if (!referrerSnapshot.empty) {
            const referrerDoc = referrerSnapshot.docs[0];
            const referrerData = referrerDoc.data();
            referrerInfo = {
              id: referrerDoc.id,
              name: referrerData.name,
              email: referrerData.email,
            };
          }
        }

        users.push({
          id: userDoc.id,
          ...userData,
          createdAt: userData.createdAt?.toDate?.()?.toISOString() || userData.createdAt,
          referrerInfo,
          referralCount: userData.referrals?.length || 0,
          usedReferralCodesCount: userData.usedReferralCodes?.length || 0,
          totalRewardsEarned: userData.rewards?.reduce(
            (sum, reward) => sum + (reward.status === "approved" ? reward.rewardAmount : 0), 0
          ) || 0,
          pendingRewards: userData.rewards?.filter(reward => reward.status === "pending").length || 0,
        });
      }
    }

    // Apply search filter (client-side for simplicity)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      users = users.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower) ||
          user.phone?.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      users,
      total: users.length,
      hasMore: querySnapshot.docs.length === pageSize,
      lastUserId: querySnapshot.docs.length > 0 
        ? querySnapshot.docs[querySnapshot.docs.length - 1].id 
        : null,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, userData, isBanned, isAdmin, rewardAction } = body;

    // Verify admin access
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const currentUserData = userDoc.data();

    // Prevent banning admin users
    if (currentUserData.role === "admin" && isBanned !== undefined) {
      return NextResponse.json(
        { error: "Cannot ban admin users" },
        { status: 403 }
      );
    }

    // Prepare update data
    const updateData = {
      updatedAt: new Date(),
    };

    // Handle ban/unban
    if (isBanned !== undefined) {
      updateData.isBanned = isBanned;
    }

    // Handle reward status updates
    if (rewardAction && rewardAction.type && rewardAction.rewardIndex !== undefined) {
      const rewards = currentUserData.rewards || [];
      if (rewards[rewardAction.rewardIndex]) {
        rewards[rewardAction.rewardIndex].status = rewardAction.type; // 'approved' or 'rejected'
        rewards[rewardAction.rewardIndex].processedAt = new Date();
        rewards[rewardAction.rewardIndex].processedBy = rewardAction.adminId;
        updateData.rewards = rewards;
      }
    }

    // Handle other user data updates
    if (userData) {
      Object.assign(updateData, userData);
    }

    await updateDoc(userRef, updateData);

    // Get updated user data
    const updatedUserDoc = await getDoc(userRef);
    const updatedUserData = updatedUserDoc.data();

    return NextResponse.json({
      message: "User updated successfully",
      user: {
        id: updatedUserDoc.id,
        ...updatedUserData,
        createdAt: updatedUserData.createdAt?.toDate?.()?.toISOString() || updatedUserData.createdAt,
        updatedAt: updatedUserData.updatedAt?.toDate?.()?.toISOString() || updatedUserData.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}