"use client";

import { useStore } from "@/store/zustand";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import BeforeAfterSection from "@/components/before-after-section";
import ReviewsSection from "@/components/reviews-section";
import ConsultationSection from "@/components/consultation-section";
import ClubMembership from "@/components/ClubMembership";
import MediaCoverage from "@/components/MediaCoverage";

export default function VHackerTreatmentSection() {
  const [openIndex, setOpenIndex] = useState(null);
 const pricingSectionRef = useRef(null);
   const beforeAfterSectionRef = useRef(null);  const { bookingOpen, setBookingOpen } = useStore();

  const cardData = [
    {
      heading: "Visible Results",
      value: "Firms, hydrates and brightens skin",
    },
    {
      heading: "Results Last",
      value: "Long-term cellular improvement",
    },
    {
      heading: "Recommended Sessions",
      value: "3+ for optimal results",
    },
    {
      heading: "Procedure Time",
      value: "30-45 Minutes",
    },
    {
      heading: "Discomfort",
      value: "Minimal",
    },
    {
      heading: "Downtime",
      value: "Minimal",
    },
    {
      heading: "Technology",
      value: "Exosomal delivery for deep absorption",
    },
    {
      heading: "Our Pricing",
      value: "From £300",
      description: "View all",
    },
  ];

  const faqs = [
    {
      question: "What is V-Hacker?",
      answer:
        "V-Hacker is an advanced biohacking treatment that works at the cellular level to boost skin health, longevity, and vitality using a powerful blend of peptides, growth factors, and exosomal delivery technology.",
    },
    {
      question: "How does V-Hacker work?",
      answer:
        "Like a hacker optimizes a system, V-Hacker 'biohacks' your skin cells with advanced peptides, growth factors, and exosomal delivery for deep rejuvenation. It works at the cellular level to enhance DNA protection, improve blood flow, boost energy production, and stimulate collagen and elasticity.",
    },
    {
      question: "What are the key ingredients in V-Hacker?",
      answer:
        "V-Hacker contains Epithalon for DNA protection, GHK-Cu for improved blood flow, NAD+ for energy and DNA repair, exosomal delivery technology for deeper absorption, various peptides and growth factors (EGF, IGF, VEGF, FGF) for skin regeneration, Hyaluronic Acid for hydration, and Buffered Succinate for skin energy balance.",
    },
    {
      question: "How many sessions are recommended?",
      answer:
        "We recommend a course of 3 sessions for optimal results, with maintenance treatments as needed based on your skin goals and response to the treatment.",
    },
    {
      question: "Is there any downtime after treatment?",
      answer:
        "There is minimal downtime. Some patients may experience temporary redness or slight swelling that typically resolves within a few hours.",
    },
    {
      question: "Who is a good candidate for V-Hacker?",
      answer:
        "V-Hacker is ideal for anyone looking to address signs of aging, improve skin vitality, reduce oxidative stress, and achieve overall skin rejuvenation at the cellular level.",
    },
  ];

  // Function to scroll to pricing section
  const scrollToPricing = () => {
    if (pricingSectionRef.current) {
      pricingSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

const scrollToBeforeAfter = () => {
    if (beforeAfterSectionRef.current) {
      beforeAfterSectionRef.current.scrollIntoView({
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
                  Advanced Biohacking Treatment
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                V-Hacker:
                <br />
                Cellular-Level Skin
                <br />
                Rejuvenation
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Biohack your skin's health with our advanced peptide and growth factor treatment that works at the cellular level for lasting vitality and rejuvenation.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-center md:justify-start gap-4 flex-wrap">
                {/* VIEW RESULTS */}
                <button 
                  onClick={scrollToBeforeAfter}
                  className="relative px-8 py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-lg tracking-wider"
                >
                  VIEW RESULTS
                  <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>

                {/* VIEW PRICES - Updated to call scrollToPricing */}
                <button
                  onClick={scrollToPricing}
                  className="relative px-8 py-4 text-sm font-bold uppercase text-[#272728] bg-white border-2 border-[#272728] rounded-lg tracking-wider hover:bg-[#272728] hover:text-white transition-colors"
                >
                  VIEW PRICES
                  <span className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex items-center justify-center">
              <div className="rounded-3xl overflow-hidden bg-gray-200 aspect-[4/5] w-full max-w-lg">
                <img
                  src="/images/vhacker-treatment.png"
                  alt="V-Hacker advanced biohacking treatment"
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

      {/* Key Benefits Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-[-4px_4px_0_0_rgba(0,0,0,0.1)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {cardData.map((card, index) => (
                <div key={index} className="text-center md:text-left">
                  <h3 className="text-lg font-light text-gray-900 mb-1">
                    {card.value}
                  </h3>
                  <span className="text-gray-600 text-sm font-light">
                    {card.heading}
                  </span>
                  {card.description && (
                    <p 
                      onClick={scrollToPricing}
                      className="text-gray-500 text-sm font-light underline cursor-pointer hover:text-gray-700 mt-1"
                    >
                      {card.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Information Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What is V-Hacker Biohacking Treatment?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              V-Hacker is an advanced biohacking treatment that works at the cellular level to boost skin health, longevity, and vitality. Using a powerful combination of peptides, growth factors, and exosomal delivery technology, it optimizes your skin's function for lasting rejuvenation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Key Ingredients:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Epithalon:</span> Protects DNA and supports cell lifespan
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">GHK-Cu (Copper Peptide):</span> Improves blood flow and skin vitality
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">NAD+:</span> Boosts energy, DNA repair, and skin elasticity
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Exosomal delivery tech:</span> Ensures deeper absorption
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Peptides & Growth Factors:</span> EGF, IGF, VEGF, FGF for skin regeneration
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Hyaluronic Acid:</span> Hydrates and plumps
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Buffered Succinate:</span> Balances skin energy
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Benefits:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Firms, hydrates, and brightens skin
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Reduces signs of aging and oxidative stress
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Stimulates collagen and elasticity
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Smooths and revitalizes skin
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Works at cellular level for long-term improvements
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Minimal downtime with natural-looking results
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    <div ref={beforeAfterSectionRef}>
        <BeforeAfterSection />
      </div>
      <ReviewsSection />
      <ConsultationSection />

      {/* Pricing Section with ref */}
      <section
        ref={pricingSectionRef}
        className="py-12 md:py-20 px-4"
        style={{ backgroundColor: "#f6f6f6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-gray-600 font-medium">
                  V-Hacker Treatment Cost
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Our Pricing
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  V-Hacker is an advanced biohacking treatment that uses cutting-edge technology
                  including exosomal delivery for optimal results. Our pricing reflects the premium
                  ingredients and expertise required for this innovative treatment.
                </p>
                <p>
                  We recommend a course of 3 sessions for optimal cellular-level results. 
                  If you would like to discuss this treatment, please feel free to{" "}
                  <button className="underline hover:text-gray-900 transition-colors">
                    get in touch
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Right Pricing Cards */}
            <div className="space-y-6">
              {/* Package Pricing */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    V-Hacker Biohacking Treatment
                  </h3>
                  <button
                    className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition rounded-lg"
                    onClick={() => setBookingOpen(true)}
                  >
                    BOOK
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">1 Session:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £300
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">2 Sessions:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £500
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">3 Sessions:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £700
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <ClubMembership />
      <MediaCoverage />
    </>
  );
}