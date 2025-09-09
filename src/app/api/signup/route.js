import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import { db } from "@/config/db";

async function generateUniqueReferralCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code;
  let isUnique = false;
  do {
    code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const q = query(collection(db, "users"), where("referralCode", "==", code));
    const querySnapshot = await getDocs(q);
    isUnique = querySnapshot.empty;
  } while (!isUnique);
  return code;
}

export async function POST(request) {
  try {
    const {
      email,
      password,
      displayName,
      phone,
      isGoogleAuth = false,
      uid,
    } = await request.json();
    const cookieStore = await cookies();
    const referralCodeFromCookie = cookieStore.get("referralCode")?.value;

    // For Google auth, check if user document already exists
    if (isGoogleAuth && uid) {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return new Response(
          JSON.stringify({
            isNewUser: false,
            message: "User already exists",
          }),
          { status: 200 }
        );
      }
    }

    // Generate unique referral code for the new user
    const newUserReferralCode = await generateUniqueReferralCode();

    // Check if referral code from cookie exists and is valid
    let referredBy = null;
    if (referralCodeFromCookie) {
      const q = query(
        collection(db, "users"),
        where("referralCode", "==", referralCodeFromCookie)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        referredBy = referralCodeFromCookie;
      }
    }

    // Create user data (we'll return this to the client to create the Firebase user)
    const userData = {
      name: displayName || email.split("@")[0],
      email: email.toLowerCase().trim(),
      phone: phone || "",
      role: "user",
      Buyinghistory: [],
      plan: null,
      isBanned: false,
      createdAt: new Date(),
      referralCode: newUserReferralCode,
      referredBy,
      referrals: [],
      referralRewards: 0,
      emailVerified: false,
    };

    return new Response(
      JSON.stringify({
        userData,
        referredBy,
        isNewUser: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
