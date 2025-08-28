"use client";

import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import MobileMenuDrawer from "./MobileMenuDrawer";
import ClinicsModal from "./ClinicsModal"; // import your modal
import { BookingModal } from "./booking-modal";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const pathname = usePathname();

  // Function to determine treatment based on current page
  const getCurrentTreatment = () => {
    // Handle injectable treatments
    if (pathname.includes('/menu/injectables/')) {
      const treatmentSlug = pathname.split('/menu/injectables/')[1];
      // Convert slug back to treatment name
      const treatmentMap = {
        'anti-wrinkle-treatment': 'anti-wrinkle-treatment',
        'non-surgical-rhinoplasty': 'non-surgical-rhinoplasty',
        '8-point-facelift': '8-point-facelift',
        'nctf-skin-revitalisation': 'nctf-skin-revitalisation-skincare',
        'harmonyca-dermal-filler': 'harmonyca-dermal-filler',
        'dermal-fillers': 'dermal-fillers',
        'lip-fillers': 'lip-fillers',
        'chin-fillers': 'chin-fillers',
        'tear-trough-filler': 'tear-trough-filler',
        'cheek-fillers': 'cheek-fillers',
        'profhilo': 'profhilo',
        'fat-dissolving-injections': 'fat-dissolving-injections',
        'hand-rejuvenation': 'hand-rejuvenation',
        'polynucleotides-hair-loss-treatment': 'polynucleotides-hair-loss-treatment',
        'polynucleotides-skin-rejuvenation-treatment': 'polynucleotides-skin-rejuvenation-treatment'
      };
      return treatmentMap[treatmentSlug] || '';
    }
    
    // Handle other treatment types
    if (pathname.includes('/treatments/')) {
      const treatmentSlug = pathname.split('/treatments/')[1];
      const treatmentMap = {
        'chemical-peels': 'chemical-peel',
        'microneedling': 'skinpen-microneedling',
        'rf-microneedling': 'skinpen-microneedling',
        'mole-removal': 'mole-removal',
        'skin-tag-removal': 'skin-tag-removal',
        'exosome-therapy': 'iv-drips'
      };
      return treatmentMap[treatmentSlug] || '';
    }

    return '';
  };

  return (
    <>
      {/* Top Header */}
      <header className="bg-gray-100 px-4 py-2">
        <div className="flex justify-between items-center max-w-7xl mx-auto text-xs sm:text-sm">
          {/* Left - Call Us */}
          <div
            onClick={() => setIsClinicsOpen(true)}
            className="flex items-center gap-1 text-gray-600 font-medium cursor-pointer"
          >
            CALL US
            <ChevronDown className="w-4 h-4" />
          </div>

          {/* Right - Find a Clinic */}
          <div
            onClick={() => setIsClinicsOpen(true)}
            className="flex items-center gap-1 text-gray-600 font-medium cursor-pointer"
          >
            FIND A CLINIC
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Main Navbar */}
      <nav className="bg-white px-4 py-3 border-b sticky top-0 z-40 shadow-sm">
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
