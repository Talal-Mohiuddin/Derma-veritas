import { useStore } from "@/store/zustand";
import { Star } from "lucide-react";

export default function Simplicity() {
  const { bookingOpen, setBookingOpen } = useStore();

  return (
    <section className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                There is beauty in simplicity
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                Discover how the dedicated team at AL Aesthetics can enhance
                your natural beauty today.
              </p>
            </div>

            {/* Custom Styled Button */}
            <button
              onClick={() => setBookingOpen(!bookingOpen)}
              className="relative px-8 py-4 text-sm font-bold uppercase text-white bg-[#272728]  tracking-wide overflow-hidden rounded-lg"
            >
              BOOK A CONSULTATION
              {/* subtle top white shine */}
              <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
            </button>
          </div>

          {/* Right Content - Team Image with Reviews */}
          <div className="relative flex flex-col items-center lg:items-end">
            <div className="aspect-[4/3] overflow-hidden rounded-lg w-full max-w-md lg:max-w-none">
              <img
                src="https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AL Aesthetics Team"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Google Reviews Overlay */}
            <div className="absolute -bottom-6 lg:bottom-6 lg:right-6 bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <span className="text-gray-600 text-sm font-medium">
                Read Reviews
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}