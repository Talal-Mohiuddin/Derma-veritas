"use client"

import Link from "next/link"

export default function RecentBlogsSection() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Centered Blog CTA */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            Recent Blogs
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the latest insights, tips, and expert advice on skincare and aesthetic treatments.
          </p>
          
          <Link
            href="/blogs"
            className="relative inline-block px-8 py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-lg tracking-wide hover:bg-gray-800 transition-colors duration-300"
          >
            VIEW ALL BLOGS
            <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none rounded-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
}