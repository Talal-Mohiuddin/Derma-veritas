import { db } from "../../../../config/db.js";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return Response.json({
        success: false,
        message: "User ID is required"
      }, { status: 400 });
    }

    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) {
      // Cart doesn't exist, return empty cart response
      return Response.json({
        success: true,
        message: "Cart cleared",
        cart: {
          products: [],
          totalPrice: 0
        }
      });
    }

    // Delete the cart document
    await deleteDoc(cartRef);

    return Response.json({
      success: true,
      message: "Cart cleared successfully",
      cart: {
        products: [],
        totalPrice: 0
      }
    });

  } catch (error) {
    console.error("Error clearing cart:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to clear cart"
    }, { status: 500 });
  }
}
