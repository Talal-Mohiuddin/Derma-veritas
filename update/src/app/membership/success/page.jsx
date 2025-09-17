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
      upfront: "£300",
      tier: "Entry Tier"
    },
    "Veritas Sculpt": {
      color: "from-blue-500 to-blue-600",
      icon: "💎",
      monthlyPrice: "£160",
      upfront: "£350",
      tier: "Mid Tier"
    },
    "Veritas Prestige": {
      color: "from-purple-500 to-purple-600",
      icon: "👑",
      monthlyPrice: "£299",
      upfront: "£500",
      tier: "Luxury Tier"
    }
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
            Your membership has been successfully activated! You're now part of our exclusive community.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Plan Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 border-2 border-green-200 bg-white">
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${currentPlan.color} text-white text-2xl mb-4`}>
                  {currentPlan.icon}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {planName}
                </h2>
                <p className="text-gray-600 text-sm uppercase tracking-wide">
                  {currentPlan.tier}
                </p>
              </div>

              <div className="space-y-4 text-center">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Monthly Rate</span>
                  <span className="font-semibold text-gray-900">{currentPlan.monthlyPrice}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Upfront Payment</span>
                  <span className="font-semibold text-gray-900">{currentPlan.upfront}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Crown className="w-5 h-5 text-blue-600" />
                What's Next?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Complete Your Profile</h4>
                    <p className="text-gray-600 text-sm">Update your profile information to get personalized recommendations.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Book Your First Treatment</h4>
                    <p className="text-gray-600 text-sm">Schedule your initial consultation and first treatment session.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Enjoy Member Benefits</h4>
                    <p className="text-gray-600 text-sm">Access exclusive discounts, priority booking, and VIP events.</p>
                  </div>
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
            You'll receive a confirmation email shortly with your membership details and next steps.
          </p>
        </motion.div>

        {/* Membership Benefits Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center">
            <h3 className="text-xl font-semibold mb-4">Your Membership Benefits</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-medium mb-1">Priority Access</h4>
                <p className="text-gray-300">Skip the wait with exclusive booking priority</p>
              </div>
              <div>
                <div className="text-2xl mb-2">💰</div>
                <h4 className="font-medium mb-1">Exclusive Savings</h4>
                <p className="text-gray-300">Up to 20% off all treatments and products</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🎉</div>
                <h4 className="font-medium mb-1">VIP Events</h4>
                <p className="text-gray-300">Invitations to exclusive member events</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function MembershipSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your membership details...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
