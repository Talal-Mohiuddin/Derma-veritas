import Stripe from "stripe";
import { db } from "../../../../config/db.js";
import { doc, getDoc, updateDoc, collection, addDoc, deleteDoc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_SECRET_WEBHOOK_SECRET;
  
  // Get the raw body
  const body = await req.text();

  // Debug logging
  console.log("Webhook received:");
  console.log("Signature header:", sig ? "Present" : "Missing");
  console.log("Webhook secret configured:", webhookSecret ? "Yes" : "No");
  console.log("Request body length:", body ? body.length : "No body");

  if (!webhookSecret) {
    console.error("STRIPE_SECRET_WEBHOOK_SECRET is not configured");
    return Response.json({
      success: false,
      message: "Webhook secret not configured",
    }, { status: 500 });
  }

  if (!sig) {
    console.error("Stripe signature header is missing");
    return Response.json({
      success: false,
      message: "Stripe signature header is missing",
    }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("Webhook signature verified successfully");
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return Response.json({
      success: false,
      message: "Webhook signature verification failed",
      error: err.message,
    }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const metadata = session.metadata || {};
      const { userId, cartId, planName } = metadata;

      console.log("Webhook metadata:", metadata);

      // If metadata contains cartId, process cart purchase
      if (cartId && userId) {
        try {
          // Get user document
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);

          // Get cart document
          const cartRef = doc(db, "carts", cartId);
          const cartSnap = await getDoc(cartRef);

          if (!userSnap.exists() || !cartSnap.exists()) {
            console.error("User or cart not found");
            return Response.json({
              success: false,
              message: "User or cart not found",
            }, { status: 404 });
          }

          const cartData = cartSnap.data();

          // Create order document
          const orderData = {
            userId,
            products: cartData.products || [],
            totalAmount: session.amount_total / 100, // Convert from cents
            currency: session.currency,
            status: "completed",
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent,
            createdAt: new Date(),
            shippingAddress: cartData.shippingAddress || {},
          };

          // Add order to Firestore
          await addDoc(collection(db, "orders"), orderData);

          // Clear the cart
          await updateDoc(cartRef, {
            products: [],
            totalPrice: 0,
            updatedAt: new Date(),
          });

          console.log(`Order created and cart cleared for user: ${userId}`);
          return Response.json({
            success: true,
            message: "Order created successfully",
          });
        } catch (error) {
          console.error(`Error processing cart purchase: ${error.message}`);
          return Response.json({
            success: false,
            message: "Error processing cart purchase",
            error: error.message,
          }, { status: 500 });
        }
      }

      // Handle plan upgrade
      if (userId && planName) {
        try {
          // Validate planName
          const validPlans = [
            "Veritas Glow",
            "Veritas Sculpt",
            "Veritas Prestige",
          ];
          if (!validPlans.includes(planName)) {
            console.error(`Invalid plan name: ${planName}`);
            return Response.json({
              success: false,
              message: "Invalid plan name",
            }, { status: 400 });
          }

          // Update user plan
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            console.error(`User not found: ${userId}`);
            return Response.json({
              success: false,
              message: "User not found",
            }, { status: 404 });
          }

          await updateDoc(userRef, {
            plan: planName,
            planUpdatedAt: new Date(),
            stripeSessionId: session.id,
          });

          console.log(`Updated plan to ${planName} for user: ${userId}`);
          return Response.json({
            success: true,
            message: "Plan upgrade processed successfully",
          });
        } catch (error) {
          console.error(`Error processing plan upgrade: ${error.message}`);
          return Response.json({
            success: false,
            message: "Error processing plan upgrade",
            error: error.message,
          }, { status: 500 });
        }
      }

      // If no valid metadata found, log and acknowledge
      console.log("No valid metadata found in webhook, acknowledging event");
      return Response.json({
        success: true,
        message: "Event acknowledged (no action required)",
      });
    } catch (error) {
      console.error(`Error processing webhook: ${error.message}`);
      return Response.json({
        success: false,
        message: `Webhook processing failed: ${error.message}`,
      }, { status: 500 });
    }
  } else {
    // Acknowledge other events
    return Response.json({
      success: true,
      message: "Event received",
    });
  }
}
