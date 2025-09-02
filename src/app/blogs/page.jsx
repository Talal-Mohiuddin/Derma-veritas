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
                className="bg-white border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300 rounded-2xl relative"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
                }}
              >
                {/* Wrap entire card content with Link */}
                <Link 
                  href={`/blogs/${post.slug}`} 
                  className="absolute inset-0 z-10"
                  aria-label={`Read more about ${post.title}`}
                />
                
                <div className="aspect-[4/3] overflow-hidden rounded-t-2xl relative z-0">
                  <img
                    src={post.image || "/images/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 relative z-0">
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

                  <div className="flex justify-between items-center relative z-20">
                    <span className="flex items-center text-gray-600 text-sm font-medium">
                      Read more →
                    </span>

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