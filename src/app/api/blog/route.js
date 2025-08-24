import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db.js";
import { collection, addDoc, getDocs, query, orderBy, where } from "firebase/firestore";
import { writeFile } from "fs/promises";
import path from "path";

// GET - Fetch all published blogs
export async function GET() {
  try {
    const blogsRef = collection(db, "blogs");
    const q = query(
      blogsRef,
      where("status", "==", "published"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    const blogs = [];
    querySnapshot.forEach((doc) => {
      blogs.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new blog (admin only)
export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");
    const tagsString = formData.get("tags");
    const coverImageFile = formData.get("coverImage");
    const isAdmin = formData.get("isAdmin") === "true"; // Check admin status

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Only admin can create blogs" },
        { status: 403 }
      );
    }

    if (!title || !content || !category) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    // Parse tags
    let tags = [];
    if (tagsString) {
      try {
        tags = JSON.parse(tagsString);
      } catch (e) {
        return NextResponse.json(
          { success: false, message: "Tags must be a valid JSON array" },
          { status: 400 }
        );
      }
    }

    // Handle cover image upload
    let coverImage = "";
    if (coverImageFile && coverImageFile.size > 0) {
      const bytes = await coverImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const filename = `${Date.now()}-${coverImageFile.name}`;
      const filepath = path.join(process.cwd(), "public/uploads/blogs", filename);
      
      await writeFile(filepath, buffer);
      coverImage = `/uploads/blogs/${filename}`;
    }

    // Create blog in Firestore
    const blogData = {
      title,
      content,
      category,
      tags,
      coverImage,
      status: "published",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "blogs"), blogData);

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      blog: { id: docRef.id, ...blogData },
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
