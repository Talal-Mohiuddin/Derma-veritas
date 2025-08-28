"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import Link from "next/link";
import ClinicsModal from "./ClinicsModal";

export default function MobileMenuDrawer({ isOpen, setIsOpen }) {
  const [expandedSections, setExpandedSections] = useState({});
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [submenuOpenedByClick, setSubmenuOpenedByClick] = useState(false);
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const hideTimeoutRef = useRef(null);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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

  // Menu data
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
  ];

  const skincareLinks = [
    { name: "Chemical Peels", slug: "chemical-peels" },
    { name: "Microneedling", slug: "microneedling" },
    { name: "RF Microneedling", slug: "rf-microneedling" },
  ];

  const wellnessLinks = [
    { name: "Exosome Therapy", path: "/treatments/exosome-therapy" },
  ];

  const minorOpsLinks = [
    { name: "Mole Removal", path: "/treatments/mole-removal" },
    { name: "Skin Tag Removal", path: "/treatments/skin-tag-removal" },
  ];

  const facialConcernsLinks = [
    { name: "Gummy Smile", path: "/menu/conditions/gummy-smile" },
    { name: "Jowls Treatments", path: "/menu/conditions/jowls-treatments" },
    { name: "Under Eye", path: "/menu/conditions/under-eye" },
  ];

  const slugify = (str) =>
    str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  // Mobile Dropdown Component (for small screens)
  const MobileDropdown = ({ label, section, links, type }) => (
    <div>
      <button
        onClick={() => toggleSection(section)}
        className="flex justify-between items-center w-full py-2 text-base font-medium text-muted-foreground hover:text-foreground"
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
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={item.slug ? `/treatments/${item.slug}` : item.path}
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground"
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
        className="flex justify-between items-center w-full text-left"
      >
        <span className="text-2xl font-light text-gray-800">{label}</span>
        <ChevronDown
          className={`w-8 h-8 text-gray-600 transition-transform ${
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
                  className="block py-2 text-xl font-light text-gray-600 hover:text-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={item.slug ? `/treatments/${item.slug}` : item.path}
                  className="block py-2 text-lg font-light text-gray-600 hover:text-gray-800 transition-colors"
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
            className="fixed inset-0 z-50 bg-[#f4f4f4] flex flex-col"
          >
            {/* Header */}
            <header className="bg-[#e1e1e1] px-4 py-2">
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

            {/* Close Button - Moved down and made larger */}
            <div className="absolute top-20 right-8 z-10">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-800 p-4 bg-white rounded-md shadow-sm"
              >
                <X className="w-8 h-8" />
              </Button>
            </div>

            {/* Mobile Layout (Small Screens) */}
            <div className="md:hidden flex-1 overflow-y-auto px-6 py-6">
              <div className="pt-16">
                {/* Treatments */}
                <div className="border-b border-section-divider pb-4 mb-4">
                  <h3 className="text-sm font-bold uppercase text-section-fg mb-3">
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
                    label="Minor Ops"
                    section="MinorOps"
                    links={minorOpsLinks}
                    type="minor-ops"
                  />
                </div>

                {/* Conditions */}
                <div className="border-b border-section-divider pb-4 mb-4">
                  <h3 className="text-sm font-bold uppercase text-section-fg mb-3">
                    Conditions
                  </h3>
                  <MobileDropdown
                    label="Facial Concerns"
                    section="FacialConcerns"
                    links={facialConcernsLinks}
                    type="conditions"
                  />
                </div>

                {/* Static Links */}
                {[

                  

                  
                  { name: "Contact Us", href: "/contact" },
                  { name: "About Us", href: "/about" },
                  { name: "Club AL Membership", href: "/pacakges/membership" },
                  { name: "Meet The Team", href: "/team" },
                  { name: "AL Training Academy", href: "/training" },
                  { name: "News & Events", href: "/news" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="border-b border-section-divider pb-4 mb-4"
                  >
                    <Link
                      href={item.href}
                      className="w-full block text-left py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}

                {/* Footer */}
                <div className="mt-8 border-t border-section-divider pt-6 text-center">
                  <button 
                    onClick={() => setIsClinicsOpen(true)}
                    className="flex items-center justify-center gap-2 mx-auto text-muted-foreground hover:text-foreground text-sm uppercase tracking-wide"
                  >
                    <span>CALL US</span>
                    <ChevronDown className="w-6 h-6" />
                  </button>
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
                    onMouseEnter={() => showSubmenu('treatments')}
                    onMouseLeave={hideSubmenu}
                  >
                    <button 
                      className="block text-2xl font-light text-gray-800 hover:text-gray-600 transition-colors text-left w-full"
                      onClick={() => toggleSubmenu('treatments')}
                    >
                      Treatments
                    </button>
                  </div>

                  {/* Conditions Section */}
                  <div 
                    className="py-4 pr-8"
                    onMouseEnter={() => showSubmenu('conditions')}
                    onMouseLeave={hideSubmenu}
                  >
                    <button 
                      className="block text-2xl font-light text-gray-800 hover:text-gray-600 transition-colors text-left w-full"
                      onClick={() => toggleSubmenu('conditions')}
                    >
                      Conditions
                    </button>
                  </div>

                  {/* Static Links */}
                  <div className="py-4">
                    <Link
                      href="/membership"
                      className="block text-2xl font-light text-gray-800 hover:text-gray-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Club AL Membership
                    </Link>
                  </div>

                  <div className="py-4">
                    <Link
                      href="/contact"
                      className="block text-xl font-light text-gray-800 hover:text-gray-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </div>

                  <div className="py-4">
                    <Link
                      href="/about"
                      className="block text-xl font-light text-gray-800 hover:text-gray-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      About Us
                    </Link>
                  </div>

                  <div className="py-4">
                    <Link
                      href="/team"
                      className="block text-xl font-light text-gray-800 hover:text-gray-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Meet The Team
                    </Link>
                  </div>

                  <div className="py-4">
                    <Link
                      href="/training"
                      className="block text-xl font-light text-gray-800 hover:text-gray-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      AL Training Academy
                    </Link>
                  </div>

                  <div className="py-4">
                    <Link
                      href="/news"
                      className="block text-xl font-light text-gray-800 hover:text-gray-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      News & Events
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
                      
                      {activeSubmenu === 'treatments' && (
                        <>
                          <DesktopDropdown
                            label="Injectables"
                            section="Injectables"
                            links={injectablesLinks}
                            type="injectables"
                          />

                          <DesktopDropdown
                            label="Minor Ops"
                            section="MinorOps"
                            links={minorOpsLinks}
                            type="minor-ops"
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
                        </>
                      )}

                      {activeSubmenu === 'conditions' && (
                        <>
                          <DesktopDropdown
                            label="Facial Concerns"
                            section="FacialConcerns"
                            links={facialConcernsLinks}
                            type="conditions"
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
    </>
  );
}