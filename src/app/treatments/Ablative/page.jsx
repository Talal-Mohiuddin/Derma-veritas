"use client";

import { useStore } from "@/store/zustand";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useRef } from "react";
import ClinicsModal from "@/components/ClinicsModal";
import PriceCard from "@/components/pricecard/price-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Play } from "lucide-react";
import BeforeAfterSection from "@/components/before-after-section";
import Footer from "@/components/Footer";
import ClubMembership from "@/components/ClubMembership";
import MediaCoverage from "@/components/MediaCoverage";
import MobileMenuDrawer from "@/components/MobileMenuDrawer";
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

export default function CO2ResurfacingTreatmentSection() {
  const [expandedSections, setExpandedSections] = useState({});
  const [openIndex, setOpenIndex] = useState(null);
  // Create a ref for the pricing section
  const pricingSectionRef = useRef(null);
  const beforeAfterSectionRef = useRef(null);

  const { bookingOpen, setBookingOpen } = useStore();

  const cardData = [
    {
      heading: "Visible Results",
      value: "Improved skin texture and tone",
    },
    {
      heading: "Results Last",
      value: "Long-term with proper care",
    },
    {
      heading: "No. of Sessions",
      value: "Typically 1 Treatment",
      description: "Multiple sessions for enhanced results",
    },
    {
      heading: "Procedure Time",
      value: "Varies by area",
    },
    {
      heading: "Discomfort",
      value: "Managed with anesthesia",
    },
    {
      heading: "Downtime",
      value: "1–3 Months",
    },
    {
      heading: "Side Effects",
      value: "Redness, swelling, temporary pigmentation changes",
    },
    {
      heading: "Our Pricing",
      value: "Consultation required",
      description: "View all",
    },
  ];

  const faqs = [
    {
      question: "What is Ablative CO₂ Resurfacing?",
      answer:
        "Ablative CO₂ Resurfacing is an advanced skin rejuvenation therapy designed to improve skin texture, tone, and overall complexion. By carefully resurfacing the skin, it helps reduce the appearance of fine lines, wrinkles, scarring, and uneven pigmentation.",
    },
    {
      question: "How long do the results last?",
      answer:
        "Results are long-lasting when combined with good skincare and sun protection. The treatment stimulates natural collagen production which continues to improve skin quality over time.",
    },
    {
      question: "Is the procedure painful?",
      answer:
        "The treatment is performed with appropriate anesthesia and pain management. Patients may experience some discomfort during recovery, which is managed with prescribed medications.",
    },
    {
      question: "What is the downtime?",
      answer:
        "This is an advanced treatment with a typical downtime of 1–3 months, during which regular medical care and follow-up are required. The skin needs time to heal and regenerate properly.",
    },
    {
      question: "Who performs the treatment?",
      answer:
        "All treatments are performed by our trained clinical team to ensure safety and effectiveness. Our practitioners are highly qualified and experienced in advanced skin resurfacing techniques.",
    },
    {
      question: "Am I a good candidate for this treatment?",
      answer:
        "A full consultation is required to assess your skin, determine eligibility, and tailor the treatment to your needs. Generally, it's suitable for those looking to address skin texture issues, scarring, wrinkles, and pigmentation problems.",
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
                  Advanced Skin Rejuvenation
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Ablative CO₂ Laser
                <br />
                Resurfacing for
                <br />
                renewed skin
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Transform your skin with our advanced Ablative CO₂ Resurfacing
                treatment, designed to improve texture, tone, and overall
                complexion for fresher, healthier-looking skin.
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
                  src="https://images.unsplash.com/photo-1594489573454-3a9e7b2c4ed3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                  alt="CO2 laser resurfacing treatment"
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
                <p className="text-gray-500 text-sm font-light">
                  {cardData[2].description}
                </p>
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
                <h3 className="text-lg font-light text-gray-900">
                  {cardData[4].value}
                </h3>
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
              What is Ablative CO₂ Resurfacing?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ablative CO₂ Resurfacing is an advanced skin rejuvenation therapy
              designed to improve skin texture, tone, and overall complexion. By
              carefully resurfacing the skin, it helps reduce the appearance of
              fine lines, wrinkles, scarring, and uneven pigmentation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Benefits:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Smooths and refines skin texture
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Reduces fine lines, wrinkles, and scars
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Improves tone and pigmentation irregularities
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Stimulates natural collagen production
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Promotes fresher, healthier, more youthful-looking skin
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
                  Performed in-clinic by a qualified practitioner
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  A single session may be sufficient
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Course of treatments can provide enhanced results
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Treatment time varies depending on area and intensity
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Downtime of 1–3 months with medical follow-up
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Section */}
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
                  CO₂ Resurfacing Treatment
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Our Pricing
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Ablative CO₂ Resurfacing is a customized treatment with
                  pricing that varies based on the treatment area, intensity,
                  and individual patient needs. A consultation is required to
                  determine the exact treatment plan and associated costs.
                </p>
                <p>
                  If you would like to discuss this treatment and get a
                  personalized quote, please feel free to{" "}
                  <button className="underline hover:text-gray-900 transition-colors">
                    get in touch
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Right Pricing Cards */}
            <div className="space-y-6">
              {/* Consultation Card */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Consultation Required
                  </h3>
                  <button
                    className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition rounded-lg"
                    onClick={() => setBookingOpen(true)}
                  >
                    BOOK CONSULTATION
                  </button>
                </div>

                <div className="text-gray-600">
                  <p className="mb-4">
                    During your consultation, our clinical team will assess your
                    skin, discuss your goals, and create a personalized
                    treatment plan with exact pricing.
                  </p>
                  <p>Factors affecting price include:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Treatment area size</li>
                    <li>Intensity of resurfacing required</li>
                    <li>Number of sessions needed</li>
                    <li>Aftercare products required</li>
                  </ul>
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