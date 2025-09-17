import { ArrowRight } from "lucide-react"

export default function MediaCoverage() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-8 flex-wrap">
          {/* ITV Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-4xl font-bold text-teal-500">i</span>
              <span className="text-4xl font-bold text-black">t</span>
              <span className="text-4xl font-bold text-pink-500">v</span>
            </div>
            <a href="#" className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800 transition-colors">
              View story <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Yahoo News Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-3xl font-bold text-purple-600">
              yahoo!
              <span className="text-lg font-normal ml-1">news</span>
            </div>
            <a href="#" className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800 transition-colors">
              View story <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* ITV News Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-3xl font-bold text-blue-600">
              itv<span className="font-normal">NEWS</span>
            </div>
            <a href="#" className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800 transition-colors">
              View story <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Women's Health Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-2xl font-bold text-black">Women'sHealth</div>
            <a href="#" className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800 transition-colors">
              View story <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* ITVX Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl font-bold text-lime-400">itvX</div>
            <a href="#" className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800 transition-colors">
              View story <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* MORE Button */}
          <div className="flex items-center">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
              <span className="text-sm font-medium">MORE</span>
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
