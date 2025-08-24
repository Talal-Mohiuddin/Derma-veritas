import { db } from "../../../../config/db.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "firebase-admin";

async function verifyToken(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('No valid authorization header');
    }
    
    const token = authHeader.substring(7);
    const decodedToken = await auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

async function calculateTotalPrice(products) {
  let totalPrice = 0;
  
  for (const item of products) {
    const productRef = doc(db, "products", item.productId);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
      const productData = productSnap.data();
      totalPrice += productData.price * item.quantity;
    }
  }
  
  return totalPrice;
}

export async function POST(request) {
  try {
    const decodedToken = await verifyToken(request);
    const userId = decodedToken.uid;
    
    const { productId, quantity = 1 } = await request.json();

    if (!productId) {
      return Response.json({
        success: false,
        message: "Product ID is required"
      }, { status: 400 });
    }

    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) {
      return Response.json({
        success: false,
        message: "Cart not found"
      }, { status: 404 });
    }

    const cartData = cartSnap.data();
    const productIndex = cartData.products.findIndex(
      item => item.productId === productId
    );

    if (productIndex === -1) {
      return Response.json({
        success: false,
        message: "Item not in cart"
      }, { status: 400 });
    }

    // Remove or decrease quantity
    if (cartData.products[productIndex].quantity <= quantity) {
      cartData.products.splice(productIndex, 1);
    } else {
      cartData.products[productIndex].quantity -= quantity;
    }

    // Recalculate total
    cartData.totalPrice = await calculateTotalPrice(cartData.products);
    cartData.updatedAt = new Date();

    await updateDoc(cartRef, cartData);

    return Response.json({
      success: true,
      message: "Item removed from cart",
      cart: cartData
    });

  } catch (error) {
    console.error("Error removing from cart:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to remove item from cart"
    }, { status: 500 });
  }
}
