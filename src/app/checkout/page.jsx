"use client";

import dynamic from "next/dynamic";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCartData } from "@/hooks/useCart";
import { useAuth } from "@/store/FirebaseAuthProvider";
import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const CheckoutForm = dynamic(() => import("@/components/CheckoutForm"), {
  ssr: false,
});

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  const { user } = useAuth();
  const { data: cartData, isLoading } = useCartData();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(true);

  useEffect(() => {
    async function createPaymentIntent() {
      if (!user?.uid || !cartData?.cart?.products?.length) return;

      try {
        const response = await fetch("/api/cart/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.uid,
            cartId: cartData.cart.id,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to create payment intent"
          );
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        setError(error.message);
      } finally {
        setLoadingIntent(false);
      }
    }

    if (!isLoading && cartData) {
      createPaymentIntent();
    }
  }, [user?.uid, cartData, isLoading]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-auto text-center shadow-xl">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Please Sign In
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be signed in to checkout
          </p>
          <Link
            href="/login"
            className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || loadingIntent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
          <p className="text-center mt-4">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-auto text-center shadow-xl">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/cart"
            className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  if (!cartData?.cart?.products?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-auto text-center shadow-xl">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Cart is Empty
          </h2>
          <p className="text-gray-600 mb-6">Add some products to checkout</p>
          <Link
            href="/shop"
            className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm cartData={cartData} clientSecret={clientSecret} />
    </Elements>
  );
}
