"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useStore } from "@/store/zustand";
import { Star, CheckCircle, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

export default function ProFusionHydraFacialPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const pricingSectionRef = useRef(null);
  const { setBookingOpen } = useStore();

  const treatmentDetails = [
    {
      name: "Signature + RF",
      duration: "40 min",
      price: "£150",
      packagePrice: "£750 for 6 sessions",
      description: "Cleanse, exfoliate, extraction, hydration + RF tightening",
      benefits: [
        "Deep cleansing and exfoliation",
        "Gentle extraction of impurities",
        "Hydration infusion",
        "RF tightening for firmer skin",
      ],
    },
    {
      name: "Deluxe + RF",
      duration: "50 min",
      price: "£180",
      packagePrice: "£900 for 6 sessions",
      description: "Signature + custom booster serum + LED therapy + RF",
      benefits: [
        "All Signature treatment benefits",
        "Custom booster serum for specific concerns",
        "LED light therapy for skin rejuvenation",
        "Enhanced RF technology",
      ],
    },
    {
      name: "Platinum + RF",
      duration: "70 min",
      price: "£210",
      packagePrice: "£1,050 for 6 sessions",
      description: "Deluxe + lymphatic drainage + advanced RF lifting",
      benefits: [
        "All Deluxe treatment benefits",
        "Lymphatic drainage massage",
        "Advanced RF lifting technology",
        "Comprehensive skin rejuvenation",
      ],
    },
    {
      name: "Elite – Cellular Repair & Lift",
      duration: "75 min",
      price: "£250",
      packagePrice: "£1,250 for 6 sessions",
      description: "Platinum + enhanced serums + deep RF collagen stimulation",
      benefits: [
        "All Platinum treatment benefits",
        "Enhanced specialized serums",
        "Deep RF collagen stimulation",
        "Cellular repair and lifting",
      ],
    },
  ];

  const faqs = [
    {
      question: "What is ProFusion HydraFacial?",
      answer:
        "ProFusion HydraFacial is an advanced skin rejuvenation treatment using state-of-the-art devices that combine cutting-edge technology with clinical expertise. It uses specialized serums, creams, and boosters to target unique skin concerns with remarkable results.",
    },
    {
      question: "How often should I get a ProFusion HydraFacial?",
      answer:
        "For optimal results, we recommend starting with a series of treatments spaced 4-6 weeks apart. Many clients then transition to maintenance treatments every 8-12 weeks depending on their skin goals and concerns.",
    },
    {
      question: "Is there any downtime after the treatment?",
      answer:
        "There is minimal to no downtime with ProFusion HydraFacial. You may experience slight redness immediately after the treatment, but this typically subsides within a few hours. You can resume normal activities immediately after your session.",
    },
    {
      question: "Who is a good candidate for ProFusion HydraFacial?",
      answer:
        "Almost anyone can benefit from ProFusion HydraFacial treatments. They are suitable for all skin types and address various concerns including fine lines, wrinkles, hyperpigmentation, congested pores, oily skin, and dull complexion.",
    },
    {
      question: "Can I combine ProFusion HydraFacial with other treatments?",
      answer:
        "Yes, ProFusion HydraFacial can be effectively combined with other treatments for enhanced results. Our experts will create a customized treatment plan based on your skin goals during your consultation.",
    },
  ];

  const scrollToPricing = () => {
    if (pricingSectionRef.current) {
      pricingSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Content */}
            <div className="text-center md:text-left flex flex-col justify-center">
              {/* Small Label with Line */}
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="w-12 h-px bg-gray-400"></div>
                <span className="text-gray-600 text-sm font-medium tracking-wide">
                  Advanced Skin Rejuvenation
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                ProFusion HydraFacial
                <br />
                Treatment Packages
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Ultimate skin rejuvenation using state-of-the-art ProFusion
                devices that combine cutting-edge technology with clinical
                expertise.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-center md:justify-start gap-4 flex-wrap">
                {/* LEARN MORE */}
                <button className="relative px-8 py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wider">
                  LEARN MORE
                  <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>

                {/* VIEW PACKAGES - Updated to call scrollToPricing */}
                <button
                  onClick={scrollToPricing}
                  className="relative px-8 py-4 text-sm font-bold uppercase text-[#272728] bg-white border-2 border-[#272728] rounded-lg tracking-wider hover:bg-[#272728] hover:text-white transition-colors"
                >
                  VIEW PACKAGES
                  <span className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex items-center justify-center">
              <div className="rounded-3xl overflow-hidden bg-gray-200 aspect-[4/5] w-full max-w-lg">
                <img
                  src="/pacakage\Pro-Fusion.jpg"
                  alt="Professional HydraFacial treatment being administered"
                  className="w-full h-full object-cover"
                />

                {/* Review Badge */}
                <div className="absolute bottom-6 right-6 bg-white rounded-full px-4 py-3 shadow-lg flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm font-medium">
                    Read Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Information Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What is ProFusion HydraFacial?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              ProFusion HydraFacial represents the pinnacle of skin rejuvenation
              technology. Our state-of-the-art devices combine cutting-edge
              technology with clinical expertise, using specialized serums,
              creams, and boosters that target your unique skin concerns for
              remarkable results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Key Benefits:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Deep cleansing and hydration
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Exfoliation and extraction without irritation
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  RF technology for skin tightening
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Customizable for specific skin concerns
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Immediate results with no downtime
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Why Choose Our ProFusion Treatment:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Latest technology with advanced RF capabilities
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Performed by certified skincare specialists
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Personalized treatment plans for your skin type
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Medical-grade products and equipment
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Luxurious experience with exceptional results
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with ref */}
      <section
        ref={pricingSectionRef}
        className="py-12 md:py-20 px-4"
        style={{ backgroundColor: "#f6f6f6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ProFusion HydraFacial Packages
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Choose from our range of specialized treatments designed to
              address various skin concerns with our advanced ProFusion
              technology.
            </p>
          </div>

          <div className="grid md:grid-cols-4  gap-6">
            {treatmentDetails.map((treatment, index) => (
              <Card
                key={index}
                className="p-8 border-gray-200 hover:shadow-lg transition-shadow relative h-full flex flex-col"
              >
                <div className="text-center flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {treatment.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {treatment.description}
                  </p>

                  <div className="space-y-3 mb-8 text-left">
                    {treatment.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Single Session:</span>
                      <span className="text-lg font-bold text-gray-900">
                        {treatment.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Package of 6:</span>
                      <span className="text-lg font-bold text-gray-900">
                        {treatment.packagePrice}
                      </span>
                    </div>
                    <div className="text-center text-sm text-gray-600 mt-2">
                      {treatment.duration}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white mt-auto"
                  onClick={() => setBookingOpen(true)}
                >
                  BOOK NOW
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center py-4 text-left text-lg font-medium text-gray-900 focus:outline-none"
              >
                {faq.question}
                <ChevronDown
                  className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-4 text-gray-600">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            className="relative px-6 py-3 text-sm font-bold uppercase text-white bg-[#272728] rounded-lg tracking-wide"
            onClick={() => (window.location = "/contact")}
          >
            ASK A QUESTION
            <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
          </button>
        </div>
      </section>
    </>
  );
}
