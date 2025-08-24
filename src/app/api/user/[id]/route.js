import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const userDoc = await getDoc(doc(db, "users", id));

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    return NextResponse.json({
      id: userDoc.id,
      ...userData,
      createdAt:
        userData.createdAt?.toDate?.()?.toISOString() || userData.createdAt,
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
