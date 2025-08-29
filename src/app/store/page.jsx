import Link from "next/link";
import { useState } from "react";

export default function ProductPage() {
  const [selectedOption, setSelectedOption] = useState("monthly");
  
  const membershipOptions = [
    {
      id: "basic",
      title: "Basic Membership",
      price: { monthly: 54, yearly: 540 },
      description: "Perfect for those new to our treatments",
      features: ["1 treatment per month", "10% off additional services", "Priority booking", "Members-only events"]
    },
    {
      id: "premium",
      title: "Premium Membership",
      price: { monthly: 79, yearly: 790 },
      description: "Our most popular option for regular clients",
      features: ["2 treatments per month", "15% off additional services", "Free product sample each month", "Priority booking", "Exclusive members events"]
    },
    {
      id: "elite",
      title: "Elite Membership",
      price: { monthly: 119, yearly: 1190 },
      description: "The ultimate experience for our dedicated clients",
      features: ["4 treatments per month", "20% off additional services", "Monthly product gift", "24/7 booking line", "Personal beauty consultant", "VIP event invitations"]
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f1e9df" }}>
      {/* Header */}
      <header className="py-6 px-6 md:px-12 lg:px-20 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AL</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Aesthetic Lounge</h1>
          </div>
        </div>
        
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link href="/services" className="text-gray-700 hover:text-gray-900">Services</Link>
          <Link href="/membership" className="text-gray-900 font-semibold">Membership</Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
        </nav>
        
        <button className="bg-transparent border-2 border-gray-800 text-gray-800 px-4 py-2 text-sm font-semibold tracking-wide hover:bg-gray-800 hover:text-white transition-colors duration-300 rounded-md">
          BOOK NOW
        </button>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Club Membership</h2>
            <p className="text-gray-700 text-lg mb-8">
              Experience luxury treatments at exceptional value with our membership program. 
              Enjoy your favorite services regularly while saving significantly compared to individual purchases.
            </p>
            <div className="flex gap-4">
              <Link href="#membership-options">
                <button className="bg-gray-800 text-white px-8 py-3 text-base font-semibold tracking-wide hover:bg-gray-700 transition-colors duration-300 rounded-md">
                  VIEW PLANS
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-transparent border-2 border-gray-800 text-gray-800 px-8 py-3 text-base font-semibold tracking-wide hover:bg-gray-800 hover:text-white transition-colors duration-300 rounded-md">
                  CONTACT US
                </button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full h-96 bg-gray-300 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <span>Treatment Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Membership Benefits</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: "#f1e9df" }}>
              <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl">%</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Exclusive Savings</h3>
              <p className="text-gray-700">Save up to 30% compared to regular pricing on treatments and products.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: "#f1e9df" }}>
              <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl">★</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Priority Booking</h3>
              <p className="text-gray-700">Get access to prime appointment times before they're released to the public.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: "#f1e9df" }}>
              <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Monthly Gifts</h3>
              <p className="text-gray-700">Receive complimentary products and exclusive gifts throughout the year.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Options */}
      <section id="membership-options" className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-gray-700 text-center mb-12">Select the membership that fits your beauty and wellness needs</p>
          
          <div className="flex justify-center mb-12">
            <div className="bg-gray-200 rounded-lg p-1 flex">
              <button 
                className={`px-6 py-2 rounded-md ${selectedOption === "monthly" ? "bg-gray-800 text-white" : "bg-transparent text-gray-700"}`}
                onClick={() => setSelectedOption("monthly")}
              >
                Monthly
              </button>
              <button 
                className={`px-6 py-2 rounded-md ${selectedOption === "yearly" ? "bg-gray-800 text-white" : "bg-transparent text-gray-700"}`}
                onClick={() => setSelectedOption("yearly")}
              >
                Yearly (Save 15%)
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {membershipOptions.map((plan) => (
              <div key={plan.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">£{plan.price[selectedOption]}</span>
                    <span className="text-gray-600 ml-2">{selectedOption === "monthly" ? "per month" : "per year"}</span>
                  </div>
                  
                  <ul className="mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center mb-3">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full bg-gray-800 text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-300">
                    SELECT PLAN
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Members Say</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg" style={{ backgroundColor: "#f1e9df" }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Premium Member</p>
                </div>
              </div>
              <p className="text-gray-700">"The membership has completely transformed my self-care routine. I look forward to my monthly treatments and the savings are incredible!"</p>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: "#f1e9df" }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Emma Wilson</h4>
                  <p className="text-gray-600 text-sm">Elite Member</p>
                </div>
              </div>
              <p className="text-gray-700">"The VIP treatment is exceptional. Having a personal beauty consultant has helped me discover treatments I never knew I'd love."</p>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: "#f1e9df" }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">James Peterson</h4>
                  <p className="text-gray-600 text-sm">Basic Member</p>
                </div>
              </div>
              <p className="text-gray-700">"As someone new to aesthetic treatments, the Basic membership was the perfect introduction. The team makes me feel comfortable every visit."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Experience the Benefits?</h2>
          <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
            Join our club membership today and start enjoying premium treatments at exclusive member prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-800 text-white px-8 py-3 text-base font-semibold tracking-wide hover:bg-gray-700 transition-colors duration-300 rounded-md">
              BECOME A MEMBER
            </button>
            <button className="bg-transparent border-2 border-gray-800 text-gray-800 px-8 py-3 text-base font-semibold tracking-wide hover:bg-gray-800 hover:text-white transition-colors duration-300 rounded-md">
              SCHEDULE A CONSULTATION
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I change my membership plan later?</h3>
              <p className="text-gray-700">Yes, you can upgrade your plan at any time. If you wish to downgrade, that can be done at your renewal period.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What if I don't use my treatments in a month?</h3>
              <p className="text-gray-700">Unused treatments will roll over for one month, giving you flexibility while still encouraging regular use of your benefits.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I share my membership with someone else?</h3>
              <p className="text-gray-700">Memberships are personal and non-transferable. However, we do offer gift memberships if you'd like to treat someone special.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I cancel my membership?</h3>
              <p className="text-gray-700">You can cancel at any time with 30 days' notice. We'd appreciate the opportunity to address any concerns before you decide to leave.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 lg:px-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold">AL</span>
              </div>
              <h2 className="text-xl font-semibold">Aesthetic Lounge</h2>
            </div>
            <p className="text-gray-400">Premium beauty treatments and wellness services for the modern individual.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link href="/membership" className="text-gray-400 hover:text-white">Membership</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Beauty Street, London</li>
              <li>contact@aestheticlounge.com</li>
              <li>+44 20 1234 5678</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest offers</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <button className="bg-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Aesthetic Lounge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}