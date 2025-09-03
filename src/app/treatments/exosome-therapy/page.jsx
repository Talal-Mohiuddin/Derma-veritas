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
  FlaskRound,
  Atom,
  Leaf,
} from "lucide-react";

import ReviewsSection from "@/components/reviews-section";
import ConsultationSection from "@/components/consultation-section";

export default function ExosomeTherapySection() {
  const [expandedSections, setExpandedSections] = useState({});
  const [openIndex, setOpenIndex] = useState(null);

  // Create a ref for the pricing section
  const pricingSectionRef = useRef(null);
  const { bookingOpen, setBookingOpen } = useStore();

  const cardData = [
    {
      heading: "Visible Results",
      value: "Rejuvenated, firmer, radiant skin",
      description: "Maximum results with 5 sessions",
      icon: <Eye className="w-5 h-5 text-gray-600" />,
    },
    {
      heading: "Results Last",
      value: "Several Months",
      icon: <CheckCircle className="w-5 h-5 text-gray-600" />,
    },
    {
      heading: "No. of Sessions",
      value: "3-5 Sessions",
      description: "5 recommended for optimal results",
      icon: <RotateCcw className="w-5 h-5 text-gray-600" />,
    },
    {
      heading: "Procedure Time",
      value: "30–45 Minutes",
      icon: <Clock className="w-5 h-5 text-gray-600" />,
    },
    {
      heading: "Discomfort",
      value: "Mild",
      icon: <Frown className="w-5 h-5 text-gray-600" />,
    },
    {
      heading: "Downtime",
      value: "Minimal",
      icon: <TrendingDown className="w-5 h-5 text-gray-600" />,
    },
    {
      heading: "Side Effects",
      value: "Temporary redness or mild swelling",
      icon: <AlertTriangle className="w-5 h-5 text-gray-600" />,
    },
    {
      heading: "Our Pricing",
      value: "From £500",
      description: "View all",
      icon: <Pound className="w-5 h-5 text-gray-600" />,
    },
  ];

  const faqs = [
    {
      question: "What is Exosome Therapy?",
      answer:
        "Exosome Therapy uses nano-sized vesicles derived from stem cells and peptides to promote cell regeneration. Our advanced formula combines high molecular weight polynucleotides, synthetic exosomes, oligopeptides-20, acetyl decapeptide-3, and vegetable stem cells for optimal skin rejuvenation.",
    },
    {
      question: "How does Exosome Therapy work?",
      answer:
        "Exosomes are extracellular vesicles that carry important signaling molecules between cells. When applied to the skin, they deliver growth factors, proteins, and genetic material that stimulate cellular repair, collagen production, and tissue regeneration, resulting in rejuvenated, firmer, and more radiant skin.",
    },
    {
      question: "How long do the results last?",
      answer:
        "Results improve over several weeks and last for months. For optimal and longer-lasting results, we recommend a series of 5 sessions followed by maintenance treatments every 6-12 months.",
    },
    {
      question: "Is the procedure painful?",
      answer:
        "Most patients experience only mild discomfort during the procedure. The treatment involves minimal injections or topical application that are generally well-tolerated.",
    },
    {
      question: "What is the downtime?",
      answer:
        "There is minimal downtime. Some patients may experience temporary redness or mild swelling, but these typically resolve within a few hours to a day.",
    },
    {
      question: "Who performs the treatment?",
      answer:
        "All treatments are performed exclusively by our expert physicians and clinical pharmacy leads who are industry-leading trainers in advanced regenerative techniques.",
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
                  Advanced Regenerative Treatment
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Exosome Therapy
                <br />
                for cellular
                <br />
                regeneration
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Advanced regenerative treatment using nano-sized vesicles
                derived from stem cells and peptides to promote cell
                regeneration and skin rejuvenation.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-center md:justify-start gap-4 flex-wrap">
                {/* VIEW RESULTS */}
                <button className="relative px-8 py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-lg tracking-wider">
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
                  src="https://tse1.mm.bing.net/th/id/OIP.SzSDDe4fxQ8Zofe9i2cSSQHaHa?cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Professional exosome therapy treatment being administered"
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
                  {cardData[0].icon}
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
                  {cardData[1].icon}
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
                  {cardData[2].icon}
                  <span className="text-gray-600 text-sm font-light">
                    {cardData[2].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900">
                  {cardData[2].value}
                </h3>
                {cardData[2].description && (
                  <p className="text-gray-500 text-sm font-light">
                    {cardData[2].description}
                  </p>
                )}
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  {cardData[3].icon}
                  <span className="text-gray-600 text-sm font-light">
                    {cardData[3].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900">
                  {cardData[3].value}
                </h3>
                {cardData[3].description && (
                  <p className="text-gray-500 text-sm font-light">
                    {cardData[3].description}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  {cardData[4].icon}
                  <span className="text-gray-600 text-sm font-light">
                    {cardData[4].heading}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-1">
                  {cardData[4].value}
                </h3>
                {cardData[4].description && (
                  <p className="text-gray-500 text-sm font-light">
                    {cardData[4].description}
                  </p>
                )}
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  {cardData[5].icon}
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
                  {cardData[6].icon}
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
                  {cardData[7].icon}
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
              What is Exosome Therapy?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Exosome Therapy uses nano-sized vesicles derived from stem cells
              and peptides to promote cell regeneration. Our advanced formula
              combines high molecular weight polynucleotides, synthetic
              exosomes, oligopeptides-20, acetyl decapeptide-3, and vegetable
              stem cells for optimal skin rejuvenation and regeneration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Advanced Formula Includes:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <FlaskRound className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  High molecular weight polynucleotides
                </li>
                <li className="flex items-start gap-3">
                  <Atom className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  Synthetic exosomes
                </li>
                <li className="flex items-start gap-3">
                  <FlaskRound className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  Oligopeptides-20
                </li>
                <li className="flex items-start gap-3">
                  <FlaskRound className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  Acetyl decapeptide-3
                </li>
                <li className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  Vegetable stem cells
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Benefits Include:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Promotes cellular regeneration and repair
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Stimulates collagen and elastin production
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Improves skin texture and elasticity
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Reduces appearance of fine lines and wrinkles
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Enhances skin radiance and overall complexion
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterSection />
      <ReviewsSection />

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
                  Exosome Therapy Cost
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Our Pricing
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  All treatments are performed exclusively by our expert
                  physicians and clinical pharmacy leads who are
                  industry-leading trainers. Our pricing reflects the expertise
                  and premium service you receive.
                </p>
                <p>
                  If you would like to discuss any of our treatments, please
                  feel free to{" "}
                  <button className="underline hover:text-gray-900 transition-colors">
                    get in touch
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Right Pricing Cards */}
            <div className="space-y-6">
              {/* Exosome Therapy Pricing */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Exosome Therapy Packages
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
                    <span className="text-gray-700">3 Sessions:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £500
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">5 Sessions:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £700
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-100">
                  <p className="text-sm text-blue-700">
                    <strong>Recommended:</strong> 5 sessions for optimal results
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Treatment Details
                </h3>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Visible Results:</span>
                    <span className="font-medium">
                      Rejuvenated, firmer, radiant skin
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">
                      Results improve over several weeks and last months
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Procedure Time:</span>
                    <span className="font-medium">30–45 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discomfort:</span>
                    <span className="font-medium">Mild</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Downtime:</span>
                    <span className="font-medium">Minimal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Side Effects:</span>
                    <span className="font-medium">
                      Temporary redness or mild swelling
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
