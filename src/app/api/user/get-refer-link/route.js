import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    // Get user document from Firestore
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const userData = userDoc.data();
    const referralCode = userData.referralCode;

    if (!referralCode) {
      return new Response(
        JSON.stringify({ error: "User doesn't have a referral code" }),
        { status: 404 }
      );
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_BASE_URL;

    const referralLink = `${baseUrl}/?ref=${referralCode}`;

    // Calculate referral stats
    const totalReferrals = userData.referrals?.length || 0;
    const completedReferrals =
      userData.referrals?.filter((ref) => ref.status === "completed")?.length ||
      0;
    const totalEarned = userData.referralRewards || 0;

    return new Response(
      JSON.stringify({
        referralCode,
        referralLink,
        stats: {
          totalReferrals,
          completedReferrals,
          totalEarned,
          pendingReferrals: totalReferrals - completedReferrals,
        },
        recentReferrals: userData.referrals?.slice(-5) || [], // Last 5 referrals
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching referral data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
