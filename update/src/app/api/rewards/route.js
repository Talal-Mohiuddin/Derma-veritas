import { db } from "../../../config/db.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

// GET - Get all referral rewards
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status") || "";

    // Get all users who have rewards
    let usersQuery;
    if (statusFilter) {
      usersQuery = query(
        collection(db, "users"),
        where("rewards", "!=", null),
        orderBy("rewards", "desc")
      );
    } else {
      usersQuery = query(
        collection(db, "users"),
        where("rewards", "!=", null),
        orderBy("updatedAt", "desc")
      );
    }

    const usersSnap = await getDocs(usersQuery);
    const rewardsData = [];

    for (const userDoc of usersSnap.docs) {
      const userData = userDoc.data();
      const rewards = userData.rewards || [];

      // Filter rewards by status if specified
      const filteredRewards = statusFilter
        ? rewards.filter((reward) => reward.status === statusFilter)
        : rewards;

      if (filteredRewards.length > 0) {
        for (const reward of filteredRewards) {
          // Fetch appointment details to get status
          let appointmentStatus = "unknown";
          let appointmentData = null;
          
          try {
            if (reward.appointmentId) {
              const appointmentRef = doc(db, "appointments", reward.appointmentId);
              const appointmentSnap = await getDoc(appointmentRef);
              
              if (appointmentSnap.exists()) {
                appointmentData = appointmentSnap.data();
                appointmentStatus = appointmentData.status || "unknown";
              }
            }
          } catch (error) {
            console.error("Error fetching appointment data:", error);
          }

          rewardsData.push({
            id: `${userDoc.id}_${reward.appointmentId}`,
            userId: userDoc.id,
            referrerName: userData.name,
            referrerEmail: userData.email,
            referrerCode: userData.referralCode,
            totalReferralRewards: userData.referralRewards || 0,
            appointmentStatus,
            appointmentData: appointmentData ? {
              status: appointmentData.status,
              createdAt: appointmentData.createdAt?.toDate?.() || appointmentData.createdAt,
              updatedAt: appointmentData.updatedAt?.toDate?.() || appointmentData.updatedAt,
            } : null,
            ...reward,
            createdAt: reward.createdAt?.toDate?.() || reward.createdAt,
            processedAt: reward.processedAt?.toDate?.() || reward.processedAt,
          });
        }
      }
    }

    // Sort by creation date (newest first)
    rewardsData.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });

    // Calculate stats
    const stats = {
      total: rewardsData.length,
      pending: rewardsData.filter((r) => r.status === "pending").length,
      approved: rewardsData.filter((r) => r.status === "approved").length,
      rejected: rewardsData.filter((r) => r.status === "rejected").length,
      totalAmount: rewardsData
        .filter((r) => r.status === "approved")
        .reduce((sum, r) => sum + (r.rewardAmount || 0), 0),
    };

    return Response.json({
      success: true,
      rewards: rewardsData,
      stats,
    });
  } catch (error) {
    console.error("Error getting referral rewards:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to get referral rewards",
      },
      { status: 500 }
    );
  }
}

// PUT - Update reward status (approve/reject)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { userId, appointmentId, status, adminId } = body;

    if (!userId || !appointmentId || !status) {
      return Response.json(
        {
          success: false,
          message: "Missing required fields: userId, appointmentId, status",
        },
        { status: 400 }
      );
    }

    if (!["approved", "rejected"].includes(status)) {
      return Response.json(
        {
          success: false,
          message: "Status must be 'approved' or 'rejected'",
        },
        { status: 400 }
      );
    }

    // Get user document
    const userRef = doc(db, "users", userId);
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
    const rewards = userData.rewards || [];

    // Find and update the specific reward
    const updatedRewards = rewards.map((reward) => {
      if (reward.appointmentId === appointmentId) {
        return {
          ...reward,
          status,
          processedAt: new Date(),
          processedBy: adminId || "admin",
        };
      }
      return reward;
    });

    // Update user document
    await updateDoc(userRef, {
      rewards: updatedRewards,
      updatedAt: new Date(),
    });

    return Response.json({
      success: true,
      message: `Reward ${status} successfully`,
    });
  } catch (error) {
    console.error("Error updating reward status:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to update reward status",
      },
      { status: 500 }
    );
  }
}
