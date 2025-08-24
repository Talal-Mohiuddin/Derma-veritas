import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// GET - Fetch blogs with filtering
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const limitParam = searchParams.get("limit");
    const search = searchParams.get("search");

    const blogsRef = collection(db, "blogs");
    let q = query(blogsRef, orderBy("createdAt", "desc"));

    // Add filters
    if (status) {
      q = query(
        blogsRef,
        where("status", "==", status),
        orderBy("createdAt", "desc")
      );
    }
    if (category) {
      if (status) {
        q = query(
          blogsRef,
          where("category", "==", category),
          where("status", "==", status),
          orderBy("createdAt", "desc")
        );
      } else {
        q = query(
          blogsRef,
          where("category", "==", category),
          orderBy("createdAt", "desc")
        );
      }
    }
    if (limitParam) {
      q = query(q, limit(parseInt(limitParam)));
    }

    let blogs = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() });
      });
    } catch (firestoreError) {
      // Handle case when collection doesn't exist or other Firestore errors
      console.log(
        "Firestore query error (possibly empty collection):",
        firestoreError.message
      );
      // Return empty array instead of throwing error
      blogs = [];
    }

    // Simple search filter (in a real app, you'd use a search service)
    if (search) {
      blogs = blogs.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(search.toLowerCase()) ||
          blog.content?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
        error: error.message,
      },
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
    const status = formData.get("status") || "published";

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
        console.error("Tags parsing error:", e);
        return NextResponse.json(
          { success: false, message: "Tags must be a valid JSON array" },
          { status: 400 }
        );
      }
    }

    // Handle cover image upload
    let coverImage = "";
    if (coverImageFile && coverImageFile.size > 0) {
      try {
        // Validate file type
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        if (!allowedTypes.includes(coverImageFile.type)) {
          return NextResponse.json(
            {
              success: false,
              message:
                "Invalid file type. Only JPEG, PNG, and WebP are allowed.",
            },
            { status: 400 }
          );
        }

        // Validate file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (coverImageFile.size > maxSize) {
          return NextResponse.json(
            {
              success: false,
              message: "File size too large. Maximum 5MB allowed.",
            },
            { status: 400 }
          );
        }

        const bytes = await coverImageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = `${Date.now()}-${coverImageFile.name.replace(
          /[^a-zA-Z0-9.-]/g,
          "_"
        )}`;
        const uploadDir = path.join(process.cwd(), "public/uploads/blogs");
        const filepath = path.join(uploadDir, filename);

        // Create directory if it doesn't exist
        if (!existsSync(uploadDir)) {
          console.log("Creating upload directory...");
          await mkdir(uploadDir, { recursive: true });
        }

        await writeFile(filepath, buffer);
        coverImage = `/uploads/blogs/${filename}`;
        console.log("File uploaded successfully:", coverImage);
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json(
          {
            success: false,
            message: `File upload failed: ${uploadError.message}`,
          },
          { status: 500 }
        );
      }
    }

    // Create blog in Firestore
    const blogData = {
      title,
      content,
      category,
      tags,
      coverImage,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "blogs"), blogData);

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        blog: { id: docRef.id, ...blogData },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
