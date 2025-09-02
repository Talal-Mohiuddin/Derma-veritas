"use client"

import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    image: "/images/mirror.png",
    date: "August 14, 2025",
    title: "How to Prepare Your Skin for a Special Event",
    tags: ["Face", "Aesthetics"],
    slug: "prepare-skin-special-event"
  },
  {
    id: 2,
    image: "/images/sun-hat.png",
    date: "July 22, 2025",
    title: "Why is Sun Protection So Important After Aesthetic Procedures?",
    tags: ["Face", "Aesthetics"],
    slug: "sun-protection-after-procedures"
  },
  {
    id: 3,
    image: "/images/bride-in-white.png",
    date: "July 10, 2025",
    title: "The Benefits of Aesthetic Treatments for Brides-to-Be",
    tags: ["Face", "Aesthetics"],
    slug: "aesthetic-treatments-brides"
  },
]

export default function RecentBlogsSection() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            Recent Blogs
          </h2>

          {/* Updated Button with shine effect */}
          <Link
            href="/blogs"
            className="relative px-6 py-3 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide"
          >
            VIEW ALL
            <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#F8FAFC] rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300 shadow-md"
            >
              {/* Wrap entire card content with Link */}
              <Link href={`/blogs/${post.slug}`} className="block">
                {/* Blog Image */}
                <div className="aspect-[4/3] overflow-hidden rounded-none">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.date}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-medium text-gray-900 mb-6 leading-tight">
                    {post.title}
                  </h3>

                  {/* Footer with Read More and Tags */}
                  <div className="flex justify-between items-center">
                    <span className="flex items-center text-gray-600 text-sm font-medium">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>

                    <div className="flex gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}