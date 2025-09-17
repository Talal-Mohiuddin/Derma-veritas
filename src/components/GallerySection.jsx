"use client";

import { useState } from "react";
import { X, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const GallerySection = ({ showAll = true }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Gallery data with all images from the folder
  const galleryItems = [
    {
      id: 1,
      src: "/gallery/CO2 Laser B&A 1.jpg",
      category: "laser-treatment",
      title: "CO2 Laser Treatment",
      description: "Skin resurfacing results",
      size: "medium",
    },
    {
      id: 2,
      src: "/gallery/Endolift B&A 2.jpeg",
      category: "anti-aging",
      title: "Endolift Treatment",
      description: "Facial contouring results",
      size: "medium",
    },
    {
      id: 3,
      src: "/gallery/Endolift B&A 3.jpeg",
      category: "anti-aging",
      title: "Endolift Treatment",
      description: "Skin tightening results",
      size: "small",
    },
    {
      id: 4,
      src: "/gallery/Endolift B&A1.jpeg",
      category: "anti-aging",
      title: "Endolift Treatment",
      description: "Non-surgical facelift",
      size: "medium",
    },
    {
      id: 5,
      src: "/gallery/Quad Laser B&A.jpg",
      category: "hair-removal",
      title: "Quad Laser Hair Removal",
      description: "Permanent hair reduction",
      size: "medium",
    },
    {
      id: 6,
      src: "/gallery/Quad lasier.jpg 1.jpg",
      category: "hair-removal",
      title: "Quad Laser Treatment",
      description: "Hair removal results",
      size: "medium",
    },
    {
      id: 7,
      src: "/gallery/Untitled-2.png",
      category: "skin-rejuvenation",
      title: "Skin Treatment",
      description: "Complexion improvement",
      size: "small",
    },
    {
      id: 8,
      src: "/gallery/Untitled-3.png",
      category: "skin-rejuvenation",
      title: "Skin Treatment",
      description: "Texture enhancement",
      size: "medium",
    },
    {
      id: 9,
      src: "/gallery/Untitled-4.png",
      category: "skin-rejuvenation",
      title: "Skin Treatment",
      description: "Radiance boost",
      size: "small",
    },
    {
      id: 10,
      src: "/gallery/Untitled-5.png",
      category: "skin-rejuvenation",
      title: "Skin Treatment",
      description: "Pigmentation treatment",
      size: "medium",
    },
    {
      id: 11,
      src: "/gallery/Untitled-6.png",
      category: "skin-rejuvenation",
      title: "Skin Treatment",
      description: "Tone improvement",
      size: "medium",
    },
    {
      id: 12,
      src: "/gallery/Untitled-7.png",
      category: "skin-rejuvenation",
      title: "Skin Treatment",
      description: "Overall rejuvenation",
      size: "small",
    },
    {
      id: 13,
      src: "/gallery/WhatsApp Image 2025-09-16 at 3.10.13 PM (1).jpeg",
      category: "acne-treatment",
      title: "Acne Treatment",
      description: "Clear skin transformation",
      size: "medium",
    },
    {
      id: 14,
      src: "/gallery/WhatsApp Image 2025-09-16 at 3.10.13 PM (2).jpeg",
      category: "anti-aging",
      title: "Anti-Aging Treatment",
      description: "Youthful skin restoration",
      size: "small",
    },
    {
      id: 15,
      src: "/gallery/WhatsApp Image 2025-09-16 at 3.10.13 PM (3).jpeg",
      category: "laser-treatment",
      title: "Laser Treatment",
      description: "Skin texture improvement",
      size: "medium",
    },
    {
      id: 16,
      src: "/gallery/WhatsApp Image 2025-09-16 at 3.10.13 PM (4).jpeg",
      category: "hair-removal",
      title: "Hair Removal",
      description: "Smooth skin results",
      size: "medium",
    },
    {
      id: 17,
      src: "/gallery/WhatsApp Image 2025-09-16 at 3.10.13 PM (5).jpeg",
      category: "skin-rejuvenation",
      title: "Skin Rejuvenation",
      description: "Glowing complexion",
      size: "medium",
    },
    {
      id: 18,
      src: "/gallery/WhatsApp Image 2025-09-16 at 3.10.13 PM (6).jpeg",
      category: "acne-treatment",
      title: "Acne Treatment",
      description: "Blemish-free skin",
      size: "small",
    },
    {
      id: 19,
      src: "/gallery/WhatsApp Image 2025-09-16 at 3.10.13 PM.jpeg",
      category: "anti-aging",
      title: "Anti-Aging Care",
      description: "Age reversal results",
      size: "medium",
    },
    {
      id: 20,
      src: "/gallery/WhatsApp Image 2025-09-16 at 3.10.14 PM (1).jpeg",
      category: "laser-treatment",
      title: "Laser Therapy",
      description: "Advanced skin treatment",
      size: "medium",
    },
    {
      id: 21,
      src: "/gallery/WhatsApp Image 2025-09-16 at 3.10.14 PM.jpeg",
      category: "hair-removal",
      title: "Hair Removal Treatment",
      description: "Long-lasting results",
      size: "small",
    },
    {
      id: 22,
      src: "/gallery/WhatsApp Image 2025-09-16 at 3.12.03 PM.jpeg",
      category: "prp-hair-restoration",
      title: "PRP Hair Restoration",
      description: "Complete transformation",
      size: "medium",
    },
  ];

  const filters = [
    { key: "all", label: "All Results" },
    { key: "acne-treatment", label: "Acne Treatment" },
    { key: "laser-treatment", label: "Laser Treatment" },
    { key: "anti-aging", label: "Anti-Aging" },
    { key: "hair-restoration", label: "Hair Restoration" },
    { key: "skin-rejuvenation", label: "Skin Rejuvenation" },
    { key: "hair-removal", label: "Hair Removal" },
  ];

  const filteredItems =
    selectedFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedFilter);

  // Limit items when not showing all (for home page preview)
  const displayItems = showAll ? filteredItems : filteredItems.slice(0, 8);

  // Encode filenames to avoid broken images in production (spaces, & and special chars)
  const toSafeSrc = (src) => {
    if (!src) return src;
    // Only transform gallery paths
    const prefix = "/gallery/";
    if (src.startsWith(prefix)) {
      const fileName = src.slice(prefix.length);
      return `${prefix}${encodeURIComponent(fileName)}`;
    }
    return encodeURI(src);
  };

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
    );
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2 h-96 md:h-auto";
      case "medium":
        return "md:col-span-1 md:row-span-2 h-64 md:h-80";
      case "small":
        return "md:col-span-1 md:row-span-1 h-48 md:h-40";
      default:
        return "md:col-span-1 md:row-span-1 h-48";
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Client Success Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Witness the incredible transformations of our clients. These real
            results showcase the expertise and care that goes into every
            treatment at Derma Veritas.
          </p>
        </div>

        {/* Filter Buttons - Only show when showAll is true */}
        {showAll && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="flex items-center gap-2 text-gray-600 mr-4">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedFilter === filter.key
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-max">
          {displayItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${getSizeClasses(
                item.size
              )}`}
              onClick={() => openLightbox(index)}
            >
              {/* Real image */}
              <img
                src={toSafeSrc(item.src)}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery Button - Only show when not showing all */}
        {!showAll && (
          <div className="text-center mt-12">
            <Button
              onClick={() => window.location.href = '/gallery'}
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-lg font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Full Gallery
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          {/* Close Button - Outside image container */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-10 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors border border-white/20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons - Outside image container */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-full">
            {/* Image */}
            <img
              src={toSafeSrc(filteredItems[currentImage]?.src)}
              alt={filteredItems[currentImage]?.title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />

            {/* Image Info */}
            <div className="text-center mt-4 text-white">
              <h3 className="text-xl font-semibold">
                {filteredItems[currentImage]?.title}
              </h3>
              <p className="text-gray-300">
                {filteredItems[currentImage]?.description}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                {currentImage + 1} of {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
