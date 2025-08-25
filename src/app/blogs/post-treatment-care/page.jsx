import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

export default function PostTreatmentCarePage() {
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
              <span>April 12, 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Post-Treatment Care: Maximizing Your Results
            </h1>

            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Face</span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Aesthetics</span>
            </div>
          </div>

          <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Serene spa environment for recovery"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Proper post-treatment care is crucial for achieving optimal results and minimizing potential side effects.
              Following these guidelines will help ensure your investment pays off.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              Immediate Aftercare (First 24-48 Hours)
            </h2>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li>Avoid touching or massaging the treated area</li>
              <li>Apply ice packs for 10-15 minutes to reduce swelling</li>
              <li>Sleep with your head elevated</li>
              <li>Avoid strenuous exercise and heat exposure</li>
              <li>Stay hydrated and avoid alcohol</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">First Week Guidelines</h2>
            <p className="text-foreground mb-6">
              Continue to be gentle with your skin. Use mild, fragrance-free products and avoid active ingredients like
              retinoids or acids unless specifically approved by your provider. Sun protection is absolutely essential
              during this healing period.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Long-term Maintenance</h2>
            <p className="text-foreground mb-6">
              Maintain a consistent skincare routine with quality products. Regular follow-up appointments help monitor
              your progress and plan future treatments. Consider professional skincare treatments to enhance and
              maintain your results.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">When to Contact Your Provider</h2>
            <p className="text-foreground mb-6">
              While some swelling and mild discomfort are normal, contact your provider if you experience severe pain,
              excessive swelling, signs of infection, or any concerning changes in the treated area.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
