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

export default function HandRejuvenationSection() {
  const [expandedSections, setExpandedSections] = useState({});
  const [openIndex, setOpenIndex] = useState(null);

  // Create a ref for the pricing section
const beforeAfterSectionRef = useRef(null);
  const pricingSectionRef = useRef(null);  const { bookingOpen, setBookingOpen } = useStore();

  const cardData = [
    {
      heading: "Results Seen",
      value: "Immediate to Gradual",
      description: "Depends on treatment type",
    },
    {
      heading: "Results Last",
      value: "3-12 Months",
    },
    {
      heading: "No. of Sessions",
      value: "1-3 Treatments",
    },
    {
      heading: "Procedure Time",
      value: "20-45 Minutes",
    },
    {
      heading: "Pain",
      value: "Minimal",
      description: "Topical anesthetic available",
    },
    {
      heading: "Downtime",
      value: "Minimal",
    },
    {
      heading: "Side Effects",
      value: "Mild swelling/bruising",
    },
    {
      heading: "Our Pricing",
      value: "From £200",
      description: "View all",
    },
  ];

  const faqs = [
    {
      question: "What is Hand Rejuvenation?",
      answer:
        "Hand Rejuvenation is a non-surgical treatment designed to restore youthfulness, smoothness, and volume to aging hands. It addresses signs of aging such as volume loss, prominent veins, wrinkles, and sun damage.",
    },
    {
      question: "Which treatment is best for my hands?",
      answer:
        "The best treatment depends on your specific concerns. Dermal fillers are ideal for volume loss, PRP improves skin quality, polynucleotides enhance hydration, and laser therapy targets pigmentation and wrinkles.",
    },
    {
      question: "How long do the results last?",
      answer:
        "Results vary by treatment: Dermal fillers last 6-12 months, PRP several months with maintenance, polynucleotides 3-6 months, and laser results are progressive over weeks.",
    },
    {
      question: "Is the procedure painful?",
      answer:
        "Most treatments involve minimal discomfort. Topical anesthetics can be applied to ensure comfort during the procedure.",
    },
    {
      question: "What is the downtime?",
      answer:
        "There is minimal downtime. Some treatments may cause mild swelling or bruising for a few days, while laser treatments may cause mild redness/peeling.",
    },
    {
      question: "Who performs the treatment?",
      answer:
        "All treatments are performed exclusively by our expert physicians and clinical pharmacy leads who are industry-leading trainers.",
    },
  ];

  const treatmentOptions = [
    {
      title: "Dermal Fillers (1–2 ml)",
      price: "£300 – £450",
      results: "Immediate restoration of volume and smoother appearance",
      duration: "6–12 months",
      sessions: "Typically 1",
      time: "30 minutes",
      downtime: "Minimal; mild swelling/bruising may occur",
    },
    {
      title: "PRP Therapy (3 Sessions)",
      price: "£500",
      results: "Gradual improvement in skin quality, texture, and glow",
      duration: "Results last several months with follow-up maintenance",
      sessions: "3 (recommended)",
      time: "30–45 minutes",
      downtime: "Minimal",
    },
    {
      title: "Polynucleotide (PN) Therapy (2–3 Sessions)",
      price: "£350 – £500",
      results: "Increased hydration, elasticity, and tissue regeneration",
      duration: "3–6 months",
      sessions: "2–3 depending on goals",
      time: "30 minutes",
      downtime: "Minimal",
    },
    {
      title: "Laser / Light Therapy (CO₂ / Phototherapy)",
      price: "From £200 per session",
      results: "Reduction in pigmentation, age spots, and wrinkles",
      duration: "Progressive results over weeks",
      sessions: "1–3",
      time: "20–40 minutes",
      downtime: "Mild redness/peeling for a few days",
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
                  Non-Surgical Treatment
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Hand Rejuvenation
                <br />
                for youthful,
                <br />
                smooth hands
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Restore youthfulness, smoothness, and volume to aging hands with
                our advanced non-surgical treatments at Derma Veritas.
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
                  src="/images/professional-aesthetic-consultation-modern-clinic-.png"
                  alt="Professional hand rejuvenation treatment"
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
              What is Hand Rejuvenation?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Hand Rejuvenation is a non-surgical treatment designed to restore
              youthfulness, smoothness, and volume to aging hands. Over time,
              hands often show signs of aging such as volume loss, prominent
              veins, wrinkles, and sun damage. Using advanced techniques, we
              rejuvenate the skin, restore volume, and improve overall texture
              for naturally youthful-looking hands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Benefits Include:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Restores lost volume and plumpness
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Reduces appearance of veins and tendons
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Improves skin quality, hydration, and texture
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Diminishes age spots, fine lines, and wrinkles
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Non-surgical, minimally invasive, and natural-looking results
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
                  Treatments performed only by expert doctors & clinical
                  pharmacy leads
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Combination of advanced injectables and laser-based therapies
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Tailored treatment plans depending on skin type and hand
                  condition
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Safe, effective, and natural-looking rejuvenation
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Minimal downtime with long-lasting results
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BeforeAfterSection would go here if you have hand-specific before/after images */}
      <div ref={beforeAfterSectionRef}>
        <BeforeAfterSection />
      </div>
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
                  Hand Rejuvenation Cost
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
              {treatmentOptions.map((treatment, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-semibold text-gray-900">
                      {treatment.title}
                    </h3>
                    <span className="text-lg font-bold text-gray-900">
                      {treatment.price}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Visible Results:</span>
                      <span className="text-gray-900">{treatment.results}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="text-gray-900">
                        {treatment.duration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sessions:</span>
                      <span className="text-gray-900">
                        {treatment.sessions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Procedure Time:</span>
                      <span className="text-gray-900">{treatment.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Downtime:</span>
                      <span className="text-gray-900">
                        {treatment.downtime}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-4 px-4 py-2 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                    BOOK NOW
                  </button>
                </div>
              ))}
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
