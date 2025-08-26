"use client";

import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
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

export default function Home() {

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <main className="relative h-screen overflow-hidden">
        <iframe
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src="https://www.youtube.com/embed/0T9C5RcoLMo?autoplay=1&mute=1&loop=1&playlist=0T9C5RcoLMo&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=0&end=0&version=3&enablejsapi=1&origin=window.location.origin"
          title="Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <p className="text-white/80 text-lg mb-6 font-light">
            Facial Aesthetics Clinic
          </p>
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-12 max-w-4xl">
            Award-Winning <br /> Aesthetics <br /> & Wellness Clinic
          </h1>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-500 font-bold text-xs">G</span>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  ★
                </span>
              ))}
            </div>
            <span className="text-white/80 text-sm">Read Reviews</span>
          </div>
          <Button className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 text-sm font-medium">
            BOOK YOUR CONSULTATION
          </Button>
        </div>
      </main>

      {/* Floating Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-3 flex items-center gap-3 shadow-lg">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Make an Enquiry</span>
          </Button>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </div>
        </div>
      </div>

      {/* Dr. Ash Labib Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
              Prestigious clinics led by renowned specialist Dr. Ash Labib
            </h2>
            <p className="text-gray-600 leading-relaxed">
              With an impressive track record of over 10 years in the industry,
              our CQC registered clinic...
            </p>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 mt-8 bg-transparent"
            >
              READ ABOUT US
            </Button>
          </div>
          <div className="relative lg:order-1">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Xe7zBTmvge6sJSjacUNr8cFiMQyOwT.png"
              alt="Dr. Ash Labib"
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
              <h3 className="font-semibold text-gray-900">Dr. Ash Labib</h3>
              <p className="text-sm text-gray-600">Owner & Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Credentials */}
      <section className="px-4 py-16 bg-[var(--section-bg)] text-[var(--section-fg)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          <article className="flex gap-4">
            <ShieldCheck className="w-6 h-6 text-gray-400 mt-1 shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold">Qualified Injectors</h3>
              <p className="mt-3">
                All practitioners at AL Aesthetics are trained by Dr Ash
                Labib...
              </p>
            </div>
          </article>
          <article className="flex gap-4 lg:border-l lg:pl-12 border-[var(--section-divider)]">
            <ShieldCheck className="w-6 h-6 text-gray-400 mt-1 shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold">Quality Assured</h3>
              <p className="mt-3">
                All injectable treatments are carried out using high-quality
                brands...
              </p>
            </div>
          </article>
          <article className="flex gap-4 lg:border-l lg:pl-12 border-[var(--section-divider)]">
            <BadgeCheck className="w-6 h-6 text-gray-400 mt-1 shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold">Allergan UK Ambassador</h3>
              <p className="mt-3">
                Dr. Ash Labib is a member of the Allergan Medical Institute...
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Treatments Section */}
      <section id="treatments" className="bg-black py-20">
        <div>
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
              — Choose a Treatment
            </p>
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Relax, Rejuvenate,
              <br />
              Refresh, Renew.
            </h2>
          </div>

          {/* Treatment Slider */}
          <div className="relative mb-16">
            <TreatmentSlider />
          </div>

          {/* Common Conditions */}
          <div className="text-center px-4">
            <h3 className="text-white text-lg mb-8">
              Common Conditions we treat...
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "CROW'S FEET",
                "EYE BAGS / DARK CIRCLES",
                "SAGGING JOWLS",
                "PEBBLED CHIN",
                "FROWN LINES",
                "FOREHEAD LINES",
                "TEMPLE HOLLOWS",
                "BUMP ON NOSE",
                "GUMMY SMILE",
              ].map((condition) => (
                <span
                  key={condition}
                  className="bg-gray-700 text-white px-4 py-2 text-xs uppercase tracking-wide hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
      <ConsultationSection />
      <BeforeAfterSection />
      <TechnologiesBrandsSection />
      <RecentBlogsSection />
      <Simplicity />
      <ClubMembership />
      <MediaCoverage />
    </div>
  );
}
