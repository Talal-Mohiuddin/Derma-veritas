"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useStore } from "@/store/zustand";
import { Star, CheckCircle, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

export default function HairRestorationPackagePage() {
  const [openIndex, setOpenIndex] = useState(null);
  const pricingSectionRef = useRef(null);
  const { setBookingOpen } = useStore();

  const treatmentDetails = [
    {
      name: "Restore & Prevent Hair Loss",
      duration: "16-18 weeks program",
      price: "£1190 + VAT",
      description: "Comprehensive hair restoration program for thinning, shedding, or early hair loss",
      benefits: [
        "3x Polynucleotides Hair Therapy",
        "4x PRP Hair Therapy",
        "5x Hair+ Treatments",
        "4x Phototherapy Sessions",
        "ExoHair Home Kit",
        "Targets thinning, shedding and follicle health",
      ],
      addOn: {
        name: "4x Exo Signal Hair Treatments",
        description: "Advanced growth stimulation",
        price: "£400"
      }
    }
  ];

  const faqs = [
    {
      question: "Who is this hair restoration package for?",
      answer:
        "This package is perfect for individuals experiencing hair thinning, shedding, or early hair loss. It's designed to address these concerns with a comprehensive, clinically-designed program.",
    },
    {
      question: "How long does the complete treatment program take?",
      answer:
        "The full program spans 16-18 weeks, with treatments scheduled at regular intervals to maximize results and promote healthy hair growth.",
    },
    {
      question: "Is there any downtime after the treatments?",
      answer:
        "Most treatments have minimal to no downtime. You may experience slight redness or tenderness at the treatment site which typically subsides within 24 hours.",
    },
    {
      question: "Can I add Finasteride to this package?",
      answer:
        "Yes, Finasteride can be added after a consultation with our specialist to determine if it's appropriate for your specific condition.",
    },
    {
      question: "How soon will I see results?",
      answer:
        "Most clients begin to notice improvements in hair texture and reduced shedding within 4-8 weeks, with more significant results visible after completing the full program.",
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
                  Comprehensive Hair Restoration
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Restore & Prevent
                <br />
                Hair Loss Package
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                A comprehensive, clinically designed hair restoration program combining cellular,
                growth factor, and light-based therapies for optimal results.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-center md:justify-start gap-4 flex-wrap">
                {/* LEARN MORE */}
                <button className="relative px-8 py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wider">
                  LEARN MORE
                  <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>

                {/* VIEW PACKAGE - Updated to call scrollToPricing */}
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
                  src="/pacakage\Hair Restoration.jpg"
                  alt="Professional hair restoration treatment"
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
              What is the Restore & Prevent Hair Loss Package?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our comprehensive hair restoration program combines multiple advanced therapies to address
              hair thinning, shedding, and early hair loss. This clinically designed program spans 16-18 weeks
              and combines cellular, growth factor, and light-based therapies for optimal results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Treatment Components:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Polynucleotides Hair Therapy - Improves follicle health
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  PRP Hair Therapy - Enhances natural hair growth
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Hair+ Treatments - Boost hair density and strength
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Phototherapy Sessions - Stimulates scalp circulation
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Program Benefits:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Comprehensive approach to hair restoration
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Targets multiple causes of hair loss simultaneously
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Includes take-home maintenance kit (ExoHair)
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Clinically designed for optimal results
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Optional Finasteride available after consultation
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
              Hair Restoration Package
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our comprehensive program designed to address hair thinning, shedding, and early hair loss with a multi-faceted approach.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {treatmentDetails.map((treatment, index) => (
              <Card
                key={index}
                className="p-8 border-gray-200 hover:shadow-lg transition-shadow relative"
              >
                <div className="text-center">
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
                      <span className="text-gray-700">Complete Program:</span>
                      <span className="text-lg font-bold text-gray-900">
                        {treatment.price}
                      </span>
                    </div>
                    <div className="text-center text-sm text-gray-600 mt-2">
                      {treatment.duration}
                    </div>

                    {/* Add-on section */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="text-center font-medium text-gray-700 mb-2">
                        Optional Add-On:
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">{treatment.addOn.name}</span>
                        <span className="text-lg font-bold text-gray-900">
                          {treatment.addOn.price}
                        </span>
                      </div>
                      <div className="text-center text-sm text-gray-600 mt-1">
                        {treatment.addOn.description}
                      </div>
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