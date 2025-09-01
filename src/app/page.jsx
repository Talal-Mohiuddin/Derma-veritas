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
import Chatwindow from "@/components/Chatwindow";
import { useRouter } from 'next/navigation';
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
    router.push('/treatments');
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  // Define CSS variables for section styling
  const sectionStyle = {
    '--section-bg': '#f8fafc',
    '--section-fg': '#1e293b',
    '--section-divider': '#e2e8f0'
  };

  const conditions = [
    "CROW'S FEET",
    "EYE BAGS / DARK CIRCLES",
    "SAGGING JOWLS",
    "PEBBLED CHIN",
    "FROWN LINES",
    "FOREHEAD LINES",
    "TEMPLE HOLLOWS",
    "BUMP ON NOSE",
    "GUMMY SMILE",
  ];

  return (
    <div className="min-h-screen bg-white" style={sectionStyle}>
      {/* Hero Section */}
      <main className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black">
          <iframe
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${videoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            src="https://www.youtube.com/embed/0T9C5RcoLMo?autoplay=1&mute=1&loop=1&playlist=0T9C5RcoLMo&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=0&end=0&version=3&enablejsapi=1"
            title="Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            onLoad={handleVideoLoad}
          />
        </div>
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <p className="text-white/80 text-lg mb-6 font-light">
            Doctor led clinic
          </p>
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-12 max-w-4xl">
            Derma Varitas  <br /> Doctor  <br /> Led Clinic
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

          {/* Button Container */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Our Products Button */}
            <button className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white font-medium tracking-wide overflow-hidden group transition-all duration-300 hover:bg-white/20 hover:shadow-lg">
              <span className="relative z-10">Our Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-bottom-left"></div>
            </button>

            {/* Our Treatments Button - Now with onClick handler */}
            <button
              onClick={handleTreatmentsClick}
              className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white font-medium tracking-wide overflow-hidden group transition-all duration-300 hover:bg-white/20 hover:shadow-lg cursor-pointer"
            >
              <span className="relative z-10">Our Treatments</span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-rose-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-bottom-left"></div>
            </button>
          </div>

          <button
            className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 text-sm font-medium rounded-lg transition-colors"
            onClick={() => setBookingOpen(true)}
          >
            BOOK YOUR CONSULTATION
          </button>
        </div>
      </main>

      {/* Timing Section */}
      <section className="py-16 px-4" style={{ backgroundColor: 'var(--section-bg)', color: 'var(--section-fg)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl p-8 md:p-12 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Clinic Hours */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: 'var(--primary-foreground)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light" style={{ color: 'var(--foreground)' }}>Clinic Hours</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                    <span className="font-medium" style={{ color: 'var(--muted-foreground)' }}>Monday - Friday</span>
                    <span className="font-semibold" style={{ color: 'var(--primary)' }}>11:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                    <span className="font-medium" style={{ color: 'var(--muted-foreground)' }}>Saturday</span>
                    <span className="font-semibold" style={{ color: 'var(--primary)' }}>08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                    <span className="font-medium" style={{ color: 'var(--muted-foreground)' }}>Sunday</span>
                    <span className="font-semibold" style={{ color: 'var(--primary)' }}>08:00 - 18:00</span>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center md:text-left md:pl-8 md:border-l" style={{ borderColor: 'var(--border)' }}>
                <h3 className="text-xl font-light mb-4" style={{ color: 'var(--foreground)' }}>Ready to Begin Your Transformation?</h3>
                <p className="mb-8 max-w-md mx-auto md:mx-0" style={{ color: 'var(--muted-foreground)' }}>
                  Schedule your complimentary consultation with our specialists and discover the right treatment for you.
                </p>
                <Button
                  onClick={() => setBookingOpen(true)}
                  className="relative !px-8 !py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide w-full md:w-auto"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  <span>BOOK A CONSULTATION</span>
                  <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-3 flex items-center gap-3 shadow-lg transition-colors"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Make an Enquiry</span>
          </Button>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <Chatwindow
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Booking Modal */}
      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        selectedTreatment=""
      />

      {/* About Section */}
<section className="bg-white py-16 px-4">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
    <div className="space-y-6 lg:order-2">
      <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
        Prestigious clinics led by renowned specialist Dr. Ash Labib
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Derma Veritas offers medically-led skin and dermatology clinic in the area, founded by
        a medical doctor and a clinical pharmacist with over 10 years experience in advanced
        skin and hair treatments. We specialize in skin resurfacing, facial tightening, non-
        surgical facelifts, and hair restoration, using the latest technology for safe, natural
        results. Our expert team are also industry trainers, ensuring the highest standards of care
        and results you can trust.
      </p>
      <Button
        variant="outline"
        className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 mt-8 bg-transparent transition-colors"
        onClick={() => window.location.href = "/about"}
      >
        READ ABOUT US
      </Button>
    </div>
    <div className="relative lg:order-1">
      <img
        src="/owner.png"
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
  
  
  
  
       {/* Popular Treatments */}
<section className="px-4 py-16 bg-[var(--section-bg)] text-[var(--section-fg)]">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">Popular Treatments</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
      <article className="flex gap-4">
        <svg className="w-6 h-6 text-gray-400 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <div>
          <h3 className="text-2xl font-semibold">PRP Therapy</h3>
          <p className="mt-3 text-gray-600">
            Revitalize your skin and hair with our platelet-rich plasma therapy for face, under-eye, and hair restoration.
          </p>
          <a href="/treatments/prp-therapy" className="mt-3 text-purple-600 font-medium hover:text-purple-800 inline-block">
            Learn more
          </a>
        </div>
      </article>
      
      <article className="flex gap-4 lg:border-l lg:pl-12 border-[var(--section-divider)]">
        <svg className="w-6 h-6 text-gray-400 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <div>
          <h3 className="text-2xl font-semibold">Endolift</h3>
          <p className="mt-3 text-gray-600">
            A revolutionary laser treatment that stimulates collagen production for natural-looking facial contouring.
          </p>
          <a href="/treatments/Endolift" className="mt-3 text-teal-600 font-medium hover:text-teal-800 inline-block">
            Learn more
          </a>
        </div>
      </article>
      
      <article className="flex gap-4 lg:border-l lg:pl-12 border-[var(--section-divider)]">
        <svg className="w-6 h-6 text-gray-400 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
        <div>
          <h3 className="text-2xl font-semibold">CO₂ Fractional Laser</h3>
          <p className="mt-3 text-gray-600">
            Advanced laser resurfacing treatment that addresses skin imperfections, wrinkles, and scars.
          </p>
          <a href="/treatments/co2" className="mt-3 text-orange-600 font-medium hover:text-orange-800 inline-block">
            Learn more
          </a>
        </div>
      </article>
    </div>
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
              {conditions.map((condition) => (
                <span
                  key={condition}
                  className="bg-gray-700 text-white px-5 py-2 text-xs uppercase tracking-wide hover:bg-gray-600 transition-colors cursor-pointer rounded-full"
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