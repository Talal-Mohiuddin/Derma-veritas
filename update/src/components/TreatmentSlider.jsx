"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const treatments = [
  {
    id: 1,
    title: "Anti-Wrinkle Treatment",
    image: "/injectables/Anti Wrinkle Vertical.jpg",
    price: "From £200",
    href: "/menu/injectables/anti-wrinkle-treatment",
  },
  {
    id: 2,
    title: "Cheek Fillers",
    image: "/injectables/Cheeks Filler Veritcal.jpg",
    price: "From £450",
    href: "/menu/injectables/cheek-fillers",
  },
  {
    id: 3,
    title: "Dermal Fillers",
    image: "/injectables/Dermal Filler Vertical.jpg",
    price: "From £350",
    href: "/treatments/dermal-fillers",
  },
  {
    id: 4,
    title: "Exosome Therapy",
    image: "/wellness/Exosome Therapy Vertical.jpg",
    price: "From £350",
    href: "/treatments/exosome-therapy",
  },
  {
    id: 5,
    title: "Lip Fillers",
    image: "/injectables/Lips Filler Vertical.jpg",
    price: "From £300",
    href: "/menu/injectables/lip-fillers",
  },
  {
    id: 6,
    title: "Microneedling",
    image: "/skin_care/Microneedling Horizental.jpg",
    price: "From £180",
    href: "/treatments/microneedling",
  },
  {
    id: 7,
    title: "Endolift",
    image: "/skin_care/Endolift Vertical.jpg",
    price: "From £600",
    href: "/treatments/endolift",
  },
  {
    id: 8,
    title: "Polynucleotide",
    image: "/skin_care/Polynucleotide Vertical.jpg",
    price: "From £800",
    href: "/treatments/polynucleotide",
  },
  {
    id: 9,
    title: "PRP Therapy",
    image: "/wellness/PRP Therapy Vertical.jpg",
    price: "From £180",
    href: "/treatments/prp-therapy",
  },
  {
    id: 10,
    title: "Quad Laser Hair Removal",
    image: "/laser_treatments/Quad Laser Treatment Vertical.jpg",
    price: "From £250",
    href: "/treatments/quad-laser-hair-removal",
  },
  {
    id: 11,
    title: "RF Microneedling",
    image: "/skin_care/RF Microneedling Vertical.jpg",
    price: "From £180",
    href: "/treatments/rf-microneedling",
  },
];

export default function TreatmentSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 4000); // auto-scroll every 4s
    return () => clearInterval(interval);
  });

  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      // responsive card width (smaller on mobile)
      const cardWidth = sliderRef.current.querySelector("div").offsetWidth + 24;
      sliderRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : treatments.length - 1;
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex =
      currentIndex < treatments.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <div className="absolute -top-12 right-6 flex gap-3 z-10">
        <button
          onClick={scrollLeft}
          className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={scrollRight}
          className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Cards */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {treatments.map((treatment) => (
          <div
            key={treatment.id}
            className="flex-shrink-0 w-[70%] sm:w-[250px] md:w-[320px] lg:w-[380px] xl:w-[420px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[550px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg transition-all"
          >
            {/* Image */}
            <img
              src={treatment.image}
              alt={treatment.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Price Badge (Hidden until hover) */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="bg-white/70 text-black text-sm font-light px-6 py-3 rounded-full shadow-md">
                {treatment.price}
              </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3
                className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-4 drop-shadow-lg"
                style={{ fontFamily: "Arpona, sans-serif" }}
              >
                {treatment.title}
              </h3>

              {/* Button (Hidden until hover) */}
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <Link href={treatment.href}>
                  <Button className="bg-white text-black hover:bg-gray-100 text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-6 font-medium transition-colors shadow-md rounded-none">
                    VIEW TREATMENT
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {treatments.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white scale-110"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
