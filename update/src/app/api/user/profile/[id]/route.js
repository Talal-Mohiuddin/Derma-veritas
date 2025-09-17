import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const { name, phone, dateOfBirth, address, preferences } = body;

    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prepare update data - only allow certain fields to be updated
    const updateData = {
      updatedAt: new Date(),
    };

    // Only update provided fields
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
    if (address !== undefined) updateData.address = address;
    if (preferences !== undefined) updateData.preferences = preferences;

    await updateDoc(userRef, updateData);

    // Get updated user data
    const updatedUserDoc = await getDoc(userRef);
    const updatedUserData = updatedUserDoc.data();

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUserDoc.id,
        ...updatedUserData,
        createdAt: updatedUserData.createdAt?.toDate?.()?.toISOString() || updatedUserData.createdAt,
        updatedAt: updatedUserData.updatedAt?.toDate?.()?.toISOString() || updatedUserData.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
