import Link from "next/link";
import Image from "next/image";

export default function ProductListing() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Premium Facial Cream",
      price: 42.99,
      description: "Luxurious hydrating cream with natural ingredients",
      image: "/placeholder-product1.jpg" // Replace with actual image path
    },
    {
      id: 2,
      name: "Revitalizing Serum",
      price: 56.50,
      description: "Anti-aging formula that rejuvenates skin",
      image: "/placeholder-product2.jpg" // Replace with actual image path
    },
    {
      id: 3,
      name: "Gentle Exfoliator",
      price: 32.75,
      description: "Gentle daily exfoliation for all skin types",
      image: "/placeholder-product3.jpg" // Replace with actual image path
    },
    {
      id: 4,
      name: "Hydrating Mask",
      price: 38.00,
      description: "Deep hydration treatment for dry skin",
      image: "/placeholder-product4.jpg" // Replace with actual image path
    },
    {
      id: 5,
      name: "Eye Treatment",
      price: 45.25,
      description: "Reduces puffiness and dark circles",
      image: "/placeholder-product5.jpg" // Replace with actual image path
    },
    {
      id: 6,
      name: "Body Lotion",
      price: 28.99,
      description: "Silky smooth formula for all-over hydration",
      image: "/placeholder-product6.jpg" // Replace with actual image path
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f1e9df" }}>
      {/* Simple Header with Logo Only */}
      <header className="py-6 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AL</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Aesthetic</h1>
                <h2 className="text-xl md:text-2xl font-light text-gray-600">Lounge</h2>
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* Page Title */}
      <section className="py-8 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 border-b border-gray-300 pb-4">Our Products</h1>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-8 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="h-64 relative bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-500">Product Image</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">£{product.price.toFixed(2)}</span>
                    <button className="bg-transparent border-2 border-gray-800 text-gray-800 px-4 py-2 text-sm font-semibold tracking-wide hover:bg-gray-800 hover:text-white transition-colors duration-300 rounded-md">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA - Reusing your component */}
      <section className="py-10 px-6 md:px-12 lg:px-20 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AL</span>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Club</h2>
                <h3 className="text-xl md:text-2xl font-light text-gray-600">Membership</h3>
              </div>
            </div>

            <div className="text-center md:flex-1">
              <p className="text-gray-700 text-base md:text-lg">
                Receive your favourite treatments monthly & save!{" "}
                <span className="font-semibold">Prices start from £54 per month*</span>
              </p>
            </div>

            <Link href="/pacakges/membership">
              <button className="bg-transparent border-2 border-gray-800 text-gray-800 px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-semibold tracking-wide hover:bg-gray-800 hover:text-white transition-colors duration-300 rounded-md">
                LEARN MORE
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-10 px-6 md:px-12 lg:px-20 bg-gray-800 text-white mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p>© {new Date().getFullYear()} Aesthetic Lounge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}