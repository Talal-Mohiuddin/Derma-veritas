"use client"

import { X, MapPin, Clock, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function ClinicsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("London")

  const clinics = {
    London: {
      name: "AL Aesthetics – London",
      address: "100 Harley St, Marylebone",
      postcode: "London, W1G 7JA",
      phone: "0203 6085 241",
      hours: ["Monday – Friday: 9:30–6pm", "Saturday: 10am–4pm", "Sunday: Closed"],
      map: "https://www.google.com/maps/search/?api=1&query=100+Harley+St,+Marylebone,+London,+W1G+7JA",
      image: "/images/sample_image.jpg",
    },
    Birmingham: {
      name: "AL Aesthetics – Birmingham",
      address: "15 Frederick Rd, Edgbaston",
      postcode: "Birmingham, B15 1JD",
      phone: "0121 798 1234",
      hours: ["Monday – Friday: 9:00–5:30pm", "Saturday: 9:30am–3pm", "Sunday: Closed"],
      map: "https://www.google.com/maps/search/?api=1&query=15+Frederick+Rd,+Edgbaston,+Birmingham,+B15+1JD",
      image: "/images/sample_image.jpg",
    },
    Wolverhampton: {
      name: "AL Aesthetics – Wolverhampton",
      address: "45 Tettenhall Rd",
      postcode: "Wolverhampton, WV3 9NB",
      phone: "01902 654 321",
      hours: ["Monday – Friday: 9:00–6pm", "Saturday: 10am–2pm", "Sunday: Closed"],
      map: "https://www.google.com/maps/search/?api=1&query=45+Tettenhall+Rd,+Wolverhampton,+WV3+9NB",
      image: "/images/sample_image.jpg",
    },
  }

  const clinic = clinics[activeTab]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-white">
              <h2 className="text-3xl font-light text-gray-800">Our Clinics</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 px-6 pt-4 border-b bg-white">
              {Object.keys(clinics).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium transition-colors ${
                    activeTab === tab ? "border-b-2 border-gray-800 text-gray-800" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-6 flex-1 overflow-auto bg-gray-50">
              {/* Top section: text left, image right */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Text */}
                <div className="flex-1 space-y-6 text-gray-700">
                  <h3 className="text-xl font-semibold text-gray-800">{clinic.name}</h3>

                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 mt-1 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{clinic.address}</p>
                      <p className="text-gray-600">{clinic.postcode}</p>
                    </div>
                  </div>

                  <a
                    href={clinic.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-semibold uppercase underline text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Get Directions
                  </a>

                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <p className="font-medium">{clinic.phone}</p>
                  </div>
                </div>

                {/* Image */}
                <div className="w-full lg:w-80 flex-shrink-0">
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="rounded-lg object-cover w-full h-48 lg:h-56 shadow-sm"
                  />
                </div>
              </div>

              {/* Bottom: opening times */}
              <div className="flex items-start gap-3 text-sm bg-white p-4 rounded-lg">
                <Clock className="w-4 h-4 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800 mb-2">Opening Hours</p>
                  {clinic.hours.map((line, i) => (
                    <p key={i} className="text-gray-600 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-6 flex justify-center bg-white">
              <Button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-none uppercase tracking-wide font-medium">
                Book Your Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}