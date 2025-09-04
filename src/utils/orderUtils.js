import { db } from "../config/db.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

// Create order from Stripe webhook
export async function createOrderFromStripe(session, metadata) {
  try {
    const { userId, products, shippingAddress } = metadata;

    if (!userId || !products) {
      throw new Error("Missing required order data");
    }

    // Parse products from metadata
    const orderProducts = JSON.parse(products);

    // Calculate total amount from session
    const totalAmount = session.amount_total / 100; // Convert from cents

    // Generate order number
    const timestamp = Date.now();
    const ordersCount = (await getDocs(collection(db, "orders"))).size;
    const orderNumber = `ORD-${timestamp}-${ordersCount + 1}`;

    // Parse shipping address
    const parsedShippingAddress = shippingAddress
      ? JSON.parse(shippingAddress)
      : {};

    // Create order document
    const orderData = {
      userId,
      products: orderProducts,
      totalAmount,
      orderNumber,
      status: "pending",
      paymentStatus: "completed",
      shippingAddress: parsedShippingAddress,
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent,
      currency: session.currency,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "orders"), orderData);

    // Update user's buying history
    if (orderProducts && orderProducts.length > 0) {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const currentHistory = userData.Buyinghistory || [];

        const newHistoryItems = orderProducts.map((product) => ({
          productId: product.productId,
          date: new Date(),
          orderNumber,
        }));

        await updateDoc(userRef, {
          Buyinghistory: [...currentHistory, ...newHistoryItems],
        });
      }
    }

    // Update product stock (if you have stock management)
    for (const product of orderProducts) {
      try {
        const productRef = doc(db, "products", product.productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
          const currentStock = productData.stockQuantity || 0;

          if (currentStock > 0) {
            await updateDoc(productRef, {
              stockQuantity: Math.max(0, currentStock - product.quantity),
            });
          }
        }
      } catch (stockError) {
        console.error(
          `Error updating stock for product ${product.productId}:`,
          stockError
        );
        // Continue with other products even if one fails
      }
    }

    return {
      id: docRef.id,
      orderNumber,
      ...orderData,
    };
  } catch (error) {
    console.error("Error creating order from Stripe:", error);
    throw error;
  }
}

// Generate unique order number
export function generateOrderNumber() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
}

// Validate order status
export function isValidOrderStatus(status) {
  const validStatuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  return validStatuses.includes(status);
}

// Validate payment status
export function isValidPaymentStatus(status) {
  const validStatuses = ["pending", "completed", "failed"];
  return validStatuses.includes(status);
}
