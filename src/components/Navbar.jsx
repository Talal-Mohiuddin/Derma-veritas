"use client";

import { Menu, ChevronDown, Gift, Star, Sparkles, Heart } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileMenuDrawer from "./MobileMenuDrawer";
import ClinicsModal from "./ClinicsModal"; // import your modal
import { BookingModal } from "./booking-modal";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/zustand";
import { useAuth } from "@/store/FirebaseAuthProvider";
import UserMenuDropdown from "./UserMenuDropdown";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { bookingOpen, setBookingOpen, userRole } = useStore();
  const { user } = useAuth();
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const pathname = usePathname();

  const bannerMessages = [
    {
      icon: <Gift className="w-4 h-4 text-white" />,
      title: "Refer & Earn",
      content: "Get 10% off your first appointment when you refer a friend",
      cta: "Learn More",
      link: "/refer-a-friend",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-white" />,
      title: "Limited Time Offer",
      content: "Free skin analysis with any treatment package this month",
      cta: "Get Started",
      link: "/treatments",
    },
  ];

  // Function to determine treatment based on current page
  const getCurrentTreatment = () => {
    // Handle injectable treatments
    if (pathname.includes("/menu/injectables/")) {
      const treatmentSlug = pathname.split("/menu/injectables/")[1];
      // Convert slug back to treatment name
      const treatmentMap = {
        "anti-wrinkle-treatment": "anti-wrinkle-treatment",
        "non-surgical-rhinoplasty": "non-surgical-rhinoplasty",
        "8-point-facelift": "8-point-facelift",
        "nctf-skin-revitalisation": "nctf-skin-revitalisation-skincare",
        "harmonyca-dermal-filler": "harmonyca-dermal-filler",
        "dermal-fillers": "dermal-fillers",
        "lip-fillers": "lip-fillers",
        "chin-fillers": "chin-fillers",
        "tear-trough-filler": "tear-trough-filler",
        "cheek-fillers": "cheek-fillers",
        profhilo: "profhilo",
        "fat-dissolving-injections": "fat-dissolving-injections",
        "hand-rejuvenation": "hand-rejuvenation",
        "polynucleotides-hair-loss-treatment":
          "polynucleotides-hair-loss-treatment",
        "polynucleotides-skin-rejuvenation-treatment":
          "polynucleotides-skin-rejuvenation-treatment",
      };
      return treatmentMap[treatmentSlug] || "";
    }

    // Handle other treatment types
    if (pathname.includes("/treatments/")) {
      const treatmentSlug = pathname.split("/treatments/")[1];
      const treatmentMap = {
        "chemical-peels": "chemical-peel",
        microneedling: "skinpen-microneedling",
        "rf-microneedling": "skinpen-microneedling",
        "mole-removal": "mole-removal",
        "skin-tag-removal": "skin-tag-removal",
        "exosome-therapy": "iv-drips",
      };
      return treatmentMap[treatmentSlug] || "";
    }

    return "";
  };

  return (
    <>
      {/* Animated Referral Program Banner */}
      <header className="bg-gradient-to-r from-gray-700 via-gray-800 to-black px-4 py-2 overflow-hidden relative">
        <div className="flex animate-scroll whitespace-nowrap">
          {/* Repeat messages for seamless scrolling */}
          {[...bannerMessages, ...bannerMessages].map((message, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-fit mx-8 sm:mx-12"
            >
              <div className="flex items-center gap-2">
                {message.icon}
                <span className="text-white font-bold text-xs uppercase tracking-wide">
                  {message.title}
                </span>
              </div>
              <div className="hidden sm:block ml-3">
                <span className="text-white text-xs font-medium">
                  {message.content}
                </span>
              </div>
              <Link
                href={message.link}
                className="ml-3 bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-bold uppercase hover:bg-gray-100 transition-colors shadow-sm"
              >
                {message.cta}
              </Link>
              <div className="mx-4 sm:mx-6 w-px h-4 bg-white/30"></div>
            </div>
          ))}
        </div>

        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-gray-700 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
      </header>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Navbar */}
      <nav className="bg-transparent backdrop-blur-sm px-4 py-3 border-b border-white/20 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black flex items-center justify-center">
              <span className="text-white font-bold text-lg">AL</span>
            </div>
            <span className="text-xl sm:text-2xl font-light text-black">
              Aesthetics
            </span>
          </div>

          {/* Right - Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Gradient Book Consultation - hidden on mobile */}
            <div className="hidden md:block">
              <Button
                onClick={() => setBookingOpen(true)}
                className="relative !px-8 !py-6 text-xs font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide"
              >
                <span>BOOK A CONSULTATION</span>
                <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
              </Button>
            </div>

            {/* MENU Button (always visible) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 bg-white rounded-none"
            >
              <span className="text-sm font-medium text-gray-800 mr-2 sm:mr-3">
                MENU
              </span>
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>

            {/* User Menu Dropdown - visible on larger screens */}
            <div className="hidden sm:block">
              <UserMenuDropdown />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      {/* Clinics Modal */}
      <ClinicsModal
        isOpen={isClinicsOpen}
        onClose={() => setIsClinicsOpen(false)}
      />

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        selectedTreatment={getCurrentTreatment()}
      />
    </>
  );
}
