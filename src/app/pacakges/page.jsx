"use client";

import { BookingModal } from "@/components/booking-modal";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/zustand";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function PackagesPage() {
  const { bookingOpen, setBookingOpen } = useStore();

  const packageCategories = [
    {
      title: "ProFusion HydraFacial",
      description:
        "Ultimate skin rejuvenation using state-of-the-art ProFusion devices",
      image: "/images/hydrafacial.jpg",
      href: "/pacakges/profusion",
      treatments: "4 Treatment Options",
      duration: "40-75 minutes",
      priceRange: "£150 - £250",
    },
    {
      title: "Signature Treatment Packages",
      description:
        "Comprehensive treatment programs designed for specific skin concerns",
      image: "/images/signature.jpg",
      href: "/pacakges/signature",
      treatments: "4 Complete Programs",
      duration: "8-18 weeks",
      priceRange: "£1,100 - £2,500",
    },
    {
      title: "Elite Membership Program",
      description:
        "Exclusive membership tiers with ongoing treatments and benefits",
      image: "/images/membership.jpg",
      href: "/pacakges/membership",
      treatments: "3 Membership Tiers",
      duration: "Monthly Plans",
      priceRange: "£80 - £299/month",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <span className="text-white text-3xl font-bold">DV</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-light text-center mb-6">
              <span className="text-black">Treatment</span>{" "}
              <span className="text-gray-400">Packages</span>
            </h1>

            <p className="text-gray-600 text-xl leading-relaxed text-center max-w-4xl mx-auto mb-12">
              Discover our comprehensive treatment packages designed to address
              your unique skin concerns and aesthetic goals with the latest in
              medical aesthetics technology.
            </p>

            <Button
              onClick={() => setBookingOpen(true)}
              className="relative !px-12 !py-6 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide hover:bg-gray-700 transition-colors"
            >
              <span>BOOK A CONSULTATION</span>
              <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Package Categories */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-6">
              Choose Your Journey
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              From single treatments to comprehensive programs, find the perfect
              package tailored to your skincare and aesthetic needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packageCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={category.href} className="block">
                  <div className="bg-white border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                      {/* Placeholder for image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-2xl font-light">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-light text-gray-800 mb-4 group-hover:text-gray-600 transition-colors">
                        {category.title}
                      </h3>

                      <p className="text-gray-600 text-base leading-relaxed mb-6">
                        {category.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Treatments:</span>
                          <span className="text-gray-800 font-medium">
                            {category.treatments}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Duration:</span>
                          <span className="text-gray-800 font-medium">
                            {category.duration}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Price Range:</span>
                          <span className="text-gray-800 font-medium">
                            {category.priceRange}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-800 font-medium text-sm group-hover:text-gray-600 transition-colors">
                        <span>EXPLORE PACKAGES</span>
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Packages */}
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
              Why Choose Our Packages
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "💰",
                title: "Cost Effective",
                description:
                  "Save significantly compared to individual treatments",
              },
              {
                icon: "🎯",
                title: "Targeted Results",
                description:
                  "Comprehensive programs designed for specific concerns",
              },
              {
                icon: "👥",
                title: "Expert Care",
                description: "Treatments by qualified medical professionals",
              },
              {
                icon: "📊",
                title: "Progress Tracking",
                description:
                  "Regular assessments to monitor your transformation",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-light text-gray-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Book a consultation to discuss which package is right for you and
              create a personalized treatment plan.
            </p>
            <Button
              onClick={() => setBookingOpen(true)}
              className="relative !px-12 !py-6 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide hover:bg-gray-700 transition-colors"
            >
              <span>SCHEDULE CONSULTATION</span>
              <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
            </Button>
          </motion.div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
