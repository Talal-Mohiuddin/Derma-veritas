import { NextResponse } from 'next/server';
import { db } from '../../../../../config/db.js';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// POST - Add Review
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const { rating, comment, userId } = await request.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User authentication required"
      }, { status: 401 });
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({
        success: false,
        message: "Rating must be between 1 and 5"
      }, { status: 400 });
    }

    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return NextResponse.json({
        success: false,
        message: "Product not found"
      }, { status: 404 });
    }

    const product = productSnap.data();

    // Check if user has already reviewed this product
    const existingReview = product.reviews?.find(
      review => review.userId === userId
    );

    if (existingReview) {
      return NextResponse.json({
        success: false,
        message: "You have already reviewed this product"
      }, { status: 400 });
    }

    const review = {
      userId,
      rating: parseInt(rating),
      comment: comment || "",
      createdAt: new Date()
    };

    await updateDoc(productRef, {
      reviews: arrayUnion(review),
      updatedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: "Review added successfully",
      review
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}
