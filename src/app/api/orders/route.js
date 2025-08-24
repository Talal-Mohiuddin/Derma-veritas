import { db } from "../../../config/db.js";
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where } from "firebase/firestore";
import { auth } from "firebase-admin";

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

// Helper function to check if user is admin
async function isAdmin(userId) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    return false;
  }
  
  const userData = userSnap.data();
  return userData.role === "admin";
}

// Helper function to populate order with user and product details
async function populateOrder(orderData, orderId) {
  // Get user details
  let userDetails = null;
  if (orderData.userId) {
    const userRef = doc(db, "users", orderData.userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      userDetails = {
        id: orderData.userId,
        name: userData.name,
        email: userData.email
      };
    }
  }

  // Get product details
  const populatedProducts = await Promise.all(
    orderData.products.map(async (product) => {
      let productDetails = null;
      if (product.productId) {
        const productRef = doc(db, "products", product.productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const productData = productSnap.data();
          productDetails = {
            id: product.productId,
            name: productData.name,
            images: productData.images,
            description: productData.description
          };
        }
      }
      
      return {
        ...product,
        productDetails
      };
    })
  );

  return {
    id: orderId,
    ...orderData,
    userDetails,
    products: populatedProducts
  };
}

// GET - Get all orders (admin only) or user's orders
export async function GET(request) {
  try {
    const decodedToken = await verifyToken(request);
    const userId = decodedToken.uid;
    
    const url = new URL(request.url);
    const getAllOrders = url.searchParams.get('all') === 'true';
    
    let ordersQuery;
    
    if (getAllOrders) {
      // Check if user is admin
      const userIsAdmin = await isAdmin(userId);
      if (!userIsAdmin) {
        return Response.json({
          success: false,
          message: "Access denied. Admin privileges required."
        }, { status: 403 });
      }
      
      // Get all orders for admin
      ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    } else {
      // Get orders for specific user
      ordersQuery = query(
        collection(db, "orders"), 
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
    }

    const ordersSnap = await getDocs(ordersQuery);
    const orders = [];

    for (const orderDoc of ordersSnap.docs) {
      const orderData = orderDoc.data();
      const populatedOrder = await populateOrder(orderData, orderDoc.id);
      orders.push(populatedOrder);
    }

    return Response.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error("Error getting orders:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to get orders"
    }, { status: 500 });
  }
}

// POST - Create order (usually from webhook, but can be manual)
export async function POST(request) {
  try {
    const decodedToken = await verifyToken(request);
    const adminUserId = decodedToken.uid;
    
    // Check if user is admin
    const userIsAdmin = await isAdmin(adminUserId);
    if (!userIsAdmin) {
      return Response.json({
        success: false,
        message: "Access denied. Admin privileges required."
      }, { status: 403 });
    }

    const orderData = await request.json();
    
    // Validate required fields
    if (!orderData.userId || !orderData.products || !orderData.totalAmount) {
      return Response.json({
        success: false,
        message: "Missing required fields: userId, products, totalAmount"
      }, { status: 400 });
    }

    // Generate order number
    const timestamp = Date.now();
    const ordersCount = (await getDocs(collection(db, "orders"))).size;
    const orderNumber = `ORD-${timestamp}-${ordersCount + 1}`;

    // Create order document
    const newOrder = {
      ...orderData,
      orderNumber,
      status: orderData.status || "pending",
      paymentStatus: orderData.paymentStatus || "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(collection(db, "orders"), newOrder);

    // Update user's buying history
    if (orderData.products && orderData.products.length > 0) {
      const userRef = doc(db, "users", orderData.userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const currentHistory = userData.Buyinghistory || [];
        
        const newHistoryItems = orderData.products.map(product => ({
          productId: product.productId,
          date: new Date()
        }));
        
        await updateDoc(userRef, {
          Buyinghistory: [...currentHistory, ...newHistoryItems]
        });
      }
    }

    return Response.json({
      success: true,
      message: "Order created successfully",
      orderId: docRef.id,
      orderNumber
    });

  } catch (error) {
    console.error("Error creating order:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to create order"
    }, { status: 500 });
  }
}
