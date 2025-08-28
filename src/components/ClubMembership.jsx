import Link from "next/link";

export default function ClubMembership() {
  return (
    <section
      className="py-10 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: "#f1e9df" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-10">

          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AL</span>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Club</h2>
              <h3 className="text-xl md:text-2xl font-light text-gray-600">Membership</h3>
            </div>
          </div>

          {/* Description */}
          <div className="text-center md:flex-1">
            <p className="text-gray-700 text-base md:text-lg">
              Receive your favourite treatments monthly & save!{" "}
              <span className="font-semibold">Prices start from £54 per month*</span>
            </p>
          </div>

          {/* CTA Button */}
          <Link href="/pacakges/membership">
            <button className="bg-transparent border-2 border-gray-800 text-gray-800 px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-semibold tracking-wide hover:bg-gray-800 hover:text-white transition-colors duration-300 rounded-md">
              LEARN MORE
            </button>
          </Link>

        </div>
      </div>
    </section>
  )
}
