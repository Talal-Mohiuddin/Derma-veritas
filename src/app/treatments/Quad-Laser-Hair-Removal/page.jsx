"use client";

import { useStore } from "@/store/zustand";
import { Button } from "@/components/ui/button";

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

export default function LaserHairRemovalSection() {
  const [expandedSections, setExpandedSections] = useState({});
  const [openIndex, setOpenIndex] = useState(null);

  // Create a ref for the pricing section
  const pricingSectionRef = useRef(null);
  const beforeAfterSectionRef = useRef(null);
  const { bookingOpen, setBookingOpen } = useStore();

  const cardData = [
    {
      heading: "Results Seen",
      value: "After 2-3 Sessions",
      description: "Full Results After 6 Sessions",
    },
    {
      heading: "Results Last",
      value: "Permanent Reduction",
      description: "With Maintenance Sessions",
    },
    {
      heading: "No. of Sessions",
      value: "6 Recommended",
      description: "4-8 Sessions Typically Needed",
    },
    {
      heading: "Procedure Time",
      value: "15-60 Minutes",
      description: "Depending on Area",
    },
    {
      heading: "Pain Level",
      value: "Mild to Moderate",
      description: "Cooling Technology Used",
    },
    {
      heading: "Downtime",
      value: "None",
      description: "Resume Activities Immediately",
    },
    {
      heading: "Side Effects",
      value: "Temporary Redness",
      description: "Mild Swelling Possible",
    },
    {
      heading: "Our Pricing",
      value: "From £45",
      description: "View all",
    },
  ];

  const faqs = [
    {
      question: "What is Quad Laser Hair Removal?",
      answer:
        "Quad Laser Hair Removal is the most advanced hair removal system combining four laser technologies - Alexandrite, Diode, YAG, and Near-Infrared (NIR). This multi-wavelength approach ensures maximum effectiveness for all hair types and skin tones.",
    },
    {
      question: "How does it work on different skin types?",
      answer:
        "The quad laser system includes specific wavelengths for different skin types: Alexandrite for lighter skin, Diode for all skin types, Nd:YAG for darker skin tones, and Near-Infrared for deep follicles. This makes it effective and safe for virtually all skin types.",
    },
    {
      question: "How many sessions will I need?",
      answer:
        "Most clients need 6-8 sessions spaced 4-6 weeks apart for optimal results. Hair growth occurs in cycles, and multiple sessions ensure all hair follicles are treated during their active growth phase.",
    },
    {
      question: "Is the treatment painful?",
      answer:
        "Most people describe the sensation as a mild rubber band snap. We use advanced cooling technology to maximize comfort during treatment. Pain level varies by individual sensitivity and treatment area.",
    },
    {
      question: "What is the downtime?",
      answer:
        "There is no downtime. You can resume normal activities immediately after treatment. Some temporary redness or slight swelling may occur but typically subsides within a few hours.",
    },
    {
      question: "Who performs the treatment?",
      answer:
        "All treatments are performed exclusively by our expert physicians and clinical specialists who are trained in advanced laser technology and safety protocols.",
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
                  Advanced Laser Technology
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Quad Laser Hair
                <br />
                Removal for all
                <br />
                skin types
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                The most advanced hair removal system combining four laser
                technologies for maximum effectiveness on all hair and skin
                types at Derma Veritas.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-start gap-4 flex-wrap">
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
                  src="/laser_treatments/Quad Laser Treatment Vertical.jpg"
                  alt="Professional laser hair removal treatment being administered"
                  className="w-full h-full object-cover"
                />
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
              What is Quad Laser Hair Removal?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Quad Laser Hair Removal is the most advanced hair removal system
              combining four laser technologies - Alexandrite, Diode, YAG, and
              Near-Infrared (NIR). This multi-wavelength approach ensures
              maximum effectiveness for all hair types and skin tones, providing
              superior results compared to single-laser systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                How Each Laser Works:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-medium">Alexandrite (755nm):</span>{" "}
                  Penetrates upper dermis, ideal for fine to medium hair on
                  lighter skin
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-medium">Diode (808nm):</span> Reaches
                  mid-dermis, effective for coarser hair on all skin types
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-medium">Nd: YAG (1064nm):</span> Deep
                  penetration, perfect for thick or dark hair and darker skin
                  tones
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-medium">Near-Infrared (904nm):</span>{" "}
                  Targets deep follicles and stimulates heat reservoirs
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Benefits:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Effective on all skin types and tones
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Targets all hair types from fine to coarse
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Faster treatment times with advanced technology
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Minimal discomfort with integrated cooling systems
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Long-lasting, permanent hair reduction
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section ref={beforeAfterSectionRef} className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden bg-gray-100">
            <img
              src="/laser_treatments/Quad Laser Treatment Horizental.jpg"
              alt="Quad laser hair removal results"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              About Quad Laser Hair Removal
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Multi-wavelength system (Alexandrite, Diode, YAG, NIR) effective
              for all skin types.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Results after 2–3 sessions; full after ~6</li>
              <li>• Permanent reduction with maintenance</li>
              <li>• 15–60 minutes; no downtime</li>
            </ul>
          </div>
        </div>
      </section>

      <ConsultationSection />

      {/* Pricing Section with ref */}
      <section
        ref={pricingSectionRef}
        className="py-12 md:py-20 px-4"
        style={{ backgroundColor: "#f6f6f6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Laser Hair Removal Pricing
            </h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              We offer competitive pricing for all treatment areas. Course
              packages provide the best value for achieving permanent hair
              reduction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Face Pricing */}
            <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold text-gray-900">Face</h3>
                <button className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                  BOOK
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Upper Lip</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £45
                    </span>
                    <span className="block text-sm text-gray-600">
                      £225 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Chin</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £50
                    </span>
                    <span className="block text-sm text-gray-600">
                      £250 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Lip & Chin</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £75
                    </span>
                    <span className="block text-sm text-gray-600">
                      £375 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Sides of Face</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £60
                    </span>
                    <span className="block text-sm text-gray-600">
                      £300 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Full Face</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £120
                    </span>
                    <span className="block text-sm text-gray-600">
                      £600 for 6
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Men's Laser Pricing */}
            <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold text-gray-900">
                  Men's Laser
                </h3>
                <button className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                  BOOK
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Beard Line (Cheeks)</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £70
                    </span>
                    <span className="block text-sm text-gray-600">
                      £350 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Beard (Full)</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £120
                    </span>
                    <span className="block text-sm text-gray-600">
                      £600 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Neck (Front)</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £60
                    </span>
                    <span className="block text-sm text-gray-600">
                      £300 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Neck (Back)</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £60
                    </span>
                    <span className="block text-sm text-gray-600">
                      £300 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Beard & Neck Combined</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £160
                    </span>
                    <span className="block text-sm text-gray-600">
                      £800 for 6
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body Pricing */}
            <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold text-gray-900">
                  Body Areas
                </h3>
                <button className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                  BOOK
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Underarms</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £60
                    </span>
                    <span className="block text-sm text-gray-600">
                      £300 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Half Arms</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £100
                    </span>
                    <span className="block text-sm text-gray-600">
                      £500 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Full Arms</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £150
                    </span>
                    <span className="block text-sm text-gray-600">
                      £750 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Chest</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £100
                    </span>
                    <span className="block text-sm text-gray-600">
                      £500 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Full Legs</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £220
                    </span>
                    <span className="block text-sm text-gray-600">
                      £1,100 for 6
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Intimate Area Pricing */}
            <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold text-gray-900">
                  Intimate Areas
                </h3>
                <button className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                  BOOK
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Bikini Line</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £70
                    </span>
                    <span className="block text-sm text-gray-600">
                      £350 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Extended Bikini</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £90
                    </span>
                    <span className="block text-sm text-gray-600">
                      £450 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Brazilian</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £120
                    </span>
                    <span className="block text-sm text-gray-600">
                      £600 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Hollywood</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £140
                    </span>
                    <span className="block text-sm text-gray-600">
                      £700 for 6
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Body Packages */}
            <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold text-gray-900">
                  Full Body Packages
                </h3>
                <button className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                  BOOK
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Half Body (Upper/Lower)</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £280
                    </span>
                    <span className="block text-sm text-gray-600">
                      £1,100 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Full Body (Female)</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £450
                    </span>
                    <span className="block text-sm text-gray-600">
                      £1,600 for 6
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Full Body (Male)</span>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-gray-900">
                      £500
                    </span>
                    <span className="block text-sm text-gray-600">
                      £1,700 for 6
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
