"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useStore } from "@/store/zustand";

export default function MeetTheTeamPage() {
  // Get the booking modal state from Zustand store
  const { setBookingOpen } = useStore();

  // Updated team members data with the specified professionals
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Medical Director & Founder",
      bio: "Board-certified dermatologist with over 15 years of experience in medical and cosmetic dermatology. Dr. Johnson specializes in laser treatments and innovative skin rejuvenation techniques.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Lead Aesthetic Practitioner",
      bio: "With a background in nursing and advanced certifications in injectables and laser technology, Michael brings precision and artistry to every treatment he performs.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Jessica Williams",
      role: "Senior Esthetician",
      bio: "Jessica is a licensed esthetician with expertise in advanced facial treatments, chemical peels, and developing personalized skincare regimens for clients with diverse skin concerns.",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "David Rodriguez",
      role: "Patient Care Coordinator",
      bio: "David ensures every patient's journey is seamless from consultation to follow-up. His extensive knowledge of treatments helps clients make informed decisions about their care.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      name: "Emily Thompson",
      role: "Nurse Practitioner",
      bio: "Emily is an experienced nurse practitioner specializing in non-surgical facial rejuvenation. She is known for her gentle approach and natural-looking results with injectables.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      name: "Robert Kim",
      role: "Laser Specialist",
      bio: "Robert is certified in multiple laser platforms and specializes in tattoo removal, hair reduction, and treating pigmentation issues with cutting-edge technology.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Core values data
  const coreValues = [
    {
      title: "Excellence",
      description:
        "We are committed to delivering the highest standard of care using evidence-based practices and continuous education.",
    },
    {
      title: "Compassion",
      description:
        "We listen to your concerns and tailor treatments to your unique needs, ensuring you feel heard and valued.",
    },
    {
      title: "Innovation",
      description:
        "We stay at the forefront of aesthetic medicine, incorporating the latest technologies and techniques for optimal results.",
    },
    {
      title: "Integrity",
      description:
        "We provide honest recommendations and transparent pricing, building trust through every interaction.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-28 h-28  flex items-center justify-center">
              <img
                src="/logo_black.png
"
                alt="Derma Veritas Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <h1 className="text-5xl lg:text-7xl font-light text-center mb-8">
              <span className="text-black">Meet Our</span>{" "}
              <span className="text-gray-400">Team</span>
            </h1>

            <p className="text-gray-600 text-xl leading-relaxed text-center max-w-4xl mb-12">
              Get to know the dedicated professionals behind Derma Veritas who
              are committed to helping you look and feel your best through
              expert care and personalized treatment approaches.
            </p>

            <button
              onClick={() => setBookingOpen(true)}
              className="bg-gray-800 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-gray-700 transition-colors rounded-lg"
            >
              BOOK A TREATMENT
            </button>
          </div>
        </div>
      </div>

      {/* Team Introduction */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
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

        <div className="bg-gradient-to-br from-gray-100 to-gray-50 px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
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

      {/* Team Members Grid */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-6">
              Our Medical Team
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Meet the skilled professionals dedicated to providing exceptional
              aesthetic care with medical expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    // Add unoptimized if you're using external images without config
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm">{member.bio}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{member.role}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setBookingOpen(true)}
                      className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      BOOK CONSULTATION
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Call to Action */}
      <section className="py-16 lg:py-20 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-8">
              Ready to meet your Clinician in Person?
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-12">
              Schedule a consultation with one of our specialists to discuss your Skin & Hair goals and develop a personalized treatment plan.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-white text-gray-800 px-8 py-4 text-sm font-medium tracking-wider hover:bg-gray-100 transition-colors rounded-lg"
            >
              BOOK A CONSULTATION
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
