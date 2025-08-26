"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ClinicsModal from "@/components/ClinicsModal";

const blogPosts = [
  {
    id: 1,
    slug: "prepare-skin-special-event",
    title: "How to Prepare Your Skin for a Special Event",
    date: "August 14, 2025",
    image: "/images/woman-at-vanity-mirror-applying-skincare.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Get your skin glowing and camera-ready for your special day with these expert tips.",
  },
  {
    id: 2,
    slug: "sun-protection-after-procedures",
    title: "Why is Sun Protection So Important After Aesthetic Procedures?",
    date: "July 22, 2025",
    image: "/images/woman-wearing-sun-hat-smiling-outdoors.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Learn why proper sun protection is crucial for optimal healing and results.",
  },
  {
    id: 3,
    slug: "aesthetic-treatments-brides",
    title: "The Benefits of Aesthetic Treatments for Brides-to-Be",
    date: "July 10, 2025",
    image: "/images/elegant-bride-in-white-dress-natural-lighting.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Discover the perfect aesthetic treatments to help you look radiant on your wedding day.",
  },
  {
    id: 4,
    slug: "anti-aging-skincare-routine",
    title: "Building an Effective Anti-Aging Skincare Routine",
    date: "June 28, 2025",
    image: "/images/luxury-skincare-products-on-marble-surface.png",
    tags: ["Face", "Skincare"],
    excerpt:
      "Create a comprehensive anti-aging routine that delivers visible results.",
  },
  {
    id: 5,
    slug: "botox-myths-facts",
    title: "Botox: Separating Myths from Facts",
    date: "June 15, 2025",
    image: "/images/professional-aesthetic-consultation-modern-clinic.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Get the truth about Botox treatments and what to expect from the procedure.",
  },
  {
    id: 6,
    slug: "summer-skincare-tips",
    title: "Essential Summer Skincare Tips for Healthy Skin",
    date: "June 5, 2025",
    image: "/images/woman-applying-sunscreen-at-beach-summer-vibes.png",
    tags: ["Face", "Skincare"],
    excerpt:
      "Protect and nourish your skin during the hot summer months with these expert tips.",
  },
  {
    id: 7,
    slug: "chemical-peels-guide",
    title: "The Complete Guide to Chemical Peels",
    date: "May 20, 2025",
    image: "/images/aesthetic-treatment-room-professional-equipment.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Everything you need to know about chemical peels and their transformative benefits.",
  },
  {
    id: 8,
    slug: "hydration-healthy-skin",
    title: "The Role of Hydration in Maintaining Healthy Skin",
    date: "May 8, 2025",
    image: "/images/woman-drinking-water-glowing-skin-wellness.png",
    tags: ["Face", "Skincare"],
    excerpt:
      "Discover how proper hydration impacts your skin health and appearance.",
  },
  {
    id: 9,
    slug: "dermal-fillers-explained",
    title: "Dermal Fillers Explained: What You Need to Know",
    date: "April 25, 2025",
    image: "/images/before-after-aesthetic-treatment-natural-results.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Learn about different types of dermal fillers and their applications.",
  },
  {
    id: 10,
    slug: "post-treatment-care",
    title: "Post-Treatment Care: Maximizing Your Results",
    date: "April 12, 2025",
    image: "/images/serene-spa-environment-recovery-skincare.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Follow these essential aftercare tips to ensure the best possible treatment outcomes.",
  },
];

export default function BlogsPage() {
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      {/* Top Header with CALL + CLINIC */}
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
            <button className="relative px-6 py-3 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide">
              BOOK A CONSULTATION
              <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
            </button>

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

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
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
                <span className="text-xl font-light text-foreground">
                  Aesthetics
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Drawer Nav Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Section: Treatments */}
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-bold uppercase mb-3">Treatments</h3>
                {["Injectables", "Minor Ops", "Skincare", "Wellness"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => toggleSection(item)}
                      className="flex justify-between items-center w-full py-2 text-base text-muted-foreground hover:text-foreground"
                    >
                      <span>{item}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          expandedSections[item] ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )
                )}
              </div>

              {/* Section: Conditions */}
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-bold uppercase mb-3">Conditions</h3>
                {["Medical Conditions", "Facial Concerns"].map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleSection(item)}
                    className="flex justify-between items-center w-full py-2 text-base text-muted-foreground hover:text-foreground"
                  >
                    <span
                      className={
                        item === "Facial Concerns" ? "font-semibold" : ""
                      }
                    >
                      {item}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedSections[item] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Static Links */}
              <div className="border-b pb-4 mb-4">
                <button className="w-full text-left py-2 text-base font-medium text-muted-foreground hover:text-foreground">
                  Contact Us
                </button>
              </div>
              <div className="border-b pb-4 mb-4">
                <button className="w-full text-left py-2 text-base font-medium text-muted-foreground hover:text-foreground">
                  About Us
                </button>
              </div>
              <div className="border-b pb-4 mb-4">
                <button className="w-full text-left py-2 text-base font-medium text-muted-foreground hover:text-foreground">
                  AL Training Academy
                </button>
              </div>

              {/* Footer Link */}
              <div className="mt-8 border-t pt-6 text-center">
                <button
                  onClick={() => setIsClinicsOpen(true)}
                  className="flex items-center justify-center gap-2 mx-auto text-muted-foreground hover:text-foreground text-sm uppercase tracking-wide"
                >
                  <span>CALL US</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blogs Section */}
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              News and Events
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300 rounded-none"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image || "/images/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.date}
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-3 leading-tight group-hover:text-[#272728] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex justify-between items-center">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                    >
                      Read more →
                    </Link>

                    <div className="flex gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Clinics Modal */}
    </>
  );
}
