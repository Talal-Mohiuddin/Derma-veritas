import { db } from "../../../../config/db.js";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
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

async function isAdmin(userId) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    return false;
  }
  
  const userData = userSnap.data();
  return userData.role === "admin";
}

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

// GET - Get order by ID
export async function GET(request, { params }) {
  try {
    const decodedToken = await verifyToken(request);
    const userId = decodedToken.uid;
    const orderId = params.id;

    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      return Response.json({
        success: false,
        message: "Order not found"
      }, { status: 404 });
    }

    const orderData = orderSnap.data();
    
    // Check if user is admin or owns the order
    const userIsAdmin = await isAdmin(userId);
    if (!userIsAdmin && orderData.userId !== userId) {
      return Response.json({
        success: false,
        message: "Access denied"
      }, { status: 403 });
    }

    const populatedOrder = await populateOrder(orderData, orderId);

    return Response.json({
      success: true,
      order: populatedOrder
    });

  } catch (error) {
    console.error("Error getting order:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to get order"
    }, { status: 500 });
  }
}

// PUT - Update order status
export async function PUT(request, { params }) {
  try {
    const decodedToken = await verifyToken(request);
    const userId = decodedToken.uid;
    const orderId = params.id;

    // Check if user is admin
    const userIsAdmin = await isAdmin(userId);
    if (!userIsAdmin) {
      return Response.json({
        success: false,
        message: "Access denied. Admin privileges required."
      }, { status: 403 });
    }

    const { status } = await request.json();

    if (!status) {
      return Response.json({
        success: false,
        message: "Status is required"
      }, { status: 400 });
    }

    const validStatuses = [
      "pending",
      "processing", 
      "shipped",
      "delivered",
      "cancelled"
    ];

    if (!validStatuses.includes(status)) {
      return Response.json({
        success: false,
        message: "Invalid status"
      }, { status: 400 });
    }

    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      return Response.json({
        success: false,
        message: "Order not found"
      }, { status: 404 });
    }

    await updateDoc(orderRef, {
      status,
      updatedAt: new Date()
    });

    const updatedOrderSnap = await getDoc(orderRef);
    const updatedOrderData = updatedOrderSnap.data();
    const populatedOrder = await populateOrder(updatedOrderData, orderId);

    return Response.json({
      success: true,
      message: "Order status updated successfully",
      order: populatedOrder
    });

  } catch (error) {
    console.error("Error updating order:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to update order"
    }, { status: 500 });
  }
}

// DELETE - Delete order
export async function DELETE(request, { params }) {
  try {
    const decodedToken = await verifyToken(request);
    const userId = decodedToken.uid;
    const orderId = params.id;

    // Check if user is admin
    const userIsAdmin = await isAdmin(userId);
    if (!userIsAdmin) {
      return Response.json({
        success: false,
        message: "Access denied. Admin privileges required."
      }, { status: 403 });
    }

    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      return Response.json({
        success: false,
        message: "Order not found"
      }, { status: 404 });
    }

    await deleteDoc(orderRef);

    return Response.json({
      success: true,
      message: "Order deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting order:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to delete order"
    }, { status: 500 });
  }
}
