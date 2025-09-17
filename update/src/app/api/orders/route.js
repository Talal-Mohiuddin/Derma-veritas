import { db } from "../../../config/db.js";
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where } from "firebase/firestore";

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

// Helper function to calculate order totals with fallback pricing
function calculateOrderTotals(products) {
  let calculatedSubtotal = 0;
  
  products.forEach(product => {
    const orderPrice = product.price || 0;
    const currentPrice = product.productDetails?.price || 0;
    const displayPrice = orderPrice > 0 ? orderPrice : currentPrice;
    calculatedSubtotal += displayPrice * product.quantity;
  });
  
  return {
    calculatedSubtotal,
    hasFallbackPricing: products.some(p => (p.price || 0) === 0 && (p.productDetails?.price || 0) > 0)
  };
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
        name: userData.displayName || userData.name,
        email: userData.email
      };
    }
  }

  // Get product details from products collection
  const populatedProducts = await Promise.all(
    (orderData.products || []).map(async (product) => {
      let productDetails = null;
      if (product.productId) {
        try {
          const productRef = doc(db, "products", product.productId);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            const productData = productSnap.data();
            productDetails = {
              id: product.productId,
              name: productData.name,
              images: productData.images,
              description: productData.description,
              price: productData.price, // Current price
              category: productData.category,
            };
          }
        } catch (error) {
          console.error(`Error fetching product ${product.productId}:`, error);
        }
      }
      
      // Apply fallback pricing logic here
      const orderPrice = product.price || 0;
      const currentPrice = productDetails?.price || 0;
      const finalPrice = orderPrice > 0 ? orderPrice : currentPrice;
      
      return {
        productId: product.productId,
        quantity: product.quantity,
        price: finalPrice, // Use fallback price
        originalPrice: product.price, // Keep original for reference
        productDetails
      };
    })
  );

  // Calculate total using final prices
  const calculatedTotal = populatedProducts.reduce((sum, product) => {
    return sum + (product.price * product.quantity);
  }, 0);

  return {
    id: orderId,
    ...orderData,
    userDetails,
    products: populatedProducts,
    calculatedTotal
  };
}

// GET - Get all orders (admin only) or user's orders
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const getAllOrders = searchParams.get('all') === 'true';
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return Response.json({
        success: false,
        message: "User ID is required"
      }, { status: 400 });
    }
    
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
    const body = await request.json();
    const { adminUserId, ...orderData } = body;
    
    if (!adminUserId) {
      return Response.json({
        success: false,
        message: "Admin user ID is required"
      }, { status: 400 });
    }
    
    // Check if user is admin
    const userIsAdmin = await isAdmin(adminUserId);
    if (!userIsAdmin) {
      return Response.json({
        success: false,
        message: "Access denied. Admin privileges required."
      }, { status: 403 });
    }
    
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
