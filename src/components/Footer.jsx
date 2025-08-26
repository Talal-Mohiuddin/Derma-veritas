"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, MapPin, Phone } from "lucide-react"
import { useState } from "react"

// ✅ Clinic Data (shared with modal ideally)
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
    address: "221 King’s Rd",
    postcode: "London, SW3 5EJ",
    phone: "0207 123 4567",
    image: "/images/sample_image.jpg",
  },
}

export default function Footer() {
  const [activeTab, setActiveTab] = useState("London")
  const clinic = clinics[activeTab]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Popular Conditions */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Popular Conditions</h3>
            <ul className="space-y-3">
              {[
                "Crows Feet",
                "Eye Bags / Dark Circles",
                "Sagging Jowls",
                "Pebbled Chin",
                "Frown Lines",
                "Forehead Lines",
                "Temple Hollows",
                "Bump on Nose",
                "Gummy Smile",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Treatments */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Popular Treatments</h3>
            <ul className="space-y-3">
              {[
                "Dermal Fillers",
                "Non-Surgical Nose Job",
                "Non-Surgical Facelift",
                "Non Surgical Nose Job Before and After",
                "Cheek Fillers",
                "Lip fillers",
                "Chin Fillers",
                "Anti-Wrinkle Treatment",
                "Profhilo",
                "HydraFacial",
                "Dermalux LED Light Therapy",
                "NCTF® Skin Revitalisation",
                "PRX-T33 Peel",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    {item}
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
                "About Us",
                "Meet The Team",
                "AL Club Membership",
                "AL Training Academy",
                "News & Events",
                "Areas We Serve",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={24} />
              </Link>
            </div>
          </div>

          {/* Our Clinics - Dynamic */}
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

              {/* Location Tabs */}
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.keys(clinics).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        activeTab === tab ? "bg-white text-gray-900" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {tab}
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

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Left Side */}
            <div className="flex items-center space-x-6">
              <div className="bg-white text-black px-3 py-2 font-bold text-xl">AL</div>
              <div className="text-sm text-gray-400">
                <p>
                  © Copyright 2025 - AL Aesthetics. All Rights Reserved • CPD Certification |
                  Complaint Procedure | Web Design & SEO by Creative Ideaz
                </p>
                <div className="flex space-x-4 mt-2">
                  <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
                  <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                  <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-shrink-0">
              <div className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium text-center">
                Regulated by
                <br />
                <span className="font-bold">Care Quality Commission</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
