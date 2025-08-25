"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const treatments = [
  { id: 1, title: "Dermal Fillers", image: "/images/sample_image.jpg", price: "From £350", slug: "dermal-fillers" },
  { id: 2, title: "Non-Surgical Nose Job", image: "/images/sample_image.jpg", price: "From £450", slug: "non-surgical-nose-job" },
  { id: 3, title: "Non-Surgical Face Lift", image: "/images/sample_image.jpg", price: "From £600", slug: "non-surgical-face-lift" },
  { id: 4, title: "Cheek Fillers", image: "/images/sample_image.jpg", price: "From £450", slug: "cheek-fillers" },
  { id: 5, title: "Lip Fillers", image: "/images/sample_image.jpg", price: "From £300", slug: "lip-fillers" },
  { id: 6, title: "Botox Treatment", image: "/images/sample_image.jpg", price: "From £200", slug: "botox-treatment" },
  { id: 7, title: "Thread Lift", image: "/images/sample_image.jpg", price: "From £800", slug: "thread-lift" },
  { id: 8, title: "Skin Boosters", image: "/images/sample_image.jpg", price: "From £250", slug: "skin-boosters" },
  { id: 9, title: "Chemical Peels", image: "/images/sample_image.jpg", price: "From £150", slug: "chemical-peels" },
  { id: 10, title: "Microneedling", image: "/images/sample_image.jpg", price: "From £180", slug: "microneedling" },
]

export default function TreatmentSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight()
    }, 4000) // auto-scroll every 4s
    return () => clearInterval(interval)
  })

  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      // responsive card width (smaller on mobile)
      const cardWidth = sliderRef.current.querySelector("div").offsetWidth + 24
      sliderRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      })
      setCurrentIndex(index)
    }
  }

  const scrollLeft = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : treatments.length - 1
    scrollToIndex(newIndex)
  }

  const scrollRight = () => {
    const newIndex = currentIndex < treatments.length - 1 ? currentIndex + 1 : 0
    scrollToIndex(newIndex)
  }

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
            className="flex-shrink-0 w-[85%] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[550px] h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg transition-all"
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
                <Link href={`/treatments/${treatment.slug}`}>
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
  )
}
