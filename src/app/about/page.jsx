import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-muted-foreground/30 flex-1 max-w-20"></div>
            <span className="text-sm text-muted-foreground font-medium">
              About AL Aesthetics
            </span>
            <div className="h-px bg-muted-foreground/30 flex-1 max-w-20"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            About Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Dr Mofashir Nawaz is a leading cosmetic specialist, and the owner
            and founder of AL Aesthetics.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          {/* Image */}
          <div className="order-2 md:order-1">
            <Image
              src="/images/professional-aesthetic-consultation-modern-clinic-.png"
              alt="Dr Mofashir Nawaz at awards ceremony"
              width={500}
              height={600}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-muted-foreground/30 flex-1 max-w-12"></div>
                <span className="text-sm text-muted-foreground font-medium">
                  Dr Mofashir Nawaz
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                Renowned in the industry as a "Master Injector" and for his
                skills in the area of advanced aesthetic techniques.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At AL Aesthetics, all injectors are meticulously trained by Dr
                Ash Labib to ensure the highest level of quality and precision
                in our treatments. Dr Ash Labib, with over{" "}
                <strong>27 years</strong> of experience in the aesthetics
                industry, exudes a genuine passion for his work and a strong
                dedication to providing exceptional treatments and procedures.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                During his illustrious 24-year career at the NHS, Dr Labib
                specialised in Rhinology and Rhinoplasty. Over the past decade,
                he has played a pioneering role in co-developing the{" "}
                <strong>Non-Surgical Rhinoplasty</strong> procedure, often
                referred to as the <strong>"15-minute nose job"</strong>. This
                innovative approach has garnered widespread acclaim for its
                effectiveness and convenience.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* International Ambassador */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              An International Ambassador to the Industry
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              As an International Ambassador for Allergan, Dr Labib imparts
              advanced facial aesthetics training on a national and global
              scale. He participates in clinical research and audits,
              contributing to the advancement of the field. Dr Labib's passion
              extends beyond patient care as he serves as a trainer and educator
              for fellow industry professionals at the AL Medical Academy. He
              strongly advocates for
            </p>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              Over 6500 completed Non-Surgical Rhinoplasties
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              With Dr Ash Labib's vast experience and unwavering commitment to
              enhancing natural beauty, AL Aesthetics stands at the forefront of
              the field. Our impressive track record includes{" "}
              <strong>over 6500 completed non-surgical rhinoplasties</strong>{" "}
              and the training of <strong>over 2000 injectors worldwide</strong>
              . You can trust AL Aesthetics to deliver unparalleled expertise
              and help boost your confidence by utilising dermal fillers, anti-
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
