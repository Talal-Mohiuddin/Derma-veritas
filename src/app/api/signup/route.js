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

    // Create user data (no referral processing during signup)
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
      usedReferralCodes: [], // Track which codes this user has used
      referralRewards: 0,
      emailVerified: false,
    };

    return new Response(
      JSON.stringify({
        userData,
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
