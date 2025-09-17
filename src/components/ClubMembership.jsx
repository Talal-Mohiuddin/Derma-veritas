import Link from "next/link";

export default function ClubMembership() {
  return (
    <section className="py-10 px-6 md:px-12 lg:px-20 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-10">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20  flex items-center justify-center">
              <img
                src="/logo_white.png"
                alt="Derma Veritas Logo"
                className="w-30 h-30 object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                Club
              </h2>
              <h3 className="text-xl md:text-2xl font-light text-gray-300">
                Membership
              </h3>
            </div>
          </div>

          {/* Description */}
          <div className="text-center md:flex-1">
            <p className="text-gray-300 text-base md:text-lg">
              Receive your favourite treatments monthly & save!{" "}
              <span className="font-semibold text-white">
                Prices start from £54 per month*
              </span>
            </p>
          </div>

          {/* CTA Button */}
          <Link href="/packages/membership">
            <button className="bg-transparent border-2 border-white text-white px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-semibold tracking-wide hover:bg-white hover:text-gray-900 transition-colors duration-300 rounded-md">
              LEARN MORE
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
