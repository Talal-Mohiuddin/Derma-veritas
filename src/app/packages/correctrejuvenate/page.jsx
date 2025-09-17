"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useStore } from "@/store/zustand";
import { Star, CheckCircle, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

export default function CorrectRejuvenatePackagePage() {
  const [openIndex, setOpenIndex] = useState(null);
  const pricingSectionRef = useRef(null);
  const { setBookingOpen } = useStore();

  const treatmentDetails = [
    {
      name: "CO₂ Fractional Laser",
      sessions: "3 sessions",
      description: "Scar removal, pigmentation correction, skin resurfacing",
      benefits: [
        "Targeted scar reduction",
        "Pigmentation correction",
        "Skin texture improvement",
        "Minimal downtime with advanced technology",
      ],
    },
    {
      name: "Exosome Therapy with Microneedling",
      sessions: "3 sessions",
      description: "Post-laser healing and rejuvenation",
      benefits: [
        "Enhanced healing process",
        "Stimulates collagen production",
        "Improves skin elasticity",
        "Reduces inflammation and redness",
      ],
    },
    {
      name: "Polynucleotide Therapy",
      sessions: "3 sessions",
      description: "Deep cellular regeneration",
      benefits: [
        "Cellular repair and regeneration",
        "Improves skin density and thickness",
        "Enhances hydration at cellular level",
        "Long-lasting rejuvenation effects",
      ],
    },
    {
      name: "3 Area Neuro-Modulator Treatment",
      sessions: "Included in package",
      description: "Smooths fine lines and wrinkles",
      benefits: [
        "Reduces appearance of dynamic wrinkles",
        "Preventative aging treatment",
        "Non-surgical facial enhancement",
        "Natural-looking results",
      ],
    },
  ];

  const packageInclusions = [
    "AI-Based Facial Mapping & Progress Tracking",
    "Personalized treatment plan",
    "Post-treatment care products",
    "Dedicated skincare specialist",
    "Follow-up consultations",
  ];

  const faqs = [
    {
      question: "Who is the Correct & Rejuvenate package ideal for?",
      answer:
        "This package is perfect for those with acne scars, pigmentation issues, uneven texture, and general skin damage. It's designed for clients seeking advanced skin repair with visible transformation.",
    },
    {
      question: "How long does the complete package take?",
      answer:
        "The full package is designed to be completed over 8-12 weeks, with treatments spaced appropriately for optimal healing and results. Your specialist will create a customized timeline during your consultation.",
    },
    {
      question: "Is there any downtime with these treatments?",
      answer:
        "Some treatments like CO₂ Fractional Laser may have a few days of downtime with redness and peeling. Other treatments have minimal downtime. We'll schedule your sessions to minimize disruption to your routine.",
    },
    {
      question: "What results can I expect?",
      answer:
        "You can expect significant improvement in skin texture, reduction in scars and pigmentation, more even skin tone, and overall rejuvenation. Results are cumulative and improve over time as the treatments work synergistically.",
    },
    {
      question: "Can I purchase individual treatments instead of the package?",
      answer:
        "While we recommend the complete package for optimal results, individual treatments are available. However, the package offers better value and is specifically designed for comprehensive correction and rejuvenation.",
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
                  Advanced Skin Correction
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Correct & Rejuvenate
                <br />
                Treatment Package
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Advanced skin repair for visible transformation. Perfect for
                acne scars, pigmentation, uneven texture, and skin damage.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-center md:justify-start gap-4 flex-wrap">
                {/* VIEW PACKAGES - Updated to call scrollToPricing */}
                <button
                  onClick={scrollToPricing}
                  className="relative px-8 py-4 text-sm font-bold uppercase text-[#272728] bg-white border-2 border-[#272728] rounded-lg tracking-wider hover:bg-[#272728] hover:text-white transition-colors"
                >
                  VIEW PACKAGE DETAILS
                  <span className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex items-center justify-center">
              <div className="rounded-3xl overflow-hidden bg-gray-200 aspect-[4/5] w-full max-w-lg">
                <img
                  src="/pacakage/Correct & Rejuvenate.jpg"
                  alt="Correct and Rejuvenate skin treatment"
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
              About the Correct & Rejuvenate Package
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our Correct & Rejuvenate package combines advanced technologies to
              address stubborn skin concerns like acne scars, pigmentation, and
              texture issues. This comprehensive approach delivers visible
              transformation through a synergistic combination of laser
              treatments, cellular therapy, and injectables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Ideal For:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Acne scarring and post-inflammatory hyperpigmentation
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Sun damage and age spots
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Uneven skin texture and tone
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Loss of skin elasticity and firmness
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Fine lines and wrinkles
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Why This Package Works:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Combines multiple advanced technologies for comprehensive
                  results
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Treatments work synergistically to enhance each other's
                  effects
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  AI-based tracking ensures optimal progress and adjustments
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Medical-grade products and cutting-edge equipment
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Customized to your specific skin concerns and goals
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
              Correct & Rejuvenate Package
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Comprehensive transformation package combining advanced
              technologies for scar revision, pigmentation correction, and skin
              rejuvenation.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 border-gray-200 hover:shadow-lg transition-shadow relative">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Correct & Rejuvenate Package
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Advanced skin repair for visible transformation. Perfect for
                  acne scars, pigmentation, uneven texture, and skin damage.
                </p>

                <div className="space-y-3 mb-8 text-left">
                  {treatmentDetails.map((treatment, i) => (
                    <div key={i} className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {treatment.name}
                      </h4>
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700 text-sm">
                          {treatment.sessions} - {treatment.description}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Package Inclusions:
                    </h4>
                    {packageInclusions.map((inclusion, i) => (
                      <div key={i} className="flex items-center gap-3 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700 text-sm">
                          {inclusion}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Complete Program:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £1,950 + VAT
                    </span>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-2">
                    8-12 week transformation program
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-gray-800 hover:bg-gray-900 text-white mt-4"
                onClick={() => setBookingOpen(true)}
              >
                BOOK CONSULTATION
              </Button>
            </Card>
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