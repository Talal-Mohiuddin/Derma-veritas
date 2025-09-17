import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../config/db.js";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

// POST - Add comment to blog
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const { name, email, comment, website } = await request.json();

    if (!name || !email || !comment) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields" },
        { status: 400 }
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

    const blogData = blogSnap.data();
    
    // Check if user already commented
    const existingComment = blogData.comments?.find((c) => c.email === email);
    if (existingComment) {
      return NextResponse.json(
        { success: false, message: "You have already commented on this blog" },
        { status: 400 }
      );
    }

    const newComment = {
      name,
      email,
      content: comment,
      website: website || "",
      date: new Date(),
    };

    await updateDoc(blogRef, {
      comments: arrayUnion(newComment),
    });

    return NextResponse.json({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
