"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { FaTiktok, FaSnapchat, FaReddit } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto md:px-0 px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Contact */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-bold">Derma Veritas</h3>
          <div className="flex items-start space-x-2">
            <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
            <p>info@dermaveritas.com</p>
          </div>
          <div className="flex items-start space-x-2">
            <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
            <p>+92-7741-340615</p>
          </div>

          {/* Newsletter */}
          <div className="pt-4">
            <h4 className="text-white font-medium mb-2">
              Subscribe to our Newsletter
            </h4>
            <div className="flex items-center bg-gray-800 rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-4 py-2 flex-1 focus:outline-none text-sm"
              />
              <button className="bg-gray-800 hover:bg-gray-900 px-4 py-2 text-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-white transition-colors"
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="hover:text-white transition-colors"
              >
                Pricing Plans
              </Link>
            </li>
            <li>
              <Link
                href="/membership"
                className="hover:text-white transition-colors"
              >
                Membership
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-white transition-colors">
                Meet Our Team
              </Link>
            </li>
          </ul>
        </div>

        {/* Business Hours & Location */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Business Hours
          </h3>
          <div className="flex items-start space-x-2 mb-4">
            <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <p>Monday - Friday: 11:00 - 19:00</p>
              <p>Saturday: 8:00 - 18:00</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mb-2 text-lg mt-6">
            Location
          </h3>
          <div className="flex items-start space-x-2">
            <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <p>Unit 2 Oak Tree House</p>
              <p>Oak Tree Rise, Codsall</p>
              <p>Wolverhampton, WV8 1DT</p>
              <p>United Kingdom</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Follow Us</h3>
          <p className="mb-4">Stay connected with us on social media</p>

          <div className="flex space-x-3">
            <Link
              href="https://www.facebook.com/share/1L27aEP3Fj/"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </Link>

            <Link
              href="https://www.instagram.com/derma_veritas?igsh=MTNtcmFjY254bWN4dw=="
              target="_blank"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>

            <Link
              href="https://www.tiktok.com/@derma.veritas?_t=ZS-8xw9tsrJMEJ&_r=1"
              target="_blank"
              className="bg-black hover:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              aria-label="TikTok"
            >
              <FaTiktok className="w-5 h-5" />
            </Link>

            <Link
              href="https://www.snapchat.com/add/dermaveritas?share_id=XRGq8aGebuM&locale=en-US"
              target="_blank"
              className="bg-yellow-400 hover:bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Snapchat"
            >
              <FaSnapchat className="w-5 h-5 text-gray-900" />
            </Link>

            <Link
              href="https://www.reddit.com/user/Derma-Veritas"
              target="_blank"
              className="bg-orange-500 hover:bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Reddit"
            >
              <FaReddit className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Derma Veritas. All rights reserved.
          </p>

          <div className="flex space-x-6 text-sm">
            <Link
              href="/privacy-policy"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookie-policy"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
