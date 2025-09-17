"use client";

import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useClearCart } from "@/hooks/useCart";

export default function CheckoutSuccessPage() {
  const clearCartMutation = useClearCart();

  useEffect(() => {
    // Clear the cart after successful payment
    clearCartMutation.mutate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-auto text-center shadow-xl">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your order. We'll send you a confirmation email shortly with your order details and tracking information.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Package className="w-5 h-5" />
            <span>Your order is being processed and will be shipped soon</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link 
            href="/shop" 
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors inline-flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link 
            href="/" 
            className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
