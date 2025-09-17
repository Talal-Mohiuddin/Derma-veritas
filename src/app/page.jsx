"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, ShieldCheck, BadgeCheck } from "lucide-react";
import { useState } from "react";
import TreatmentSlider from "@/components/TreatmentSlider";
import ReviewsSection from "@/components/reviews-section";
import ConsultationSection from "@/components/consultation-section";
import BeforeAfterSection from "@/components/before-after-section";
import TechnologiesBrandsSection from "@/components/technologies-brands-section";
import RecentBlogsSection from "@/components/recent-blogs-section";
import Simplicity from "@/components/simplicity";
import ClubMembership from "@/components/ClubMembership";
import MediaCoverage from "@/components/MediaCoverage";
import GallerySection from "@/components/GallerySection";
import Chatwindow from "@/components/Chatwindow";
import { useRouter } from "next/navigation";

import { useStore } from "@/store/zustand";

import { BookingModal } from "@/components/booking-modal";

export default function Home() {
  const [expandedSections, setExpandedSections] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { bookingOpen, setBookingOpen } = useStore();

  // get router instance for navigation
  const router = useRouter();

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleTreatmentsClick = () => {
    router.push("/treatments");
  };

  const handleProductClick = () => {
    router.push("/shop");
  };
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  // Define CSS variables for section styling
  const sectionStyle = {
    "--section-bg": "#f8fafc",
    "--section-fg": "#1e293b",
    "--section-divider": "#e2e8f0",
  };

  const conditions = [
    { name: "Sagging Skin", path: "/treatments/endolift" },
    { name: "Double Chin", path: "/menu/injectables/dermal-fillers" },
    { name: "Eye Bags", path: "/treatments/prp-therapy" },
    { name: "Acne Scars", path: "/treatments/co2" },
    { name: "Stretch Marks", path: "/treatments/microneedling" },
    { name: "Sun Damage", path: "/treatments/exo-nad" },
    { name: "Open Pores", path: "/treatments/rf-microneedling" },
    { name: "Loose skin", path: "/menu/injectables/profhilo" },
    { name: "Early Aging", path: "/menu/injectables/anti-wrinkle-treatment" },
    { name: "Hair Loss", path: "/treatments/prp-therapy" },
    { name: "Postpartum Hair Thinning", path: "/treatments/hair-revitalizing" },
    { name: "Damaged Hair", path: "/treatments/exosignal" },
    { name: "Dark Circles", path: "/menu/injectables/tear-trough-filler" },
    { name: "Sensitive Skin", path: "/treatments/prp-therapy" },
    { name: "Dry Skin", path: "/treatments/exosome-therapy" },
    { name: "Lip Volume Loss", path: "/menu/injectables/dermal-fillers" }
  ];

  return (
    <div className="min-h-screen bg-white" style={sectionStyle}>
      {/* Hero Section */}
      <main className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black">
          <iframe
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${videoLoaded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
            src="https://www.youtube.com/embed/0T9C5RcoLMo?autoplay=1&mute=1&loop=1&playlist=0T9C5RcoLMo&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=0&end=0&version=3&enablejsapi=1"
            title="Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            onLoad={handleVideoLoad}
          />
        </div>
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 pt-40">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-12 max-w-4xl">
            Derma Veritas <br />
            Doctor Led
            <br />
            Skin & Hair Clinic
          </h1>

          {/* Button Container */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Our Treatments Button - Now with onClick handler */}
            <button
              onClick={handleTreatmentsClick}
              className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg text-white font-medium tracking-wide overflow-hidden group transition-all duration-300 hover:bg-white/15 hover:shadow-2xl hover:border-white/40 cursor-pointer"
            >
              <span className="relative z-10">Our Treatments</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-gray-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/60 to-gray-200/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-bottom-left"></div>
            </button>
            {/* Our Products Button */}

            <button
              className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg text-white font-medium tracking-wide overflow-hidden group transition-all duration-300 hover:bg-white/15 hover:shadow-2xl hover:border-white/40"
              onClick={handleProductClick}
            >
              <span className="relative z-10">Our Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-gray-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/60 to-gray-200/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-bottom-left"></div>
            </button>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-16 px-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl p-12 lg:p-12 text-white">
            <div className="text-center space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-3">
                  Start Your Transformation
                </h3>
                <p className="text-gray-300">
                  Book a complimentary consultation with our specialists today.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => setBookingOpen(true)}
                  className="bg-white text-black hover:bg-gray-100 font-semibold py-3 px-6 transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg"
                >
                  BOOK CONSULTATION
                </Button>

                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4" />
                    <span>Expert care</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat */}

      {/* Booking Modal */}
      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        selectedTreatment=""
      />

      {/* About Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
              Expert skin and hair care under the trusted leadership of Dr.
              Mofasher Nawaz and Mr. A. Singh.{" "}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Derma Veritas offers medically-led skin and dermatology clinic in
              the area, founded by a medical doctor and a clinical pharmacist
              with over 10 years experience in advanced skin and hair
              treatments. We specialize in skin resurfacing, facial tightening,
              non- surgical facelifts, and hair restoration, using the latest
              technology for safe, natural results. Our expert team are also
              industry trainers, ensuring the highest standards of care and
              results you can trust.
            </p>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 mt-8 bg-transparent transition-colors"
              onClick={() => (window.location.href = "/about")}
            >
              READ ABOUT US
            </Button>
          </div>
          <div className="relative lg:order-1">
            <img
              src="/owner.png"
              alt="Dr Mofasher Nawaz"
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
              <h3 className="font-semibold text-gray-900">Dr Mofasher Nawaz</h3>
              <p className="text-sm text-gray-600">Owner & Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Treatments */}
      <section className="px-4 py-20 bg-[var(--section-bg)] text-[var(--section-fg)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Treatments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Endolift */}
            <article className="flex gap-4 lg:border-r lg:pr-12 border-[var(--section-divider)]">
              <svg
                className="w-6 h-6 text-gray-400 mt-1 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <div>
                <h3 className="text-2xl font-semibold">Endolift</h3>
                <p className="mt-3 text-gray-600">
                  A revolutionary laser treatment that stimulates collagen
                  production for natural-looking facial contouring.
                </p>
                <a
                  href="/treatments/endolift"
                  className="mt-3 text-black font-medium hover:text-gray-700 inline-block"
                >
                  Learn more
                </a>
              </div>
            </article>

            {/* CO2 Laser */}
            <article className="flex gap-4 lg:border-r lg:pr-12 border-[var(--section-divider)]">
              <svg
                className="w-6 h-6 text-gray-400 mt-1 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
              <div>
                <h3 className="text-2xl font-semibold">CO₂ Fractional Laser</h3>
                <p className="mt-3 text-gray-600">
                  Advanced laser resurfacing treatment that addresses skin
                  imperfections, wrinkles, and scars.
                </p>
                <a
                  href="/treatments/co2"
                  className="mt-3 text-black font-medium hover:text-gray-700 inline-block"
                >
                  Learn more
                </a>
              </div>
            </article>

            {/* Pro Fusion */}
            <article className="flex gap-4 lg:border-r lg:pr-12 border-[var(--section-divider)]">
              <svg
                className="w-6 h-6 text-gray-400 mt-1 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <div>
                <h3 className="text-2xl font-semibold">Pro Fusion</h3>
                <p className="mt-3 text-gray-600">
                  Advanced skin rejuvenation treatment that combines multiple
                  technologies for comprehensive results.
                </p>
                <a
                  href="/pacakges/profusion"
                  className="mt-3 text-black font-medium hover:text-gray-700 inline-block"
                >
                  Learn more
                </a>
              </div>
            </article>

            {/* Quad Laser */}
            <article className="flex gap-4">
              <svg
                className="w-6 h-6 text-gray-400 mt-1 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <div>
                <h3 className="text-2xl font-semibold">Quad Laser</h3>
                <p className="mt-3 text-gray-600">
                  State-of-the-art hair removal technology that targets hair
                  follicles with precision for lasting results.
                </p>
                <a
                  href="/treatments/quad-laser-hair-removal"
                  className="mt-3 text-black font-medium hover:text-gray-700 inline-block"
                >
                  Learn more
                </a>
              </div>
            </article>
          </div>

          {/* All Treatments Button */}
          <div className="text-center mt-16">
            <a
              href="/treatments"
              className="inline-block px-6 py-3 bg-transparent border border-gray-300 text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              View All Treatments
            </a>
          </div>
        </div>
      </section>
      <ConsultationSection />

      {/* Treatments Section */}
      <section
        id="treatments"
        className="bg-[var(--section-bg)] text-[var(--section-fg)] py-20 px-4"
      >
        <div className="max-w-7xl mx-auto text-black">
          {/* Header */}
          <div className="text-center mb-16">
            {/* Common Conditions */}
            <div className="text-center flex gap-10 flex-col">
              <h3 className="text-black text-lg">
                Conditions We Specialize In...
              </h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-4">
                {conditions.map((condition) => (
                  <span
                    key={condition.name}
                    onClick={() => router.push(condition.path)}
                    className="bg-gray-700 text-white px-5 py-2 text-xs uppercase tracking-wide hover:bg-gray-600 transition-colors cursor-pointer rounded-full"
                  >
                    {condition.name}
                  </span>
                ))}
              </div>
              <p className="text-black text-sm uppercase tracking-wider mb-4 ">
                Choose a Treatment
              </p>
            </div>
          </div>

          {/* Treatment Slider */}
          <div className="relative mb-16">
            <TreatmentSlider />
          </div>
        </div>
      </section>

      <ReviewsSection />
      <GallerySection />
      {/* <TechnologiesBrandsSection /> */}

      <Simplicity />

      <ClubMembership />
      <RecentBlogsSection />
      <MediaCoverage />
    </div>
  );
}
