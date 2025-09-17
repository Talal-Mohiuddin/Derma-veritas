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
      name: "Glow & Hydrate Package",
      duration: "10-12 week program",
      price: "£1,100 + VAT",
      packagePrice: "Complete transformation program",
      description: "Perfect for dull, dry, or tired-looking skin",
      benefits: [
        "1x Facial Analysis - Personalized assessment for your unique skin needs",
        "3x ProFusion HydraFacial - Deep cleansing, hydration, and RF lifting",
        "3x PRP Facial Rejuvenation - Boosts collagen, restores glow and texture",
        "3x Polynucleotide Therapy - Regenerates cells and enhances elasticity",
        "Complimentary Skincare Mini Kit - Maintain your results at home",
      ],
      idealFor: [
        "Restores natural radiance and hydration",
        "Non-invasive, safe, and clinically tailored",
        "Perfect starting point for rejuvenation"
      ]
    }
  ];

  const faqs = [
    {
      question: "What is the Glow & Hydrate Package?",
      answer:
        "The Glow & Hydrate Package is a comprehensive 10-12 week skin transformation program designed specifically for dull, dry, or tired-looking skin. It combines multiple advanced treatments including ProFusion HydraFacial, PRP Facial Rejuvenation, and Polynucleotide Therapy for optimal results.",
    },
    {
      question: "How long does the program take?",
      answer:
        "The complete Glow & Hydrate program spans 10-12 weeks with treatments scheduled at optimal intervals to maximize results. This includes a facial analysis session, 3 ProFusion HydraFacial treatments, 3 PRP Facial Rejuvenation sessions, and 3 Polynucleotide Therapy treatments.",
    },
    {
      question: "Is there any downtime after the treatments?",
      answer:
        "There is minimal to no downtime with the treatments in this package. You may experience slight redness immediately after some sessions, but this typically subsides within a few hours. You can resume normal activities immediately after your sessions.",
    },
    {
      question: "Who is a good candidate for this package?",
      answer:
        "This package is ideal for anyone with dull, dry, or tired-looking skin seeking comprehensive rejuvenation. It's perfect as a starting point for those new to advanced skincare treatments or anyone looking to restore natural radiance and hydration to their skin.",
    },
    {
      question: "What results can I expect?",
      answer:
        "You can expect restored natural radiance and hydration, improved skin texture, enhanced elasticity, and a more youthful appearance. The package is clinically tailored to provide safe, non-invasive rejuvenation with noticeable results that develop over the course of the program.",
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
                  Complete Skin Transformation
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Glow & Hydrate
                <br />
                Package
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                A comprehensive 10-12 week program designed to restore natural radiance 
                and hydration to dull, dry, or tired-looking skin.
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
                  src="/images/hydrafacial-treatment.png"
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
              What is the Glow & Hydrate Package?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              The Glow & Hydrate Package is a comprehensive 10-12 week skin transformation 
              program specifically designed for dull, dry, or tired-looking skin. This 
              clinically tailored program combines multiple advanced treatments to restore 
              your skin's natural radiance and hydration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Included Treatments:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Facial Analysis - Personalized assessment for your unique skin needs
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ProFusion HydraFacial - Deep cleansing, hydration, and RF lifting
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  PRP Facial Rejuvenation - Boosts collagen, restores glow and texture
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Polynucleotide Therapy - Regenerates cells and enhances elasticity
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Complimentary Skincare Mini Kit to maintain results at home
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Why This Package is Ideal:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Restores natural radiance and hydration
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Non-invasive, safe, and clinically tailored
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Perfect starting point for rejuvenation
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Comprehensive approach combining multiple advanced treatments
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Includes at-home maintenance products for lasting results
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
              Glow & Hydrate Package
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              A complete 10-12 week transformation program designed specifically 
              for dull, dry, or tired-looking skin.
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
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
                      <span className="text-gray-700">Program Price:</span>
                      <span className="text-lg font-bold text-gray-900">
                        {treatment.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Duration:</span>
                      <span className="text-lg font-bold text-gray-900">
                        {treatment.duration}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mt-6 text-left">
                    <h4 className="font-semibold text-blue-800 mb-2">Why this package is ideal:</h4>
                    <ul className="text-blue-700 text-sm">
                      {treatment.idealFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 mb-1">
                          <span>•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white mt-6"
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