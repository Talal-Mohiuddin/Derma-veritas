import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../config/db.js";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { writeFile } from "fs/promises";
import path from "path";

// GET - Fetch blog by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const blogRef = doc(db, "blogs", id);
    const blogSnap = await getDoc(blogRef);

    if (!blogSnap.exists()) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      blog: { id: blogSnap.id, ...blogSnap.data() },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update blog (admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const formData = await request.formData();
    const isAdmin = formData.get("isAdmin") === "true";

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Only admin can update blogs" },
        { status: 403 }
      );
    }

    const blogRef = doc(db, "blogs", id);
    const blogSnap = await getDoc(blogRef);

    if (!blogSnap.exists()) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    const updateData = {};
    
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");
    const status = formData.get("status");
    const tagsString = formData.get("tags");
    const coverImageFile = formData.get("coverImage");

    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (status) updateData.status = status;

    // Parse tags
    if (tagsString) {
      try {
        updateData.tags = JSON.parse(tagsString);
      } catch (e) {
        return NextResponse.json(
          { success: false, message: "Tags must be a valid JSON array" },
          { status: 400 }
        );
      }
    }

    // Handle cover image upload
    if (coverImageFile && coverImageFile.size > 0) {
      const bytes = await coverImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const filename = `${Date.now()}-${coverImageFile.name}`;
      const filepath = path.join(process.cwd(), "public/uploads/blogs", filename);
      
      await writeFile(filepath, buffer);
      updateData.coverImage = `/uploads/blogs/${filename}`;
    }

    updateData.updatedAt = new Date();

    await updateDoc(blogRef, updateData);

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog (admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const { isAdmin } = await request.json();

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Only admin can delete blogs" },
        { status: 403 }
      );
    }

    const blogRef = doc(db, "blogs", id);
    const blogSnap = await getDoc(blogRef);

    if (!blogSnap.exists()) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    await deleteDoc(blogRef);

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
