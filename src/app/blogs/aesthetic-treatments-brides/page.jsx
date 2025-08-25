import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

export default function AestheticTreatmentsBridesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <CalendarDays className="w-4 h-4" />
              <span>July 10, 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              The Benefits of Aesthetic Treatments for Brides-to-Be
            </h1>

            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Face</span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Aesthetics</span>
            </div>
          </div>

          <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg">
            <img
              src="/elegant-bride-in-white-dress-natural-lighting-wedd.png"
              alt="Elegant bride in natural lighting"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Your wedding day is one of the most photographed days of your life. Aesthetic treatments can help you look
              and feel your absolute best while maintaining a natural, radiant appearance.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Planning Your Treatment Timeline</h2>
            <p className="text-foreground mb-6">
              Start planning your aesthetic treatments 6-12 months before your wedding. This allows time for multiple
              sessions if needed and ensures any potential side effects have resolved well before your big day.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Popular Pre-Wedding Treatments</h2>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li>Botox for smooth, worry-free expressions</li>
              <li>Dermal fillers for enhanced facial contours</li>
              <li>Chemical peels for glowing, even-toned skin</li>
              <li>Laser treatments for hair removal</li>
              <li>Microneedling for improved skin texture</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">The Natural Enhancement Approach</h2>
            <p className="text-foreground mb-6">
              The goal is to enhance your natural beauty, not create a dramatically different appearance. Subtle
              treatments that improve skin quality and address specific concerns will photograph beautifully and ensure
              you still look like yourself.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
