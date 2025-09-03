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
import { motion } from "framer-motion";

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
    const newQuantity = Math.max(0, cartQuantity + change);
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
      if (newQuantity <= 0) {
        await updateQuantityMutation.mutateAsync({
          productId: product.id,
          quantity: 0,
        });
        toast.success("Item removed from cart!");
      } else {
        await updateQuantityMutation.mutateAsync({
          productId: product.id,
          quantity: newQuantity,
        });
        toast.success("Cart updated!");
      }
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
    >
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
                    disabled={updateQuantityMutation.isPending}
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
    </motion.div>
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center mb-12">
              <span className="text-white text-3xl font-bold">DV</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-light text-center mb-8">
              <span className="text-black">Premium</span>{" "}
              <span className="text-gray-400">Skincare</span>
            </h1>

            <p className="text-gray-600 text-xl leading-relaxed text-center max-w-4xl mb-12">
              Discover our curated collection of professional-grade skincare
              products and treatments designed to elevate your skincare routine
              to the next level.
            </p>
          </div>
        </div>
      </div>

      {/* Product Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
          <div className="text-sm text-gray-500 mb-6 tracking-wide uppercase">
            Exclusive Collection
          </div>

          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-8 leading-tight">
            Professional Skincare Solutions
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our carefully curated collection features the highest quality skincare
            products, supplements, and tools from trusted brands. Each product is
            selected by our team of medical professionals to ensure efficacy and
            safety.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            From advanced serums to specialized tools, our product range is designed
            to complement our clinical treatments and help you maintain optimal skin
            health between visits.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-100 to-gray-50 px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">DV</span>
            </div>
            <div>
              <span className="text-3xl font-light text-black">Premium</span>
              <br />
              <span className="text-3xl font-light text-gray-400">
                Skincare
              </span>
            </div>
          </div>

          <h3 className="text-2xl lg:text-3xl font-light text-gray-800 mb-8 leading-tight">
            Why Choose Our Products:
          </h3>

          <ul className="space-y-5 text-gray-700">
            {[
              "Medical-grade formulations with proven results",
              "Selected by skincare professionals",
              "Complementary to clinical treatments",
              "Free consultations with product specialists",
              "Fast shipping and easy returns",
              "Automatic replenishment options available",
            ].map((benefit, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-6">
              Explore Our Collection
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Browse our complete range of skincare products, supplements, and tools
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category === "All" ? "" : category)
                }
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  (category === "All" && selectedCategory === "") ||
                  selectedCategory === category
                    ? "bg-black text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 hover:scale-105"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Product Grid */}
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-red-600 text-lg">Error loading products</p>
                <p className="text-gray-600 mt-2">Please try again later</p>
              </div>
            </motion.div>
          ) : data?.products?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-gray-900 text-lg font-medium">
                  No products found
                </p>
                <p className="text-gray-600 mt-2">
                  Try selecting a different category
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {data?.products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Consultation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-8 leading-tight">
            Need Help Choosing Products?
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our skincare specialists are available to help you select the perfect
            products for your skin type and concerns. Book a complimentary virtual
            consultation to create a personalized skincare regimen.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            We'll analyze your skin, discuss your goals, and recommend products
            that will deliver visible results and complement any ongoing treatments.
          </p>

          <button className="relative !px-8 !py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide hover:bg-gray-700 transition-colors w-fit">
            <span>BOOK CONSULTATION</span>
            <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
          </button>
        </div>

        <div className="bg-gray-50 relative flex items-center justify-center min-h-[400px] lg:min-h-[70vh]">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto mb-4"></div>
                <div className="text-gray-600">Skincare Consultation Image</div>
              </div>
            </div>
            <div className="absolute top-6 right-6 bg-white bg-opacity-95 px-6 py-4 rounded-lg shadow-lg">
              <div className="text-lg font-light text-gray-800">Skincare Expert</div>
              <div className="text-sm text-gray-600">Product Specialist</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}