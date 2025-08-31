import { db } from "../../../../config/db.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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
    const { userId, productId, quantity = 1 } = await request.json();

    if (!userId) {
      return Response.json({
        success: false,
        message: "User ID is required"
      }, { status: 400 });
    }

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

    // Populate product details for response
    const populatedProducts = await Promise.all(
      cartData.products.map(async (item) => {
        const productRef = doc(db, "products", item.productId);
        const productSnap = await getDoc(productRef);
        
        if (productSnap.exists()) {
          const productData = productSnap.data();
          return {
            productId: item.productId,
            quantity: item.quantity,
            addedAt: item.addedAt,
            productDetails: {
              id: item.productId,
              name: productData.name,
              description: productData.description,
              price: productData.price,
              images: productData.images,
              category: productData.category,
              stockQuantity: productData.stockQuantity,
              ...productData
            }
          };
        }
        return {
          productId: item.productId,
          quantity: item.quantity,
          addedAt: item.addedAt,
          productDetails: null
        };
      })
    );

    return Response.json({
      success: true,
      message: "Item removed from cart",
      cart: {
        userId: cartData.userId,
        products: populatedProducts,
        totalPrice: cartData.totalPrice,
        createdAt: cartData.createdAt,
        updatedAt: cartData.updatedAt
      }
    });

  } catch (error) {
    console.error("Error removing from cart:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to remove item from cart"
    }, { status: 500 });
  }
}
