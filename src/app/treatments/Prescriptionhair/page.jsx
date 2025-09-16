"use client";

import { useStore } from "@/store/zustand";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown, CheckCircle, Clock, AlertTriangle, Pound, RotateCcw } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ConsultationSection from "@/components/consultation-section";
import BeforeAfterSection from "@/components/before-after-section";
import ReviewsSection from "@/components/reviews-section";
import ClubMembership from "@/components/ClubMembership";
import MediaCoverage from "@/components/MediaCoverage";
import Footer from "@/components/Footer";

export default function PrescriptionHairTreatments() {
  const [openIndex, setOpenIndex] = useState(null);
  const pricingSectionRef = useRef(null);
  const beforeAfterSectionRef = useRef(null);
  const { bookingOpen, setBookingOpen } = useStore();

  const treatmentData = [
    {
      heading: "Visible Results",
      value: "Gradual improvement in thickness and volume",
    },
    {
      heading: "Results Timeline",
      value: "3–6 Months for noticeable changes",
    },
    {
      heading: "Treatment Forms",
      value: "Topical, Oral, or Injections",
    },
    {
      heading: "Procedure Time",
      value: "Varies by treatment type",
    },
    {
      heading: "Discomfort",
      value: "Minimal to None",
    },
    {
      heading: "Monitoring Required",
      value: "Regular follow-ups",
    },
    {
      heading: "Side Effects",
      value: "Rare, monitored by professionals",
    },
    {
      heading: "Our Pricing",
      value: "Consultation required",
      description: "View all",
    },
  ];

  const faqs = [
    {
      question: "What are prescription hair treatments?",
      answer: "Prescription Hair Treatments are clinically tailored therapies designed to support hair growth, scalp health, and long-term hair maintenance. These treatments are prescribed only after consultation with our clinical pharmacist or doctor, ensuring they are safe, effective, and suitable for your individual needs.",
    },
    {
      question: "How long until I see results?",
      answer: "Results vary by individual, but most patients see gradual improvement in hair thickness, volume, and strength within 3-6 months of consistent use. Ongoing benefits are achieved with consistent use and medical supervision.",
    },
    {
      question: "Are there any side effects?",
      answer: "As medically supervised treatments, side effects are rare and carefully monitored. Our clinical team will discuss any potential risks during your consultation and provide ongoing monitoring to ensure your safety.",
    },
    {
      question: "How often will I need follow-up appointments?",
      answer: "Treatment schedules vary and are customized to your needs. This is an advanced therapy that may require regular monitoring and follow-up care to ensure best results and safety.",
    },
    {
      question: "Can these treatments be combined with other procedures?",
      answer: "Yes, prescription hair treatments can be combined with in-clinic procedures for enhanced results. Our clinical team will create a personalized plan that may include combination therapies for optimal outcomes.",
    },
    {
      question: "Who is eligible for these treatments?",
      answer: "A full consultation is required to confirm eligibility and create a personalized treatment plan. Our clinical team will assess your individual needs and medical history to determine the most suitable approach for you.",
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
                  Medical Hair Solutions
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Prescription Hair
                <br />
                Treatments for
                <br />
                lasting results
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Clinically tailored therapies designed to support hair growth, 
                scalp health, and long-term hair maintenance under medical supervision.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-center md:justify-start gap-4 flex-wrap">
                <button
                  onClick={scrollToBeforeAfter}
                  className="relative px-8 py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-lg tracking-wider"
                >
                  VIEW RESULTS
                  <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>

                <button
                  onClick={() => setBookingOpen(true)}
                  className="relative px-8 py-4 text-sm font-bold uppercase text-[#272728] bg-white border-2 border-[#272728] rounded-lg tracking-wider hover:bg-[#272728] hover:text-white transition-colors"
                >
                  BOOK CONSULTATION
                  <span className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex items-center justify-center">
              <div className="rounded-3xl overflow-hidden bg-gray-200 aspect-[4/5] w-full max-w-lg">
                <img
                  src="https://images.unsplash.com/photo-1590159629920-41fe0f5c4f12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhhaXIlMjB0cmVhdG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Professional hair treatment consultation"
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
            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {treatmentData[0].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-1">
                  {treatmentData[0].value}
                </h3>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {treatmentData[1].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-1">
                  {treatmentData[1].value}
                </h3>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {treatmentData[2].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900">
                  {treatmentData[2].value}
                </h3>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {treatmentData[3].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900">
                  {treatmentData[3].value}
                </h3>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <AlertTriangle className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {treatmentData[4].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900">
                  {treatmentData[4].value}
                </h3>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {treatmentData[5].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900">
                  {treatmentData[5].value}
                </h3>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <AlertTriangle className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {treatmentData[6].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900">
                  {treatmentData[6].value}
                </h3>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <Pound className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {treatmentData[7].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-1">
                  {treatmentData[7].value}
                </h3>
                <p
                  onClick={scrollToPricing}
                  className="text-gray-500 text-sm font-light underline cursor-pointer hover:text-gray-700"
                >
                  {treatmentData[7].description}
                </p>
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
              About Prescription Hair Treatments
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our prescription hair treatments are clinically tailored therapies designed 
              to support hair growth, scalp health, and long-term hair maintenance. These 
              treatments are prescribed only after consultation with our clinical pharmacist 
              or doctor, ensuring they are safe, effective, and suitable for your individual needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Benefits:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Supports hair regrowth and strengthens existing hair
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Helps reduce thinning and shedding
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Improves scalp health and nourishment
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Can be combined with in-clinic procedures for enhanced results
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Provides a personalized approach to long-term hair wellness
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Treatment Protocol:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Prescribed after a detailed medical consultation
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Available in various forms such as topical solutions, oral therapies, or injections
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Treatment schedules vary and are customized to your needs
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Regular monitoring and follow-up care to ensure best results and safety
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Expected Results
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Short-Term</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Reduced shedding within first few weeks
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Improved scalp health
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Strengthened existing hair
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Long-Term</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Gradual improvement in hair thickness and volume
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Visible hair regrowth
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Sustained results with consistent use
                </li>
              </ul>
            </div>
          </div>
          
          <p className="mt-8 text-gray-600">
            Best results are achieved when combined with a healthy lifestyle and supportive in-clinic treatments
          </p>
        </div>
      </section>

      <div ref={beforeAfterSectionRef}>
        <BeforeAfterSection />
      </div>

      <ConsultationSection 
        title="Consultation & Suitability"
        description="A full consultation is required to confirm eligibility and create a personalized treatment plan. Our clinical team will guide you through your options, provide ongoing monitoring, and adjust your prescription as needed for optimal results."
      />

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
                  Investment in Hair Wellness
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Treatment Pricing
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  All prescription hair treatments are customized to your specific needs 
                  and require an initial consultation with our clinical team. Pricing varies 
                  based on the treatment form (topical, oral, or injections) and the duration 
                  of your personalized treatment plan.
                </p>
                <p>
                  During your consultation, we will provide a detailed breakdown of costs 
                  and payment options. We believe in transparent pricing with no hidden fees.
                </p>
              </div>
            </div>

            {/* Right Pricing Information */}
            <div className="space-y-6">
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Treatment Consultation & Planning
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
                    <span className="text-gray-700">Initial Consultation:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £XX
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Follow-up Appointments:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £XX
                    </span>
                  </div>
                  <div className="py-3">
                    <p className="text-gray-600 text-sm">
                      *Treatment costs vary based on prescribed therapy and are discussed during consultation
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Care</h3>
                <p className="text-gray-600 text-sm">
                  Our pricing includes ongoing monitoring and adjustment of your treatment plan 
                  to ensure optimal results and your safety throughout the process.
                </p>
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
                    ? "max-h-96 opacity-100"
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
            BOOK A CONSULTATION
            <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
          </button>
        </div>
      </section>

      <ReviewsSection />
      <ClubMembership />
      <MediaCoverage />
      <Footer />
    </>
  );
}