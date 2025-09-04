import Stripe from "stripe";
import { db } from "../../../../config/db.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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

  // Handle subscription creation
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Processing checkout.session.completed event");
    console.log("Session ID:", session.id);
    console.log("Session metadata:", session.metadata);
    console.log("Session mode:", session.mode);
    console.log("Payment status:", session.payment_status);

    try {
      const metadata = session.metadata || {};
      const { userId, planName, orderType, monthlyPrice } = metadata;

      console.log("Extracted metadata:", { userId, planName, orderType, monthlyPrice });

      // Handle membership subscription
      if (orderType === "membership_subscription" && userId && planName) {
        console.log(`Processing membership subscription for user ${userId}, plan: ${planName}`);
        
        try {
          const validPlans = ["Veritas Glow", "Veritas Sculpt", "Veritas Prestige"];
          if (!validPlans.includes(planName)) {
            console.error(`Invalid plan name: ${planName}`);
            return Response.json({
              success: false,
              message: "Invalid plan name",
            }, { status: 400 });
          }

          // Use Firestore to get user document
          console.log(`Looking up user in Firestore with ID: ${userId}`);
          const userRef = doc(db, "users", userId);
          
          let userSnap;
          try {
            userSnap = await getDoc(userRef);
          } catch (firestoreError) {
            console.error(`Firestore error getting user: ${firestoreError.message}`);
            return Response.json({
              success: false,
              message: "Database error retrieving user",
              error: firestoreError.message,
            }, { status: 500 });
          }

          if (!userSnap.exists()) {
            console.error(`User not found in Firestore: ${userId}`);
            return Response.json({
              success: false,
              message: "User not found",
            }, { status: 404 });
          }

          console.log(`User found in Firestore, updating membership for user: ${userId}`);

          // Update user with membership plan and subscription info using Firestore
          try {
            await updateDoc(userRef, {
              membershipPlan: planName,
              membershipStatus: "active",
              planUpdatedAt: new Date(),
              stripeSubscriptionId: session.subscription,
              stripeCustomerId: session.customer,
              membershipPaymentInfo: {
                stripeSessionId: session.id,
                stripeSubscriptionId: session.subscription,
                stripeCustomerId: session.customer,
                monthlyPrice: parseInt(monthlyPrice) / 100,
                subscriptionStarted: new Date(),
              },
              updatedAt: new Date(),
            });
          } catch (updateError) {
            console.error(`Firestore error updating user: ${updateError.message}`);
            return Response.json({
              success: false,
              message: "Database error updating user",
              error: updateError.message,
            }, { status: 500 });
          }

          console.log(`Successfully created subscription for plan ${planName} for user: ${userId}`);
          return Response.json({
            success: true,
            message: "Membership subscription activated successfully",
            plan: planName,
            userId: userId,
          });
        } catch (error) {
          console.error(`Error processing membership subscription: ${error.message}`);
          console.error("Full error:", error);
          return Response.json({
            success: false,
            message: "Error processing membership subscription",
            error: error.message,
          }, { status: 500 });
        }
      } else {
        console.log("Not a membership subscription or missing required metadata");
        console.log("OrderType:", orderType);
        console.log("UserId:", userId);
        console.log("PlanName:", planName);
        
        // Return success for non-membership events to avoid retries
        return Response.json({
          success: true,
          message: "Event processed - not a membership subscription",
        });
      }
    } catch (error) {
      console.error(`Error processing webhook: ${error.message}`);
      console.error("Full error:", error);
      return Response.json({
        success: false,
        message: `Webhook processing failed: ${error.message}`,
      }, { status: 500 });
    }
  }

  console.log(`Received event type: ${event.type} - acknowledging`);
  // Acknowledge other events
  return Response.json({
    success: true,
    message: "Event received",
    eventType: event.type,
  });
}
