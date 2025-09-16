"use client";

import { useStore } from "@/store/zustand";
import {
  Star,
  ChevronDown,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { FaPoundSign } from "react-icons/fa";
import { useState, useRef } from "react";
import BeforeAfterSection from "@/components/before-after-section";
import ClubMembership from "@/components/ClubMembership";
import MediaCoverage from "@/components/MediaCoverage";
import ConsultationSection from "@/components/consultation-section";
import ReviewsSection from "@/components/reviews-section";

export default function PrescriptionSkincareSection() {
  const [expandedSections, setExpandedSections] = useState({});
  const [openIndex, setOpenIndex] = useState(null);
  const pricingSectionRef = useRef(null);
  const beforeAfterSectionRef = useRef(null);

  const { bookingOpen, setBookingOpen } = useStore();

  const cardData = [
    {
      heading: "Targeted Results",
      value: "Clinically proven to treat specific skin concerns",
      icon: CheckCircle,
    },
    {
      heading: "Treatment Duration",
      value: "Varies by condition",
      description: "Typically 3-6 months for optimal results",
      icon: Clock,
    },
    {
      heading: "No. of Products",
      value: "Customized regimen",
      icon: CheckCircle,
    },
    {
      heading: "Application Time",
      value: "Daily routine",
      description: "Integrated into your skincare regimen",
      icon: Clock,
    },
    {
      heading: "Skin Sensitivity",
      value: "Managed through formulation",
      icon: AlertTriangle,
    },
    {
      heading: "Monitoring",
      value: "Regular follow-ups",
      icon: CheckCircle,
    },
    {
      heading: "Side Effects",
      value: "Minimal with proper guidance",
      icon: AlertTriangle,
    },
    {
      heading: "Our Pricing",
      value: "From £60",
      description: "View all",
      icon: FaPoundSign,
    },
  ];

  const faqs = [
    {
      question: "What are prescription skincare treatments?",
      answer:
        "Prescription skincare treatments are clinically guided therapies designed to target specific skin concerns such as acne, hyperpigmentation, and sensitivity. These medical-grade solutions are prescribed after a consultation with our clinical pharmacist or doctor to ensure they are safe, effective, and tailored to your skin's unique needs.",
    },
    {
      question:
        "How do prescription treatments differ from over-the-counter products?",
      answer:
        "Prescription treatments contain higher concentrations of active ingredients and are formulated to target specific dermatological conditions. They are backed by clinical research and require professional oversight to ensure safety and effectiveness, providing personalized solutions beyond standard over-the-counter products.",
    },
    {
      question: "What conditions can prescription skincare treat?",
      answer:
        "Our prescription skincare treatments can address a wide range of concerns including acne, rosacea, hyperpigmentation, melasma, fine lines and wrinkles, excessive oil production, and sensitive or reactive skin conditions.",
    },
    {
      question: "How long until I see results?",
      answer:
        "Results vary depending on your specific skin condition and treatment plan. Most patients begin to see gradual improvement in skin clarity, tone, and texture within 4-8 weeks, with more significant results developing over 3-6 months of consistent use.",
    },
    {
      question: "Is a consultation required?",
      answer:
        "Yes, all prescription skincare treatments require an initial consultation with our clinical pharmacist or doctor. This ensures we understand your skin concerns, medical history, and goals to create a safe and effective personalized treatment plan.",
    },
    {
      question: "How often will I need follow-up appointments?",
      answer:
        "Follow-up frequency depends on your treatment plan but typically occurs every 4-12 weeks. Regular monitoring allows us to track your progress, adjust your regimen as needed, and ensure ongoing safety and effectiveness.",
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
                  Medical-Grade Skincare
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Prescription Skincare
                <br />
                Treatments for
                <br />
                healthier skin
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Clinically guided therapies tailored to your skin's unique needs
                for treating acne, hyperpigmentation, sensitivity, and other
                dermatological conditions.
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

                {/* VIEW PRICES */}
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
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8c2tpbmNhcmUlMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Professional skincare consultation"
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

      {/* Key Information Cards */}
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
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-gray-600" />
                      )}
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
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-gray-600" />
                      )}
                      <span className="text-gray-600 text-sm font-light">
                        {card.heading}
                      </span>
                    </div>
                    <h3 className="text-lg font-light text-gray-900">
                      {card.value}
                    </h3>
                    {card.description && (
                      <p
                        onClick={
                          card.heading === "Our Pricing"
                            ? scrollToPricing
                            : undefined
                        }
                        className={`text-gray-500 text-sm font-light ${
                          card.heading === "Our Pricing"
                            ? "underline cursor-pointer hover:text-gray-700"
                            : ""
                        }`}
                      >
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
              What are Prescription Skincare Treatments?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Prescription Skincare Treatments are clinically guided therapies
              designed to target a wide range of skin concerns such as acne,
              hyperpigmentation, sensitivity, and other common dermatological
              conditions. These treatments are prescribed only after a
              consultation with our clinical pharmacist or doctor, ensuring they
              are safe, effective, and tailored to your skin's unique needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Benefits:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Helps manage and improve acne-prone skin
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Reduces dark spots, uneven tone, and hyperpigmentation
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Calms sensitive or reactive skin
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Supports clearer, healthier, and more balanced complexion
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Provides personalised solutions beyond standard
                  over-the-counter products
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
                  Prescribed after a detailed skin consultation
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  May include topical creams, oral therapies, or combined
                  approaches depending on the condition
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Treatment plans are customised and may involve regular
                  monitoring to track progress
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Medical-grade approach requiring ongoing follow-up to ensure
                  safety, effectiveness, and long-term results
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
            <div className="space-y-4">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto md:mx-0" />
              <h3 className="text-xl font-semibold text-gray-900">
                Gradual Improvement
              </h3>
              <p className="text-gray-600">
                Steady enhancement in skin clarity, tone, and texture with
                consistent use
              </p>
            </div>
            <div className="space-y-4">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto md:mx-0" />
              <h3 className="text-xl font-semibold text-gray-900">
                Reduction in Concerns
              </h3>
              <p className="text-gray-600">
                Noticeable decrease in breakouts, irritation, or pigmentation
                over time
              </p>
            </div>
            <div className="space-y-4">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto md:mx-0" />
              <h3 className="text-xl font-semibold text-gray-900">
                Healthier Skin
              </h3>
              <p className="text-gray-600">
                Development of more resilient, balanced skin with continued
                treatment
              </p>
            </div>
            <div className="space-y-4">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto md:mx-0" />
              <h3 className="text-xl font-semibold text-gray-900">
                Optimal Outcomes
              </h3>
              <p className="text-gray-600">
                Best results achieved when combined with professional skincare
                advice and lifestyle support
              </p>
            </div>
          </div>
        </div>
      </section>

      <div ref={beforeAfterSectionRef}>
        <BeforeAfterSection />
      </div>

      <ConsultationSection />

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
                  Prescription Skincare Cost
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                  Our Pricing
                </h2>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  All treatments are prescribed after a thorough consultation
                  with our clinical pharmacist or doctor. Our pricing reflects
                  the personalized approach and medical-grade formulations that
                  deliver results beyond standard over-the-counter products.
                </p>
                <p>
                  If you would like to discuss which treatment might be right
                  for your skin concerns, please
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="underline hover:text-gray-900 transition-colors mx-1"
                  >
                    book a consultation
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Right Pricing Cards */}
            <div className="space-y-6">
              {/* Consultation Pricing */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Initial Consultation
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
                      Skin Assessment & Treatment Plan:
                    </span>
                    <span className="text-lg font-bold text-gray-900">£60</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Consultation fee is deductible from any prescribed treatment
                    costs
                  </div>
                </div>
              </div>

              {/* Treatment Pricing */}
              <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Prescription Treatments
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
                    <span className="text-gray-700">Topical Formulations:</span>
                    <span className="text-lg font-bold text-gray-900">
                      From £40
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Oral Medications:</span>
                    <span className="text-lg font-bold text-gray-900">
                      From £25
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Combination Therapy:</span>
                    <span className="text-lg font-bold text-gray-900">
                      From £65
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">
                      Follow-up Consultations:
                    </span>
                    <span className="text-lg font-bold text-gray-900">£30</span>
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
    </>
  );
}
