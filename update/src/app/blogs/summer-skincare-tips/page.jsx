import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

export default function SummerSkincareTipsPage() {
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
              <span>June 5, 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Essential Summer Skincare Tips for Healthy Skin
            </h1>

            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Face</span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Skincare</span>
            </div>
          </div>

          <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg">
            <img
              src="/woman-applying-sunscreen-at-beach-summer-skincare-.png"
              alt="Woman applying sunscreen at beach"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Summer brings unique challenges for your skin. Higher temperatures, increased humidity, and more sun
              exposure require adjustments to your skincare routine.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Lighten Your Routine</h2>
            <p className="text-foreground mb-6">
              Switch to lighter, gel-based moisturizers and serums that won't feel heavy in the heat. Your skin produces
              more oil in summer, so you may need less hydration than in cooler months.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Sun Protection is Non-Negotiable</h2>
            <p className="text-foreground mb-6">
              Use a broad-spectrum SPF 30 or higher every day, even when it's cloudy. Reapply every two hours and after
              swimming or sweating. Don't forget often-missed areas like your ears, neck, and the tops of your feet.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Stay Hydrated Inside and Out</h2>
            <p className="text-foreground mb-6">
              Drink plenty of water and use hydrating serums with hyaluronic acid. Consider using a facial mist
              throughout the day to refresh and hydrate your skin.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Gentle Exfoliation</h2>
            <p className="text-foreground mb-6">
              Regular exfoliation helps remove dead skin cells and prevents clogged pores from increased sweating. Use
              gentle chemical exfoliants rather than harsh scrubs.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
