import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

export default function DermalFillersExplainedPage() {
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
              <span>April 25, 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Dermal Fillers Explained: What You Need to Know
            </h1>

            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Face</span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Aesthetics</span>
            </div>
          </div>

          <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Before and after aesthetic treatment results"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Dermal fillers have revolutionized non-surgical facial rejuvenation, offering immediate results with
              minimal downtime. Understanding the different types and applications can help you make informed decisions.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Types of Dermal Fillers</h2>
            <p className="text-foreground mb-6">
              <strong>Hyaluronic Acid Fillers:</strong> The most popular type, naturally occurring in the body and
              reversible. Brands include Juvederm, Restylane, and Belotero.
            </p>
            <p className="text-foreground mb-6">
              <strong>Calcium Hydroxylapatite:</strong> Longer-lasting fillers that stimulate collagen production.
              Radiesse is the most common brand.
            </p>
            <p className="text-foreground mb-6">
              <strong>Poly-L-lactic Acid:</strong> Stimulates natural collagen production over time. Sculptra is the
              primary brand in this category.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Common Treatment Areas</h2>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li>Nasolabial folds (smile lines)</li>
              <li>Marionette lines</li>
              <li>Lips for volume and definition</li>
              <li>Cheeks for volume restoration</li>
              <li>Under-eye hollows</li>
              <li>Jawline contouring</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">What to Expect</h2>
            <p className="text-foreground mb-6">
              Results are typically immediate, though some swelling is normal for the first few days. Most hyaluronic
              acid fillers last 6-18 months, depending on the product and treatment area. The procedure takes 15-30
              minutes with minimal discomfort.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
