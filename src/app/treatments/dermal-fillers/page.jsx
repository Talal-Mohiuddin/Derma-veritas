"use client"

import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { useState } from "react"
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



import ReviewsSection from "@/components/reviews-section"
import ConsultationSection from "@/components/consultation-section"


export default function DermalFillersSection() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [expandedSections, setExpandedSections] = useState({})
    const [isClinicsOpen, setIsClinicsOpen] = useState(false)


    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "When can I see the results?",
            answer:
                "You may begin to see results within 3–5 days after treatment, with full effects visible after about 2 weeks."
        },
        {
            question: "What happens at my free consultation?",
            answer:
                "At your consultation, our specialist will assess your needs, discuss your goals, and recommend the most suitable treatment plan tailored specifically for you."
        },
        {
            question: "Will there be any aftercare?",
            answer:
                "Yes. We provide full aftercare guidance including avoiding strenuous activity, limiting sun exposure, and refraining from touching the treated area for 24 hours."
        },
        {
            question: "How long do the results last?",
            answer:
                "Results typically last between 3 to 6 months, depending on your individual skin type, lifestyle, and how your body responds to the treatment."
        },
        {
            question: "Are Botox injections safe?",
            answer:
                "Yes. When administered by trained professionals, Botox is considered a safe and FDA-approved procedure with minimal risks."
        },
        {
            question: "Are there any side effects of wrinkle injections?",
            answer:
                "Most side effects are mild and temporary, such as slight redness, swelling, or bruising at the injection site. These usually resolve within a few days."
        }
    ]

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
                            <span className="text-white font-bold text-lg">AL</span>
                        </div>
                        <span className="text-2xl font-light text-black">Aesthetics</span>
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
                                    Dermal Fillers
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Define, contour & <br /> sculpt your skin
                            </h2>

                            {/* Description */}
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                                Revitalise your natural beauty using Dermal Fillers at AL
                                Aesthetics.
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
                                    alt="Professional dermal filler treatment being administered to a woman"
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



            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <PriceCard />
                </div>
            </section>


            <BotoxSection />




            <BeforeAfterSection />
            <ReviewsSection />

            <ConsultationSection />


            <section className="py-12 md:py-20 px-4" style={{ backgroundColor: "#f6f6f6" }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-sm text-gray-600 font-medium">Botox Cost</span>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                                    Our Pricing
                                </h2>
                            </div>

                            <div className="text-gray-600 leading-relaxed space-y-4">
                                <p>
                                    All of our prices are reflective of the expertise & experience of
                                    our team. If you would like to discuss any of our treatments, please
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
                            {/* Midlands Pricing Card */}
                            <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-base font-semibold text-gray-900">
                                        Botox Pricing (Midlands)
                                    </h3>
                                    <button className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                                        BOOK
                                    </button>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-gray-700">One Area:</span>
                                        <span className="text-lg font-bold text-gray-900">£180</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-gray-700">Two Areas:</span>
                                        <span className="text-lg font-bold text-gray-900">£280</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-gray-700">Three Areas:</span>
                                        <span className="text-lg font-bold text-gray-900">£320</span>
                                    </div>
                                </div>
                            </div>

                            {/* London Pricing Card */}
                            <div className="border border-gray-200 p-6 bg-white shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-base font-semibold text-gray-900">
                                        Botox Pricing (London)
                                    </h3>
                                    <button className="px-4 py-1 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                                        BOOK
                                    </button>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-gray-700">One Area:</span>
                                        <span className="text-lg font-bold text-gray-900">£185</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-gray-700">Two Areas:</span>
                                        <span className="text-lg font-bold text-gray-900">£285</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-gray-700">Three Areas:</span>
                                        <span className="text-lg font-bold text-gray-900">£385</span>
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
