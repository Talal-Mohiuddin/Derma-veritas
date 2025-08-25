import { Shield } from "lucide-react"

export default function ConsultationSection() {
  const steps = [
    {
      number: 1,
      title: "Initial Consultation",
      description:
        "Every procedure at AL Aesthetics starts with an initial consultation to get to know you and your individual needs. Our specialist consultants will conduct an in-depth assessment",
    },
    {
      number: 2,
      title: "Your Treatment",
      description:
        "Once you are happy with your treatment plan, we will arrange your procedure(s) to take place in our state-of-the-art Birmingham or London clinic.",
    },
    {
      number: 3,
      title: "Specialist Aftercare",
      description:
        "At AL Aesthetics, we want to make sure you are satisfied. After your treatment(s) is completed, our compassionate team will be in touch",
    },
  ]

  return (
    <section className="py-45 px-4 md:px-8 lg:px-12" style={{ backgroundColor: "var(--section-bg)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-2 tracking-tight" style={{ color: "var(--section-fg)" }}>
            Your Consultation — <span className="text-gray-500">what to expect.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-6">
                <div className="relative">
                  <Shield className="w-12 h-12 text-gray-800" fill="currentColor" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">{step.number}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-3 tracking-tight" style={{ color: "var(--section-fg)" }}>
                {step.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4 leading-snug">{step.description}</p>

              <button className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors">
                Read more
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
