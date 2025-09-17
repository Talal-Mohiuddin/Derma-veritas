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
      title: "ProFusion",
      description:
        "Ultimate skin rejuvenation using state-of-the-art ProFusion devices",
      image: "/pacakage/Pro-Fusion.jpg", // Fixed path to match your actual file
      href: "/packages/profusion",
      treatments: "4 Treatment Options",
      duration: "40-75 minutes",
      priceRange: "£150",
    },
    {
      title: "Lift & Reshape",
      description:
        "Comprehensive treatment programs designed for specific skin concerns",
      image: "/pacakage/Lift & Reshape.jpg", // Fixed path to match your actual file
      href: "/packages/liftreshape",
      treatments: "4 Complete Programs",
      duration: "8-18 weeks",
      priceRange: "£1,100",
    },
    {
      title: "Correct & Rejuvenate",
      description:
        "Exclusive membership tiers with ongoing treatments and benefits",
      image: "/pacakage/Correct & Rejuvenate.jpg", // Fixed path to match your actual file
      href: "/packages/correctrejuvenate",
      treatments: "3 Membership Tiers",
      duration: "Monthly Plans",
      priceRange: "£80",
    },
    {
      title: "Restore & Prevent Hair Loss",
      description:
        "Comprehensive hair restoration program for thinning, shedding, or early hair loss",
      image: "/pacakage/Hair Restoration.jpg", // Fixed path to match your actual file
      href: "/packages/restoreprevent",
      treatments: "17 Treatment Sessions",
      duration: "16-18 weeks",
      priceRange: "£2,500",
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
            {/* Logo Container with reduced bottom margin */}
            <div className="flex justify-center mb-8">
              {" "}
              {/* Reduced from mb-12 to mb-8 */}
              <div className="w-28 h-28  flex items-center justify-center">
                <img
                  src="/logo_black.png"
                  alt="Derma Veritas Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-light text-center mb-6">
              <span className="text-black">Treatment</span>{" "}
              <span className="text-gray-400">Packages</span>
            </h1>

            <p className="text-gray-600 text-xl leading-relaxed text-center max-w-4xl mx-auto mb-12">
              Discover our comprehensive treatment packages designed to address
              your unique skin concerns and aesthetic goals with the latest in
              medicDerma Veritas technology.
            </p>
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

          <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
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
                      {/* Replace placeholder with actual image */}
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
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
                          <span className="text-gray-500">Price From:</span>
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

      {/* Custom Package Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
              Every skin is unique, and so are your goals. Let us create a
              personalized treatment package tailored specifically to your
              needs, concerns, and lifestyle.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-light text-gray-800 mb-4">
                Design Your Custom Package
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Tell us about your skin concerns, aesthetic goals, and
                preferences. Our experts will design a bespoke treatment plan
                combining the best of our services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">Your Goals</h4>
                <p className="text-sm text-gray-600">
                  Share your specific skin concerns and desired outcomes
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Your Schedule
                </h4>
                <p className="text-sm text-gray-600">
                  Tell us about your availability and preferred timeline
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gray-600 text-lg font-semibold">£</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">Your Budget</h4>
                <p className="text-sm text-gray-600">
                  We'll work within your investment range to maximize results
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => setBookingOpen(true)}
                className="relative !px-12 !py-6 text-sm font-bold uppercase text-white bg-[#272728] tracking-wide hover:bg-gray-700 transition-colors rounded-lg"
              >
                <span>CREATE MY CUSTOM PACKAGE</span>
                <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Free consultation • No obligation • Personalized recommendations
              </p>
            </div>
          </motion.div>
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
                icon: (
                  <svg
                    className="w-10 h-10 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                ),
                title: "Cost Effective",
                description:
                  "Save significantly compared to individual treatments",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Targeted Results",
                description:
                  "Comprehensive programs designed for specific concerns",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Expert Care",
                description: "Treatments by qualified medical professionals",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
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
                <div className="flex justify-center mb-4">{benefit.icon}</div>
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