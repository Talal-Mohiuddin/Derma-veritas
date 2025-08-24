import { db } from "../../../config/db.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "firebase-admin";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Helper function to verify Firebase token
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

// Helper function to calculate total price
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

// GET - Get user's cart
export async function GET(request) {
  try {
    const decodedToken = await verifyToken(request);
    const userId = decodedToken.uid;

    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) {
      return Response.json({
        success: true,
        cart: {
          products: [],
          totalPrice: 0
        }
      });
    }

    const cartData = cartSnap.data();
    
    // Populate product details
    const populatedProducts = await Promise.all(
      cartData.products.map(async (item) => {
        const productRef = doc(db, "products", item.productId);
        const productSnap = await getDoc(productRef);
        
        if (productSnap.exists()) {
          return {
            ...item,
            productDetails: {
              id: item.productId,
              ...productSnap.data()
            }
          };
        }
        return item;
      })
    );

    return Response.json({
      success: true,
      cart: {
        ...cartData,
        products: populatedProducts
      }
    });

  } catch (error) {
    console.error("Error getting cart:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to get cart"
    }, { status: 401 });
  }
}

// POST - Add item to cart
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

    // Verify product exists
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      return Response.json({
        success: false,
        message: "Product not found"
      }, { status: 404 });
    }

    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    let cartData;
    if (!cartSnap.exists()) {
      // Create new cart
      cartData = {
        userId,
        products: [],
        totalPrice: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } else {
      cartData = cartSnap.data();
    }

    // Check if product already exists in cart
    const existingProductIndex = cartData.products.findIndex(
      item => item.productId === productId
    );

    if (existingProductIndex > -1) {
      // Update quantity
      cartData.products[existingProductIndex].quantity += quantity;
    } else {
      // Add new product
      cartData.products.push({
        productId,
        quantity,
        addedAt: new Date()
      });
    }

    // Calculate total price
    cartData.totalPrice = await calculateTotalPrice(cartData.products);
    cartData.updatedAt = new Date();

    // Save cart
    await setDoc(cartRef, cartData);

    return Response.json({
      success: true,
      message: "Item added to cart",
      cart: cartData
    });

  } catch (error) {
    console.error("Error adding to cart:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to add item to cart"
    }, { status: 500 });
  }
}
