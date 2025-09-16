"use client";

import Image from "next/image";
import { useStore } from "@/store/zustand";
import { motion } from "framer-motion";

export default function AboutPage() {
  const { setBookingOpen } = useStore();
  
  // Define coreValues inside the component
  const coreValues = [
    {
      title: "Excellence",
      description: "We strive for the highest standards in all our treatments and services."
    },
    {
      title: "Integrity",
      description: "We believe in honesty, transparency, and ethical practice."
    },
    {
      title: "Innovation",
      description: "We continuously seek the latest advancements in aesthetic medicine."
    },
    {
      title: "Care",
      description: "Your wellbeing and satisfaction are at the heart of everything we do."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section - Full Width */}
      <div className="w-full bg-gradient-to-r  py-16 px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-muted-foreground/30 flex-1 max-w-20"></div>
            <span className="text-sm text-muted-foreground font-medium">
              About Derma Veritas
            </span>
            <div className="h-px bg-muted-foreground/30 flex-1 max-w-20"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            About Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Dr. Mofasher Nawaz and Mr. A. Singh is a leading cosmetic
            specialist, and the owner and founder of Derma Veritas.
          </p>
        </div>
      </div>

      {/* Team Introduction - Full Width Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white px-6 sm:px-12 lg:px-16 py-12 lg:py-16 flex flex-col justify-center">
          <div className="text-sm text-gray-500 mb-6 tracking-wide uppercase">
            Our Expertise
          </div>

          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-8 leading-tight">
            Expert Care from Medical Professionals
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            At Derma Veritas, our team consists of highly trained medical
            professionals with extensive experience in both hospital and clinical settings.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            We combine medical expertise with aesthetic precision to deliver safe,
            effective treatments tailored to your unique needs and goals.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-100 to-gray-50 px-6 sm:px-12 lg:px-16 py-12 lg:py-16 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">DV</span>
            </div>
            <div>
              <span className="text-3xl font-light text-black">Our</span>
              <br />
              <span className="text-3xl font-light text-gray-400">
                Philosophy
              </span>
            </div>
          </div>

          <h3 className="text-2xl lg:text-3xl font-light text-gray-800 mb-8 leading-tight">
            Patient-Centered Care with Natural Results
          </h3>

          <ul className="space-y-5 text-gray-700">
            {[
              "We prioritize your safety and satisfaction above all else",
              "Our treatments enhance your natural beauty, not mask it",
              "We believe in education and transparency throughout your journey",
              "Hospital-grade standards ensure the highest level of care",
              "We create a welcoming environment where you feel comfortable",
            ].map((benefit, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="w-full bg-white py-16">
        <div className="w-full grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="order-2 md:order-1 px-4 md:px-8">
            <Image
              src="/images/professional-aesthetic-consultation-modern-clinic-.png"
              alt="Dr Mofasher Nawaz at awards ceremony"
              width={600}
              height={700}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 space-y-8 px-4 md:px-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-muted-foreground/30 flex-1 max-w-12"></div>
                <span className="text-sm text-muted-foreground font-medium">
                  Dr. Mofasher Nawaz and Mr. A. Singh.
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                Renowned in the industry as a "Master Injector" and for his
                skills in the area of advanced aesthetic techniques.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At Derma Veritas, all injectors are meticulously trained by Dr.
                Mofasher Nawaz and Mr. A. Singh. to ensure the highest level of
                quality and precision in our treatments. Dr. Mofasher Nawaz and
                Mr. A. Singh., with over <strong>27 years</strong> of experience
                in the aesthetics industry, exudes a genuine passion for his
                work and a strong dedication to providing exceptional treatments
                and procedures.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                During his illustrious 24-year career at the NHS, Dr. Mofasher
                Nawaz and Mr. A. Singh. specialised in Rhinology and
                Rhinoplasty. Over the past decade, he has played a pioneering
                role in co-developing the{" "}
                <strong>Non-Surgical Rhinoplasty</strong> procedure, often
                referred to as the <strong>"15-minute nose job"</strong>. This
                innovative approach has garnered widespread acclaim for its
                effectiveness and convenience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sections - Full Width */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="w-full grid md:grid-cols-2 gap-12 px-4 md:px-8">
          {/* International Ambassador */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              An International Ambassador to the Industry
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              As an International Ambassador for Allergan, Dr. Mofasher Nawaz
              and Mr. A. Singh. imparts advanced faciDerma Veritas training on a
              national and global scale. He participates in clinical research
              and audits, contributing to the advancement of the field. Dr.
              Mofasher Nawaz and Mr. A. Singh.'s passion extends beyond patient
              care as he serves as a trainer and educator for fellow industry
              professionals at the AL Medical Academy. He strongly advocates for
            </p>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              Over 6500 completed Non-Surgical Rhinoplasties
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              With Dr. Mofasher Nawaz and Mr. A. Singh. vast experience and
              unwavering commitment to enhancing natural beauty, Derma Veritas
              stands at the forefront of the field. Our impressive track record
              includes{" "}
              <strong>over 6500 completed non-surgical rhinoplasties</strong>{" "}
              and the training of <strong>over 2000 injectors worldwide</strong>
              . You can trust Derma Veritas to deliver unparalleled expertise
              and help boost your confidence by utilising dermal fillers, anti-
            </p>
          </div>
        </div>
      </div>
        
      {/* Core Values */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-6">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              The principles that guide everything we do at Derma Veritas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section - Full Width */}
      <section className="w-full py-16 bg-muted text-foreground">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to meet your Clinician in Person?
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-12">
            Schedule a consultation with one of our specialists to discuss your Skin & Hair goals and develop a personalized treatment plan.
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="bg-foreground text-background px-8 py-4 text-sm font-medium tracking-wider hover:opacity-90 transition-opacity rounded-lg"
          >
            BOOK A CONSULTATION
          </button>
        </div>
      </section>
    </div>
  );
}