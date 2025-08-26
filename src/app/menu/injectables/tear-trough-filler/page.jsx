"use client"

import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { useState, useRef } from "react"
import ClinicsModal from "@/app/modal/ClinicsModal"
import PriceCard from "@/components/pricecard/price-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Play } from "lucide-react"
import BeforeAfterSection from "@/components/before-after-section"
import Footer from "@/components/Footer"
import ClubMembership from "@/components/ClubMembership"
import MediaCoverage from "@/components/MediaCoverage"
import MobileMenuDrawer from "@/components/MobileMenuDrawer"
import BotoxSection from "@/components/BotoxSection"
import { Eye, CheckCircle, RotateCcw, Clock, Frown, TrendingDown, AlertTriangle, KeyRound as Pound } from "lucide-react";

import ReviewsSection from "@/components/reviews-section"
import ConsultationSection from "@/components/consultation-section"

export default function TearTroughFillerSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({})
  const [isClinicsOpen, setIsClinicsOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(null);
  
  // Create a ref for the pricing section
  const pricingSectionRef = useRef(null);

  const cardData = [
    {
      heading: "Results Seen",
      value: "Immediately",
      description: "Brighter, smoother under-eye area"
    },
    {
      heading: "Results Last",
      value: "6–12 Months"
    },
    {
      heading: "No. of Sessions",
      value: "1 Treatment"
    },
    {
      heading: "Procedure Time",
      value: "30-45 Minutes"
    },
    {
      heading: "Pain",
      value: "Mild",
      description: "Numbing Available"
    },
    {
      heading: "Downtime",
      value: "Minimal",
      description: "Slight swelling/bruising may last 24-48 hours"
    },
    {
      heading: "Side Effects",
      value: "Temporary redness, bruising, tenderness"
    },
    {
      heading: "Our Pricing",
      value: "£450",
      description: "View all"
    }
  ];

  const faqs = [
    {
      question: "What is Tear Trough Filler?",
      answer: "Tear Trough Filler is a non-surgical treatment designed to reduce hollows, dark circles, and tired appearance under the eyes. Using a soft hyaluronic acid filler, this treatment restores lost volume and brightens the under-eye area for a refreshed, youthful look."
    },
    {
      question: "When can I see the results?",
      answer: "Results are visible immediately with a brighter, smoother under-eye area."
    },
    {
      question: "How long do the results last?",
      answer: "Results typically last 6-12 months, depending on individual factors."
    },
    {
      question: "Is the procedure painful?",
      answer: "Most patients experience mild discomfort. Numbing cream can be applied to minimize any pain during treatment."
    },
    {
      question: "What is the downtime?",
      answer: "There is minimal downtime. Some patients may experience slight swelling or bruising for 24-48 hours."
    },
    {
      question: "Who performs the treatment?",
      answer: "All treatments are performed exclusively by our expert physicians and clinical pharmacy leads who are industry-leading trainers."
    }
  ];

  // Function to scroll to pricing section
  const scrollToPricing = () => {
    if (pricingSectionRef.current) {
      pricingSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <>
      {/* Top Header with CALL + CLINIC */}
      <header className="bg-gray-100 px-4 py-2">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Left - Call Us */}
          <div
            onClick={() => setIsClinicsOpen(true)}
            className="flex items-center gap-1 text-gray-600 text-sm font-medium cursor-pointer"
          >
            CALL US
            <ChevronDown className="w-4 h-4" />
          </div>

          {/* Right - Find a Clinic */}
          <div
            onClick={() => setIsClinicsOpen(true)}
            className="flex items-center gap-1 text-gray-600 text-sm font-medium cursor-pointer"
          >
            FIND A CLINIC
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-white px-4 py-4 border-b sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black flex items-center justify-center">
              <span className="text-white font-bold text-lg">DV</span>
            </div>
            <span className="text-2xl font-light text-black">Derma Veritas</span>
          </div>

          {/* Right - Buttons */}
          <div className="flex items-center gap-3">
            {/* Gradient Book Consultation */}
            <button className="relative px-6 py-3 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide">
              BOOK A CONSULTATION
              <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
            </button>

            {/* MENU Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center justify-between px-4 py-2 border border-gray-300 bg-white rounded-none"
            >
              <span className="text-xs font-medium text-gray-800 mr-3">MENU</span>
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileMenuDrawer isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

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
                Tear Trough Filler<br />for brighter,<br />refreshed eyes
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Reduce hollows and dark circles with our specialized under-eye filler treatment at Derma Veritas.
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
                  src="/images/professional-aesthetic-consultation-modern-clinic-.png"
                  alt="Professional tear trough filler treatment being administered"
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

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-[-4px_4px_0_0_rgba(0,0,0,0.1)]">
            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <Eye className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">{cardData[0].heading}</span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-1">{cardData[0].value}</h3>
                <p className="text-gray-500 text-sm font-light">{cardData[0].description}</p>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">{cardData[1].heading}</span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-1">{cardData[1].value}</h3>
                {cardData[1].description && (
                  <p className="text-gray-500 text-sm font-light">{cardData[1].description}</p>
                )}
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">{cardData[2].heading}</span>
                </div>
                <h3 className="text-lg font-light text-gray-900">{cardData[2].value}</h3>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">{cardData[3].heading}</span>
                </div>
                <h3 className="text-lg font-light text-gray-900">{cardData[3].value}</h3>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <Frown className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">{cardData[4].heading}</span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-1">{cardData[4].value}</h3>
                <p className="text-gray-500 text-sm font-light">{cardData[4].description}</p>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <TrendingDown className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">{cardData[5].heading}</span>
                </div>
                <h3 className="text-lg font-light text-gray-900">{cardData[5].value}</h3>
                {cardData[5].description && (
                  <p className="text-gray-500 text-sm font-light">{cardData[5].description}</p>
                )}
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <AlertTriangle className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">{cardData[6].heading}</span>
                </div>
                <h3 className="text-lg font-light text-gray-900">{cardData[6].value}</h3>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <Pound className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm font-light">{cardData[7].heading}</span>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-1">{cardData[7].value}</h3>
                <p className="text-gray-500 text-sm font-light underline cursor-pointer hover:text-gray-700">
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
              What is Tear Trough Filler?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Tear Trough Filler is a non-surgical treatment designed to reduce hollows, dark circles, and tired appearance under the eyes. 
              Using a soft hyaluronic acid filler, this treatment restores lost volume and brightens the under-eye area for a refreshed, youthful look.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Benefits Include:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Reduces hollowness and under-eye shadows
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Minimizes appearance of dark circles
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Restores youthful volume and smoothness
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Immediate, natural-looking results
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Non-surgical with little downtime
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Why Choose Our Clinic:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Performed only by skilled doctors & clinical pharmacy leads
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Safe and precise injection technique
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Tailored approach for natural, refreshed results
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Minimal downtime with long-lasting improvements
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BotoxSection />

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
                <span className="text-sm text-gray-600 font-medium">Tear Trough Filler Cost</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Our Pricing
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  All treatments are performed exclusively by our expert physicians and clinical pharmacy leads 
                  who are industry-leading trainers. Our pricing reflects the expertise and premium service 
                  you receive.
                </p>
                <p>
                  If you would like to discuss any of our treatments, please feel free to{" "}
                  <button className="underline hover:text-gray-900 transition-colors">
                    get in touch
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Right Pricing Cards */}
            <div className="space-y-6">
              {/* Tear Trough Filler Pricing */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Tear Trough Filler
                  </h3>
                  <button className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                    BOOK
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Tear Trough Treatment:</span>
                    <span className="text-lg font-bold text-gray-900">£450</span>
                  </div>
                </div>
              </div>

              {/* Other Dermal Filler Treatments */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Other Dermal Filler Treatments
                  </h3>
                  <button className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                    BOOK
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Lip, Cheek, Chin (0.5-1.0ml):</span>
                    <span className="text-lg font-bold text-gray-900">£250</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Jawline (3.0ml):</span>
                    <span className="text-lg font-bold text-gray-900">£450</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Russian Lip Technique:</span>
                    <span className="text-lg font-bold text-gray-900">£350</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Additional 1.0ml:</span>
                    <span className="text-lg font-bold text-gray-900">£110</span>
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
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center py-4 text-left text-lg font-medium text-gray-900 focus:outline-none"
              >
                {faq.question}
                <ChevronDown
                  className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
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
      <Footer />
    </>
  )
}