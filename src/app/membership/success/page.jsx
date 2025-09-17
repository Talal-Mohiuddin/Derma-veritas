"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, User, ArrowRight, Home, Crown } from "lucide-react";
import { motion } from "framer-motion";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [planName, setPlanName] = useState("");

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan) {
      setPlanName(decodeURIComponent(plan));
    }
  }, [searchParams]);

  const planDetails = {
    "Veritas Glow": {
      color: "from-gray-500 to-gray-600",
      icon: "✨",
      monthlyPrice: "£80",
      tier: "Entry Tier",
      features: [
        "1× ProFusion HydraFacial monthly",
        "3× RF Microneedling areas (first 3 sessions)",
        "1× PRP Hair/Face (alternate months)",
        "10% off injectables & skincare",
        "Priority booking access",
      ],
    },
    "Veritas Sculpt": {
      color: "from-blue-500 to-blue-600",
      icon: "💎",
      monthlyPrice: "£160",
      tier: "Mid Tier",
      features: [
        "3× Profhilo treatments (includes top-up)",
        "1× Anti-Wrinkle Treatment (3 areas every 3 months)",
        "1× Laser Hair Removal (any area)",
        "1× RF Microneedling or PRP Facial",
        "15% off injectables & fillers",
        "Quarterly facial scans",
        "VIP event invitations",
      ],
    },
    "Veritas Prestige": {
      color: "from-purple-500 to-purple-600",
      icon: "👑",
      monthlyPrice: "£299",
      tier: "Luxury Tier",
      features: [
        "Endolift (discounted annually)",
        "3× CO₂ Laser sessions",
        "Quarterly Exosome therapy",
        "20% off fillers & Anti-Wrinkle Treatment",
        "RF Microneedling included",
        "Complete hair care treatments",
        "Monthly product gifts",
        "Annual skin health report",
      ],
    },
  };

  const currentPlan = planDetails[planName] || planDetails["Veritas Glow"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Welcome to <span className="text-green-600">Elite Membership</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your membership has been successfully activated! You're now part of
            our exclusive community.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-12">
          {/* Plan Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 border-2 border-green-200 bg-white">
              <div className="text-center mb-6">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${currentPlan.color} text-white text-2xl mb-4`}
                >
                  {currentPlan.icon}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {planName}
                </h2>
                <p className="text-gray-600 text-sm uppercase tracking-wide">
                  {currentPlan.tier}
                </p>
                <div className="text-3xl font-light text-gray-800 mt-4">
                  {currentPlan.monthlyPrice}
                  <span className="text-lg text-gray-500">/month</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                    Your Membership Includes:
                  </h3>
                  <ul className="space-y-3">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center pt-4">
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    ✓ Active Membership
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/profile")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
            >
              <User className="w-5 h-5 mr-2" />
              View Profile
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg font-medium"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>

          <p className="text-sm text-gray-500 max-w-md mx-auto">
            You'll receive a confirmation email shortly with your membership
            details and next steps.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function MembershipSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your membership details...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
