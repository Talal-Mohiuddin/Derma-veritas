"use client"

import { X, MapPin, Clock } from "lucide-react"
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
      hours: [
        "Monday – Friday: 9:30–6pm",
        "Saturday: 10am–4pm",
        "Sunday: Closed",
      ],
      map: "https://www.google.com/maps/search/?api=1&query=100+Harley+St,+Marylebone,+London,+W1G+7JA",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8MOvvaxkrLPSehZzvLBfMJM2Xk6UL1AVL8w&s",
    },
    Birmingham: {
      name: "AL Aesthetics – Birmingham",
      address: "15 Frederick Rd, Edgbaston",
      postcode: "Birmingham, B15 1JD",
      phone: "0121 798 1234",
      hours: [
        "Monday – Friday: 9:00–5:30pm",
        "Saturday: 9:30am–3pm",
        "Sunday: Closed",
      ],
      map: "https://www.google.com/maps/search/?api=1&query=15+Frederick+Rd,+Edgbaston,+Birmingham,+B15+1JD",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8MOvvaxkrLPSehZzvLBfMJM2Xk6UL1AVL8w&s",
    },
    Wolverhampton: {
      name: "AL Aesthetics – Wolverhampton",
      address: "45 Tettenhall Rd",
      postcode: "Wolverhampton, WV3 9NB",
      phone: "01902 654 321",
      hours: [
        "Monday – Friday: 9:00–6pm",
        "Saturday: 10am–2pm",
        "Sunday: Closed",
      ],
      map: "https://www.google.com/maps/search/?api=1&query=45+Tettenhall+Rd,+Wolverhampton,+WV3+9NB",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8MOvvaxkrLPSehZzvLBfMJM2Xk6UL1AVL8w&s",
    },
  }

  const clinic = clinics[activeTab]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 md:p-10">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-white w-full max-w-4xl h-full max-h-[800px] rounded-2xl shadow-2xl relative flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-light">Our Clinics</h2>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 px-6 pt-4 border-b">
              {Object.keys(clinics).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-6 flex-1 overflow-auto bg-gray-50">
              {/* Top section: text left, image right */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Text */}
                <div className="flex-1 space-y-4 text-gray-700">
                  <h3 className="font-bold text-lg">{clinic.name}</h3>

                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 text-gray-600" />
                    <p>
                      {clinic.address} <br />
                      {clinic.postcode}
                    </p>
                  </div>

                  <a
                    href={clinic.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase underline text-gray-700"
                  >
                    Get Directions
                  </a>

                  <p className="text-sm">{clinic.phone}</p>
                </div>

                {/* Image */}
                <div className="w-[220px] flex-shrink-0">
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="rounded-md object-cover w-full h-auto"
                  />
                </div>
              </div>

              {/* Bottom: opening times */}
              <div className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 mt-0.5 text-gray-600" />
                <div>
                  {clinic.hours.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-6 flex justify-center">
              <Button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-none uppercase tracking-wide">
                Book Your Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
