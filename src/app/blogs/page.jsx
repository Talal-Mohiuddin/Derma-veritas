"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ClinicsModal from "@/components/ClinicsModal";
import { useBlogsData } from "@/hooks/useBlog";
import { slugify } from "@/utils/slugify";

// Static blog posts with generated slugs
const staticBlogPosts = [
  {
    id: "static-1",
    title: "How to Prepare Your Skin for a Special Event",
    date: "August 14, 2025",
    image: "/images/woman-at-vanity-mirror-applying-skincare.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Get your skin glowing and camera-ready for your special day with these expert tips.",
  },
  {
    id: "static-2",
    title: "Why is Sun Protection So Important After Aesthetic Procedures?",
    date: "July 22, 2025",
    image: "/images/woman-wearing-sun-hat-smiling-outdoors.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Learn why proper sun protection is crucial for optimal healing and results.",
  },
  {
    id: "static-3",
    title: "The Benefits of Aesthetic Treatments for Brides-to-Be",
    date: "July 10, 2025",
    image: "/images/elegant-bride-in-white-dress-natural-lighting.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Discover the perfect aesthetic treatments to help you look radiant on your wedding day.",
  },
  {
    id: "static-4",
    title: "Building an Effective Anti-Aging Skincare Routine",
    date: "June 28, 2025",
    image: "/images/luxury-skincare-products-on-marble-surface.png",
    tags: ["Face", "Skincare"],
    excerpt:
      "Create a comprehensive anti-aging routine that delivers visible results.",
  },
  {
    id: "static-5",
    title: "Botox: Separating Myths from Facts",
    date: "June 15, 2025",
    image: "/images/professional-aesthetic-consultation-modern-clinic.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Get the truth about Botox treatments and what to expect from the procedure.",
  },
  {
    id: "static-6",
    title: "Essential Summer Skincare Tips for Healthy Skin",
    date: "June 5, 2025",
    image: "/images/woman-applying-sunscreen-at-beach-summer-vibes.png",
    tags: ["Face", "Skincare"],
    excerpt:
      "Protect and nourish your skin during the hot summer months with these expert tips.",
  },
  {
    id: "static-7",
    title: "The Complete Guide to Chemical Peels",
    date: "May 20, 2025",
    image: "/images/aesthetic-treatment-room-professional-equipment.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Everything you need to know about chemical peels and their transformative benefits.",
  },
  {
    id: "static-8",
    title: "The Role of Hydration in Maintaining Healthy Skin",
    date: "May 8, 2025",
    image: "/images/woman-drinking-water-glowing-skin-wellness.png",
    tags: ["Face", "Skincare"],
    excerpt:
      "Discover how proper hydration impacts your skin health and appearance.",
  },
  {
    id: "static-9",
    title: "Dermal Fillers Explained: What You Need to Know",
    date: "April 25, 2025",
    image: "/images/before-after-aesthetic-treatment-natural-results.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Learn about different types of dermal fillers and their applications.",
  },
  {
    id: "static-10",
    title: "Post-Treatment Care: Maximizing Your Results",
    date: "April 12, 2025",
    image: "/images/serene-spa-environment-recovery-skincare.png",
    tags: ["Face", "Aesthetics"],
    excerpt:
      "Follow these essential aftercare tips to ensure the best possible treatment outcomes.",
  },
].map((post) => ({
  ...post,
  slug: slugify(post.title), // Add slug to static posts
}));

export default function BlogsPage() {
  const [isClinicsOpen, setIsClinicsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  // Fetch dynamic blog posts (only published)
  const { data, isLoading, error } = useBlogsData("", "published");

  // Combine static and dynamic posts
  const dynamicBlogPosts =
    data?.blogs?.map((blog) => ({
      id: blog.id,
      slug: slugify(blog.title), // Generate slug for dynamic posts
      title: blog.title,
      date: new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      image: blog.coverImage || "/images/placeholder.svg",
      tags: blog.tags || [],
      excerpt: blog.content.substring(0, 100) + "...", // Generate excerpt from content
    })) || [];

  // Merge static and dynamic posts, sort by date (newest first)
  const allBlogPosts = [...staticBlogPosts, ...dynamicBlogPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center mb-12">
              <span className="text-white text-3xl font-bold">DV</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-light text-center mb-8">
              <span className="text-black">News</span>{" "}
              <span className="text-gray-400">& Events</span>
            </h1>

            <p className="text-gray-600 text-xl leading-relaxed text-center max-w-4xl mb-12">
              Stay updated with the latest insights, tips, and news from Derma
              Veritas. Discover expert advice on skincare, aesthetic treatments,
              and wellness.
            </p>
          </div>
        </div>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
          <div className="text-sm text-gray-500 mb-6 tracking-wide uppercase">
            Latest Insights
          </div>

          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-8 leading-tight">
            Expert Knowledge for Your Skincare Journey
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our blog features carefully curated articles written by our team of
            medical professionals to help you make informed decisions about your
            skincare and aesthetic treatments.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            From preparation tips for special events to in-depth explanations of
            various procedures, we're committed to providing valuable
            information that supports your aesthetic goals.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-100 to-gray-50 px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">DV</span>
            </div>
            <div>
              <span className="text-3xl font-light text-black">Expert</span>
              <br />
              <span className="text-3xl font-light text-gray-400">
                Insights
              </span>
            </div>
          </div>

          <h3 className="text-2xl lg:text-3xl font-light text-gray-800 mb-8 leading-tight">
            Explore Our Categories:
          </h3>

          <ul className="space-y-5 text-gray-700">
            {[
              "Skincare routines and tips",
              "Aesthetic treatment guides",
              "Pre and post-treatment care",
              "Seasonal skincare advice",
              "Myth-busting and fact-checking",
              "Industry trends and innovations",
            ].map((benefit, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Blog Posts Grid */}
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
              Latest Articles
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Explore our collection of expert-written articles on skincare and
              aesthetics
            </p>
          </motion.div>

          {isLoading && (
            <p className="text-center text-gray-600">Loading blogs...</p>
          )}
          {error && (
            <p className="text-center text-red-600">
              Error loading blogs: {error.message}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                {/* Wrap entire card content with Link */}
                <Link
                  href={`/blogs/${post.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`Read more about ${post.title}`}
                />

                <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative z-0">
                  <img
                    src={post.image || "/images/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 relative z-0">
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.date}
                  </div>

                  <h3 className="text-xl font-light text-gray-900 mb-3 leading-tight group-hover:text-[#272728] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex justify-between items-center relative z-20">
                    <span className="flex items-center text-gray-600 text-sm font-medium">
                      Read more →
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-8 leading-tight">
            Stay Informed About Your Skincare
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our blog is regularly updated with new content to keep you informed
            about the latest developments in skincare and aesthetic treatments.
            Bookmark this page and check back often for new articles.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            Have a topic you'd like us to cover? Visit our clinic for a
            consultation and let us know what information would be most valuable
            to you.
          </p>

          <Button
            onClick={() => setIsClinicsOpen(true)}
            className="relative !px-8 !py-4 text-sm font-bold uppercase text-white bg-[#272728] rounded-none tracking-wide hover:bg-gray-700 transition-colors w-fit"
          >
            <span>BOOK A CONSULTATION</span>
            <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-[35%] top-0 left-0 pointer-events-none" />
          </Button>
        </div>

        <div className="bg-gray-50 relative flex items-center justify-center min-h-[400px] lg:min-h-[70vh]">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto mb-4"></div>
                <div className="text-gray-600">Skincare Consultation Image</div>
              </div>
            </div>
            <div className="absolute top-6 right-6 bg-white bg-opacity-95 px-6 py-4 rounded-lg shadow-lg">
              <div className="text-lg font-light text-gray-800">Dr. Expert</div>
              <div className="text-sm text-gray-600">Medical Director</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinics Modal */}
      <ClinicsModal
        isOpen={isClinicsOpen}
        onClose={() => setIsClinicsOpen(false)}
      />
    </div>
  );
}
