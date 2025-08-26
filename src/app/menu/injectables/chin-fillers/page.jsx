"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
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
import ReviewsSection from "@/components/reviews-section";
import ConsultationSection from "@/components/consultation-section";

export default function ChinFillerSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long do chin filler results last?",
      answer:
        "Chin filler results typically last 6-12 months, depending on your individual skin type, lifestyle, and how your body responds to the treatment.",
    },
    {
      question: "What happens at my free consultation?",
      answer:
        "At your consultation, our specialist will assess your facial structure, discuss your goals, and recommend the most suitable treatment plan tailored specifically for you.",
    },
    {
      question: "Will there be any aftercare?",
      answer:
        "Yes. We provide full aftercare guidance including avoiding strenuous activity, limiting sun exposure, and refraining from touching the treated area for 24 hours.",
    },
    {
      question: "When can I see the results?",
      answer:
        "Results are immediate and visible right after treatment, with full effects becoming apparent once any minor swelling subsides within 24-48 hours.",
    },
    {
      question: "Are dermal fillers safe?",
      answer:
        "Yes. When administered by trained professionals, dermal fillers are considered safe with minimal risks. Our expert physicians use only high-quality, approved products.",
    },
    {
      question: "Are there any side effects?",
      answer:
        "Most side effects are mild and temporary, such as slight swelling, redness, or bruising at the injection site. These usually resolve within a few days.",
    },
  ];

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
                  Dermal Filler Treatment
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Define and <br />
                contour your chin <br />
                for perfect balance
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Enhance your facial profile with precise chin filler treatments
                at AL Aesthetics, creating natural definition and harmony.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-center md:justify-start gap-4 flex-wrap">
                {/* VIEW RESULTS */}
                <button className="relative px-8 py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wider">
                  VIEW RESULTS
                  <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>

                {/* VIEW PRICES */}
                <button className="relative px-8 py-4 text-sm font-bold uppercase text-[#272728] bg-white border-2 border-[#272728] rounded-none tracking-wider hover:bg-[#272728] hover:text-white transition-colors">
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
                  alt="Professional chin filler treatment consultation"
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

        <ClinicsModal
          isOpen={isClinicsOpen}
          onClose={() => setIsClinicsOpen(false)}
        />
      </section>

      {/* Treatment Details Section */}
      <section className="py-16 px-4" style={{ backgroundColor: "#f6f6f6" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-gray-600 font-medium">
                  Advanced Dermal Filler Treatment
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Chin Filler Treatment
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Our expert physicians and clinical pharmacy lead specialists
                  use advanced techniques to enhance your chin's natural
                  contours. Chin filler treatments restore volume, enhance
                  natural contours, and create a balanced, harmonious facial
                  profile.
                </p>
                <p>
                  The treatment adds definition to a weak chin, improves facial
                  symmetry, and creates better proportions between your jawline
                  and other facial features. Results are immediate, safe, and
                  designed to maintain a natural look.
                </p>
              </div>

              {/* Treatment Benefits */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Treatment Benefits:
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    Enhanced chin projection and definition
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    Improved facial balance and proportions
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    Natural-looking, immediate results
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    Minimal downtime and discomfort
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Treatment Details Card */}
            <div className="bg-white border border-gray-200 p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Treatment Details
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">
                    Visible Results:
                  </span>
                  <span className="text-gray-900 text-sm">
                    Enhanced shape, lift, and volume
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Duration:</span>
                  <span className="text-gray-900 text-sm">6–12 months</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Sessions:</span>
                  <span className="text-gray-900 text-sm">Typically 1</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">
                    Procedure Time:
                  </span>
                  <span className="text-gray-900 text-sm">30–45 minutes</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Discomfort:</span>
                  <span className="text-gray-900 text-sm">Mild</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Downtime:</span>
                  <span className="text-gray-900 text-sm">Minimal</span>
                </div>

                <div className="flex justify-between items-start py-2">
                  <span className="text-gray-700 font-medium">
                    Side Effects:
                  </span>
                  <span className="text-gray-900 text-sm text-right">
                    Temporary swelling,
                    <br />
                    redness, or bruising
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-gray-900">£250</span>
                  <span className="text-sm text-gray-600">(0.5–1.0 ml)</span>
                </div>

                <button className="w-full relative py-3 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide">
                  BOOK CONSULTATION
                  <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterSection />
      <ReviewsSection />
      <ConsultationSection />

      {/* Pricing Section */}
      <section
        className="py-12 md:py-20 px-4"
        style={{ backgroundColor: "#f6f6f6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-gray-600 font-medium">
                  Chin Filler Cost
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Our Pricing
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  All of our prices are reflective of the expertise & experience
                  of our team. If you would like to discuss any of our
                  treatments, please feel free to{" "}
                  <button className="underline hover:text-gray-900 transition-colors">
                    get in touch
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Right Pricing Cards */}
            <div className="space-y-6">
              {/* Chin Filler Pricing Card */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Chin Filler Pricing
                  </h3>
                  <button className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                    BOOK
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Chin (0.5–1.0 ml):</span>
                    <span className="text-lg font-bold text-gray-900">
                      £250
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Additional 1.0 ml:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £110
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">
                    Perfect for enhancing chin definition and creating facial
                    balance
                  </p>
                </div>
              </div>

              {/* Additional Services Card */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Related Treatments
                  </h3>
                </div>

                <div className="divide-y divide-gray-200">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Jawline (3.0 ml):</span>
                    <span className="text-lg font-bold text-gray-900">
                      £450
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Lip, Cheek, Chin:</span>
                    <span className="text-lg font-bold text-gray-900">
                      £250
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
