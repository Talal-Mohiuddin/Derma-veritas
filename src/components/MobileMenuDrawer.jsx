"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  User,
  ShoppingCart,
  Shield,
  Settings,
  LogOut,
  LogIn,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import Link from "next/link";
import ClinicsModal from "./ClinicsModal";
import { BookingModal } from "./booking-modal";
import { usePathname } from "next/navigation";
import { useAuth } from "@/store/FirebaseAuthProvider";
import { useCartItemCount } from "@/hooks/useCart";
import { useStore } from "@/store/zustand";
import { useRouter } from "next/navigation";

export default function MobileMenuDrawer({ isOpen, setIsOpen }) {
  const [expandedSections, setExpandedSections] = useState({});
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [submenuOpenedByClick, setSubmenuOpenedByClick] = useState(false);
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const hideTimeoutRef = useRef(null);
  const pathname = usePathname();

  // Auth and Cart
  const { user, isAdmin } = useAuth();
  const { data: cartCount } = useCartItemCount();
  const { userRole, handleLogout } = useStore();
  const router = useRouter();

  const toggleSection = (section) => {
    setExpandedSections((prev) => {
      const isCurrentlyExpanded = prev[section];
      
      // If the section is currently expanded, just close it
      if (isCurrentlyExpanded) {
        return {
          ...prev,
          [section]: false,
        };
      }
      
      // If opening a new section, close all others and open this one
      return {
        [section]: true,
      };
    });
  };

  const handleLogoutClick = async () => {
    try {
      await handleLogout(router);
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleSubmenu = (menu) => {
    if (activeSubmenu === menu) {
      setActiveSubmenu(null);
      setSubmenuOpenedByClick(false);
    } else {
      setActiveSubmenu(menu);
      setSubmenuOpenedByClick(true);
    }
  };

  const showSubmenu = (menu) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (!submenuOpenedByClick) {
      setActiveSubmenu(menu);
    }
  };

  const hideSubmenu = () => {
    if (!submenuOpenedByClick) {
      hideTimeoutRef.current = setTimeout(() => {
        setActiveSubmenu(null);
      }, 150);
    }
  };

  const keepSubmenuVisible = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

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
        "skinfill-bacio": "skinfill-bacio",
      };
      return treatmentMap[treatmentSlug] || "";
    }

    // Handle other treatment types
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

  // Menu data - Updated to match navbar exactly
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

  // Mobile Dropdown Component (for small screens)
  const MobileDropdown = ({ label, section, links, type }) => (
    <div>
      <button
        onClick={() => toggleSection(section)}
        className="flex justify-between items-center w-full py-2 text-lg font-medium text-black hover:text-gray-600 cursor-pointer"
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-6 h-6 transition-transform ${
            expandedSections[section] ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {expandedSections[section] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="pl-4 overflow-hidden"
          >
            {links.map((item) =>
              type === "injectables" ? (
                <Link
                  key={item}
                  href={`/menu/injectables/${slugify(item)}`}
                  className="block py-2 text-base text-black hover:text-gray-600 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={item.slug ? `/treatments/${item.slug}` : item.path}
                  className="block py-2 text-base text-black hover:text-gray-600 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Desktop Dropdown Component (for right side submenu)
  const DesktopDropdown = ({ label, section, links, type }) => (
    <div className="py-2">
      <button
        onClick={() => toggleSection(section)}
        className="flex justify-between items-center w-full text-left cursor-pointer"
      >
        <span className="text-xl font-light text-black">{label}</span>
        <ChevronDown
          className={`w-6 h-6 text-black transition-transform ${
            expandedSections[section] ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {expandedSections[section] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="pl-4 mt-2 overflow-hidden"
          >
            {links.map((item) =>
              type === "injectables" ? (
                <Link
                  key={item}
                  href={`/menu/injectables/${slugify(item)}`}
                  className="block py-2 text-lg font-light text-black hover:text-gray-600 transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={item.slug ? `/treatments/${item.slug}` : item.path}
                  className="block py-2 text-lg font-light text-black hover:text-gray-600 transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            {/* Header */}
            <header className="px-4 py-2 bg-white">
              <div className="flex justify-center items-center max-w-7xl mx-auto">
                {/* Center - Call Us */}
                <div
                  onClick={() => setIsClinicsOpen(true)}
                  className="flex items-center gap-1 text-black text-sm font-medium cursor-pointer hover:text-gray-600"
                >
                  CALL US
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </header>

            {/* Close Button - Moved down and made larger */}
            <div className="absolute top-20 right-8 z-10">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsOpen(false)}
                className="text-black hover:text-gray-600 p-4 bg-transparent hover:bg-black/10 shadow-sm"
              >
                <X className="w-8 h-8" />
              </Button>
            </div>

            {/* Mobile Layout (Small Screens) */}
            <div className="md:hidden flex-1 overflow-y-auto px-6 py-6">
              <div className="pt-16">
                {/* Treatments */}
                <div className="border-b border-black/20 pb-4 mb-4">
                  <h3 className="text-base font-bold uppercase text-black mb-3">
                    Treatments
                  </h3>
                  <MobileDropdown
                    label="Injectables"
                    section="Injectables"
                    links={injectablesLinks}
                    type="injectables"
                  />
                  <MobileDropdown
                    label="Skincare"
                    section="Skincare"
                    links={skincareLinks}
                    type="skincare"
                  />
                  <MobileDropdown
                    label="Wellness"
                    section="Wellness"
                    links={wellnessLinks}
                    type="wellness"
                  />
                  <MobileDropdown
                    label="Laser Treatments"
                    section="Laser"
                    links={laserLinks}
                    type="laser"
                  />
                  <MobileDropdown
                    label="Hair Treatments"
                    section="Hair"
                    links={hairLinks}
                    type="hair"
                  />
                </div>

                {/* Static Links */}
                {[
                  { name: "PACKAGES", href: "/pacakges" },
                  { name: "DV MEMBERSHIP", href: "/pacakges/membership" },
                  { name: "SHOP", href: "/shop" },
                  { name: "ABOUT US", href: "/about" },
                  { name: "CONTACT", href: "/contact" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="border-b border-black/20 pb-4 mb-4"
                  >
                    <Link
                      href={item.href}
                      className="w-full block text-left py-2 text-lg font-medium text-black hover:text-gray-600 cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}

                {/* User Section - Moved to bottom */}
                <div className="border-b border-black/20 pb-4 mb-4">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black">
                            {user.displayName || user.email}
                          </p>
                          <p className="text-xs text-gray-600">{user.email}</p>
                        </div>
                      </div>

                      {/* Cart Link */}
                      <Link
                        href="/cart"
                        className="flex items-center gap-3 py-2 text-black hover:text-gray-600"
                        onClick={() => setIsOpen(false)}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Cart</span>
                        {cartCount > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                            {cartCount}
                          </span>
                        )}
                      </Link>

                      {/* Admin Dashboard (only for admins) */}
                      {userRole === "admin" ? (
                        <Link href="/admin" onClick={() => setIsOpen(false)}>
                          <div className="flex items-center px-4 py-2 text-sm text-black hover:bg-black/10 cursor-pointer">
                            <Shield className="w-4 h-4 mr-3" />
                            <span>Admin Dashboard</span>
                          </div>
                        </Link>
                      ) : (
                        <Link href="/profile" onClick={() => setIsOpen(false)}>
                          <div className="flex items-center px-4 py-2 text-sm text-black hover:bg-black/10 cursor-pointer">
                            <Settings className="w-4 h-4 mr-3" />
                            <span>Profile Settings</span>
                          </div>
                        </Link>
                      )}
                      {/* Logout */}
                      <Link
                        href="/referportal"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-50 cursor-pointer">
                          <Share2 className="w-4 h-4 mr-3" />
                          <span>Referral Portal</span>
                        </div>
                      </Link>
                      <button
                        onClick={handleLogoutClick}
                        className="flex items-center gap-3 py-2 text-red-600 hover:text-red-700"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-black">
                          Welcome!
                        </p>
                        <p className="text-xs text-gray-600">
                          Sign in to access your account
                        </p>
                      </div>

                      <Link
                        href="/login"
                        className="flex items-center gap-3 py-2 text-black hover:text-gray-600"
                        onClick={() => setIsOpen(false)}
                      >
                        <LogIn className="w-5 h-5" />
                        <span>Sign In</span>
                      </Link>

                      <Link
                        href="/login"
                        className="flex items-center gap-3 py-2 text-black hover:text-gray-600"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span>Create Account</span>
                      </Link>
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-8 border-t border-black/20 pt-6 text-center">
                  <button
                    onClick={() => setIsClinicsOpen(true)}
                    className="flex items-center justify-center gap-2 mx-auto text-black hover:text-gray-600 text-sm uppercase tracking-wide"
                  >
                    <span>CALL US</span>
                    <ChevronDown className="w-6 h-6" />
                  </button>
                </div>

                {/* Add Book Consultation Button for Mobile */}
                <div className="mt-8 border-t border-black/20 pt-6">
                  <Button
                    onClick={() => {
                      setBookingOpen(true);
                      setIsOpen(false);
                    }}
                    className="w-full relative !px-8 !py-6 text-xs font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide"
                  >
                    <span>BOOK A CONSULTATION</span>
                    <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Layout (Medium+ Screens) */}
            <div className="hidden md:flex flex-1 overflow-y-auto pr-20">
              {/* Left Column - Main Navigation */}
              <div className="w-1/2 px-12 pt-20 pb-12">
                <div className="space-y-0 max-w-xs pr-4">
                  {/* Treatments Section */}
                  <div
                    className="py-4 pr-8"
                    onMouseEnter={() => showSubmenu("treatments")}
                    onMouseLeave={hideSubmenu}
                  >
                    <button
                      className="block text-xl font-light text-black hover:text-gray-600 transition-colors text-left w-full cursor-pointer"
                      onClick={() => toggleSubmenu("treatments")}
                    >
                      Treatments
                    </button>
                  </div>

                  {/* Static Links */}
                  <div className="py-4">
                    <Link
                      href="/pacakges"
                      className="block text-xl font-light text-black hover:text-gray-600 transition-colors cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      PACKAGES
                    </Link>
                  </div>

                  <div className="py-4">
                    <Link
                      href="/pacakges/membership"
                      className="block text-xl font-light text-black hover:text-gray-600 transition-colors cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      DV MEMBERSHIP
                    </Link>
                  </div>

                  <div className="py-4">
                    <Link
                      href="/shop"
                      className="block text-lg font-light text-black hover:text-gray-600 transition-colors cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      SHOP
                    </Link>
                  </div>

                  <div className="py-4">
                    <Link
                      href="/about"
                      className="block text-lg font-light text-black hover:text-gray-600 transition-colors cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      ABOUT US
                    </Link>
                  </div>

                  <div className="py-4">
                    <Link
                      href="/contact"
                      className="block text-lg font-light text-black hover:text-gray-600 transition-colors cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      CONTACT
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column - Submenus */}
              <div className="w-1/2 relative">
                <AnimatePresence>
                  {activeSubmenu && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-20 -left-8 right-0 space-y-0 pl-4"
                      onMouseEnter={keepSubmenuVisible}
                      onMouseLeave={hideSubmenu}
                    >
                      {activeSubmenu === "treatments" && (
                        <>
                          <DesktopDropdown
                            label="Injectables"
                            section="Injectables"
                            links={injectablesLinks}
                            type="injectables"
                          />

                          <DesktopDropdown
                            label="Skincare"
                            section="Skincare"
                            links={skincareLinks}
                            type="skincare"
                          />

                          <DesktopDropdown
                            label="Wellness"
                            section="Wellness"
                            links={wellnessLinks}
                            type="wellness"
                          />

                          <DesktopDropdown
                            label="Laser Treatments"
                            section="Laser"
                            links={laserLinks}
                            type="laser"
                          />

                          <DesktopDropdown
                            label="Hair Treatments"
                            section="Hair"
                            links={hairLinks}
                            type="hair"
                          />
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clinics Modal */}
      {isClinicsOpen && (
        <ClinicsModal
          isOpen={isClinicsOpen}
          setIsOpen={setIsClinicsOpen}
          onClose={() => setIsClinicsOpen(false)}
        />
      )}

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        selectedTreatment={getCurrentTreatment()}
      />
    </>
  );
}