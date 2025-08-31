"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartData, useUpdateCartQuantity, useRemoveFromCart, useClearCart } from "@/hooks/useCart";
import { useAuth } from "@/store/FirebaseAuthProvider";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useMemo } from "react";

export default function CartPage() {
  const { user } = useAuth();
  const { data: cartData, isLoading } = useCartData();
  const updateQuantityMutation = useUpdateCartQuantity();
  const removeItemMutation = useRemoveFromCart();
  const clearCartMutation = useClearCart();

  // Calculate totals reactively
  const cartTotals = useMemo(() => {
    if (!cartData?.cart?.products) return { subtotal: 0, total: 0, itemCount: 0 };
    
    const subtotal = cartData.cart.products.reduce((total, item) => {
      const price = item.productDetails?.price || 0;
      return total + (price * item.quantity);
    }, 0);
    
    const itemCount = cartData.cart.products.reduce((count, item) => count + item.quantity, 0);
    
    return {
      subtotal,
      total: subtotal, // Add tax/shipping calculations here if needed
      itemCount
    };
  }, [cartData?.cart?.products]);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        await removeItemMutation.mutateAsync({ productId, quantity: 999 }); // Remove all
        toast.success("Item removed from cart");
      } else {
        await updateQuantityMutation.mutateAsync({ productId, quantity: newQuantity });
      }
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      await removeItemMutation.mutateAsync({ productId, quantity: 999 }); // Remove all
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await clearCartMutation.mutateAsync();
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-auto text-center shadow-xl">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to view your cart</p>
          <Link href="/login" className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/shop" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Continue Shopping</span>
            </Link>

           

            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your items and proceed to checkout</p>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl p-8">
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="w-24 h-8 bg-gray-200 rounded"></div>
                  <div className="w-20 h-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : !cartData?.cart?.products?.length ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Discover our amazing skincare products and treatments</p>
            <Link href="/shop" className="bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cart Items ({cartTotals.itemCount})
                  </h2>
                  {cartData.cart.products.length > 0 && (
                    <button
                      onClick={clearCart}
                      disabled={clearCartMutation.isPending}
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
                
                <div className="divide-y divide-gray-100">
                  {cartData.cart.products.map((item) => {
                    const itemTotal = (item.productDetails?.price || 0) * item.quantity;
                    const isUpdating = updateQuantityMutation.isPending || removeItemMutation.isPending;
                    
                    return (
                      <div key={item.productId} className={`p-6 hover:bg-gray-50 transition-colors ${isUpdating ? 'opacity-60' : ''}`}>
                        <div className="flex items-center gap-4">
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                            {item.productDetails?.images?.[0]?.url ? (
                              <Image
                                src={item.productDetails.images[0].url}
                                alt={item.productDetails.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No Image</span>
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {item.productDetails?.name || 'Product'}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                              {item.productDetails?.description}
                            </p>
                            <p className="text-lg font-semibold text-gray-900 mt-2">
                              £{(item.productDetails?.price || 0).toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-xl overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={isUpdating}
                              className="px-3 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={isUpdating}
                              className="px-3 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              £{itemTotal.toFixed(2)}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.productId)}
                            disabled={isUpdating}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm sticky top-8">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>£{cartTotals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>£{cartTotals.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t">
                  <Link
                    href="/checkout"
                    className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                  </Link>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
