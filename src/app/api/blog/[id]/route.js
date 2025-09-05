import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../config/db.js";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// GET - Get single blog by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      blog: { id: docSnap.id, ...docSnap.data() },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update blog
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const formData = await request.formData();
    
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");
    const tagsString = formData.get("tags");
    const coverImageUrl = formData.get("coverImageUrl");
    const status = formData.get("status");
    const isAdmin = formData.get("isAdmin");

    // Basic admin check (you should implement proper authentication)
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    const updateData = {};

    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (status) updateData.status = status;

    // Handle tags
    if (tagsString) {
      try {
        updateData.tags = JSON.parse(tagsString);
      } catch (e) {
        return NextResponse.json(
          { success: false, message: "Invalid tags format" },
          { status: 400 }
        );
      }
    }

    // Handle cover image
    if (coverImageUrl) {
      try {
        const imageData = JSON.parse(coverImageUrl);
        updateData.coverImage = imageData.url;
      } catch (e) {
        updateData.coverImage = coverImageUrl;
      }
    }

    updateData.updatedAt = new Date();

    await updateDoc(docRef, updateData);

    const updatedDoc = await getDoc(docRef);

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      blog: { id: updatedDoc.id, ...updatedDoc.data() },
    });
  } catch (error) {
    console.error("Blog update error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { isAdmin } = body;

    // Basic admin check
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    await deleteDoc(docRef);

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Blog deletion error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
