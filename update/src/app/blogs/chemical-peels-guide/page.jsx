import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

export default function ChemicalPeelsGuidePage() {
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
              <span>May 20, 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              The Complete Guide to Chemical Peels
            </h1>

            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Face</span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Aesthetics</span>
            </div>
          </div>

          <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Professional aesthetic treatment room"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Chemical peels are one of the most effective treatments for improving skin texture, tone, and overall
              appearance. Understanding the different types can help you choose the right option for your skin concerns.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Types of Chemical Peels</h2>
            <p className="text-foreground mb-6">
              <strong>Light Peels:</strong> Use mild acids like glycolic or lactic acid to gently exfoliate the outer
              layer of skin. Perfect for beginners with minimal downtime.
            </p>
            <p className="text-foreground mb-6">
              <strong>Medium Peels:</strong> Penetrate deeper using trichloroacetic acid (TCA) to address more
              significant skin concerns like moderate sun damage and fine lines.
            </p>
            <p className="text-foreground mb-6">
              <strong>Deep Peels:</strong> Use phenol to dramatically improve severe sun damage and deep wrinkles, but
              require significant recovery time.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">What to Expect</h2>
            <p className="text-foreground mb-6">
              During the treatment, you may experience a mild burning sensation. Afterward, your skin will peel for
              several days to weeks, depending on the depth of the peel. This reveals fresh, new skin underneath.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Benefits of Chemical Peels</h2>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li>Improved skin texture and tone</li>
              <li>Reduced appearance of fine lines and wrinkles</li>
              <li>Diminished age spots and sun damage</li>
              <li>Minimized pore appearance</li>
              <li>Enhanced skin radiance and glow</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  )
}
