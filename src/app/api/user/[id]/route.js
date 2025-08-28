import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { doc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const includeReferrals = searchParams.get("includeReferrals") === "true";

    const userDoc = await getDoc(doc(db, "users", id));

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    let referrerInfo = null;
    let referralDetails = [];

    if (includeReferrals) {
      // Get referrer information
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
            referralCode: referrerData.referralCode,
          };
        }
      }

      // Get detailed referral information (users this user referred)
      if (userData.referrals && userData.referrals.length > 0) {
        for (const referralCode of userData.referrals) {
          const referredQuery = query(
            collection(db, "users"), 
            where("referredBy", "==", userData.referralCode)
          );
          const referredSnapshot = await getDocs(referredQuery);
          
          referredSnapshot.forEach(doc => {
            const referredData = doc.data();
            referralDetails.push({
              id: doc.id,
              name: referredData.name,
              email: referredData.email,
              createdAt: referredData.createdAt?.toDate?.()?.toISOString() || referredData.createdAt,
              plan: referredData.plan,
            });
          });
        }
      }
    }

    return NextResponse.json({
      id: userDoc.id,
      ...userData,
      createdAt: userData.createdAt?.toDate?.()?.toISOString() || userData.createdAt,
      updatedAt: userData.updatedAt?.toDate?.()?.toISOString() || userData.updatedAt,
      referrerInfo,
      referralDetails,
      referralCount: userData.referrals?.length || 0,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prevent banning admin users
    const userData = userDoc.data();
    if (userData.role === "admin") {
      return NextResponse.json(
        { error: "Cannot ban admin users" },
        { status: 403 }
      );
    }

    await updateDoc(userRef, {
      isBanned: body.isBanned,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      message: `User ${body.isBanned ? "banned" : "unbanned"} successfully`,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
