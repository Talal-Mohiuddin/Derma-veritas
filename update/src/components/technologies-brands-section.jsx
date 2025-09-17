"use client"

import { Montserrat, Cormorant_Garamond, Playfair_Display, Raleway, Tangerine, Parisienne, Great_Vibes } from 'next/font/google'

// Load Google Fonts
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-montserrat'
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair'
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway'
})

const tangerine = Tangerine({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-tangerine'
})

const parisienne = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-parisienne'
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes'
})

export default function TechnologiesBrandsSection() {
  const brands = [
    { 
      name: "SkinPen", 
      logo: "SkinPen Precision", 
      font: `${montserrat.variable} font-montserrat font-light tracking-widest`
    },
    { 
      name: "Juvederm", 
      logo: "Juvéderm", 
      font: `${playfair.variable} font-playfair italic font-medium`
    },
    { 
      name: "Botox", 
      logo: "BOTOX", 
      font: `${montserrat.variable} font-montserrat font-bold uppercase tracking-wider`
    },
    { 
      name: "Alumier", 
      logo: "AlumierMD", 
      font: `${raleway.variable} font-raleway font-semibold`
    },
    { 
      name: "General Medical Council", 
      logo: "GMC", 
      font: `${montserrat.variable} font-montserrat font-light tracking-wide`
    },
    { 
      name: "Profhilo", 
      logo: "PROFHILO", 
      font: `${montserrat.variable} font-montserrat font-black uppercase`
    },
    { 
      name: "Obagi", 
      logo: "OBAGI", 
      font: `${montserrat.variable} font-montserrat font-bold tracking-widest`
    },
    { 
      name: "Restylane", 
      logo: "Restylane", 
      font: `${cormorant.variable} font-cormorant font-medium italic`
    },
    { 
      name: "Dysport", 
      logo: "Dysport", 
      font: `${tangerine.variable} font-tangerine font-bold text-3xl`
    },
    { 
      name: "Teosyal", 
      logo: "Teosyal", 
      font: `${parisienne.variable} font-parisienne text-3xl`
    },
    { 
      name: "Belotero", 
      logo: "Belotero", 
      font: `${greatVibes.variable} font-great-vibes text-3xl`
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-light text-gray-600 tracking-wide">
            Technologies & Brands we use—
          </h2>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee items-center">
            {brands.map((brand, index) => (
              <div
                key={index}
                className={`flex items-center justify-center h-20 mx-8 opacity-80 hover:opacity-100 transition-all duration-300 flex-shrink-0 ${brand.font} text-xl md:text-2xl text-gray-700 hover:text-gray-900 hover:scale-105`}
              >
                {brand.logo}
              </div>
            ))}
            
            {/* Duplicate for seamless loop */}
            {brands.map((brand, index) => (
              <div
                key={`dup-${index}`}
                className={`flex items-center justify-center h-20 mx-8 opacity-80 hover:opacity-100 transition-all duration-300 flex-shrink-0 ${brand.font} text-xl md:text-2xl text-gray-700 hover:text-gray-900 hover:scale-105`}
              >
                {brand.logo}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: flex;
          width: max-content;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}