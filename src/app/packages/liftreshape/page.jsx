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
      name: "Lift & Reshape",
      duration: "10-12 week program",
      price: "£2,500 + VAT",
      packagePrice: "Complete package",
      description: "Non-surgical face lifting and contouring for early signs of aging",
      benefits: [
        "1x Endolift Treatment – Non-surgical face lifting for jawline/cheeks",
        "3x RF Microneedling Sessions – Stimulates collagen and tightens skin",
        "2x Profhilo Treatments – Deep hydration and skin lifting",
        "2 ml Dermal Filler – Enhances facial contours naturally",
        "1x Facial Scan & Aging Report – Track progress with precision",
      ],
    },
  ];

  const faqs = [
    {
      question: "What is the Lift & Reshape package?",
      answer:
        "The Lift & Reshape package is a comprehensive non-surgical facial contouring program designed to address early signs of aging, sagging skin, and facial contouring needs. It combines advanced technologies including Endolift, RF Microneedling, Profhilo, and dermal fillers for natural-looking results.",
    },
    {
      question: "Who is the ideal candidate for this package?",
      answer:
        "This package is perfect for individuals showing early signs of aging, those experiencing mild to moderate skin sagging, or anyone looking to enhance their facial contours without surgery. It's suitable for all skin types seeking non-surgical lifting and reshaping solutions.",
    },
    {
      question: "How long does the complete package take?",
      answer:
        "The complete Lift & Reshape program spans 10-12 weeks, with treatments strategically scheduled to allow for proper healing and optimal results between sessions.",
    },
    {
      question: "Is there any downtime with these treatments?",
      answer:
        "Most treatments in this package have minimal downtime. You may experience slight redness or swelling after RF Microneedling or filler injections, but this typically subsides within 24-48 hours. Our specialists will provide detailed aftercare instructions.",
    },
    {
      question: "How long do the results last?",
      answer:
        "Results vary by individual, but most clients enjoy the benefits for 12-18 months. Maintenance treatments may be recommended to prolong the results. The collagen stimulation from RF Microneedling continues to improve skin quality for several months after treatment.",
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
                  Non-Surgical Facial Contouring
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Lift & Reshape
                <br />
                Treatment Package
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                A comprehensive non-surgical solution for early signs of aging,
                sagging skin, and facial contouring needs with lasting results.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-center md:justify-start gap-4 flex-wrap">
                {/* VIEW PACKAGES - Updated to call scrollToPricing */}
                <button
                  onClick={scrollToPricing}
                  className="relative px-8 py-4 text-sm font-bold uppercase text-[#272728] bg-white border-2 border-[#272728] rounded-lg tracking-wider hover:bg-[#272728] hover:text-white transition-colors"
                >
                  VIEW PACKAGE
                  <span className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex items-center justify-center">
              <div className="rounded-3xl overflow-hidden bg-gray-200 aspect-[4/5] w-full max-w-lg">
                <img
                  src="/pacakage/Lift & Reshape.jpg"
                  alt="Non-surgical face lifting treatment"
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
              What is the Lift & Reshape Package?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our Lift & Reshape package is a comprehensive non-surgical solution designed to
              address early signs of aging, sagging skin, and facial contouring needs. This
              expertly curated program combines cutting-edge technologies including Endolift,
              RF Microneedling, Profhilo, and dermal fillers to deliver natural-looking lifting
              and reshaping results without surgery.
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
                  Non-surgical face lifting and natural reshaping
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Improved firmness, elasticity, and facial symmetry
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Combines advanced technologies for maximum effect
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Minimal downtime with long-lasting results
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Personalized treatment plan with progress tracking
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Why Choose This Package:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Comprehensive approach combining multiple advanced technologies
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Performed by certified aesthetic specialists
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Customized to your specific facial structure and goals
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Medical-grade treatments with proven results
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Luxurious experience with exceptional, natural-looking results
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
              Lift & Reshape Package
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our comprehensive non-surgical solution for facial lifting and contouring,
              combining multiple advanced technologies for optimal results.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {treatmentDetails.map((treatment, index) => (
              <Card
                key={index}
                className="p-8 border-gray-200 hover:shadow-lg transition-shadow relative"
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
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Program Duration:</span>
                      <span className="text-lg font-bold text-gray-900">
                        {treatment.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Package Price:</span>
                      <span className="text-lg font-bold text-gray-900">
                        {treatment.price}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white mt-auto"
                  onClick={() => setBookingOpen(true)}
                >
                  BOOK CONSULTATION
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
                  className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index
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