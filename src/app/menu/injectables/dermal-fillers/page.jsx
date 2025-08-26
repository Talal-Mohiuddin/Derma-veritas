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

export default function DermalFillersSection() {
  const [expandedSections, setExpandedSections] = useState({});
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long do dermal filler results last?",
      answer:
        "Results typically last 6-12 months, depending on the treatment area, product used, and your individual skin type and lifestyle factors.",
    },
    {
      question: "What happens at my free consultation?",
      answer:
        "Our specialist will assess your facial structure, discuss your aesthetic goals, and recommend a personalized treatment plan. We'll explain the procedure and answer all your questions.",
    },
    {
      question: "Will there be any aftercare required?",
      answer:
        "Yes. We provide comprehensive aftercare guidance including avoiding strenuous activity, limiting sun exposure, and refraining from touching the treated area for 24 hours.",
    },
    {
      question: "When can I see the results?",
      answer:
        "Results are immediate and visible right after treatment. Full effects become apparent once any minor swelling subsides, typically within 24-48 hours.",
    },
    {
      question: "Are dermal fillers safe?",
      answer:
        "Yes. When administered by qualified professionals using approved products, dermal fillers are considered very safe with minimal risks. Our expert physicians have extensive training and experience.",
    },
    {
      question: "What are the possible side effects?",
      answer:
        "Most side effects are mild and temporary, including slight swelling, redness, or bruising at injection sites. These typically resolve within a few days.",
    },
  ];

  const treatmentAreas = [
    {
      name: "Lip Enhancement",
      description:
        "Full, natural-looking lips with enhanced shape and definition",
      price: "£250",
      volume: "0.5–1.0 ml",
      image: "/images/lip-filler.jpg",
    },
    {
      name: "Cheek Contouring",
      description:
        "Restored volume and lifted contours for youthful appearance",
      price: "£250",
      volume: "0.5–1.0 ml",
      image: "/images/cheek-filler.jpg",
    },
    {
      name: "Jawline Sculpting",
      description: "Sharp, defined jawline with improved facial structure",
      price: "£450",
      volume: "3.0 ml",
      image: "/images/jawline-filler.jpg",
    },
    {
      name: "Tear Trough",
      description:
        "Brightened under-eye area, reduced hollows and tired appearance",
      price: "£450",
      volume: "Variable",
      image: "/images/tear-trough.jpg",
    },
    {
      name: "Non-Surgical Rhinoplasty",
      description: "Balanced nose contours without surgery",
      price: "£450",
      volume: "Variable",
      image: "/images/nose-filler.jpg",
    },
    {
      name: "Russian Lip Technique",
      description: "Lifted, beautifully shaped lips with natural definition",
      price: "£350",
      volume: "Variable",
      image: "/images/russian-lips.jpg",
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
                  Advanced Dermal Filler Treatment
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Restore volume and <br />
                enhance your natural <br />
                beauty with precision
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Discover the art of facial rejuvenation and contouring with
                expert dermal filler treatments at AL Aesthetics.
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
                  alt="Professional dermal filler treatment consultation"
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

      {/* What are Dermal Fillers Section */}
      <section className="py-16 px-4" style={{ backgroundColor: "#f6f6f6" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-gray-600 font-medium">
                  Expert Facial Rejuvenation
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  What are Dermal Fillers?
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Dermal fillers are non-surgical, minimally invasive treatments
                  that add volume, smooth lines, and rejuvenate your appearance.
                  They can enhance lips, cheeks, chin, jawline, and under-eye
                  areas with immediate, safe, and natural-looking results.
                </p>
                <p>
                  Our expert physicians and clinical pharmacy lead specialists
                  use advanced techniques to restore volume, enhance natural
                  contours, and create harmonious facial balance. Every
                  treatment is tailored to your individual facial structure and
                  aesthetic goals.
                </p>
              </div>

              {/* Why Choose Our Clinic */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Why Choose Our Clinic:
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    Treatments performed exclusively by expert physicians
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    Industry-leading trainers with extensive experience
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    Natural, harmonious, and personalized results
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    Safe and effective procedures with minimal downtime
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Treatment Benefits Card */}
            <div className="bg-white border border-gray-200 p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Treatment Benefits
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 py-2">
                  <div className="w-2 h-2 bg-[#272728] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Immediate Results
                    </h4>
                    <p className="text-sm text-gray-600">
                      Visible improvement right after treatment
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2">
                  <div className="w-2 h-2 bg-[#272728] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Natural Enhancement
                    </h4>
                    <p className="text-sm text-gray-600">
                      Maintain your unique facial features
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2">
                  <div className="w-2 h-2 bg-[#272728] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Minimal Downtime
                    </h4>
                    <p className="text-sm text-gray-600">
                      Return to daily activities immediately
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2">
                  <div className="w-2 h-2 bg-[#272728] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Long-Lasting</h4>
                    <p className="text-sm text-gray-600">
                      Results last 6-12 months
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full relative py-3 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide">
                  BOOK FREE CONSULTATION
                  <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Areas Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Treatment Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our expert physicians provide dermal filler treatments for various
              facial areas, each tailored to enhance your natural beauty and
              restore youthful vitality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatmentAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Treatment Image</div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {area.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{area.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        {area.price}
                      </span>
                      <span className="text-sm text-gray-600 ml-2">
                        ({area.volume})
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-2 border border-[#272728] text-[#272728] hover:bg-[#272728] hover:text-white transition-colors">
                    LEARN MORE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfterSection />
      <ReviewsSection />
      <ConsultationSection />

      {/* Comprehensive Pricing Section */}
      <section
        className="py-12 md:py-20 px-4"
        style={{ backgroundColor: "#f6f6f6" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm text-gray-600 font-medium">
              Dermal Filler Costs
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Our Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All of our prices reflect the expertise and experience of our
              team. Contact us to discuss any treatments or create a
              personalized treatment plan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Main Treatments Pricing Card */}
            <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Dermal Filler Treatments
                </h3>
                <button className="px-4 py-2 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                  BOOK NOW
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="flex justify-between items-center py-4">
                  <div>
                    <span className="text-gray-900 font-medium">
                      Lip, Cheek, Chin
                    </span>
                    <div className="text-sm text-gray-600">(0.5–1.0 ml)</div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">£250</span>
                </div>

                <div className="flex justify-between items-center py-4">
                  <div>
                    <span className="text-gray-900 font-medium">
                      Additional 1.0 ml
                    </span>
                    <div className="text-sm text-gray-600">
                      Perfect for refining results
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">£110</span>
                </div>

                <div className="flex justify-between items-center py-4">
                  <div>
                    <span className="text-gray-900 font-medium">
                      Russian Lip Technique
                    </span>
                    <div className="text-sm text-gray-600">
                      Full, lifted, beautifully shaped lips
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">£350</span>
                </div>
              </div>
            </div>

            {/* Premium Treatments Pricing Card */}
            <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Premium Treatments
                </h3>
                <button className="px-4 py-2 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                  BOOK NOW
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="flex justify-between items-center py-4">
                  <div>
                    <span className="text-gray-900 font-medium">
                      Jawline Sculpting
                    </span>
                    <div className="text-sm text-gray-600">
                      (3.0 ml) Sharper facial contour
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">£450</span>
                </div>

                <div className="flex justify-between items-center py-4">
                  <div>
                    <span className="text-gray-900 font-medium">
                      Tear Trough
                    </span>
                    <div className="text-sm text-gray-600">
                      Brightens under-eye area
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">£450</span>
                </div>

                <div className="flex justify-between items-center py-4">
                  <div>
                    <span className="text-gray-900 font-medium">
                      Non-Surgical Rhinoplasty
                    </span>
                    <div className="text-sm text-gray-600">
                      Balanced nose contours
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">£450</span>
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
