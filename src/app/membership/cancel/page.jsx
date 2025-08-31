"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle, ArrowLeft, RefreshCw, Home, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function MembershipCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Membership <span className="text-red-600">Cancelled</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your membership purchase was cancelled. No payment has been processed.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* What Happened */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 border-2 border-red-200 bg-white">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                What Happened?
              </h2>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  You chose to cancel your membership purchase during the checkout process. 
                  This is completely normal and happens for various reasons.
                </p>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-900 mb-2">No charges applied</h3>
                  <p className="text-red-700 text-sm">
                    Your payment method has not been charged, and no membership has been activated.
                  </p>
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
            <Card className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-orange-600" />
                What Can You Do?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Try Again</h4>
                    <p className="text-gray-600 text-sm">Go back to the membership page and select your preferred plan.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Contact Support</h4>
                    <p className="text-gray-600 text-sm">If you encountered an issue, our support team is here to help.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Browse Services</h4>
                    <p className="text-gray-600 text-sm">Explore our individual treatments and services instead.</p>
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
              onClick={() => router.push("/packages/membership")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg font-medium"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="ghost"
              onClick={() => router.push("/profile")}
              className="text-gray-600 hover:text-gray-900 px-6 py-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              View Profile
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => router.push("/contact")}
              className="text-gray-600 hover:text-gray-900 px-6 py-2"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </motion.div>

        {/* Why Choose Membership */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center">
            <h3 className="text-xl font-semibold mb-4">Why Choose Our Membership?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-2xl mb-2">💎</div>
                <h4 className="font-medium mb-1">Premium Value</h4>
                <p className="text-gray-300">Save up to 30% compared to individual treatments</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🌟</div>
                <h4 className="font-medium mb-1">Expert Care</h4>
                <p className="text-gray-300">Access to our team of medical professionals</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-medium mb-1">Personalized Plans</h4>
                <p className="text-gray-300">Treatments tailored to your specific needs</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <Button
                onClick={() => router.push("/packages/membership")}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                View Membership Plans
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
