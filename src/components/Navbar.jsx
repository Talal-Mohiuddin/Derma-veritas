"use client";

import { Menu, ChevronDown, Gift, Star, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import MobileMenuDrawer from "./MobileMenuDrawer";
import ClinicsModal from "./ClinicsModal";
import { BookingModal } from "./booking-modal";
import { useStore } from "@/store/zustand";
import UserMenuDropdown from "./UserMenuDropdown";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { bookingOpen, setBookingOpen } = useStore();
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isClickedTreatments, setIsClickedTreatments] = useState(false);
  const [clickedCategory, setClickedCategory] = useState(null);
  const pathname = usePathname();

  // Determine if we're on home page
  const isHomePage = pathname === "/";
  const textColor = isHomePage ? "text-white" : "text-black";
  const iconColor = isHomePage ? "white" : "black";

  // Treatment categories
  const treatmentCategories = {
    injectables: {
      title: "Injectables",
      treatments: [
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
      ],
    },
    skincare: {
      title: "Skincare",
      treatments: [
        { name: "Microneedling", slug: "microneedling" },
        { name: "RF Microneedling", slug: "rf-microneedling" },
        { name: "Co2 Laser", slug: "co2" },
        { name: "Endolift", slug: "endolift" },
        { name: "EXO–NAD Skin Longevity Peeling", slug: "exo-nad" },
        { name: "Prescription Skincare", slug: "prescriptionskincare" },
      ],
    },
    wellness: {
      title: "Wellness",
      treatments: [
        { name: "Exosome Therapy", slug: "exosome-therapy" },
        { name: "PRP Therapy", slug: "prp-therapy" },
        { name: "V-Hacker", slug: "v-hacker" },
        { name: "Weight Loss", slug: "weightloss" },
      ],
    },
    laser: {
      title: "Laser Treatments",
      treatments: [
        { name: "Quad Laser Hair Removal", slug: "quad-laser-hair-removal" },
        { name: "Ablative", slug: "ablative" },
      ],
    },
    hair: {
      title: "Hair Treatments",
      treatments: [
        { name: "Hair+ Revitalizing", slug: "hair-revitalizing" },
        { name: "ExoSignal™ Hair", slug: "exosignal" },
        { name: "Prescription Hair", slug: "prescriptionhair" },
        { name: "Polynucleotide Hair Treatment", slug: "polynucleotide" },
      ],
    },
  };

  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);
      setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY === 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".treatments-dropdown")) {
        setIsClickedTreatments(false);
        setClickedCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTreatmentsClick = () => {
    setIsClickedTreatments(!isClickedTreatments);
    if (isClickedTreatments) {
      setClickedCategory(null);
    }
  };

  const handleCategoryClick = (key) => {
    setClickedCategory(clickedCategory === key ? null : key);
  };

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

  const getCurrentTreatment = () => {
    if (
      pathname.includes("/packages/profusion") ||
      pathname === "/pacakges/profusion"
    ) {
      return "profusion-hydrafacial";
    }

    if (pathname.includes("/menu/injectables/")) {
      const treatmentSlug = pathname.split("/menu/injectables/")[1];
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
        "skin-boosters": "skin-boosters",
        "skinfill-bacio": "skinfill-bacio",
      };
      return treatmentMap[treatmentSlug] || "";
    }

    if (pathname.includes("/treatments/")) {
      const treatmentSlug = pathname.split("/treatments/")[1];
      const treatmentMap = {
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
      <header className="bg-gray-100 px-4 py-0.5 overflow-hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex animate-scroll whitespace-nowrap text-black">
          {[...bannerMessages, ...bannerMessages].map((message, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-fit mx-6 sm:mx-10"
            >
              <div className="flex items-center gap-2 text-black">
                <div className="text-black">{message.icon}</div>
                <span className="text-black font-bold text-base uppercase tracking-wide">
                  {message.title}
                </span>
              </div>
              <div className="hidden sm:block ml-3">
                <span className="text-black text-base font-medium">
                  {message.content}
                </span>
              </div>
              <Link
                href={message.link}
                className="ml-2 bg-black text-white px-2.5 py-0.5 rounded-full text-xs font-bold uppercase hover:bg-gray-800 transition-colors shadow-sm"
              >
                {message.cta}
              </Link>
              <div className="mx-3 sm:mx-5 w-px h-4 bg-black/30"></div>
            </div>
          ))}
        </div>

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
                isScrollingUp ? "top-[30px]" : "-top-16"
              }`
            : isHomePage
            ? "bg-transparent border-white/20 top-[38px]"
            : "bg-white border-gray-200 top-[38px]"
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
            <div className="relative treatments-dropdown group">
              <button
                onClick={handleTreatmentsClick}
                className={`flex items-center gap-1 text-sm font-medium ${
                  isScrolled ? "text-white" : textColor
                } hover:opacity-80 transition-opacity`}
              >
                TREATMENTS
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isClickedTreatments ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Main Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-xl rounded-md py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {Object.entries(treatmentCategories).map(([key, category]) => (
                  <div key={key} className="relative group/item">
                    <div
                      className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleCategoryClick(key)}
                    >
                      <span className="font-medium text-sm">
                        {category.title}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </div>

                    {/* Nested Dropdown */}
                    <div className="absolute left-full top-0 ml-2 w-72 bg-white shadow-xl rounded-md py-2 z-50 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-bold text-gray-800 text-sm uppercase">
                          {category.title}
                        </h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {category.treatments.map((treatment, index) => {
                          const treatmentName =
                            typeof treatment === "string"
                              ? treatment
                              : treatment.name;
                          const treatmentSlug =
                            typeof treatment === "string"
                              ? slugify(treatment)
                              : treatment.slug;
                          const href =
                            key === "injectables"
                              ? `/menu/injectables/${treatmentSlug}`
                              : `/treatments/${treatmentSlug}`;

                          return (
                            <Link
                              key={`${treatmentName}-${index}`}
                              href={href}
                              className="block px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-50 text-sm transition-colors"
                              onClick={() => {
                                setIsClickedTreatments(false);
                                setClickedCategory(null);
                              }}
                            >
                              {treatmentName}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Navigation Links */}
            {[
              { name: "PACKAGES", href: "/pacakges" },
              { name: "DV MEMBERSHIP", href: "/pacakges/membership" },
              { name: "GALLERY", href: "/gallery" },
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

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-transparent border-0 rounded-none hover:bg-white/10 transition-colors duration-200 md:hidden"
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

            <div className="hidden sm:block">
              <UserMenuDropdown iconColor={isScrolled ? "white" : iconColor} />
            </div>
          </div>
        </div>
      </nav>

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

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
