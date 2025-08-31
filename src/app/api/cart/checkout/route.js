import { db } from "../../../../config/db.js";
import { doc, getDoc } from "firebase/firestore";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return Response.json({
        success: false,
        message: "User ID is required"
      }, { status: 400 });
    }

    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) {
      return Response.json({
        success: false,
        message: "Cart not found"
      }, { status: 404 });
    }

    const cartData = cartSnap.data();

    if (!cartData.products || cartData.products.length === 0) {
      return Response.json({
        success: false,
        message: "Cart is empty"
      }, { status: 400 });
    }

    // Create line items for Stripe
    const lineItems = await Promise.all(
      cartData.products.map(async (item) => {
        const productRef = doc(db, "products", item.productId);
        const productSnap = await getDoc(productRef);
        
        if (!productSnap.exists()) {
          throw new Error(`Product ${item.productId} not found`);
        }
        
        const product = productSnap.data();
        
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description || "",
              images: product.images ? [product.images[0]] : [],
            },
            unit_amount: Math.round(product.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        };
      })
    );

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        userId: userId,
        cartId: userId, // Using userId as cartId since we're using user ID as document ID
      },
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"], // Add your allowed countries
      },
    });

    if (!session) {
      return Response.json({
        success: false,
        message: "Failed to create payment session"
      }, { status: 500 });
    }

    return Response.json({
      success: true,
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    return Response.json({
      success: false,
      message: error.message || "Failed to create checkout session"
    }, { status: 500 });
  }
}
