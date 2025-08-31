import Stripe from "stripe";
import { db } from "@/config/db";
import { doc, getDoc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { userId, cartId } = await req.json();

    if (!userId) {
      return Response.json({
        success: false,
        message: "User ID is required",
      }, { status: 400 });
    }

    // Get user's cart
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) {
      return Response.json({
        success: false,
        message: "Cart not found",
      }, { status: 404 });
    }

    const cartData = cartSnap.data();
    
    if (!cartData.products || cartData.products.length === 0) {
      return Response.json({
        success: false,
        message: "Cart is empty",
      }, { status: 400 });
    }

    // Calculate total amount in pence (Stripe uses smallest currency unit)
    const amount = Math.round((cartData.totalPrice || 0) * 100);

    if (amount < 50) { // Stripe minimum is 50p for GBP
      return Response.json({
        success: false,
        message: "Order total must be at least £0.50",
      }, { status: 400 });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
      metadata: {
        userId,
        cartId: userId, // Using userId as cartId for simplicity
        orderType: "cart_purchase",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return Response.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error("Error creating payment intent:", error);
    return Response.json({
      success: false,
      message: "Failed to create payment intent",
      error: error.message,
    }, { status: 500 });
  }
}
