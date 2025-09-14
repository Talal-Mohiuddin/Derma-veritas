"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
// import { useProductsData } from "@/hooks/useProduct";
// import { useAddToCart, useCartItemCount, useIsInCart, useUpdateCartQuantity } from "@/hooks/useCart";
// import { useAuth } from "@/store/FirebaseAuthProvider";
import {
  ShoppingCart,
  Plus,
  Minus,
  ArrowLeft,
  User,
  LogOut,
  Check,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Product Card Component - Commented out for coming soon
/*
function ProductCard({ product }) {
  // ...existing code...
}
*/

export default function ProductListing() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [selectedCategory, setSelectedCategory] = useState("");

  // const { data, isLoading, error } = useProductsData(
  //   selectedCategory,
  //   currentPage,
  //   12
  // );
  // const { data: cartCount } = useCartItemCount();
  // const { user, signOut } = useAuth();

  // const categories = ["All", "Skincare", "Supplements", "Tools", "Sets"];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      {/* Coming Soon Section - Replaces Products Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-8">
              <Clock className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-6">
              Coming Soon
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
              We're carefully curating our premium skincare collection. Our shop
              will launch soon with exclusive products selected by our medical
              professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* <div className="relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-40 h-40 flex items-center justify-center mb-12">
              <img
                src="/logo_black.png
"
                alt="Derma Veritas Logo"
                className="w-full h-full object-contain"
              />
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
      </div> */}

      {/* Product Overview */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
          <div className="text-sm text-gray-500 mb-6 tracking-wide uppercase">
            Exclusive Collection
          </div>

          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-8 leading-tight">
            Professional Skincare Solutions
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our carefully curated collection features the highest quality
            skincare products, supplements, and tools from trusted brands. Each
            product is selected by our team of medical professionals to ensure
            efficacy and safety.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            From advanced serums to specialized tools, our product range is
            designed to complement our clinical treatments and help you maintain
            optimal skin health between visits.
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
      </div> */}

      {/* Consultation Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-8 leading-tight">
            Need Help Choosing Products?
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our skincare specialists are available to help you select the
            perfect products for your skin type and concerns. Book a
            complimentary virtual consultation to create a personalized skincare
            regimen.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            We'll analyze your skin, discuss your goals, and recommend products
            that will deliver visible results and complement any ongoing
            treatments.
          </p>

          <button className="relative !px-8 !py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-lg tracking-wide hover:bg-gray-700 transition-colors w-fit">
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
              <div className="text-lg font-light text-gray-800">
                Skincare Expert
              </div>
              <div className="text-sm text-gray-600">Product Specialist</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
