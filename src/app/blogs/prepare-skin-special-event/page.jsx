import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

export default function PrepareSkinsSpecialEventPage() {
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
              <span>August 14, 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How to Prepare Your Skin for a Special Event
            </h1>

            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Face</span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Aesthetics</span>
            </div>
          </div>

          <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg">
            <img
              src="/woman-at-vanity-mirror-applying-skincare-products-.png"
              alt="Woman preparing skin at vanity mirror"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Whether it's your wedding day, a milestone birthday, or an important business event, having radiant,
              camera-ready skin can boost your confidence and ensure you look your absolute best.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Start Early: The 6-Week Timeline</h2>
            <p className="text-foreground mb-6">
              The key to achieving flawless skin for your special event is starting your preparation at least 6 weeks in
              advance. This timeline allows your skin to adjust to new treatments and products while giving you enough
              time to address any concerns that may arise.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Professional Treatments to Consider</h2>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li>Chemical peels for improved texture and radiance</li>
              <li>Microneedling to boost collagen production</li>
              <li>Hydrafacials for deep cleansing and hydration</li>
              <li>LED light therapy to reduce inflammation</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Daily Skincare Essentials</h2>
            <p className="text-foreground mb-6">
              Consistency is crucial when preparing your skin. Focus on a gentle yet effective routine that includes
              cleansing, exfoliating, moisturizing, and sun protection. Avoid trying new products too close to your
              event date.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">The Final Week</h2>
            <p className="text-foreground mb-6">
              In the week leading up to your event, stick to your established routine and avoid any new treatments.
              Focus on hydration, both internally and externally, and ensure you're getting adequate sleep for that
              natural glow.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
