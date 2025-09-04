import Stripe from "stripe";
import { db } from "../../../../config/db.js";
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_SECRET_WEBHOOK_SECRET?.trim();

  // Get the raw body
  const body = await req.text();

  // Debug logging
  console.log("Webhook received:");
  console.log("Signature header:", sig ? "Present" : "Missing");
  console.log("Webhook secret configured:", webhookSecret ? "Yes" : "No");
  console.log("Request body length:", body ? body.length : "No body");

  if (!webhookSecret) {
    console.error("STRIPE_SECRET_WEBHOOK_SECRET is not configured");
    return Response.json(
      {
        success: false,
        message: "Webhook secret not configured",
      },
      { status: 500 }
    );
  }

  if (!sig) {
    console.error("Stripe signature header is missing");
    return Response.json(
      {
        success: false,
        message: "Stripe signature header is missing",
      },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("Webhook signature verified successfully");
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return Response.json(
      {
        success: false,
        message: "Webhook signature verification failed",
        error: err.message,
      },
      { status: 400 }
    );
  }

  // Handle payment intent succeeded (for cart purchases)
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    console.log("Processing payment_intent.succeeded event");
    console.log("Payment Intent ID:", paymentIntent.id);
    console.log("Payment Intent metadata:", paymentIntent.metadata);

    try {
      const metadata = paymentIntent.metadata || {};
      const { userId, orderType } = metadata;

      console.log("Extracted metadata:", { userId, orderType });

      // Handle cart purchase orders
      if (orderType === "cart_purchase" && userId) {
        console.log(`Processing cart purchase for user ${userId}`);

        try {
          // Get user's cart
          const cartRef = doc(db, "carts", userId);
          const cartSnap = await getDoc(cartRef);

          if (!cartSnap.exists()) {
            console.error(`Cart not found for user: ${userId}`);
            return Response.json(
              {
                success: false,
                message: "Cart not found",
              },
              { status: 404 }
            );
          }

          const cartData = cartSnap.data();
          console.log(
            `Cart found with ${cartData.products?.length || 0} products`
          );

          if (!cartData.products || cartData.products.length === 0) {
            console.error(`Cart is empty for user: ${userId}`);
            return Response.json(
              {
                success: false,
                message: "Cart is empty",
              },
              { status: 400 }
            );
          }

          // Get user details
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);

          let userDetails = {};
          if (userSnap.exists()) {
            const userData = userSnap.data();
            userDetails = {
              name: userData.displayName || userData.name,
              email: userData.email,
            };
          }

          // Create order data
          const currentDate = Timestamp.now();
          
          // Process products to ensure proper structure
          const processedProducts = cartData.products.map(product => ({
            productId: product.productId,
            quantity: product.quantity,
            price: product.productDetails?.price || product.price || 0,
            productDetails: {
              name: product.productDetails?.name || product.name || 'Unknown Product',
              price: product.productDetails?.price || product.price || 0,
              description: product.productDetails?.description || product.description || '',
              images: product.productDetails?.images || product.images || [],
              id: product.productDetails?.id || product.productId
            },
            addedAt: product.addedAt || currentDate
          }));

          const orderData = {
            userId: userId,
            orderNumber: `ORD-${Date.now()}`,
            products: processedProducts,
            totalAmount: paymentIntent.amount / 100, // Convert from cents
            subtotal: cartData.totalPrice || paymentIntent.amount / 100,
            status: "processing",
            paymentStatus: "paid",
            paymentMethod: "stripe",
            stripePaymentIntentId: paymentIntent.id,
            userDetails: userDetails,
            createdAt: currentDate,
            updatedAt: currentDate,
            paidAt: currentDate,
          };

          // Add billing details if available
          if (paymentIntent.charges?.data?.[0]?.billing_details) {
            const billingDetails =
              paymentIntent.charges.data[0].billing_details;
            orderData.billingAddress = {
              name: billingDetails.name,
              email: billingDetails.email,
              phone: billingDetails.phone,
              address: billingDetails.address?.line1,
              address2: billingDetails.address?.line2,
              city: billingDetails.address?.city,
              state: billingDetails.address?.state,
              zipCode: billingDetails.address?.postal_code,
              country: billingDetails.address?.country,
            };
          }

          // Create order in Firestore
          console.log("Creating order in Firestore...");
          const orderRef = await addDoc(collection(db, "orders"), orderData);
          console.log(`Order created with ID: ${orderRef.id}`);

          // Clear the user's cart
          console.log("Clearing user's cart...");
          await updateDoc(cartRef, {
            products: [],
            totalPrice: 0,
            updatedAt: new Date(),
          });

          console.log(
            `Successfully processed cart purchase for user ${userId}, order ID: ${orderRef.id}`
          );
          return Response.json({
            success: true,
            message: "Order created successfully",
            orderId: orderRef.id,
            orderNumber: orderData.orderNumber,
          });
        } catch (error) {
          console.error(`Error processing cart purchase: ${error.message}`);
          console.error("Full error:", error);
          return Response.json(
            {
              success: false,
              message: "Error processing cart purchase",
              error: error.message,
            },
            { status: 500 }
          );
        }
      } else {
        console.log("Not a cart purchase or missing required metadata");
        console.log("OrderType:", orderType);
        console.log("UserId:", userId);

        // Return success for non-cart events to avoid retries
        return Response.json({
          success: true,
          message: "Event processed - not a cart purchase",
        });
      }
    } catch (error) {
      console.error(
        `Error processing payment_intent.succeeded webhook: ${error.message}`
      );
      console.error("Full error:", error);
      return Response.json(
        {
          success: false,
          message: `Webhook processing failed: ${error.message}`,
        },
        { status: 500 }
      );
    }
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

      console.log("Extracted metadata:", {
        userId,
        planName,
        orderType,
        monthlyPrice,
      });

      // Handle membership subscription
      if (orderType === "membership_subscription" && userId && planName) {
        console.log(
          `Processing membership subscription for user ${userId}, plan: ${planName}`
        );

        try {
          const validPlans = [
            "Veritas Glow",
            "Veritas Sculpt",
            "Veritas Prestige",
          ];
          if (!validPlans.includes(planName)) {
            console.error(`Invalid plan name: ${planName}`);
            return Response.json(
              {
                success: false,
                message: "Invalid plan name",
              },
              { status: 400 }
            );
          }

          // Use Firestore to get user document
          console.log(`Looking up user in Firestore with ID: ${userId}`);
          const userRef = doc(db, "users", userId);

          let userSnap;
          try {
            userSnap = await getDoc(userRef);
          } catch (firestoreError) {
            console.error(
              `Firestore error getting user: ${firestoreError.message}`
            );
            return Response.json(
              {
                success: false,
                message: "Database error retrieving user",
                error: firestoreError.message,
              },
              { status: 500 }
            );
          }

          if (!userSnap.exists()) {
            console.error(`User not found in Firestore: ${userId}`);
            return Response.json(
              {
                success: false,
                message: "User not found",
              },
              { status: 404 }
            );
          }

          console.log(
            `User found in Firestore, updating membership for user: ${userId}`
          );

          // Update user with membership plan and subscription info using Firestore
          try {
            const updateDate = Timestamp.now();
            await updateDoc(userRef, {
              membershipPlan: planName,
              membershipStatus: "active",
              planUpdatedAt: updateDate,
              stripeSubscriptionId: session.subscription,
              stripeCustomerId: session.customer,
              membershipPaymentInfo: {
                stripeSessionId: session.id,
                stripeSubscriptionId: session.subscription,
                stripeCustomerId: session.customer,
                monthlyPrice: parseInt(monthlyPrice) / 100,
                subscriptionStarted: updateDate,
              },
              updatedAt: updateDate,
            });
          } catch (updateError) {
            console.error(
              `Firestore error updating user: ${updateError.message}`
            );
            return Response.json(
              {
                success: false,
                message: "Database error updating user",
                error: updateError.message,
              },
              { status: 500 }
            );
          }

          console.log(
            `Successfully created subscription for plan ${planName} for user: ${userId}`
          );
          return Response.json({
            success: true,
            message: "Membership subscription activated successfully",
            plan: planName,
            userId: userId,
          });
        } catch (error) {
          console.error(
            `Error processing membership subscription: ${error.message}`
          );
          console.error("Full error:", error);
          return Response.json(
            {
              success: false,
              message: "Error processing membership subscription",
              error: error.message,
            },
            { status: 500 }
          );
        }
      } else {
        console.log(
          "Not a membership subscription or missing required metadata"
        );
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
      return Response.json(
        {
          success: false,
          message: `Webhook processing failed: ${error.message}`,
        },
        { status: 500 }
      );
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
