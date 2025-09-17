import { db } from "../../../config/db.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

// POST - Get user's cart or Add item to cart
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, productId, quantity } = body;

    if (!userId) {
      return Response.json({
        success: false,
        message: "User ID is required"
      }, { status: 400 });
    }

    // If no productId, this is a GET cart request
    if (!productId) {
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
      
      // Populate product details with full product data
      const populatedProducts = [];
      for (const item of cartData.products) {
        const productRef = doc(db, "products", item.productId);
        const productSnap = await getDoc(productRef);
        
        if (productSnap.exists()) {
          const productData = productSnap.data();
          populatedProducts.push({
            productId: item.productId,
            quantity: item.quantity,
            addedAt: item.addedAt,
            productDetails: {
              id: item.productId,
              name: productData.name,
              description: productData.description,
              price: productData.price || 0, // Ensure price is never undefined
              images: productData.images || [],
              category: productData.category,
              stockQuantity: productData.stockQuantity || 0,
              ...productData
            }
          });
        } else {
          // Product no longer exists, we should remove it from cart
          console.warn(`Product ${item.productId} not found, skipping from cart`);
        }
      }

      // Recalculate total price based on current product prices
      const totalPrice = populatedProducts.reduce((total, item) => {
        return total + (item.productDetails.price * item.quantity);
      }, 0);

      // Update cart with cleaned products and recalculated total
      const updatedCartData = {
        ...cartData,
        products: populatedProducts.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          addedAt: item.addedAt
        })),
        totalPrice
      };

      // Save the updated cart if products were removed or price changed
      if (populatedProducts.length !== cartData.products.length || Math.abs(totalPrice - cartData.totalPrice) > 0.01) {
        await setDoc(cartRef, updatedCartData);
      }

      return Response.json({
        success: true,
        cart: {
          userId: cartData.userId,
          products: populatedProducts,
          totalPrice,
          createdAt: cartData.createdAt,
          updatedAt: cartData.updatedAt
        }
      });
    }

    // Add item to cart logic
    const quantityToAdd = quantity || 1;

    // Verify product exists and get its data
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      return Response.json({
        success: false,
        message: "Product not found"
      }, { status: 404 });
    }

    const productData = productSnap.data();

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
      cartData.products[existingProductIndex].quantity += quantityToAdd;
    } else {
      // Add new product
      cartData.products.push({
        productId,
        quantity: quantityToAdd,
        addedAt: new Date()
      });
    }

    // Calculate total price
    cartData.totalPrice = await calculateTotalPrice(cartData.products);
    cartData.updatedAt = new Date();

    // Save cart
    await setDoc(cartRef, cartData);

    // Return response with populated product details
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
              price: productData.price || 0,
              images: productData.images || [],
              category: productData.category,
              stockQuantity: productData.stockQuantity || 0,
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
      message: "Item added to cart",
      cart: {
        userId: cartData.userId,
        products: populatedProducts,
        totalPrice: cartData.totalPrice,
        createdAt: cartData.createdAt,
        updatedAt: cartData.updatedAt
      }
    });

  } catch (error) {
    console.error("Error with cart operation:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to process cart operation"
    }, { status: 500 });
  }
}
