"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

export default function MobileMenuDrawer({ isOpen, setIsOpen }) {
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Injectables Dropdown Links
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
  ]

  // Minor Ops Dropdown Links
  const minorOpsLinks = [
    "Minor Surgical Procedures",
    "Cyst Removal",
    "Mole Removal",
    "Skin Tag Removal",
    "Wart Removal",
  ]


  // Skincare Dropdown Links
  const skincareLinks = [
    "Skin Assessment",
    "NCTF@ Skin Revitalisation",
    "Medical HydraFacial",
    "ZO Skin Health Facial",
    "Skinpen Microneedling",
    "Obagi Blue Radiance Peel",
    "Dermalux LED Light Therapy",
    "Chemical Peel",
    "Milia Removal",
    "PRX Therapy",
    "AcuFirm Facelift",
    "Skin Sculptor Facial",
  ]

  // Wellness Dropdown Links
  const wellnessLinks = [
    "IV Drips",
    "Blood Tests",
  ]




  // Convert names → slug format (for folder routing)
  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/@/g, "at") // handle NCTF@
      .replace(/\s+/g, "-") // spaces → dash
      .replace(/[^a-z0-9-]/g, "") // remove special chars

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-background flex flex-col"
        >
          {/* Drawer Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">AL</span>
              </div>
              <span className="text-xl font-light text-foreground">Aesthetics</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Drawer Nav Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Section: Treatments */}
            <div className="border-b border-section-divider pb-4 mb-4">
              <h3 className="text-sm font-bold uppercase text-section-fg mb-3">Treatments</h3>

              {/* Injectables Dropdown */}
              <div>
                <button
                  onClick={() => toggleSection("Injectables")}
                  className="flex justify-between items-center w-full py-2 text-base text-muted-foreground hover:text-foreground"
                >
                  <span>Injectables</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${expandedSections["Injectables"] ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedSections["Injectables"] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="pl-4 overflow-hidden"
                    >
                      {injectablesLinks.map((item) => (
                        <Link
                          key={item}
                          href={`/menu/injectables/${slugify(item)}`}
                          className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => setIsOpen(false)} // close drawer on click
                        >
                          {item}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>



              {/* Minor Ops Dropdown */}
              <div>
                <button
                  onClick={() => toggleSection("Minor Ops")}
                  className="flex justify-between items-center w-full py-2 text-base text-muted-foreground hover:text-foreground"
                >
                  <span>Minor Ops</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${expandedSections["Minor Ops"] ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedSections["Minor Ops"] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="pl-4 overflow-hidden"
                    >
                      {minorOpsLinks.map((item) => (
                        <Link
                          key={item}
                          href={`/menu/minor-ops/${slugify(item)}`}
                          className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => setIsOpen(false)} // close drawer on click
                        >
                          {item}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>



              {/* Skincare Dropdown */}
              <div>
                <button
                  onClick={() => toggleSection("Skincare")}
                  className="flex justify-between items-center w-full py-2 text-base text-muted-foreground hover:text-foreground"
                >
                  <span>Skincare</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${expandedSections["Skincare"] ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedSections["Skincare"] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="pl-4 overflow-hidden"
                    >
                      {skincareLinks.map((item) => (
                        <Link
                          key={item}
                          href={`/menu/skincare/${slugify(item)}`}
                          className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => setIsOpen(false)} // close drawer on click
                        >
                          {item}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

{/* Wellness Dropdown */}
<div>
  <button
    onClick={() => toggleSection("Wellness")}
    className="flex justify-between items-center w-full py-2 text-base text-muted-foreground hover:text-foreground"
  >
    <span>Wellness</span>
    <ChevronDown
      className={`w-5 h-5 transition-transform ${
        expandedSections["Wellness"] ? "rotate-180" : ""
      }`}
    />
  </button>

  <AnimatePresence>
    {expandedSections["Wellness"] && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="pl-4 overflow-hidden"
      >
        {wellnessLinks.map((item) => (
          <Link
            key={item}
            href={`/menu/wellness/${slugify(item)}`}
            className="block py-2 text-sm text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(false)} // close drawer on click
          >
            {item}
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
</div>


             
            </div>

            {/* Section: Conditions */}
            <div className="border-b border-section-divider pb-4 mb-4">
              <h3 className="text-sm font-bold uppercase text-section-fg mb-3">Conditions</h3>
              {["Medical Conditions", "Facial Concerns"].map((item) => (
                <button
                  key={item}
                  onClick={() => toggleSection(item)}
                  className="flex justify-between items-center w-full py-2 text-base text-muted-foreground hover:text-foreground"
                >
                  <span className={item === "Facial Concerns" ? "font-semibold" : ""}>{item}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${expandedSections[item] ? "rotate-180" : ""
                      }`}
                  />
                </button>
              ))}
            </div>

            {/* Static Links */}
            {["Contact Us", "About Us", "AL Training Academy"].map((link) => (
              <div key={link} className="border-b border-section-divider pb-4 mb-4">
                <button className="w-full text-left py-2 text-base font-medium text-muted-foreground hover:text-foreground">
                  {link}
                </button>
              </div>
            ))}

            {/* Footer Link */}
            <div className="mt-8 border-t border-section-divider pt-6 text-center">
              <button className="flex items-center justify-center gap-2 mx-auto text-muted-foreground hover:text-foreground text-sm uppercase tracking-wide">
                <span>CALL US</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
