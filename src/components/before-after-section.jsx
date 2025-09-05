"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const treatments = [
  {
    id: 1,
    title: "Temple Hollow Injections",
    image: "/images/temple.png",
    hasVideo: true,
    videoUrl:
      "https://www.dropbox.com/scl/fo/k3bry0f2j8u5e5250laql/AAEkgvlGwrifRQmo-EL_69Y?dl=0&e=2&preview=EndoliftX%C2%AE%2BProcedure.mp4&rlkey=vg70w8gspccmgn1u31odzfxdv&st=ya723am1",
  },
  {
    id: 2,
    title: "Non-Surgical Rhinoplasty",
    image: "/images/non-surgical.png",
    hasVideo: true,
    videoUrl:
      "https://www.dropbox.com/scl/fo/k3bry0f2j8u5e5250laql/AAEkgvlGwrifRQmo-EL_69Y?dl=0&e=2&preview=Endolift%2BSTORIES%2BENG.mov&rlkey=vg70w8gspccmgn1u31odzfxdv&st=ya723am1",
  },
  {
    id: 3,
    title: "Over Injected Fillers",
    image: "/images/over.png",
    hasVideo: true,
    featured: true,
    videoUrl:
      "https://www.dropbox.com/scl/fo/k3bry0f2j8u5e5250laql/AAEkgvlGwrifRQmo-EL_69Y?dl=0&e=2&preview=Treatment%2Bline.mp4&rlkey=vg70w8gspccmgn1u31odzfxdv&st=ya723am1",
  },
  {
    id: 4,
    title: "Hyperhidrosis Treatment",
    image: "/images/sample_image.jpg",
    hasVideo: true,
    videoUrl:
      "https://www.dropbox.com/scl/fo/k3bry0f2j8u5e5250laql/AAEkgvlGwrifRQmo-EL_69Y?dl=0&e=2&preview=20210303%2BEVERMOOVE%2BPOST%2BENG.mov&rlkey=vg70w8gspccmgn1u31odzfxdv&st=ya723am1",
  },
  {
    id: 5,
    title: "Lip Enhancement",
    image: "/images/lip-enhacement.png",
    hasVideo: true,
    videoUrl:
      "https://www.dropbox.com/scl/fo/k3bry0f2j8u5e5250laql/AAEkgvlGwrifRQmo-EL_69Y?dl=0&e=2&preview=Promo%2B7.mov&rlkey=vg70w8gspccmgn1u31odzfxdv&st=ya723am1",
  },
  {
    id: 6,
    title: "Jawline Contouring",
    image: "/images/jawline.png",
    hasVideo: true,
    videoUrl:
      "https://www.dropbox.com/scl/fo/k3bry0f2j8u5e5250laql/AAEkgvlGwrifRQmo-EL_69Y?dl=0&e=2&preview=EndoliftX%C2%AE%2B%26%2BChristmas.mp4&rlkey=vg70w8gspccmgn1u31odzfxdv&st=ya723am1",
  },
];

export default function BeforeAfterSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % treatments.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + treatments.length) % treatments.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gray-300 flex-1 max-w-20"></div>
            <span className="px-4 text-sm text-gray-500 tracking-wide">
              Before & After Results
            </span>
            <div className="h-px bg-gray-300 flex-1 max-w-20"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 tracking-tight mx-auto">
            Up-lifting your confidence.
          </h2>
        </div>

        {/* Treatment Gallery Container */}
        <div className="relative w-full overflow-hidden">
          {/* Left padding for the first card */}
          <div className="pl-4">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * 436}px)`, // card width (420) + gap (16)
              }}
            >
              {treatments.map((treatment, index) => (
                <div
                  key={treatment.id}
                  className="relative flex-shrink-0 w-[420px] h-[520px] rounded-xl overflow-hidden group cursor-pointer"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  {/* Treatment Image */}
                  {!imageErrors[treatment.id] ? (
                    <img
                      src={treatment.image}
                      alt={treatment.title}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(treatment.id)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Image not available</span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* Treatment Title */}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 px-4">
            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {treatments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Arrow Navigation */}
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
