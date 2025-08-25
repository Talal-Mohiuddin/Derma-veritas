import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

export default function SunProtectionAfterProceduresPage() {
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
              <span>July 22, 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why is Sun Protection So Important After Aesthetic Procedures?
            </h1>

            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Face</span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">Aesthetics</span>
            </div>
          </div>

          <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg">
            <img
              src="/woman-wearing-sun-hat-smiling-outdoors-summer-prot.png"
              alt="Woman with sun protection outdoors"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              After investing in aesthetic treatments, proper sun protection becomes even more critical to maintain your
              results and ensure optimal healing.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Increased Photosensitivity</h2>
            <p className="text-foreground mb-6">
              Many aesthetic procedures, including chemical peels, laser treatments, and certain topical medications,
              can make your skin more sensitive to UV radiation. This increased photosensitivity can last for weeks or
              even months after treatment.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Protecting Your Investment</h2>
            <p className="text-foreground mb-6">
              Sun exposure can reverse the benefits of your aesthetic treatments by causing hyperpigmentation, premature
              aging, and compromising the healing process. Proper protection ensures you get the maximum benefit from
              your investment.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Essential Sun Protection Tips</h2>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li>Use broad-spectrum SPF 30 or higher daily</li>
              <li>Reapply sunscreen every 2 hours</li>
              <li>Wear protective clothing and wide-brimmed hats</li>
              <li>Seek shade during peak UV hours (10 AM - 4 PM)</li>
              <li>Consider zinc oxide for sensitive post-treatment skin</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  )
}
