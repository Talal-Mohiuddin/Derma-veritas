import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function DermalFillersSection() {
  return (
    <section className="bg-gray-50 py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start md:items-center min-h-[600px]">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center md:text-left flex flex-col justify-center md:justify-start pt-8 md:pt-16">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-px bg-gray-400"></div>
              <span className="text-gray-600 text-sm font-medium tracking-wide">Dermal Fillers</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Define, contour & sculpt your skin
            </h2>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
              Revitalise your natural beauty using Dermal Fillers at AL Aesthetics.
            </p>

            <div className="pt-6">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors font-medium bg-transparent text-sm tracking-wide"
              >
                VIEW PRICES
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative md:order-last flex items-center justify-center">
            <div className="rounded-3xl overflow-hidden bg-gray-200 aspect-[4/5] w-full max-w-lg">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Typc7l7xyR03G6ElXXV4TU3kmctEU1.png"
                alt="Professional dermal filler treatment being administered to a woman"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-6 right-6 bg-white rounded-full px-4 py-3 shadow-lg flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-medium">Read Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
