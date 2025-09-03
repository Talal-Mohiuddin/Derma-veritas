"use client";

import { BookingModal } from "@/components/booking-modal";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/zustand";
import { useCreateMembershipCheckout } from "@/hooks/useUser";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/store/FirebaseAuthProvider";

export default function ClubMembershipPage() {
  const { setBookingOpen } = useStore();
  const { user } = useAuth();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const createCheckout = useCreateMembershipCheckout();

  const handlePlanSelection = async (planName) => {
    if (!user?.uid) {
      toast.error("Please log in to select a membership plan");
      router.push("/login");
      return;
    }

    setLoadingPlan(planName);

    try {
      const result = await createCheckout.mutateAsync({
        planName,
        userId: user.uid,
        successUrl: `${window.location.origin}/membership/success?plan=${encodeURIComponent(planName)}`,
        cancelUrl: `${window.location.origin}/membership/cancel`,
      });

      // Redirect to Stripe checkout
      window.location.href = result.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error(error.message || "Failed to create checkout session");
      setLoadingPlan(null);
    }
  };

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
              <span className="text-black">Elite</span>{" "}
              <span className="text-gray-400">Membership</span>
            </h1>

            <p className="text-gray-600 text-xl leading-relaxed text-center max-w-4xl mb-12">
              Join our exclusive membership program and experience the ultimate
              in aesthetic care with monthly treatments, premium benefits, and
              significant savings.
            </p>

            <Button
              onClick={() => setBookingOpen(true)}
              className="relative !px-12 !py-6 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide hover:bg-gray-700 transition-colors"
            >
              <span>JOIN TODAY</span>
              <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
            </Button>
          </div>
        </div>
      </div>

      {/* Membership Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
          <div className="text-sm text-gray-500 mb-6 tracking-wide uppercase">
            Exclusive Benefits
          </div>

          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-8 leading-tight">
            Transform Your Skin with Monthly Luxury
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our Elite Membership Program offers you the opportunity to maintain
            optimal skin health and aesthetic enhancement through carefully
            curated monthly treatments. Each tier is designed to provide
            comprehensive care while delivering exceptional value.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            From advanced facial treatments to cutting-edge injectables, our
            membership ensures you receive the highest quality care from our
            team of medical professionals, with exclusive discounts and priority
            access to new treatments.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-100 to-gray-50 px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">DV</span>
            </div>
            <div>
              <span className="text-3xl font-light text-black">Elite</span>
              <br />
              <span className="text-3xl font-light text-gray-400">
                Membership
              </span>
            </div>
          </div>

          <h3 className="text-2xl lg:text-3xl font-light text-gray-800 mb-8 leading-tight">
            Exclusive Member Benefits Include:
          </h3>

          <ul className="space-y-5 text-gray-700">
            {[
              "Priority booking and concierge service",
              "Up to 20% savings on all treatments",
              "Complimentary skin analysis and progress tracking",
              "VIP event invitations and early access to new treatments",
              "Flexible treatment banking and gifting options",
              "Personalized treatment plans and expert consultations",
            ].map((benefit, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Membership Tiers */}
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
              Choose Your Membership Tier
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Select the membership level that best fits your aesthetic goals
              and lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Veritas Glow */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-6 text-center">
                <h3 className="text-2xl font-light text-gray-800 mb-2">
                  Veritas Glow
                </h3>
                <p className="text-gray-600 text-sm uppercase tracking-wide">
                  Entry Tier
                </p>
              </div>

              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="text-3xl font-light text-gray-800 mb-2">
                    £80<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Billed monthly</div>
                </div>

                <ul className="space-y-4 text-gray-700 mb-8">
                  {[
                    "1× ProFusion HydraFacial monthly",
                    "3× RF Microneedling areas (first 3 sessions)",
                    "1× PRP Hair/Face (alternate months)",
                    "10% off injectables & skincare",
                    "Priority booking access",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelection("Veritas Glow")}
                  disabled={loadingPlan === "Veritas Glow"}
                  className="w-full bg-gray-800 text-white px-6 py-3 text-sm font-medium tracking-wider hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingPlan === "Veritas Glow"
                    ? "PROCESSING..."
                    : "SELECT GLOW TIER"}
                </button>
              </div>
            </motion.div>

            {/* Veritas Sculpt - Most Popular */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-xl overflow-hidden relative transform lg:scale-105"
            >
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2">
                <span className="text-xs font-medium uppercase tracking-wide">
                  Most Popular
                </span>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-25 p-6 text-center mt-8">
                <h3 className="text-2xl font-light text-gray-800 mb-2">
                  Veritas Sculpt
                </h3>
                <p className="text-gray-600 text-sm uppercase tracking-wide">
                  Mid Tier
                </p>
              </div>

              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="text-3xl font-light text-gray-800 mb-2">
                    £160<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Billed monthly</div>
                </div>

                <ul className="space-y-4 text-gray-700 mb-8">
                  {[
                    "3× Profhilo treatments (includes top-up)",
                    "1× Botox (3 areas every 3 months)",
                    "1× Laser Hair Removal (any area)",
                    "1× RF Microneedling or PRP Facial",
                    "15% off injectables & fillers",
                    "Quarterly facial scans",
                    "VIP event invitations",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelection("Veritas Sculpt")}
                  disabled={loadingPlan === "Veritas Sculpt"}
                  className="w-full bg-blue-600 text-white px-6 py-3 text-sm font-medium tracking-wider hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingPlan === "Veritas Sculpt"
                    ? "PROCESSING..."
                    : "SELECT SCULPT TIER"}
                </button>
              </div>
            </motion.div>

            {/* Veritas Prestige */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 text-center">
                <h3 className="text-2xl font-light text-white mb-2">
                  Veritas Prestige
                </h3>
                <p className="text-gray-200 text-sm uppercase tracking-wide">
                  Luxury Tier
                </p>
              </div>

              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="text-3xl font-light text-gray-800 mb-2">
                    £299<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Billed monthly</div>
                </div>

                <ul className="space-y-4 text-gray-700 mb-8">
                  {[
                    "Endolift (discounted annually)",
                    "3× CO₂ Laser sessions",
                    "Quarterly Exosome therapy",
                    "20% off fillers & Botox",
                    "RF Microneedling included",
                    "Complete hair care treatments",
                    "Monthly product gifts",
                    "Annual skin health report",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelection("Veritas Prestige")}
                  disabled={loadingPlan === "Veritas Prestige"}
                  className="w-full bg-gray-800 text-white px-6 py-3 text-sm font-medium tracking-wider hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingPlan === "Veritas Prestige"
                    ? "PROCESSING..."
                    : "SELECT PRESTIGE TIER"}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Membership Terms */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-12 lg:mt-16 bg-white rounded-lg p-6 lg:p-8 shadow-md"
          >
            <h3 className="text-2xl font-light text-gray-800 mb-8 text-center">
              Membership Terms & Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Flexible Commitment",
                  description:
                    "3-month minimum with monthly rolling thereafter",
                },
                {
                  title: "Session Banking",
                  description:
                    "Unused treatments can be saved for up to 3 months",
                },
                {
                  title: "Priority Access",
                  description:
                    "Book appointments online or via personal concierge",
                },
                {
                  title: "Gift Options",
                  description:
                    "Share unused sessions with friends twice yearly",
                },
              ].map((term, index) => (
                <div key={index} className="text-center">
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    {term.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{term.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Doctor Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-8 leading-tight">
            Experience Excellence Every Month
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our membership program ensures consistent, professional care that
            delivers lasting results. With regular treatments, progress
            monitoring, and exclusive member benefits, you'll achieve your
            aesthetic goals while enjoying significant savings.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            Join thousands of satisfied members who trust Derma Veritas for
            their ongoing aesthetic care. Experience the difference of premium
            treatments, expert guidance, and personalized attention every month.
          </p>

          <Button
            onClick={() => setBookingOpen(true)}
            className="relative !px-8 !py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide hover:bg-gray-700 transition-colors w-fit"
          >
            <span>START YOUR MEMBERSHIP</span>
            <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
          </Button>
        </div>

        <div className="bg-gray-50 relative flex items-center justify-center min-h-[400px] lg:min-h-[70vh]">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto mb-4"></div>
                <div className="text-gray-600">Professional Care Image</div>
              </div>
            </div>
            <div className="absolute top-6 right-6 bg-white bg-opacity-95 px-6 py-4 rounded-lg shadow-lg">
              <div className="text-lg font-light text-gray-800">Dr. Expert</div>
              <div className="text-sm text-gray-600">Medical Director</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
