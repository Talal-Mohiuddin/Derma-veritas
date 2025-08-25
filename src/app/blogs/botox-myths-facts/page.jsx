import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

export default function BotoxMythsFactsPage() {
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
              <span>June 15, 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Botox: Separating Myths from Facts</h1>

            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Face</span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Aesthetics</span>
            </div>
          </div>

          <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg">
            <img
              src="/professional-aesthetic-consultation-modern-clinic-.png"
              alt="Professional aesthetic consultation"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Despite being one of the most popular cosmetic treatments worldwide, Botox is still surrounded by
              misconceptions. Let's separate fact from fiction.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Myth: Botox Will Make You Look Frozen</h2>
            <p className="text-foreground mb-6">
              <strong>Fact:</strong> When administered by a skilled professional, Botox should provide natural-looking
              results that maintain your ability to express emotions while reducing unwanted wrinkles.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Myth: Botox is Only for Older People</h2>
            <p className="text-foreground mb-6">
              <strong>Fact:</strong> Many people in their 20s and 30s use Botox preventatively to slow the formation of
              expression lines. Starting early can be more effective than waiting until deep wrinkles have formed.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Myth: Botox is Dangerous</h2>
            <p className="text-foreground mb-6">
              <strong>Fact:</strong> Botox has been used safely for decades and is FDA-approved for cosmetic use. When
              administered by qualified professionals, serious side effects are extremely rare.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">What to Expect</h2>
            <p className="text-foreground mb-6">
              Results typically appear within 3-7 days and last 3-4 months. The treatment itself takes only 10-15
              minutes with minimal discomfort and no downtime required.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
