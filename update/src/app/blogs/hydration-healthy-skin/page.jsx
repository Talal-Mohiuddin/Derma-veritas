import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

export default function HydrationHealthySkinPage() {
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
              <span>May 8, 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              The Role of Hydration in Maintaining Healthy Skin
            </h1>

            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Face</span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Skincare</span>
            </div>
          </div>

          <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Woman drinking water with glowing skin"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Proper hydration is fundamental to healthy, glowing skin. Understanding how hydration affects your skin
              can help you make better choices for your skincare routine and overall health.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Internal Hydration</h2>
            <p className="text-foreground mb-6">
              Drinking adequate water helps maintain your skin's moisture balance from within. While the "8 glasses a
              day" rule isn't scientifically proven, staying well-hydrated supports overall skin health and can improve
              skin elasticity and appearance.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">External Hydration</h2>
            <p className="text-foreground mb-6">
              Topical hydration through moisturizers and serums is equally important. Look for ingredients like
              hyaluronic acid, glycerin, and ceramides that help attract and retain moisture in your skin.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Signs of Dehydrated Skin</h2>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li>Tightness and discomfort</li>
              <li>Dullness and lack of radiance</li>
              <li>Fine lines and wrinkles appearing more prominent</li>
              <li>Increased sensitivity and irritation</li>
              <li>Flaky or rough texture</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Hydration Tips</h2>
            <p className="text-foreground mb-6">
              Apply moisturizer to damp skin to lock in hydration, use a humidifier in dry environments, and consider
              hydrating face masks as a weekly treatment. Remember that over-cleansing can strip your skin's natural
              moisture barrier.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
