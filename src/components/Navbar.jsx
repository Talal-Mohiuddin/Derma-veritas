"use client";

import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import MobileMenuDrawer from "./MobileMenuDrawer";
import ClinicsModal from "./ClinicsModal"; // import your modal

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);

  return (
    <>
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
              <span className="text-xs font-medium text-gray-800 mr-3">
                MENU
              </span>
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      {/* Clinics Modal - only 1 time render */}
      <ClinicsModal
        isOpen={isClinicsOpen}
        onClose={() => setIsClinicsOpen(false)}
      />
    </>
  );
}
