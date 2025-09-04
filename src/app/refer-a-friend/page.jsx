"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Share2,
  Gift,
  Users,
  Check,
  ChevronDown,
  LoaderCircle,
  Building2,
  Star,
} from "lucide-react";
import { useAuth } from "@/store/FirebaseAuthProvider";
import { useRouter } from "next/navigation";

export default function ReferAFriendPage() {
  const [expandedFaq, setExpandedFaq] = useState({});
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const toggleFaq = (index) => {
    setExpandedFaq((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleContactRedirect = () => {
    router.push("/contact");
  };

  const handleIndividualReferralRedirect = () => {
    router.push("/referportal");
  };

  const faqs = [
    {
      question: "What types of referral programs do you offer?",
      answer:
        "We offer three types of referral programs: Individual Referrals for personal users, B2B Partnerships for businesses, and Influencer Programs for content creators.",
    },
    {
      question: "How do I get started with a referral program?",
      answer:
        "For individual referrals, create an account and visit your referral portal. For B2B partnerships and influencer programs, contact us directly to discuss custom arrangements.",
    },
    {
      question: "What are the benefits of each program?",
      answer:
        "Individual referrals earn 10% of treatment costs. B2B partnerships include custom terms and bulk discounts. Influencer programs offer collaboration packages and content creation support.",
    },
    {
      question: "Who can participate in these programs?",
      answer:
        "Anyone can join our individual referral program. B2B partnerships are for businesses wanting to offer benefits to their clients. Influencer programs are for content creators with engaged audiences.",
    },
    {
      question: "How do I track my referral performance?",
      answer:
        "Individual referrals can be tracked through your personal referral portal. B2B and influencer partners receive dedicated account management and custom reporting.",
    },
  ];

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="w-8 h-8 animate-spin text-gray-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
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

                <Button
                  onClick={handleIndividualReferralRedirect}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white mb-4"
                >
                  Start Referring
                </Button>

                <div className="bg-green-50 px-3 py-1 rounded-full text-sm font-medium text-green-800 inline-block">
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

      {/* How It Works - General Overview */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              How Our Programs Work
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Simple steps to start earning rewards through our referral programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Users,
                title: "Choose Your Program",
                description:
                  "Select the referral program that best fits your profile - individual, business, or influencer.",
              },
              {
                step: "2",
                icon: Share2,
                title: "Start Referring",
                description:
                  "Share your unique link or work with our team to set up custom partnership terms.",
              },
              {
                step: "3",
                icon: Gift,
                title: "Earn Rewards",
                description:
                  "Receive rewards when your referrals complete treatments. Individual referrals earn 10% of treatment costs.",
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
    </div>
  );
}
