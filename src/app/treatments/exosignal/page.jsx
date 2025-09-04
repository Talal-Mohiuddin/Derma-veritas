"use client";

import { useStore } from "@/store/zustand";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown, CheckCircle, Clock, AlertTriangle, Pound } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import BeforeAfterSection from "@/components/before-after-section";
import ReviewsSection from "@/components/reviews-section";
import ConsultationSection from "@/components/consultation-section";
import ClubMembership from "@/components/ClubMembership";
import MediaCoverage from "@/components/MediaCoverage";

export default function ExoSignalHairTreatmentSection() {
  const [openIndex, setOpenIndex] = useState(null);
 const pricingSectionRef = useRef(null);
   const beforeAfterSectionRef = useRef(null);  const { bookingOpen, setBookingOpen } = useStore();

  const cardData = [
    {
      heading: "Visible Results",
      value: "Improved hair thickness and volume",
      icon: CheckCircle
    },
    {
      heading: "Results Timeline",
      value: "3-6 Months",
      icon: Clock
    },
    {
      heading: "Treatment Course",
      value: "4 Sessions",
      icon: CheckCircle
    },
    {
      heading: "Session Frequency",
      value: "Every 2 Weeks",
      icon: Clock
    },
    {
      heading: "Procedure Time",
      value: "30-45 Minutes",
      icon: Clock
    },
    {
      heading: "Discomfort",
      value: "Minimal",
      icon: AlertTriangle
    },
    {
      heading: "Downtime",
      value: "None",
      icon: CheckCircle
    },
    {
      heading: "Our Pricing",
      value: "From £700",
      description: "View all",
      icon: Pound
    },
  ];

  const faqs = [
    {
      question: "What is ExoSignal™ Hair treatment?",
      answer: "ExoSignal™ Hair is an advanced professional hair treatment using synthetic exosome technology. It targets hair follicles at a cellular level to address hair loss, improve scalp health, and support growth after transplant or shedding."
    },
    {
      question: "How does ExoSignal™ work?",
      answer: "The treatment uses synthetic exosomes to enhance absorption and effectiveness of active ingredients like PDRN and biomimetic peptides. These components work together to stimulate hair bulb cells, reduce inflammation, and invigorate follicles for improved hair growth."
    },
    {
      question: "Who is a good candidate for ExoSignal™?",
      answer: "This treatment is ideal for those experiencing Androgenetic Alopecia, Alopecia Areata, Telogen Effluvium, or those who have undergone hair transplant procedures and want to support regrowth."
    },
    {
      question: "How many sessions will I need?",
      answer: "A typical course consists of 4 sessions, spaced 2 weeks apart for optimal results."
    },
    {
      question: "When will I see results?",
      answer: "Most patients begin to notice improvements in hair quality and reduction in shedding within 4-6 weeks. Full results including increased volume and thickness are typically visible after 3-6 months."
    },
    {
      question: "Are there any side effects?",
      answer: "ExoSignal™ Hair is generally well-tolerated with minimal side effects. Some patients may experience slight redness or tingling at the application site, which typically resolves within a few hours."
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
                  Advanced Hair Restoration
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                ExoSignal™ Hair
                <br />
                Revolutionary
                <br />
                Hair Restoration
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Advanced synthetic exosome technology that targets hair follicles at a cellular level to combat hair loss and promote regrowth.
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
                  src="/images/exosignal-hair-treatment.png"
                  alt="ExoSignal Hair treatment procedure"
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

      {/* Treatment Highlights Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-[-4px_4px_0_0_rgba(0,0,0,0.1)]">
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
                  </div>
                );
              })}
            </div>

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
                      <p 
                        onClick={scrollToPricing}
                        className="text-gray-500 text-sm font-light underline cursor-pointer hover:text-gray-700"
                      >
                        {card.description}
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
              What is ExoSignal™ Hair Treatment?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              ExoSignal™ Hair is a breakthrough treatment using synthetic exosome technology to target hair loss at its root cause. By delivering powerful active ingredients directly to hair follicles, it stimulates cellular regeneration, reduces inflammation, and promotes healthier, thicker hair growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Key Ingredients:</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Synthetic Exosomes</span> - Enhance absorption and effectiveness of active ingredients
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">PDRN</span> - Polynucleotide DNA fragments that stimulate hair bulb cells and reduce inflammation
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Biomimetic Peptides</span> - Blend of 8 peptides including Copper Tripeptide-1 and Oligopeptide-20 to invigorate follicles
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Plant Stem Cells & Vitamins</span> - Nourish scalp cells with Panthenol, Glutathione, and Biotin
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Benefits:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Increases hair volume and shine
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Improves hair quality and thickness
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Reduces scalp inflammation and supports overall health
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Effective for various types of hair loss including Androgenetic Alopecia and Alopecia Areata
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Supports recovery after hair transplant procedures
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Indications Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who Can Benefit From ExoSignal™?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              ExoSignal™ Hair treatment is designed to address various hair loss conditions and support hair restoration in multiple scenarios.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Primary Indications:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Androgenetic Alopecia (pattern hair loss)
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Alopecia Areata
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Telogen Effluvium (stress-related hair shedding)
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Post-hair transplant support
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Treatment Protocol:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  Initial consultation and scalp assessment
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  Typical course: 4 treatment sessions
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  Sessions spaced 2 weeks apart
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm font-bold">4</span>
                  </div>
                  Maintenance treatments recommended every 6-12 months
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
                  ExoSignal™ Hair Treatment
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Treatment Investment
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Our ExoSignal™ Hair treatment represents the cutting edge of hair restoration technology, using synthetic exosomes to deliver remarkable results for various types of hair loss.
                </p>
                <p>
                  The complete treatment course includes 4 sessions administered by our expert practitioners who specialize in advanced hair restoration techniques.
                </p>
                <p>
                  For a personalized assessment and exact pricing, please{" "}
                  <button 
                    onClick={() => setBookingOpen(true)}
                    className="underline hover:text-gray-900 transition-colors"
                  >
                    book a consultation
                  </button>.
                </p>
              </div>
            </div>

            {/* Right Pricing Cards */}
            <div className="space-y-6">
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    ExoSignal™ Hair Treatment
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
                    <span className="text-gray-700">Complete Course (4 sessions):</span>
                    <span className="text-lg font-bold text-gray-900">
                      £700
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Single Session:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £200
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Maintenance Session (after initial course):</span>
                    <span className="text-lg font-bold text-gray-900">
                      £180
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
            onClick={() => setBookingOpen(true)}
          >
            BOOK CONSULTATION
            <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
          </button>
        </div>
      </section>

      <ClubMembership />
      <MediaCoverage />
    </>
  );
}