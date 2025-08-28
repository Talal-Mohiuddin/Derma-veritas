"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, MapPin, Phone } from "lucide-react"
import { useState } from "react"

// ✅ Clinics data
const clinics = {
  London: {
    name: "AL Aesthetics – London",
    address: "10 Harley St, Marylebone",
    postcode: "London, W1G 7JA",
    phone: "0203 6085 241",
    image: "/images/sample_image.jpg",
  },
  Birmingham: {
    name: "AL Aesthetics – Birmingham",
    address: "15 Frederick Rd, Edgbaston",
    postcode: "Birmingham, B15 1JD",
    phone: "0121 798 1234",
    image: "/images/sample_image.jpg",
  },
  Wolverhampton: {
    name: "AL Aesthetics – Wolverhampton",
    address: "45 Tettenhall Rd",
    postcode: "Wolverhampton, WV3 9NB",
    phone: "01902 654 321",
    image: "/images/sample_image.jpg",
  },
  Chelsea: {
    name: "AL Aesthetics – Chelsea",
    address: "221 King's Rd",
    postcode: "London, SW3 5EJ",
    phone: "0207 123 4567",
    image: "/images/sample_image.jpg",
  },
}

// ✅ Only 13 popular treatments
const treatments = [
  "Anti-Wrinkle Treatment",
  "Non Surgical Rhinoplasty",
  "Dermal Fillers",
  "Lip Fillers",
  "Tear Trough Filler",
  "Cheek Fillers",
  "Chin Fillers",
  "8 Point Facelift",
  "Profhilo",
  "Fat Dissolving Injections",
  "HArmonyCa Dermal Filler",
  "Polynucleotides Skin Rejuvenation Treatment",
  "Microneedling",
]

const skincareLinks = [
  { name: "Chemical Peels", slug: "chemical-peels" },
  { name: "RF Microneedling", slug: "rf-microneedling" },
]

const wellnessLinks = [
  { name: "Exosome Therapy", path: "/treatments/exosome-therapy" },
]

const facialConcernsLinks = [
  { name: "Gummy Smile", path: "/menu/conditions/gummy-smile" },
  { name: "Jowls Treatments", path: "/menu/conditions/jowls-treatments" },
  { name: "Under Eye", path: "/menu/conditions/under-eye" },
]

// ✅ helper
const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

export default function Footer() {
  const [activeTab, setActiveTab] = useState("London")
  const clinic = clinics[activeTab]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Popular Conditions */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Popular Conditions</h3>
            <ul className="space-y-3">
              {facialConcernsLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-gray-300 hover:text-white transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Treatments */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Popular Treatments</h3>
            <ul className="space-y-3">
              {treatments.map((item) => (
                <li key={item}>
                  <Link
                    href={`/menu/injectables/${slugify(item)}`}
                    className="text-gray-300 hover:text-white transition-colors relative group"
                  >
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
                  </Link>
                </li>
              ))}

              {skincareLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/treatments/${item.slug}`}
                    className="text-gray-300 hover:text-white transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
                  </Link>
                </li>
              ))}

              {wellnessLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-gray-300 hover:text-white transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Misc */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Misc</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Meet The Team", href: "/team" },
                { name: "AL Training Academy", href: "/training" },
                { name: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors relative group">
                <Instagram size={24} />
                <span className="absolute left-1/2 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors relative group">
                <Facebook size={24} />
                <span className="absolute left-1/2 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
              </Link>
            </div>
          </div>

          {/* Clinics */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Clinics</h3>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={clinic.image}
                alt={clinic.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.keys(clinics).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors relative group ${
                        activeTab === tab
                          ? "bg-white text-gray-900"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {tab}
                      {activeTab !== tab && (
                        <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <p>{clinic.address}</p>
                  </div>
                  <p>{clinic.postcode}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-4 h-4" />
                    <p>{clinic.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="bg-white text-black px-3 py-2 font-bold text-xl">AL</div>
            <div className="text-sm text-gray-400">
              <p>
                © Copyright 2025 - AL Aesthetics. All Rights Reserved • CPD
                Certification | Complaint Procedure | Web Design & SEO by
                Creative Ideaz
              </p>
              <div className="flex space-x-4 mt-2">
                <Link href="#" className="hover:text-white transition-colors relative group">
                  Terms & Conditions
                  <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
                </Link>
                <Link href="#" className="hover:text-white transition-colors relative group">
                  Cookie Policy
                  <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
                </Link>
                <Link href="#" className="hover:text-white transition-colors relative group">
                  Privacy Policy
                  <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium text-center">
              Regulated by
              <br />
              <span className="font-bold">Care Quality Commission</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}