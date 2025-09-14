"use client";

import { useState, useRef } from "react";
import {
  Star,
  ChevronDown,
  CheckCircle,
  Clock,
  Calendar,
  Gift,
  Users,
  Shield,
  ArrowRight,
  HeartHandshake,
  Sparkles,
  Crown,
  BadgePercent,
  Ticket,
  MapPin,
  Eye,
  RotateCcw,
  Frown,
  TrendingDown,
  AlertTriangle,
  Pound,
} from "lucide-react";

export default function MembershipProgramPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const pricingSectionRef = useRef(null);

  const membershipTiers = [
    {
      name: "Veritas Glow",
      level: "Entry Tier",
      price: "£300 upfront + £80/month",
      description: "Perfect for those starting their aesthetic journey",
      benefits: [
        "1x ProFusion HydraFacial",
        "3x RF Microneedling areas in first 3 sessions",
        "1x PRP Hair/Face (alternate months)",
        "10% off all injectables & skincare products",
        "Priority booking & member-only flash offers",
      ],
      mostPopular: false,
    },
    {
      name: "Veritas Sculpt",
      level: "Mid Tier",
      price: "£350 upfront + £160/month",
      description: "Our most popular tier for regular clients",
      benefits: [
        "3x Profhilo (beginning with one top-up)",
        "1x Anti-Wrinkle Treatment (3 areas every 3 months)",
        "1x Laser Hair Removal session (any area)",
        "1x RF Microneedling or PRP Facial",
        "15% off injectables, fillers, and exosomes",
        "Complimentary facial scan every 3 months",
        "VIP event invites & early access to launches",
      ],
      mostPopular: true,
    },
    {
      name: "Veritas Prestige",
      level: "Luxury Tier",
      price: "£500 upfront + £299/month",
      description: "The ultimate experience for maximum benefits",
      benefits: [
        "Endolift (discounted once per year)",
        "3x CO₂ sessions",
        "Exosome therapy (1 included per 3 months)",
        "Fillers & Anti-Wrinkle Treatment at 20% off",
        "RF Microneedling",
        "Laser Hair Removal",
        "Scalp & Hair Care treatments",
        "Free Product of the Month",
        "Members-only transformation days & VIP events",
        "Annual Skin Health Report + Personalized Future Plan",
      ],
      mostPopular: false,
    },
  ];

  const cardData = [
    {
      icon: <Eye className="w-5 h-5 text-gray-600" />,
      heading: "Commitment",
      value: "3 Month Minimum",
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-gray-600" />,
      heading: "Session Banking",
      value: "3 Months If Unused",
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-gray-600" />,
      heading: "Priority Booking",
      value: "Online or Concierge",
    },
    {
      icon: <Gift className="w-5 h-5 text-gray-600" />,
      heading: "Gifting",
      value: "Once Per 6 Months",
    },
  ];

  const perks = [
    {
      icon: <BadgePercent className="w-10 h-10" />,
      title: "Exclusive Discounts",
      description:
        "Enjoy significant savings on all treatments and products throughout your membership.",
    },
    {
      icon: <Ticket className="w-10 h-10" />,
      title: "Priority Booking",
      description:
        "Get preferred scheduling with our top practitioners at times that work for you.",
    },
    {
      icon: <Gift className="w-10 h-10" />,
      title: "Complimentary Treatments",
      description:
        "Receive special complimentary treatments and services throughout the year.",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Member Events",
      description:
        "Access to exclusive events, workshops, and previews of new treatments.",
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Skincare Consultations",
      description:
        "Regular professional consultations to track and optimize your skin health journey.",
    },
    {
      icon: <Crown className="w-10 h-10" />,
      title: "VIP Treatment",
      description:
        "Experience premium service with personalized attention from our expert team.",
    },
  ];

  const faqs = [
    {
      question: "How do I join the membership program?",
      answer:
        "You can join directly through our website, by calling our clinic, or during your next appointment. Our team will guide you through the simple registration process.",
    },
    {
      question: "Can I cancel my membership?",
      answer:
        "Yes, you can cancel your membership at any time with 30 days notice. We do require a minimum 3-month commitment for all membership tiers.",
    },
    {
      question: "Are the discounts applicable to all treatments?",
      answer:
        "Yes, your membership discount applies to all treatments and packages offered at Derma Veritas, including our signature packages.",
    },
    {
      question: "Can I upgrade or downgrade my membership?",
      answer:
        "Absolutely! You can change your membership tier at any time. The new rate will apply from your next billing cycle.",
    },
    {
      question: "Do membership benefits roll over?",
      answer:
        "Some benefits like complimentary consultations reset annually, while discounts are available throughout your membership period.",
    },
  ];

  const scrollToPricing = () => {
    if (pricingSectionRef.current) {
      pricingSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Content */}
            <div className="text-center md:text-left flex flex-col justify-center">
              {/* Small Label with Line */}
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="w-12 h-px bg-gray-400"></div>
                <span className="text-gray-600 text-sm font-medium tracking-wide">
                  Elite Membership Program
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Derma Veritas
                <br />
                Elite Membership
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mt-6">
                Experience premium aesthetic care with exclusive benefits,
                priority access, and significant savings through our tiered
                membership program.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex justify-center md:justify-start gap-4 flex-wrap">
                <button
                  onClick={scrollToPricing}
                  className="relative px-8 py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wider"
                >
                  VIEW MEMBERSHIPS
                  <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>

                <button className="relative px-8 py-4 text-sm font-bold uppercase text-[#272728] bg-white border-2 border-[#272728] rounded-none tracking-wider hover:bg-[#272728] hover:text-white transition-colors">
                  BOOK CONSULTATION
                  <span className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex items-center justify-center">
              <div className="rounded-3xl overflow-hidden bg-gray-200 aspect-[4/5] w-full max-w-lg">
                <img
                  src="/images/membership-hero.jpg"
                  alt="Derma Veritas Membership Program"
                  className="w-full h-full object-cover"
                />

                {/* Membership Badge */}
                <div className="absolute top-6 right-6 bg-white rounded-full px-4 py-3 shadow-lg flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-600 text-sm font-medium">
                    VIP Membership
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-[-4px_4px_0_0_rgba(0,0,0,0.1)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {cardData.map((card, index) => (
                <div key={index} className="text-center md:text-left">
                  <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                    {card.icon}
                    <span className="text-gray-600 text-sm font-light">
                      {card.heading}
                    </span>
                  </div>
                  <h3 className="text-lg font-light text-gray-900">
                    {card.value}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Exclusive Member Benefits
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our membership program is designed to provide exceptional value,
              personalized care, and premium experiences throughout your
              aesthetic journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  {perk.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {perk.title}
                </h3>
                <p className="text-gray-600">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section ref={pricingSectionRef} className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Membership Tiers
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Choose the membership level that best suits your aesthetic goals
              and enjoy exclusive benefits designed to enhance your experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative border rounded-lg p-8 flex flex-col h-full ${
                  tier.mostPopular
                    ? "border-blue-500 shadow-xl transform scale-105"
                    : "border-gray-200 shadow-md"
                }`}
              >
                {tier.mostPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-500 text-center mb-2">{tier.level}</p>
                <div className="text-center text-blue-600 font-bold text-3xl mb-4">
                  {tier.price}
                </div>
                <p className="text-gray-600 text-center mb-8">
                  {tier.description}
                </p>

                <div className="mb-8 flex-grow">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Benefits include:
                  </h4>
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-3 font-medium rounded-lg ${
                    tier.mostPopular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  } transition-colors`}
                >
                  SELECT PLAN
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How Our Membership Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Choose Your Plan
              </h3>
              <p className="text-gray-600">
                Select the membership tier that aligns with your aesthetic goals
                and budget.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Onboard With Us
              </h3>
              <p className="text-gray-600">
                Complete a quick registration and initial consultation with our
                experts.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Enjoy Benefits
              </h3>
              <p className="text-gray-600">
                Immediately access all your membership perks, discounts, and
                privileges.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Achieve Results
              </h3>
              <p className="text-gray-600">
                Follow your personalized treatment plan and enjoy your
                transformation journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Members Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "The Veritas Sculpt membership has been worth every penny. The
                savings on my regular treatments alone have covered the cost,
                and the priority booking is a game-changer!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">
                    Gold Member for 1 year
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "As a Veritas Prestige member, I feel truly valued. The personal
                coordinator ensures I always get appointments with my preferred
                practitioner, and the complimentary treatments are amazing."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Michael Reynolds
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Platinum Member for 2 years
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "I started with Veritas Glow membership and recently upgraded to
                Sculpt. The consultations have helped me understand my skin
                better, and the discounts make premium treatments accessible."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Emma Thompson</h4>
                  <p className="text-gray-600 text-sm">Member for 18 months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center py-4 text-left text-lg font-medium text-gray-900 focus:outline-none"
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4 text-gray-600">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Still have questions? Our team is here to help.
            </p>
            <button className="relative px-8 py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wider">
              CONTACT US
              <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-gray-900 text-white p-12 rounded-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Experience?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Join our membership program today and start enjoying exclusive
            benefits, premium treatments, and personalized care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="relative px-8 py-4 text-sm font-bold uppercase text-gray-900 bg-white rounded-none tracking-wider">
              JOIN NOW
              <span className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
            </button>
            <button className="relative px-8 py-4 text-sm font-bold uppercase text-white border border-white rounded-none tracking-wider hover:bg-white hover:text-gray-900 transition-colors">
              REQUEST INFO
              <span className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
