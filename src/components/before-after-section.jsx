"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const treatments = [
  {
    id: 1,
    title: "Temple Hollow Injections",
    image: "/images/temple.png",
    hasVideo: true,
  },
  {
    id: 2,
    title: "Non-Surgical Rhinoplasty",
    image: "/images/non-surgical.png",
    hasVideo: true,
  },
  {
    id: 3,
    title: "Over Injected Fillers",
    image: "/images/over.png",
    hasVideo: true,
    featured: true,
  },
  {
    id: 4,
    title: "Hyperhidrosis Treatment",
    image: "/images/sample_image.jpg",
    hasVideo: true,
  },
  {
    id: 5,
    title: "Lip Enhancement",
    image: "/images/lip-enhacement.png",
    hasVideo: true,
  },
  {
    id: 6,
    title: "Jawline Contouring",
    image: "/images/jawline.png",
    hasVideo: true,
  },
]

export default function BeforeAfterSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState({})

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % treatments.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + treatments.length) % treatments.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  return (
    <section className="py-16 bg-white w-full">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gray-300 flex-1 max-w-20"></div>
            <span className="px-4 text-sm text-gray-500 tracking-wide">Before & After Results</span>
            <div className="h-px bg-gray-300 flex-1 max-w-20"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 tracking-tight">
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
                    // Removed opacity and scaling effects for all screens
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
                  <div className="absolute bottom-4 left-4 right-4">
<h3 className="text-white font-medium text-xl mb-3">{treatment.title}</h3>
                    {treatment.hasVideo && (
                      <Button
                        size="sm"
                        className="bg-white text-black hover:bg-gray-100 rounded-none px-5 py-6 text-xs font-medium tracking-wide md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300"
                      >
                        <Play className="w-4 h-4 mr-2 fill-current" />
                        WATCH CLIP
                      </Button>
                    )}
                  </div>
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
  )
}