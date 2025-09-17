"use client";

import { useStore } from "@/store/zustand";
import { Button } from "@/components/ui/button";
import { ChevronDown, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { FaPoundSign } from "react-icons/fa";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import BeforeAfterSection from "@/components/before-after-section";
import Footer from "@/components/Footer";
import ClubMembership from "@/components/ClubMembership";
import MediaCoverage from "@/components/MediaCoverage";
import ReviewsSection from "@/components/reviews-section";
import ConsultationSection from "@/components/consultation-section";

export default function ExoNadPeelingSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const pricingSectionRef = useRef(null);
  const beforeAfterSectionRef = useRef(null);
  const { bookingOpen, setBookingOpen } = useStore();

  const cardData = [
    {
      heading: "Visible Results",
      value: "Improved skin tone and texture",
      icon: CheckCircle,
    },
    {
      heading: "Results Last",
      value: "Long-term with proper care",
      icon: Clock,
    },
    {
      heading: "No. of Sessions",
      value: "1 Treatment (can be repeated)",
      icon: CheckCircle,
    },
    {
      heading: "Procedure Time",
      value: "60-75 Minutes",
      description: "Multi-step process",
    },
    {
      heading: "Discomfort",
      value: "Mild to Moderate",
      icon: AlertTriangle,
    },
    {
      heading: "Downtime",
      value: "3-5 Days",
      icon: Clock,
    },
    {
      heading: "Side Effects",
      value: "Temporary redness, peeling, sensitivity",
      icon: AlertTriangle,
    },
    {
      heading: "Our Pricing",
      value: "£380 per session",
      icon: FaPoundSign,
    },
  ];

  const faqs = [
    {
      question: "What is EXO–NAD Skin Longevity Peeling?",
      answer:
        "EXO–NAD is a professional multi-step peel that combines synthetic exosome technology with epigenetic and cellular energy boosters to rejuvenate, protect, and enhance skin vitality.",
    },
    {
      question: "How does the treatment work?",
      answer:
        "The 3-step protocol includes: 1) Exo Peel gently exfoliates and stimulates cellular longevity, 2) pH Normalizer soothes and restores skin balance, 3) Longevity Serum delivers NAD⁺, GHK-Cu peptide, and growth factors for deep renewal.",
    },
    {
      question: "Who is a good candidate for this treatment?",
      answer:
        "Ideal for those seeking to improve skin tone and texture, reduce fine lines and wrinkles, restore elasticity and firmness, and protect DNA for long-term skin health.",
    },
    {
      question: "What is the downtime after treatment?",
      answer:
        "Expect 3-5 days of downtime with redness, peeling, and sensitivity as the skin undergoes renewal. It's important to follow aftercare instructions carefully.",
    },
    {
      question: "How often can I get this treatment?",
      answer:
        "Depending on your skin goals and condition, this treatment can be repeated every 4-6 weeks for optimal results.",
    },
    {
      question: "What makes EXO–NAD different from other peels?",
      answer:
        "This peel combines advanced synthetic exosome technology with epigenetic boosters and cellular energy enhancers for comprehensive skin rejuvenation at a cellular level.",
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
                  Advanced Skin Rejuvenation
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                EXO–NAD Skin
                <br />
                Longevity Peeling
                <br />
                Treatment
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                A revolutionary multi-step peel combining synthetic exosome
                technology with epigenetic boosters for comprehensive skin
                rejuvenation.
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

                {/* VIEW PRICES */}
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
                  src="/skin_care/EXO–NAD Skin Longevity Peeling vertical.jpg"
                  alt="EXO-NAD Skin Longevity Peeling treatment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Overview Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-[-4px_4px_0_0_rgba(0,0,0,0.1)]">
            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
              {cardData.slice(0, 4).map((card, index) => {
                const IconComponent = card.icon || CheckCircle;
                return (
                  <div key={index} className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-600 text-sm font-light">
                        {card.heading}
                      </span>
                    </div>
                    <h3 className="text-lg font-light text-gray-900 mb-1">
                      {card.value}
                    </h3>
                    {card.description && (
                      <p className="text-gray-500 text-sm font-light">
                        {card.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              {cardData.slice(4).map((card, index) => {
                const IconComponent = card.icon || CheckCircle;
                return (
                  <div key={index} className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-600 text-sm font-light">
                        {card.heading}
                      </span>
                    </div>
                    <h3 className="text-lg font-light text-gray-900">
                      {card.value}
                    </h3>
                    {card.description && (
                      <p className="text-gray-500 text-sm font-light">
                        {card.description}
                      </p>
                    )}
                    {card.heading === "Our Pricing" && (
                      <p
                        onClick={scrollToPricing}
                        className="text-gray-500 text-sm font-light underline cursor-pointer hover:text-gray-700"
                      >
                        View all
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Information Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What is EXO–NAD Skin Longevity Peeling?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              EXO–NAD is a professional multi-step peel that combines synthetic
              exosome technology with epigenetic and cellular energy boosters to
              rejuvenate, protect, and enhance skin vitality. This advanced
              treatment works at the cellular level to deliver comprehensive
              skin renewal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                What's Included:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Exo Peel</span> – Bi-phasic
                  exfoliating system
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">pH Normalizer</span> –
                  Gold-enriched solution for barrier recovery
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Longevity Serum</span> – Deeply
                  nourishes and revitalizes skin
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Key Benefits:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Improves skin tone, texture, and radiance
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Reduces fine lines and wrinkles
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Restores elasticity and firmness
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Protects DNA and telomeres for long-term skin health
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How It Works: 3-Step Protocol
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-gray-300 mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Exo Peel
              </h3>
              <p className="text-gray-600">
                Gently exfoliates and stimulates cellular longevity with
                Epitalon peptide and glycolic acid. Prepares the skin for
                optimal absorption of active ingredients.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-gray-300 mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                pH Normalizer
              </h3>
              <p className="text-gray-600">
                Soothes and restores skin balance post-peel with a gold-enriched
                solution that enhances barrier recovery and reduces redness.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-gray-300 mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Longevity Serum
              </h3>
              <p className="text-gray-600">
                Delivers NAD⁺, GHK-Cu peptide, and growth factors for deep
                renewal, DNA repair, and cellular energy support to maximize
                results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Ingredients Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Core Ingredients & Benefits
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Epitalon Peptide
                </h3>
                <p className="text-gray-600">
                  Protects DNA and supports cellular longevity
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  NAD⁺ Complex
                </h3>
                <p className="text-gray-600">
                  Boosts cellular energy and youthful skin metabolism
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  GHK-Cu Peptide
                </h3>
                <p className="text-gray-600">
                  Stimulates collagen, smooths skin, and supports tissue repair
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Biomimetic Growth Factors
                </h3>
                <p className="text-gray-600">
                  Enhance skin regeneration and fibroblast activity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={beforeAfterSectionRef} className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden bg-gray-100">
            <img
              src="/skin_care/EXO–NAD Skin Longevity Peeling Horizental.jpg"
              alt="EXO–NAD peel results"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              About EXO–NAD Peel
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Multi-step peel combining exosomes, NAD⁺, peptides and growth
              factors for deep renewal.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• 60–75 minutes procedure</li>
              <li>• 3–5 days downtime</li>
              <li>• Repeat every 4–6 weeks if needed</li>
            </ul>
          </div>
        </div>
      </section>

      <ConsultationSection />

      {/* Pricing Section */}
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
                  EXO–NAD Treatment Cost
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Our Pricing
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Our EXO–NAD Skin Longevity Peeling is performed by expert
                  practitioners who specialize in advanced skin rejuvenation
                  treatments. The pricing reflects the premium ingredients and
                  sophisticated technology used in this procedure.
                </p>
                <p>
                  If you would like to discuss this treatment or determine if
                  it's right for your skin concerns, please feel free to{" "}
                  <button className="underline hover:text-gray-900 transition-colors">
                    get in touch
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Right Pricing Cards */}
            <div className="space-y-6">
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    EXO–NAD Skin Longevity Peeling
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
                    <span className="text-gray-700">Single Session:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £380
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Course of 3 Sessions:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £1,000
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Course of 6 Sessions:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £1,900
                    </span>
                  </div>
                </div>
              </div>
            </div>
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

      <ClubMembership />
      <MediaCoverage />
    </>
  );
}
