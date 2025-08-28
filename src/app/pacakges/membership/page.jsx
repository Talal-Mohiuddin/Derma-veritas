"use client"

import { BookingModal } from "@/components/booking-modal";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"

export default function ClubMembershipPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Original Club Membership Section */}
            <div className="flex flex-col items-center justify-center px-8 py-16">
                {/* AL Logo */}
                <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mb-12">
                    <span className="text-white text-2xl font-bold">AL</span>
                </div>

                {/* Club Membership Heading */}
                <h1 className="text-5xl lg:text-6xl font-light text-center mb-12">
                    <span className="text-black">Club</span> <span className="text-gray-400">Membership</span>
                </h1>

                {/* Description Text */}
                <p className="text-gray-600 text-lg leading-relaxed text-center max-w-4xl mb-16">
                    We are pleased to offer our clients the opportunity to spread the cost of their favourite advanced skin
                    treatments using a monthly payment system.
                </p>

                <BookingModal>
                    <Button className="relative !px-8 !py-6 text-xs font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide">
                        <span>BOOK A CONSULTATION</span>
                        <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                    </Button>
                </BookingModal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* Left Column - Join Club AL */}
                <div className="bg-white px-12 py-16 flex flex-col justify-center">
                    <div className="text-sm text-gray-500 mb-6 tracking-wide">Club AL</div>

                    <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-8 leading-tight">
                        Join Club AL for Exclusive Membership Perks
                    </h2>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        Get the best possible experience from AL Aesthetics every month. Our team of experienced professionals are
                        equipped to provide tailored packages that suit your needs, ensuring that you get the treatments that will
                        have a positive effect on your skin and confidence.
                    </p>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        What's more, our exclusive offers on treatments make getting the treatments you need easy and affordable.
                        With our membership plans, you can spread the cost and save by paying monthly for your favourite treatments
                        like skincare and injectables, with prices starting from £62 per month.
                    </p>
                </div>

                {/* Right Column - Benefits */}
                <div className="bg-stone-100 px-12 py-16 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">AL</span>
                        </div>
                        <div>
                            <span className="text-2xl font-light text-black">Club</span>
                            <br />
                            <span className="text-2xl font-light text-gray-400">Membership</span>
                        </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-light text-gray-800 mb-8 leading-tight text-center">
                        Club AL comes with a range of benefits for all members, such as:
                    </h3>

                    <ul className="space-y-4 text-gray-700">
                        <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-gray-800 rounded-full mt-3 flex-shrink-0"></span>
                            <span className="text-lg">10% off Obagi or ZO skin health products</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-gray-800 rounded-full mt-3 flex-shrink-0"></span>
                            <span className="text-lg">10% off wellness treatments ( IV Drips, Blood Tests)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-gray-800 rounded-full mt-3 flex-shrink-0"></span>
                            <span className="text-lg">20% off voucher for Friends & Family</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-gray-800 rounded-full mt-3 flex-shrink-0"></span>
                            <span className="text-lg">Exclusive discounts and savings across in clinic services</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-gray-800 rounded-full mt-3 flex-shrink-0"></span>
                            <span className="text-lg">VIP gifts throughout the year</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ProFusion HydraFacial Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4">
                            ProFusion HydraFacial Packages
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Ultimate skin rejuvenation using state-of-the-art ProFusion devices. Combines cutting-edge technology with clinical expertise, using specialized serums, creams, and boosters targeting unique skin concerns.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Signature + RF */}
                        <div className="bg-white border border-gray-200 p-6 shadow-md">
                            <h3 className="text-xl font-light text-gray-800 mb-4">Signature + RF</h3>
                            <p className="text-gray-500 text-sm mb-4">40 minutes</p>
                            <div className="mb-4">
                                <span className="text-2xl font-light">£150</span>
                                <span className="text-gray-500 ml-2">single</span>
                            </div>
                            <div className="mb-6">
                                <span className="text-lg font-medium">£750</span>
                                <span className="text-gray-500 ml-2">for 6 sessions</span>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Cleanse, exfoliate, extraction</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Hydration + RF tightening</span>
                                </li>
                            </ul>
                            <button className="w-full border border-gray-300 px-4 py-2 text-sm font-medium tracking-wider text-gray-700 hover:bg-gray-50 transition-colors">
                                ENQUIRE
                            </button>
                        </div>

                        {/* Deluxe + RF */}
                        <div className="bg-white border border-gray-200 p-6 shadow-md">
                            <h3 className="text-xl font-light text-gray-800 mb-4">Deluxe + RF</h3>
                            <p className="text-gray-500 text-sm mb-4">50 minutes</p>
                            <div className="mb-4">
                                <span className="text-2xl font-light">£180</span>
                                <span className="text-gray-500 ml-2">single</span>
                            </div>
                            <div className="mb-6">
                                <span className="text-lg font-medium">£900</span>
                                <span className="text-gray-500 ml-2">for 6 sessions</span>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Signature treatment + custom booster serum</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>LED therapy + RF</span>
                                </li>
                            </ul>
                            <button className="w-full border border-gray-300 px-4 py-2 text-sm font-medium tracking-wider text-gray-700 hover:bg-gray-50 transition-colors">
                                ENQUIRE
                            </button>
                        </div>

                        {/* Platinum + RF */}
                        <div className="bg-white border border-gray-200 p-6 shadow-md">
                            <h3 className="text-xl font-light text-gray-800 mb-4">Platinum + RF</h3>
                            <p className="text-gray-500 text-sm mb-4">70 minutes</p>
                            <div className="mb-4">
                                <span className="text-2xl font-light">£210</span>
                                <span className="text-gray-500 ml-2">single</span>
                            </div>
                            <div className="mb-6">
                                <span className="text-lg font-medium">£1,050</span>
                                <span className="text-gray-500 ml-2">for 6 sessions</span>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Deluxe treatment + lymphatic drainage</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Advanced RF lifting</span>
                                </li>
                            </ul>
                            <button className="w-full border border-gray-300 px-4 py-2 text-sm font-medium tracking-wider text-gray-700 hover:bg-gray-50 transition-colors">
                                ENQUIRE
                            </button>
                        </div>

                        {/* Elite */}
                        <div className="bg-white border border-gray-200 p-6 shadow-md">
                            <h3 className="text-xl font-light text-gray-800 mb-4">Elite – Cellular Repair & Lift</h3>
                            <p className="text-gray-500 text-sm mb-4">75 minutes</p>
                            <div className="mb-4">
                                <span className="text-2xl font-light">£250</span>
                                <span className="text-gray-500 ml-2">single</span>
                            </div>
                            <div className="mb-6">
                                <span className="text-lg font-medium">£1,250</span>
                                <span className="text-gray-500 ml-2">for 6 sessions</span>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Platinum treatment + enhanced serums</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Deep RF collagen stimulation</span>
                                </li>
                            </ul>
                            <button className="w-full border border-gray-300 px-4 py-2 text-sm font-medium tracking-wider text-gray-700 hover:bg-gray-50 transition-colors">
                                ENQUIRE
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Derma Veritas Signature Packages */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4">
                            Derma Veritas Signature Packages
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Package 1: Glow & Hydrate */}
                        <div className="bg-gray-50 p-8 border border-gray-200">
                            <h3 className="text-2xl font-light text-gray-800 mb-2">Package 1: Glow & Hydrate</h3>
                            <p className="text-gray-600 mb-4">Perfect for: Dull, dry, or tired-looking skin</p>
                            <div className="text-2xl font-light text-gray-800 mb-6">£1,100 + VAT</div>
                            <h4 className="text-lg font-medium text-gray-800 mb-3">Included Treatments (10–12 weeks):</h4>
                            <ul className="space-y-2 text-gray-700 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>1x Facial Analysis</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x ProFusion HydraFacial</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x PRP Facial Rejuvenation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x Polynucleotide Therapy</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Complimentary Skincare Mini Kit</span>
                                </li>
                            </ul>
                            <button className="w-full bg-gray-800 text-white px-4 py-3 text-sm font-medium tracking-wider hover:bg-gray-700 transition-colors">
                                ENQUIRE NOW
                            </button>
                        </div>

                        {/* Package 2: Lift & Reshape */}
                        <div className="bg-gray-50 p-8 border border-gray-200">
                            <h3 className="text-2xl font-light text-gray-800 mb-2">Package 2: Lift & Reshape</h3>
                            <p className="text-gray-600 mb-4">Perfect for: Early signs of aging, sagging, or facial contouring needs</p>
                            <div className="text-2xl font-light text-gray-800 mb-6">£1,950 + VAT</div>
                            <h4 className="text-lg font-medium text-gray-800 mb-3">Included Treatments (10–12 weeks):</h4>
                            <ul className="space-y-2 text-gray-700 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>1x Endolift Treatment (jawline/cheeks)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x RF Microneedling Sessions</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>2x Profhilo Treatments</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>2ml Dermal Filler</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>1x Facial Scan & Aging Report</span>
                                </li>
                            </ul>
                            <button className="w-full bg-gray-800 text-white px-4 py-3 text-sm font-medium tracking-wider hover:bg-gray-700 transition-colors">
                                ENQUIRE NOW
                            </button>
                        </div>

                        {/* Package 3: Correct & Rejuvenate */}
                        <div className="bg-gray-50 p-8 border border-gray-200">
                            <h3 className="text-2xl font-light text-gray-800 mb-2">Package 3: Correct & Rejuvenate</h3>
                            <p className="text-gray-600 mb-4">Perfect for: Acne scars, pigmentation, uneven texture, and skin damage</p>
                            <div className="text-2xl font-light text-gray-800 mb-6">£2,500 + VAT</div>
                            <h4 className="text-lg font-medium text-gray-800 mb-3">Included Treatments (8–12 weeks):</h4>
                            <ul className="space-y-2 text-gray-700 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x CO₂ Fractional Laser Sessions</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x Exosome Therapy with Microneedling</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x Polynucleotide Therapy</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3 Area Neuro-Modulator Treatment (Botox)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>AI-Based Facial Mapping & Progress Tracking</span>
                                </li>
                            </ul>
                            <button className="w-full bg-gray-800 text-white px-4 py-3 text-sm font-medium tracking-wider hover:bg-gray-700 transition-colors">
                                ENQUIRE NOW
                            </button>
                        </div>

                        {/* Package 4: Restore & Prevent Hair Loss */}
                        <div className="bg-gray-50 p-8 border border-gray-200">
                            <h3 className="text-2xl font-light text-gray-800 mb-2">Package 4: Restore & Prevent Hair Loss</h3>
                            <p className="text-gray-600 mb-4">Perfect for: Hair thinning, shedding, or early hair loss</p>
                            <div className="text-2xl font-light text-gray-800 mb-6">£1,190 + VAT</div>
                            <h4 className="text-lg font-medium text-gray-800 mb-3">Included Treatments (16–18 weeks):</h4>
                            <ul className="space-y-2 text-gray-700 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x ExoSignal Hair Treatments</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x Polynucleotides Hair Therapy</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>4x PRP Hair Therapy</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x Hair Plus Treatments</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>4x Phototherapy Sessions</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>ExoHair Home Kit</span>
                                </li>
                            </ul>
                            <p className="text-sm text-gray-600 mb-4">Optional Add-On: Finasteride after consultation</p>
                            <button className="w-full bg-gray-800 text-white px-4 py-3 text-sm font-medium tracking-wider hover:bg-gray-700 transition-colors">
                                ENQUIRE NOW
                            </button>
                        </div>
                    </div>

                    {/* Optional Add-Ons */}
                    <div className="mt-12 bg-gray-100 p-8">
                        <h3 className="text-2xl font-light text-gray-800 mb-6 text-center">Optional Add-Ons (for any package)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-lg font-medium text-gray-800">Dermal Fillers</div>
                                <div className="text-gray-600">from £200 per ml</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-medium text-gray-800">Extra PRP Sessions</div>
                                <div className="text-gray-600">£150 each</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-medium text-gray-800">Profhilo Booster Dose</div>
                                <div className="text-gray-600">£250</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Derma Veritas Elite Membership Program */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4">
                            Derma Veritas Elite Membership Program
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Veritas Glow – Entry Tier */}
                        <div className="bg-white p-8 border border-gray-200 shadow-md">
                            <h3 className="text-2xl font-light text-gray-800 mb-4">Veritas Glow – Entry Tier</h3>
                            <div className="mb-6">
                                <div className="text-lg text-gray-600">Pricing:</div>
                                <div className="text-xl font-medium text-gray-800">£300 upfront + £80/month</div>
                            </div>
                            <h4 className="text-lg font-medium text-gray-800 mb-3">What's Included:</h4>
                            <ul className="space-y-2 text-gray-700 mb-8">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>1x ProFusion HydraFacial</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x RF Microneedling areas in first 3 sessions</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>1x PRP Hair/Face (alternate months)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>10% off all injectables & skincare products</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Priority booking & member-only flash offers</span>
                                </li>
                            </ul>
                            <button className="w-full bg-gray-800 text-white px-4 py-3 text-sm font-medium tracking-wider hover:bg-gray-700 transition-colors">
                                JOIN NOW
                            </button>
                        </div>

                        {/* Veritas Sculpt – Mid Tier */}
                        <div className="bg-white p-8 border border-gray-200 shadow-md relative">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-medium">
                                MOST POPULAR
                            </div>
                            <h3 className="text-2xl font-light text-gray-800 mb-4">Veritas Sculpt – Mid Tier</h3>
                            <div className="mb-6">
                                <div className="text-lg text-gray-600">Pricing:</div>
                                <div className="text-xl font-medium text-gray-800">£350 upfront + £160/month</div>
                            </div>
                            <h4 className="text-lg font-medium text-gray-800 mb-3">What's Included:</h4>
                            <ul className="space-y-2 text-gray-700 mb-8">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x Profhilo (beginning with one top-up)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>1x Botox (3 areas every 3 months)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>1x Laser Hair Removal session (any area)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>1x RF Microneedling or PRP Facial</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>15% off injectables, fillers, and exosomes</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Complimentary facial scan every 3 months</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>VIP event invites & early access to launches</span>
                                </li>
                            </ul>
                            <button className="w-full bg-gray-800 text-white px-4 py-3 text-sm font-medium tracking-wider hover:bg-gray-700 transition-colors">
                                JOIN NOW
                            </button>
                        </div>

                        {/* Veritas Prestige – Luxury Tier */}
                        <div className="bg-white p-8 border border-gray-200 shadow-md">
                            <h3 className="text-2xl font-light text-gray-800 mb-4">Veritas Prestige – Luxury Tier</h3>
                            <div className="mb-6">
                                <div className="text-lg text-gray-600">Pricing:</div>
                                <div className="text-xl font-medium text-gray-800">£500 upfront + £299/month</div>
                            </div>
                            <h4 className="text-lg font-medium text-gray-800 mb-3">Customized package may include:</h4>
                            <ul className="space-y-2 text-gray-700 mb-8">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Endolift (discounted once per year)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>3x CO₂ sessions</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Exosome therapy (1 included per 3 months)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Fillers & Botox at 20% off</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>RF Microneedling</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Laser Hair Removal</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Scalp & Hair Care treatments</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Free Product of the Month</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Members-only transformation days & VIP events</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <span>Annual Skin Health Report + Personalized Future Plan</span>
                                </li>
                            </ul>
                            <button className="w-full bg-gray-800 text-white px-4 py-3 text-sm font-medium tracking-wider hover:bg-gray-700 transition-colors">
                                JOIN NOW
                            </button>
                        </div>
                    </div>

                    {/* Membership Terms */}
                    <div className="mt-12 bg-gray-100 p-8">
                        <h3 className="text-2xl font-light text-gray-800 mb-6 text-center">Membership Terms</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-gray-700">3-month minimum commitment</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-gray-700">Sessions can be banked for 3 months if unused</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-gray-700">Priority booking online or via concierge</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-gray-700">Unused sessions can be gifted once per 6 months</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* Left Column - Treatments Info */}
                <div className="bg-white px-12 py-16 flex flex-col justify-center">
                    <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-8 leading-tight">
                        Receive Your Favourite Treatments Monthly
                    </h2>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        By becoming a Club AL member, you'll be able to get more regular skincare or injectable treatments while
                        also reaping exclusive member-only offers. Plus, with unique packages available, you can rest assured that
                        you're getting the best treatments for your needs.
                    </p>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        Effective skin treatments require planning and effectiveness – and no one understands this better than AL
                        Aesthetics. That is why we are proud to offer our exclusive Club AL Membership, which will help make your
                        regular treatments easier, more affordable and less time-consuming.
                    </p>

                    <p className="text-gray-600 text-lg leading-relaxed mb-12">
                        Enquire today to find out more about Club AL Membership and how it can help you get the best possible
                        experience from AL Aesthetics every month. We look forward to hearing from you.
                    </p>

                    <button className="bg-gray-800 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-gray-700 transition-colors w-fit">
                        ENQUIRE
                    </button>
                </div>

                {/* Right Column - Doctor Image */}
                <div className="bg-gray-50 relative flex items-center justify-center">
                    <div className="relative">
                        <img
                            src="/images/sample_image.jpg"
                            alt="Dr. Ash Labib performing treatment on patient"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg">
                            <div className="text-sm font-medium text-gray-800">Dr. Ash Labib</div>
                            <div className="text-xs text-gray-600">Owner & Founder</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}