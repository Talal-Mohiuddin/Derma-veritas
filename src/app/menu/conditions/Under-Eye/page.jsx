"use client";

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
  Droplets,
  HeartPulse,
  Shield,
  Sparkles,
  Zap,
  Circle,
} from "lucide-react";

import ReviewsSection from "@/components/reviews-section";
import ConsultationSection from "@/components/consultation-section";

export default function UnderEyeTreatments() {
  const [expandedSections, setExpandedSections] = useState({});
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Create a ref for the pricing section
  const pricingSectionRef = useRef(null);

  const cardData = [
    {
      heading: "Visible Results",
      value: "Brightened under-eye area",
      description: "Reduced dark circles, hollows, and puffiness",
      icon: Eye,
    },
    {
      heading: "Results Last",
      value: "3–12 Months",
      description: "Depending on treatment choice",
      icon: CheckCircle,
    },
    {
      heading: "No. of Sessions",
      value: "1–3 Sessions",
      description: "Depending on treatment selected",
      icon: RotateCcw,
    },
    {
      heading: "Procedure Time",
      value: "20–45 Minutes",
      description: "Depending on treatment",
      icon: Clock,
    },
    {
      heading: "Discomfort",
      value: "Mild",
      icon: Frown,
    },
    {
      heading: "Downtime",
      value: "Minimal",
      icon: TrendingDown,
    },
    {
      heading: "Side Effects",
      value: "Temporary redness, mild swelling",
      icon: AlertTriangle,
    },
    {
      heading: "Our Pricing",
      value: "From £220",
      description: "View all treatments",
      icon: Pound,
    },
  ];

  const benefits = [
    {
      title: "Brightens Under-Eye Area",
      description: "Reduces dark circles and tired appearance",
      icon: Sparkles,
    },
    {
      title: "Restores Volume",
      description: "Reduces hollows and restores youthful vitality",
      icon: Droplets,
    },
    {
      title: "Smooths Fine Lines",
      description: "Reduces puffiness and smooths wrinkles",
      icon: HeartPulse,
    },
    {
      title: "Safe & Effective",
      description: "Natural treatments with proven results",
      icon: Shield,
    },
  ];

  const treatments = [
    {
      name: "Tear Trough Fillers",
      price: "£450",
      description: "Specialized dermal fillers for under-eye hollows",
      details: "Restores volume and reduces dark circles caused by shadows"
    },
    {
      name: "PRP Under-Eye Area",
      price: "£300",
      sessions: "(3 Sessions)",
      description: "Platelet-rich plasma therapy using your own blood",
      details: "Stimulates collagen production and tissue regeneration"
    },
    {
      name: "Polynucleotide Eye Area",
      price: "£220",
      sessions: "(1 Session)",
      description: "Advanced regenerative treatment for eye area",
      details: "Improves skin quality, hydration, and elasticity"
    },
    {
      name: "Polynucleotide Eye Area",
      price: "£400",
      sessions: "(2 Sessions)",
      description: "Package deal for enhanced results",
      details: "Best for moderate under-eye concerns"
    },
    {
      name: "Polynucleotide Eye Area",
      price: "£550",
      sessions: "(3 Sessions)",
      description: "Complete treatment course for optimal results",
      details: "Ideal for significant rejuvenation and long-lasting effects"
    },
    {
      name: "Endolift Upper Face/Malar Bags",
      price: "£1,500 + VAT",
      description: "Laser treatment for under-eye bags and puffiness",
      details: "Non-surgical laser solution for under-eye bags and tightening"
    }
  ];

  const faqs = [
    {
      question: "What are Under Eye Treatments?",
      answer:
        "Specialized treatments designed to address under-eye concerns including dark circles, hollows, fine lines, and tired appearance. Multiple treatment options available using advanced techniques to restore brightness and youthful appearance to the delicate under-eye area.",
    },
    {
      question: "Which treatment is right for me?",
      answer:
        "The best treatment depends on your specific concerns. Tear trough fillers are ideal for hollows and volume loss, PRP is great for overall rejuvenation and dark circles, polynucleotide treatments improve skin quality, and Endolift addresses under-eye bags. During your consultation, our experts will recommend the most suitable option for your needs.",
    },
    {
      question: "Is the treatment painful?",
      answer:
        "Most patients experience only mild discomfort. We use topical anesthetics and precise techniques to ensure your comfort throughout the procedure.",
    },
    {
      question: "How long do results last?",
      answer:
        "Results typically last 3-12 months depending on the treatment chosen. Maintenance sessions can help sustain your results long-term.",
    },
    {
      question: "What is the recovery time?",
      answer:
        "There is minimal downtime with under-eye treatments. You may experience slight redness or swelling for a few hours to a day, but most people return to normal activities immediately.",
    },
    {
      question: "Who performs the treatments?",
      answer:
        "All treatments are performed exclusively by our expert physicians and clinical pharmacy leads who are industry-leading trainers with extensive experience in under-eye rejuvenation.",
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
                  Specialized Eye Treatments
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Under Eye
                <br />
                Treatments for
                <br />
                brighter eyes
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Advanced treatments designed to address dark circles, hollows, 
                fine lines, and tired appearance. Restore brightness and youthful 
                vitality to your delicate under-eye area at Derma Veritas.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-center md:justify-start gap-4 flex-wrap">
                {/* VIEW RESULTS */}
                <button className="relative px-8 py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wider">
                  VIEW RESULTS
                  <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>

                {/* VIEW PRICES - Updated to call scrollToPricing */}
                <button
                  onClick={scrollToPricing}
                  className="relative px-8 py-4 text-sm font-bold uppercase text-[#272728] bg-white border-2 border-[#272728] rounded-none tracking-wider hover:bg-[#272728] hover:text-white transition-colors"
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
                  src="/images/under-eye-treatment.png"
                  alt="Under eye treatment being administered"
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
              {cardData.slice(0, 4).map((card, index) => {
                const IconComponent = card.icon;
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
                    {card.description && (
                      <p className="text-gray-500 text-sm font-light">
                        {card.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              {cardData.slice(4, 8).map((card, index) => {
                const IconComponent = card.icon;
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
                    {card.description && (
                      <p className="text-gray-500 text-sm font-light">
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
              What are Under Eye Treatments?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Under eye treatments are specialized procedures designed to address various concerns 
              including dark circles, hollows, fine lines, and tired appearance. We offer multiple 
              advanced treatment options to restore brightness and youthful vitality to the delicate 
              under-eye area, tailored to your specific needs and goals.
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
                  Brightens under-eye area and reduces dark circles
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Reduces hollows and tired appearance
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Smooths fine lines and reduces puffiness
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Restores youthful volume and vitality
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Natural, safe, and effective results
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Treatment Options:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-medium">Tear Trough Fillers:</span> For volume restoration
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-medium">PRP Therapy:</span> Natural rejuvenation
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-medium">Polynucleotide:</span> Skin quality improvement
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-medium">Endolift:</span> Laser treatment for bags
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-medium">Combination Treatments:</span> Enhanced results
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Treat Under Eye Concerns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-50 rounded-full">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
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
                  Under Eye Treatments Cost
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Our Pricing
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  We offer multiple treatment options to address various under-eye concerns. 
                  All treatments are performed exclusively by our expert physicians and 
                  clinical pharmacy leads who are industry-leading trainers.
                </p>
                <p>
                  During your consultation, we'll recommend the most suitable treatment 
                  based on your specific concerns and goals.
                </p>
              </div>
            </div>

            {/* Right Pricing Cards */}
            <div className="space-y-6">
              {/* Treatment Pricing */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Under Eye Treatments
                  </h3>
                  <button className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                    BOOK
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  {treatments.map((treatment, index) => (
                    <div key={index} className="py-3">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <span className="text-gray-900 font-medium">
                            {treatment.name}
                          </span>
                          {treatment.sessions && (
                            <span className="text-gray-600 text-sm ml-2">
                              {treatment.sessions}
                            </span>
                          )}
                        </div>
                        <span className="text-lg font-bold text-gray-900">
                          {treatment.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {treatment.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {treatment.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Our Clinic */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Why Choose Our Clinic
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Treatments performed exclusively by expert physicians and clinical pharmacy leads
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Industry-leading trainers with extensive experience
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Multiple treatment options to suit individual needs and goals
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Safe, natural, and effective under-eye rejuvenation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Personalized consultation to design treatment plan specific to your concerns
                  </li>
                </ul>
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
          <button className="relative px-6 py-3 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide">
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