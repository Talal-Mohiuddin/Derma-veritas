"use client";

import { useStore } from "@/store/zustand";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useRef } from "react";

import BeforeAfterSection from "@/components/before-after-section";
import ClubMembership from "@/components/ClubMembership";
import MediaCoverage from "@/components/MediaCoverage";
import BotoxSection from "@/components/BotoxSection";
import {
  Eye,
  CheckCircle,
  RotateCcw,
  Clock,
  Frown,
  TrendingDown,
  AlertTriangle,
  KeyRound as Pound,
} from "lucide-react";

import ReviewsSection from "@/components/reviews-section";
import ConsultationSection from "@/components/consultation-section";

export default function GummySmileTreatmentSection() {
  const [expandedSections, setExpandedSections] = useState({});
  const [openIndex, setOpenIndex] = useState(null);

  // Create a ref for the pricing section
const beforeAfterSectionRef = useRef(null);
  const pricingSectionRef = useRef(null);  const { bookingOpen, setBookingOpen } = useStore();

  const cardData = [
    {
      heading: "Results Seen",
      value: "Within Days",
      description: "Reduced gum exposure when smiling (results may vary)",
    },
    {
      heading: "Results Last",
      value: "3–6 Months",
    },
    {
      heading: "No. of Sessions",
      value: "Typically 1",
    },
    {
      heading: "Procedure Time",
      value: "15–30 Minutes",
    },
    {
      heading: "Pain",
      value: "Mild",
    },
    {
      heading: "Downtime",
      value: "Minimal",
    },
    {
      heading: "Side Effects",
      value: "Temporary redness, slight swelling or bruising",
    },
    {
      heading: "Our Pricing",
      value: "From £125",
      description: "View all",
    },
  ];

  const faqs = [
    {
      question: "What is gummy smile treatment?",
      answer:
        "While not specifically detailed in our current treatment menu, gummy smile concerns can potentially be addressed through our anti-wrinkle injection treatments. A gummy smile occurs when too much gum tissue shows when smiling, which can sometimes be improved by relaxing specific facial muscles.",
    },
    {
      question: "How does the treatment work?",
      answer:
        "The treatment uses strategic anti-wrinkle injections to relax muscles that cause excessive gum exposure. This approach is customized based on individual facial anatomy and provides a safe, minimally invasive solution.",
    },
    {
      question: "How long do the results last?",
      answer:
        "Results typically last 3-6 months, depending on individual factors and metabolism.",
    },
    {
      question: "Is the procedure painful?",
      answer:
        "Most patients experience only mild discomfort during the quick procedure.",
    },
    {
      question: "What is the downtime?",
      answer:
        "There is minimal downtime. Some patients may experience temporary redness or slight swelling for a short period.",
    },
    {
      question: "Who performs the treatment?",
      answer:
        "All treatments are performed exclusively by our expert physicians and clinical pharmacy leads who are industry-leading trainers with extensive experience in facial anatomy.",
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

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
                  Anti-Wrinkle Injection Treatment
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Gummy Smile
                <br />
                Treatment for a more
                <br />
                balanced smile
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                A gummy smile occurs when too much gum tissue shows when
                smiling. This can potentially be improved through strategic
                anti-wrinkle injections to relax specific facial muscles at
                Derma Veritas.
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
                  src="/images/smile-treatment.png"
                  alt="Professional gummy smile treatment consultation"
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

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-[-4px_4px_0_0_rgba(0,0,0,0.1)]">
            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <Eye className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {cardData[0].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-1">
                  {cardData[0].value}
                </h3>
                <p className="text-gray-500 text-sm font-light">
                  {cardData[0].description}
                </p>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {cardData[1].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-1">
                  {cardData[1].value}
                </h3>
                {cardData[1].description && (
                  <p className="text-gray-500 text-sm font-light">
                    {cardData[1].description}
                  </p>
                )}
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {cardData[2].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900">
                  {cardData[2].value}
                </h3>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {cardData[3].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900">
                  {cardData[3].value}
                </h3>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <Frown className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {cardData[4].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-1">
                  {cardData[4].value}
                </h3>
                <p className="text-gray-500 text-sm font-light">
                  {cardData[4].description}
                </p>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <TrendingDown className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {cardData[5].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900">
                  {cardData[5].value}
                </h3>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <AlertTriangle className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {cardData[6].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900">
                  {cardData[6].value}
                </h3>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <Pound className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">
                    {cardData[7].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-1">
                  {cardData[7].value}
                </h3>
                <p
                  onClick={scrollToPricing}
                  className="text-gray-500 text-sm font-light underline cursor-pointer hover:text-gray-700"
                >
                  {cardData[7].description}
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
              What is Gummy Smile Treatment?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              While not specifically detailed in our current treatment menu,
              gummy smile concerns can potentially be addressed through our
              anti-wrinkle injection treatments. A gummy smile occurs when too
              much gum tissue shows when smiling, which can sometimes be
              improved by relaxing specific facial muscles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Treatment Approach:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Strategic anti-wrinkle injections to relax muscles that cause
                  excessive gum exposure
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Customized treatment plan based on individual facial anatomy
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Safe, minimally invasive approach
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Reduced gum exposure when smiling
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Quick procedure with minimal downtime
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Why Choose Our Clinic:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Treatments performed exclusively by expert physicians and
                  clinical pharmacy leads
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Industry-leading trainers with extensive experience in facial
                  anatomy
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Personalized consultation to assess treatment suitability
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Safe, effective approach with minimal downtime
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Customized treatment based on your individual case
                </li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 p-4 mt-6">
                <h4 className="font-semibold text-amber-800 mb-2">
                  Important Note:
                </h4>
                <p className="text-amber-700 text-sm">
                  Consultation required to assess suitability for gummy smile
                  treatment. Treatment approach will be customized based on
                  individual case. Results may vary depending on the cause of
                  gummy smile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BotoxSection />

      <div ref={beforeAfterSectionRef}>
        <BeforeAfterSection />
      </div>
       

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
                  Gummy Smile Treatment Cost
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Our Pricing
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  All treatments are performed exclusively by our expert
                  physicians and clinical pharmacy leads who are
                  industry-leading trainers with extensive experience in facial
                  anatomy.
                </p>
                <p className="font-semibold">
                  Consultation is required to assess suitability for gummy smile
                  treatment as results may vary depending on individual cases.
                </p>
                <p>
                  If you would like to discuss this treatment, please feel free
                  to{" "}
                  <button className="underline hover:text-gray-900 transition-colors">
                    get in touch
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Right Pricing Cards */}
            <div className="space-y-6">
              {/* Anti-Wrinkle Treatment Pricing */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Anti-Wrinkle Treatments
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
                    <span className="text-gray-700">
                      Anti-Wrinkle Treatment (One Area):
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      £125
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">
                      Anti-Wrinkle Treatment (Three Areas):
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      £250
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Visible Results:
                  </h4>
                  <p className="text-sm text-gray-600">
                    Reduced gum exposure when smiling (results may vary)
                  </p>

                  <h4 className="text-sm font-medium text-gray-900 mt-4 mb-2">
                    Duration:
                  </h4>
                  <p className="text-sm text-gray-600">3–6 months</p>

                  <h4 className="text-sm font-medium text-gray-900 mt-4 mb-2">
                    Procedure Time:
                  </h4>
                  <p className="text-sm text-gray-600">15–30 minutes</p>
                </div>
              </div>

              {/* Consultation Card */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Consultation & Assessment
                  </h3>
                  <button
                    className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition rounded-lg"
                    onClick={() => setBookingOpen(true)}
                  >
                    BOOK
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  <div className="py-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900 font-medium">
                        Gummy Smile Assessment:
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        Consultation Required
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Personalized assessment to determine treatment suitability
                    </p>
                  </div>
                  <div className="py-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900 font-medium">
                        Custom Treatment Plan:
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        Tailored to Your Needs
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Based on your individual facial anatomy and goals
                    </p>
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
