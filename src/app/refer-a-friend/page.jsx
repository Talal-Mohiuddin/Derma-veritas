"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Share2,
  Gift,
  Users,
  TrendingUp,
  Copy,
  Check,
  Shield,
  Eye,
  DollarSign,
  ChevronDown,
  LoaderCircle,
} from "lucide-react";
import { useAuth } from "@/store/FirebaseAuthProvider";
import { useUserReferralData } from "@/hooks/useUser";
import { toast } from "sonner";
import RouteProtection from "@/components/RouteProtection";

export default function ReferAFriendPage() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState({});
  const { user, loading: authLoading } = useAuth();

  const {
    data: referralData,
    isLoading: referralLoading,
    error: referralError,
  } = useUserReferralData(user?.uid);

  const copyToClipboard = () => {
    if (referralData?.referralLink) {
      navigator.clipboard.writeText(referralData.referralLink);
      setCopiedLink(true);
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqs = [
    {
      question: "How do I get paid for referrals?",
      answer:
        "Once your referred client completes their first treatment, your reward will be processed within 7-14 business days. You can track all pending and completed referrals in your dashboard.",
    },
    {
      question: "Is there a limit to how many people I can refer?",
      answer:
        "No! There's no limit to the number of referrals you can make. The more you refer, the more you earn.",
    },
    {
      question: "What happens if someone books but doesn't show up?",
      answer:
        "Rewards are only paid after the referred client completes their treatment. Cancelled or no-show appointments don't qualify for rewards.",
    },
    {
      question: "Can I refer family members?",
      answer:
        "Yes, you can refer family members as long as they are new clients who haven't visited our clinic before.",
    },
    {
      question: "How long is my referral link valid?",
      answer:
        "Your referral link never expires! You can continue using the same link indefinitely.",
    },
  ];

  // Show loading state
  if (authLoading || referralLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="w-8 h-8 animate-spin text-orange-600" />
          <p className="text-gray-600">Loading your referral data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (referralError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Referral Data
          </h2>
          <p className="text-gray-600 mb-4">{referralError.message}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <RouteProtection allowedRoles={["user", "admin"]}>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-orange-100 p-4 rounded-full">
                <Share2 className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Refer Friends,
              <br />
              <span className="text-orange-600">Earn Rewards</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Share the beauty and wellness experience you love. Earn rewards
              for every successful referral while helping your friends discover
              our premium aesthetic treatments.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700 font-medium">£50 For You</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 font-medium">
                  £25 For Your Friend
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 font-medium">
                  Unlimited Referrals
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                It's simple! Share your unique link, your friends book
                treatments, and you both get rewarded.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  icon: Share2,
                  title: "Share Your Link",
                  description:
                    "Use your unique referral link to invite friends and family to experience our premium treatments.",
                },
                {
                  step: "2",
                  icon: Users,
                  title: "Friend Books Treatment",
                  description:
                    "When your friend books their first consultation using your link, they get £25 off their treatment.",
                },
                {
                  step: "3",
                  icon: Gift,
                  title: "You Get Rewarded",
                  description:
                    "After your friend completes their treatment, you receive £50 as a thank you for the referral.",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="p-8 text-center border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="relative mb-6">
                    <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-gray-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Your Referral Link */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Your Referral Link
              </h2>
              <p className="text-gray-600 text-lg">
                Share this link with friends to start earning rewards
              </p>
            </div>

            <Card className="p-8 bg-white border-gray-200">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Referral Code
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 px-4 py-3 rounded-lg font-mono text-lg flex-1 text-center">
                      {referralData?.referralCode || "Loading..."}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Unique Link
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={referralData?.referralLink || ""}
                      readOnly
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-mono text-sm"
                    />
                    <Button
                      onClick={copyToClipboard}
                      className="px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white"
                      disabled={!referralData?.referralLink}
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Share this link on social media, send
                    it via WhatsApp, or email it to friends. The more you share,
                    the more you earn!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Why Join Our Referral Program?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: DollarSign,
                  title: "Earn Money",
                  description:
                    "£50 for every completed referral - no limits on earnings",
                },
                {
                  icon: Users,
                  title: "Help Friends",
                  description: "Your friends save £25 on their first treatment",
                },
                {
                  icon: Shield,
                  title: "Fraud Protection",
                  description:
                    "Secure system prevents invalid or fake referrals",
                },
                {
                  icon: Eye,
                  title: "Full Transparency",
                  description:
                    "Track all your referrals and earnings in real-time",
                },
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tracking Dashboard Preview */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Track Your Success
              </h2>
              <p className="text-gray-600 text-lg">
                Monitor your referrals and earnings with our transparent
                dashboard
              </p>
            </div>

            <Card className="p-8 bg-white border-gray-200">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    12
                  </div>
                  <div className="text-gray-600">Total Referrals</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
                  <div className="text-gray-600">Completed</div>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    £400
                  </div>
                  <div className="text-gray-600">Total Earned</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Referrals
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Sarah Johnson",
                      status: "Completed",
                      date: "Dec 15, 2024",
                      amount: "£50",
                    },
                    {
                      name: "Mike Chen",
                      status: "Pending",
                      date: "Dec 12, 2024",
                      amount: "£50",
                    },
                    {
                      name: "Emma Wilson",
                      status: "Booked",
                      date: "Dec 10, 2024",
                      amount: "£50",
                    },
                  ].map((referral, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {referral.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {referral.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            referral.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : referral.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {referral.status}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {referral.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-gray-200">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedFaq[index] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq[index] && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-orange-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who are earning rewards by
              sharing their positive experiences.
            </p>
            <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium">
              START REFERRING TODAY
            </Button>
          </div>
        </section>
      </div>
    </RouteProtection>
  );
}
