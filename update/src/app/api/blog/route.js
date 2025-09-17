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
    const coverImageUrl = formData.get("coverImageUrl"); // Cloudinary URL data
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

    // Handle Cloudinary URL
    let coverImage = "";
    if (coverImageUrl) {
      try {
        const imageData = JSON.parse(coverImageUrl);
        coverImage = imageData.url;
        console.log('Parsed cover image URL:', coverImage);
      } catch (e) {
        console.error('Error parsing cover image URL:', e);
        console.log('Raw coverImageUrl value:', coverImageUrl);
        // Fallback if it's just a string URL
        coverImage = coverImageUrl;
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

    console.log('Creating blog with data:', blogData);

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
