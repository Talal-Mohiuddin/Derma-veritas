import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

export default function AntiAgingSkincareRoutinePage() {
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
              <span>June 28, 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Building an Effective Anti-Aging Skincare Routine
            </h1>

            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Face</span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Skincare</span>
            </div>
          </div>

          <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg">
            <img
              src="/luxury-skincare-products-on-marble-surface-elegant.png"
              alt="Luxury skincare products arrangement"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              A well-structured anti-aging skincare routine can significantly slow down the signs of aging and maintain
              healthy, youthful-looking skin for years to come.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              The Foundation: Cleansing and Moisturizing
            </h2>
            <p className="text-foreground mb-6">
              Start with a gentle cleanser that removes impurities without stripping your skin's natural barrier. Follow
              with a moisturizer containing hyaluronic acid and ceramides to maintain hydration and skin barrier
              function.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Key Anti-Aging Ingredients</h2>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li>Retinoids for cell turnover and collagen production</li>
              <li>Vitamin C for antioxidant protection and brightening</li>
              <li>Peptides for firming and smoothing</li>
              <li>Niacinamide for pore refinement and oil control</li>
              <li>Alpha hydroxy acids for gentle exfoliation</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Morning vs. Evening Routine</h2>
            <p className="text-foreground mb-6">
              Your morning routine should focus on protection with antioxidants and SPF, while your evening routine can
              include more active ingredients like retinoids and exfoliating acids that work best without sun exposure.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
