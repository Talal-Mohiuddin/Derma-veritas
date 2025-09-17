import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/config/db";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { planName, userId, successUrl, cancelUrl } = body;

    if (!planName || !userId) {
      return NextResponse.json(
        { error: "Plan name and user ID are required" },
        { status: 400 }
      );
    }

    // Define membership plans with pricing (amounts in pence)
    const membershipPlans = {
      "Veritas Glow": {
        monthlyPrice: 8000, // £80.00 in pence
        name: "Veritas Glow",
        description: "Entry Tier - ProFusion HydraFacial monthly + benefits",
      },
      "Veritas Sculpt": {
        monthlyPrice: 16000, // £160.00 in pence
        name: "Veritas Sculpt",
        description:
          "Mid Tier - Profhilo treatments + Anti-Wrinkle Treatment + benefits",
      },
      "Veritas Prestige": {
        monthlyPrice: 29900, // £299.00 in pence
        name: "Veritas Prestige",
        description: "Luxury Tier - Endolift + CO₂ Laser + premium benefits",
      },
    };

    const selectedPlan = membershipPlans[planName];
    if (!selectedPlan) {
      return NextResponse.json(
        { error: "Invalid membership plan" },
        { status: 400 }
      );
    }

    // Verify user exists
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();

    // Create or get Stripe customer
    let customerId = userData.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userData.email,
        name: userData.name || userData.displayName,
        metadata: {
          userId: userId,
        },
      });
      customerId = customer.id;

      // Save customer ID to user document
      await updateDoc(userRef, {
        stripeCustomerId: customerId,
        updatedAt: new Date(),
      });
    }

    // Create simple subscription checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `${selectedPlan.name} Membership`,
              description: selectedPlan.description,
            },
            unit_amount: selectedPlan.monthlyPrice,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          userId: userId,
          planName: planName,
        },
      },
      success_url:
        successUrl ||
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/membership/success?plan=${encodeURIComponent(planName)}`,
      cancel_url:
        cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/membership/cancel`,
      metadata: {
        userId: userId,
        planName: planName,
        orderType: "membership_subscription",
        monthlyPrice: selectedPlan.monthlyPrice.toString(),
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      subscription: true,
    });
  } catch (error) {
    console.error("Error creating membership checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { userId, planName, isAdmin } = body;

    // Verify admin access for direct plan updates
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Admin access required for direct plan updates" },
        { status: 403 }
      );
    }

    if (!userId || !planName) {
      return NextResponse.json(
        { error: "User ID and plan name are required" },
        { status: 400 }
      );
    }

    const validPlans = ["Veritas Glow", "Veritas Sculpt", "Veritas Prestige"];
    if (!validPlans.includes(planName)) {
      return NextResponse.json({ error: "Invalid plan name" }, { status: 400 });
    }

    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await updateDoc(userRef, {
      membershipPlan: planName,
      membershipStatus: "active",
      planUpdatedAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      message: "Membership plan updated successfully",
      plan: planName,
    });
  } catch (error) {
    console.error("Error updating membership plan:", error);
    return NextResponse.json(
      { error: "Failed to update membership plan" },
      { status: 500 }
    );
  }
}
