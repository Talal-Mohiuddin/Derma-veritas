"use client";

import { Menu, ChevronDown, Gift, Star, Sparkles, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import MobileMenuDrawer from "./MobileMenuDrawer";
import ClinicsModal from "./ClinicsModal";
import { BookingModal } from "./booking-modal";
import { useStore } from "@/store/zustand";
import { useAuth } from "@/store/FirebaseAuthProvider";
import UserMenuDropdown from "./UserMenuDropdown";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { bookingOpen, setBookingOpen, userRole } = useStore();
  const { user } = useAuth();
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHoveringTreatments, setIsHoveringTreatments] = useState(false);
  const pathname = usePathname();

  // Determine if we're on home page
  const isHomePage = pathname === "/";
  const textColor = isHomePage ? "text-white" : "text-black";
  const iconColor = isHomePage ? "white" : "black";

  // Treatment categories (fixed duplicate "Anti-Wrinkle Treatment")
  const injectablesLinks = [
    "Anti-Wrinkle Treatment",
    "Non Surgical Rhinoplasty",
    "8 Point Facelift",
    "NCTF Skin Revitalisation",
    "HArmonyCa Dermal Filler",
    "Dermal Fillers",
    "Lip Fillers",
    "Chin Fillers",
    "Tear Trough Filler",
    "Cheek Fillers",
    "Profhilo",
    "Fat Dissolving Injections",
    "Hand Rejuvenation",
    "Polynucleotides Hair Loss Treatment",
    "Polynucleotides Skin Rejuvenation Treatment",
    "Skin Boosters",
    "Skinfill™ Bacio",
  ];

  const skincareLinks = [
    { name: "Chemical Peels", slug: "chemical-peels" },
    { name: "Microneedling", slug: "microneedling" },
    { name: "RF Microneedling", slug: "rf-microneedling" },
    { name: "Co2 Laser", slug: "co2" },
    { name: "Polynucleotide", slug: "polynucleotide" },
    { name: "Endolift", slug: "endolift" },
    { name: "EXO–NAD Skin Longevity Peeling", slug: "exo-nad" },
    { name: "Prescription Skincare", slug: "prescriptionskincare" },
  ];

  const wellnessLinks = [
    { name: "Exosome Therapy", slug: "exosome-therapy" },
    { name: "PRP Therapy", slug: "prp-therapy" },
    { name: "V-Hacker", slug: "v-hacker" },
    { name: "Hair+ Revitalizing", slug: "hair-revitalizing" },
    { name: "Weight Loss", slug: "weightloss" },
  ];

  const laserLinks = [
    { name: "Quad Laser Hair Removal", slug: "quad-laser-hair-removal" },
    { name: "Ablative", slug: "ablative" },
  ];

  const hairLinks = [
    { name: "Hair+ Revitalizing", slug: "hair-revitalizing" },
    { name: "ExoSignal™ Hair", slug: "exosignal" },
    { name: "Prescription Hair", slug: "prescriptionhair" },
  ];

  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  // Add scroll listener to detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        // At top of page
        setIsScrolled(false);
        setIsScrollingUp(true);
      } else {
        setIsScrolled(true);
        // Determine scroll direction
        if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsScrollingUp(true);
        } else if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsScrollingUp(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const bannerMessages = [
    {
      icon: <Gift className="w-5 h-5 text-black" />,
      title: "Refer & Earn",
      content:
        "Earn 10% cash reward when your friend completes their treatment",
      cta: "Learn More",
      link: "/refer-a-friend",
    },
    {
      icon: <Star className="w-5 h-5 text-black" />,
      title: "Luxury Clinic",
      content:
        "Experience world-class skin & hair treatments in our premium clinic",
      cta: "Visit Us",
      link: "/locations",
    },
  ];

  // Function to determine treatment based on current page
  const getCurrentTreatment = () => {
    // Handle packages - fix the path matching
    if (
      pathname.includes("/packages/profusion") ||
      pathname === "/pacakges/profusion"
    ) {
      return "profusion-hydrafacial";
    }

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
        "Anti-Wrinkle-treatment": "anti-wrinkle-treatment",
        "skin-boosters": "profhilo",
        "skinfill-bacio": "skinfill-bacio",
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
        co2: "co2-laser",
        polynucleotide: "polynucleotides-skin-rejuvenation-treatment",
        endolift: "endolift",
        "prp-therapy": "iv-drips",
        "quad-laser-hair-removal": "quad-laser-hair-removal",
        "exo-nad": "exo",
        "v-hacker": "v-hacker",
        "hair-revitalizing": "revitalizing",
        exosignal: "exosignal",
      };
      return treatmentMap[treatmentSlug] || "";
    }

    return "";
  };

  return (
    <>
      {/* Animated Referral Program Banner */}
      <header className="bg-gray-100 px-4 py-1 overflow-hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex animate-scroll whitespace-nowrap text-black">
          {/* Repeat messages for seamless scrolling */}
          {[...bannerMessages, ...bannerMessages].map((message, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-fit mx-8 sm:mx-12"
            >
              <div className="flex items-center gap-2 text-black">
                <div className="text-black">{message.icon}</div>
                <span className="text-black font-bold text-lg uppercase tracking-wide">
                  {message.title}
                </span>
              </div>
              <div className="hidden sm:block ml-3">
                <span className="text-black text-lg font-medium">
                  {message.content}
                </span>
              </div>
              <Link
                href={message.link}
                className="ml-3 bg-black text-white px-3 py-1 rounded-full text-sm font-bold uppercase hover:bg-gray-800 transition-colors shadow-sm"
              >
                {message.cta}
              </Link>
              <div className="mx-4 sm:mx-6 w-px h-4 bg-black/30"></div>
            </div>
          ))}
        </div>

        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-gray-100 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div>
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
      <nav
        className={`px-4 py-3 fixed left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? `bg-black/80 backdrop-blur-sm border-gray-700 ${
                isScrollingUp ? "top-[40px]" : "-top-20"
              }`
            : isHomePage
            ? "bg-transparent border-white/20 top-[42px]"
            : "bg-white border-gray-200 top-[42px]"
        }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <Image
              src={
                isScrolled || isHomePage ? "/logo_white.png" : "/logo_black.png"
              }
              alt="Aesthetics Logo"
              width={90}
              height={90}
              priority
            />
          </div>

          {/* Center - Navigation Links (hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Treatments Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsHoveringTreatments(true)}
              onMouseLeave={() => setIsHoveringTreatments(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium ${
                  isScrolled ? "text-white" : textColor
                } hover:opacity-80 transition-opacity`}
              >
                TREATMENTS
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Mega Dropdown Menu */}
              {isHoveringTreatments && (
                <div className="absolute top-full left-0 mt-2 w-max bg-white shadow-xl rounded-md p-6 grid grid-cols-3 gap-8 z-50">
                  {/* Injectables Column */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm">
                      Injectables
                    </h3>
                    <div className="space-y-2">
                      {injectablesLinks.map((treatment, index) => (
                        <Link
                          key={`${treatment}-${index}`}
                          href={`/menu/injectables/${slugify(treatment)}`}
                          className="block text-gray-600 hover:text-black text-sm transition-colors"
                        >
                          {treatment}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Skincare & Wellness Column */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm">
                      Skincare
                    </h3>
                    <div className="space-y-2 mb-6">
                      {skincareLinks.map((treatment) => (
                        <Link
                          key={treatment.slug}
                          href={`/treatments/${treatment.slug}`}
                          className="block text-gray-600 hover:text-black text-sm transition-colors"
                        >
                          {treatment.name}
                        </Link>
                      ))}
                    </div>

                    <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm">
                      Wellness
                    </h3>
                    <div className="space-y-2">
                      {wellnessLinks.map((treatment) => (
                        <Link
                          key={treatment.slug}
                          href={`/treatments/${treatment.slug}`}
                          className="block text-gray-600 hover:text-black text-sm transition-colors"
                        >
                          {treatment.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Laser & Hair Column */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm">
                      Laser Treatments
                    </h3>
                    <div className="space-y-2 mb-6">
                      {laserLinks.map((treatment) => (
                        <Link
                          key={treatment.slug}
                          href={`/treatments/${treatment.slug}`}
                          className="block text-gray-600 hover:text-black text-sm transition-colors"
                        >
                          {treatment.name}
                        </Link>
                      ))}
                    </div>

                    <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm">
                      Hair Treatments
                    </h3>
                    <div className="space-y-2">
                      {hairLinks.map((treatment) => (
                        <Link
                          key={treatment.slug}
                          href={`/treatments/${treatment.slug}`}
                          className="block text-gray-600 hover:text-black text-sm transition-colors"
                        >
                          {treatment.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Navigation Links */}
            {[
              { name: "PACKAGES", href: "/pacakges" },
              { name: "DV MEMBERSHIP", href: "/pacakges/membership" },
              { name: "SHOP", href: "/shop" },
              { name: "ABOUT US", href: "/about" },
              { name: "CONTACT", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium ${
                  isScrolled ? "text-white" : textColor
                } hover:opacity-80 transition-opacity`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right - Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Book Consultation Button - hidden on mobile */}
            <div className="hidden md:block">
              <button
                onClick={() => setBookingOpen(true)}
                className={`px-6 py-3 text-xs font-bold uppercase border-0 rounded-none tracking-wide hover:bg-white/10 transition-colors duration-200 ${
                  isScrolled
                    ? "text-white bg-transparent"
                    : `${textColor} bg-transparent`
                }`}
              >
                BOOK A CONSULTATION
              </button>
            </div>

            {/* MENU Button (always visible) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-transparent border-0 rounded-none hover:bg-white/10 transition-colors duration-200"
            >
              <span
                className={`text-sm font-medium mr-2 sm:mr-3 ${
                  isScrolled ? "text-white" : textColor
                }`}
              >
                MENU
              </span>
              <Menu
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  isScrolled ? "text-white" : textColor
                }`}
              />
            </button>

            {/* User Menu Dropdown - visible on larger screens */}
            <div className="hidden sm:block">
              <UserMenuDropdown iconColor={isScrolled ? "white" : iconColor} />
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