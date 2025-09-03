"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Share2,
  Gift,
  Users,
  Copy,
  Check,
  ChevronDown,
  LoaderCircle,
  Building2,
  Star,
} from "lucide-react";
import { useAuth } from "@/store/FirebaseAuthProvider";
import { useUserReferralData } from "@/hooks/useUser";
import { toast } from "sonner";
import RouteProtection from "@/components/RouteProtection";
import { useRouter } from "next/navigation";

export default function ReferAFriendPage() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState({});
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

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

  const handleContactRedirect = () => {
    router.push("/contact");
  };

  const faqs = [
    {
      question: "How do I get my referral rewards?",
      answer:
        "Once your referred client creates an account and completes their first treatment, you will receive 10% of the treatment cost as a reward. For example, if the treatment costs $100, you earn $10.",
    },
    {
      question: "When do I receive my referral earnings?",
      answer:
        "Your referral earnings are processed after your referred client completes their treatment and payment. Earnings are typically available within 24-48 hours after treatment completion.",
    },
    {
      question: "Is there a limit to how many people I can refer?",
      answer:
        "No! There's no limit to the number of referrals you can make. The more you refer, the more you can earn.",
    },
    {
      question: "What happens if someone books but doesn't show up?",
      answer:
        "Referral rewards are only awarded after the referred client completes their treatment and payment. Cancelled or no-show appointments don't qualify for referral rewards.",
    },
    {
      question: "Can I refer family members?",
      answer:
        "Yes, you can refer family members as long as they are new clients who haven't visited our clinic before and create a new account.",
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
          <LoaderCircle className="w-8 h-8 animate-spin text-gray-600" />
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
              <div className="bg-gray-100 p-4 rounded-full">
                <Share2 className="w-8 h-8 text-gray-600" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Referral
              <br />
              <span className="text-black">Programs</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Choose the referral program that best suits your needs. Earn cash
              rewards for every successful referral - 10% of each treatment cost
              goes directly to you!
            </p>
          </div>
        </section>

        {/* Three Categories */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Choose Your Program
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Select the referral program that matches your profile and start
                earning rewards today.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Individual Referral Program */}
              <Card className="p-8 border-gray-200 hover:shadow-lg transition-shadow relative">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Individual Referrals
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Perfect for individuals who want to share their positive
                    experience and earn rewards.
                  </p>

                  <div className="space-y-3 mb-8 text-left">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">
                        Earn 10% of treatment cost
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">
                        Special offer for your friend
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Unlimited referrals</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">
                        Easy tracking dashboard
                      </span>
                    </div>
                  </div>

                  <div className="bg-green-50 px-3 py-1 rounded-full text-sm font-medium text-green-800 mb-6 inline-block">
                    Available Now
                  </div>
                </div>
              </Card>

              {/* B2B Partnership */}
              <Card className="p-8 border-gray-200 hover:shadow-lg transition-shadow relative">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    B2B Partnerships
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    For businesses looking to partner with us and offer
                    exclusive benefits to their clients.
                  </p>

                  <div className="space-y-3 mb-8 text-left">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">
                        Custom partnership terms
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">
                        Bulk discount programs
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">
                        Co-marketing opportunities
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">
                        Dedicated account manager
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleContactRedirect}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white"
                  >
                    Contact Us
                  </Button>
                </div>
              </Card>

              {/* Influencer Program */}
              <Card className="p-8 border-gray-200 hover:shadow-lg transition-shadow relative">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Star className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Influencer Program
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    For content creators and influencers who want to collaborate
                    and create authentic content.
                  </p>

                  <div className="space-y-3 mb-8 text-left">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">
                        Custom collaboration packages
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">
                        Content creation support
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">
                        Performance-based rewards
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">
                        Exclusive treatment access
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleContactRedirect}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white"
                  >
                    Contact Us
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Individual Program Details (Only shown for regular users) */}
        {user && (
          <>
            {/* How It Works */}
            <section className="py-20 px-4 bg-gray-50">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                    How Individual Referrals Work
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    It's simple! Share your unique link, your friends book
                    treatments, and you earn 10% of their treatment cost.
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
                      title: "Friend Creates Account & Books",
                      description:
                        "When your friend creates a new account using your link and books their first treatment, they get a special welcome offer.",
                    },
                    {
                      step: "3",
                      icon: Gift,
                      title: "You Earn Cash Rewards",
                      description:
                        "After your friend completes their treatment, you receive 10% of the treatment cost as a cash reward. $100 treatment = $10 for you!",
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
                        <div className="absolute -top-2 -right-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
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
            <section className="py-20 px-4 bg-white">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                    Your Referral Link
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Share this link with friends to start earning cash rewards
                  </p>
                </div>

                <Card className="p-8 bg-white border-gray-200">
                  {/* ...existing code for referral link section... */}
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
                        <strong>Tip:</strong> Share this link on social media,
                        send it via WhatsApp, or email it to friends. You earn
                        10% of every treatment cost when they complete their
                        booking!
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </section>
          </>
        )}

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gray-50">
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
      </div>
    </RouteProtection>
  );
}
