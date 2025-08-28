import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";

// Function to generate a unique referral code
function generateReferralCode(length = 8) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function isReferralCodeUnique(code) {
  const db = getFirestore();
  const q = query(collection(db, "users"), where("referralCode", "==", code));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty; // True if code is unique
}

export async function generateUniqueReferralCode() {
  let code;
  let isUnique = false;
  do {
    code = generateReferralCode();
    isUnique = await isReferralCodeUnique(code);
  } while (!isUnique);
  return code;
}

export async function createUserDocumentWithReferral(user, userData, referredBy) {
  try {
    const db = getFirestore();
    
    // Check if user document already exists
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDocs(query(collection(db, "users"), where("email", "==", user.email)));
    
    if (!userDoc.empty) {
      console.log("User document already exists");
      return;
    }

    // Create user document with referral data
    await setDoc(userDocRef, {
      ...userData,
      email: user.email.toLowerCase().trim(),
    });

    // If referred, update the referrer's referrals array
    if (referredBy) {
      const referrerQuery = query(collection(db, "users"), where("referralCode", "==", referredBy));
      const referrerSnapshot = await getDocs(referrerQuery);
      if (!referrerSnapshot.empty) {
        const referrerDoc = referrerSnapshot.docs[0];
        const referrerRef = doc(db, "users", referrerDoc.id);
        await updateDoc(referrerRef, {
          referrals: arrayUnion({
            referredUserId: user.uid,
            referredEmail: user.email,
            status: "pending",
            createdAt: new Date(),
          }),
        });
      }
    }

    console.log("User document created successfully with referral tracking");
  } catch (error) {
    console.error("Error creating user document:", error);
    throw error;
  }
}
