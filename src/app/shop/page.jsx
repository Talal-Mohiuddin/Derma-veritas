"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useProductsData } from "@/hooks/useProduct";
import { useAddToCart, useCartItemCount, useIsInCart, useUpdateCartQuantity } from "@/hooks/useCart";
import { useAuth } from "@/store/FirebaseAuthProvider";
import {
  ShoppingCart,
  Plus,
  Minus,
  ArrowLeft,
  User,
  LogOut,
  Check,
} from "lucide-react";
import { toast } from "sonner";

// Product Card Component
function ProductCard({ product }) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const addToCartMutation = useAddToCart();
  const updateQuantityMutation = useUpdateCartQuantity();
  const { data: cartStatus } = useIsInCart(product.id);

  const isInCart = cartStatus?.inCart || false;
  const cartQuantity = cartStatus?.quantity || 0;

  const updateQuantity = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const updateCartQuantity = (change) => {
    const newQuantity = Math.max(1, cartQuantity + change);
    handleUpdateCart(newQuantity);
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      await addToCartMutation.mutateAsync({
        productId: product.id,
        quantity,
      });
      toast.success(`${product.name} added to cart!`);
      setQuantity(1);
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  const handleUpdateCart = async (newQuantity) => {
    if (!user) {
      toast.error("Please login to update cart");
      return;
    }

    try {
      await updateQuantityMutation.mutateAsync({
        productId: product.id,
        quantity: newQuantity,
      });
      toast.success("Cart updated!");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
      <div className="h-80 relative bg-gray-100 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0].url}
            alt={product.images[0].altText || product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2" />
              <span>No Image</span>
            </div>
          </div>
        )}
        
        {/* Stock indicator */}
        {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Only {product.stockQuantity} left
          </div>
        )}
        
        {/* In cart indicator */}
        {isInCart && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Check className="w-3 h-3" />
            In Cart
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
          {product.description}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-gray-900">
            £{product.price.toFixed(2)}
          </span>
          {product.stockQuantity > 0 ? (
            <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="text-red-600 text-sm font-medium bg-red-50 px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {product.stockQuantity > 0 ? (
          <div className="space-y-3">
            {isInCart ? (
              // Show cart quantity controls for items in cart
              <>
                <div className="text-center mb-2">
                  <span className="text-sm text-gray-600">Quantity in cart: {cartQuantity}</span>
                </div>
                <div className="flex items-center justify-center border rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateCartQuantity(-1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    disabled={updateQuantityMutation.isPending || cartQuantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                    {cartQuantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    disabled={updateQuantityMutation.isPending}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => updateCartQuantity(1)}
                  disabled={updateQuantityMutation.isPending}
                  className="w-full bg-green-600 text-white py-3 text-sm font-semibold tracking-wide hover:bg-green-700 transition-colors duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {updateQuantityMutation.isPending ? (
                    "UPDATING..."
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      ADD MORE
                    </>
                  )}
                </button>
              </>
            ) : (
              // Show regular add to cart for items not in cart
              <>
                <div className="flex items-center justify-center border rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateQuantity(-1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addToCartMutation.isPending}
                  className="w-full bg-black text-white py-3 text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addToCartMutation.isPending ? "ADDING..." : "ADD TO CART"}
                </button>
              </>
            )}
          </div>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-3 text-sm font-semibold tracking-wide rounded-xl cursor-not-allowed"
          >
            OUT OF STOCK
          </button>
        )}
      </div>
    </div>
  );
}

export default function ProductListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data, isLoading, error } = useProductsData(
    selectedCategory,
    currentPage,
    12
  );
  const { data: cartCount } = useCartItemCount();
  const { user, signOut } = useAuth();

  const categories = ["All", "Skincare", "Supplements", "Tools", "Sets"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
              Premium <span className="font-semibold">Skincare</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of professional-grade skincare
              products and treatments
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category === "All" ? "" : category)
                }
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  (category === "All" && selectedCategory === "") ||
                  selectedCategory === category
                    ? "bg-black text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse"
                >
                  <div className="h-80 bg-gray-200" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-10 bg-gray-200 rounded w-28"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-red-600 text-lg">Error loading products</p>
                <p className="text-gray-600 mt-2">Please try again later</p>
              </div>
            </div>
          ) : data?.products?.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-gray-900 text-lg font-medium">
                  No products found
                </p>
                <p className="text-gray-600 mt-2">
                  Try selecting a different category
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {data?.products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
