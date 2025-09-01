"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

// Treatment categories data with your specific images
const treatmentCategories = [
  {
    id: "injectables",
    name: "Injectables",
    treatments: [
      {
        id: 1,
        name: "Anti-Wrinkle Treatment",
        description: "Reduce the appearance of fine lines and wrinkles with our advanced anti-wrinkle treatments.",
        image: "https://media.istockphoto.com/id/1437830105/photo/cropped-shot-of-a-female-nurse-hold-her-senior-patients-hand-giving-support-doctor-helping.jpg?s=612x612&w=0&k=20&c=oKR-00at4oXr4tY5IxzqsswaLaaPsPRkdw2MJbYHWgA=",
      },
      {
        id: 2,
        name: "Non Surgical Rhinoplasty",
        description: "Reshape and enhance your nose without surgery with our filler-based rhinoplasty.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOphOwuZ-j4tfu-zKK3LmpjOay_rKdLhFsvzC0pS28rArMdh_dPQJlvuDvRFWlCXLEv5k&usqp=CAU",
      },
      {
        id: 3,
        name: "8 Point Facelift",
        description: "A non-surgical facelift technique that uses dermal fillers to restore volume and lift the face.",
        image: "https://thumbs.dreamstime.com/b/medical-treatment-26268599.jpg",
      },
      {
        id: 4,
        name: "NCTF Skin Revitalisation",
        description: "A cocktail of vitamins, minerals, amino acids and antioxidants to rejuvenate your skin.",
        image: "https://img.freepik.com/free-photo/anonymous-doctor-helping-colleague-write-prescription_23-2147896202.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 5,
        name: "HArmonyCa Dermal Filler",
        description: "A revolutionary dermal filler that provides both immediate volume and collagen stimulation.",
        image: "https://img.freepik.com/free-photo/stethoscope-hanging-from-doctor-s-gown_1232-646.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 6,
        name: "Dermal Fillers",
        description: "Restore volume and enhance facial contours with our premium dermal fillers.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRalrdoQZBQZTJVkZjIf34lWjfB1hyyfRyeFV_ndZaxRiO8cjnQvrcGwvVBUJ4BluGd2bQ&usqp=CAU",
      },
      {
        id: 7,
        name: "Lip Fillers",
        description: "Achieve fuller, more defined lips with our expert lip augmentation treatments.",
        image: "https://img.freepik.com/free-photo/overhead-view-pen-spiral-notebook-stethoscope-grey-background_23-2148129623.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 8,
        name: "Chin Fillers",
        description: "Enhance your chin profile and balance your facial features with chin fillers.",
        image: "https://media.istockphoto.com/id/1437830105/photo/cropped-shot-of-a-female-nurse-hold-her-senior-patients-hand-giving-support-doctor-helping.jpg?s=612x612&w=0&k=20&c=oKR-00at4oXr4tY5IxzqsswaLaaPsPRkdw2MJbYHWgA=",
      },
      {
        id: 9,
        name: "Tear Trough Filler",
        description: "Reduce under-eye hollows and dark circles with our specialized tear trough treatment.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOphOwuZ-j4tfu-zKK3LmpjOay_rKdLhFsvzC0pS28rArMdh_dPQJlvuDvRFWlCXLEv5k&usqp=CAU",
      },
      {
        id: 10,
        name: "Cheek Fillers",
        description: "Restore volume to your cheeks and achieve a more youthful contour.",
        image: "https://thumbs.dreamstime.com/b/medical-treatment-26268599.jpg",
      },
      {
        id: 11,
        name: "Profhilo",
        description: "An innovative skin remodelling treatment that improves skin quality and elasticity.",
        image: "https://img.freepik.com/free-photo/anonymous-doctor-helping-colleague-write-prescription_23-2147896202.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 12,
        name: "Fat Dissolving Injections",
        description: "Target and reduce stubborn fat areas with our effective fat dissolving treatments.",
        image: "https://img.freepik.com/free-photo/stethoscope-hanging-from-doctor-s-gown_1232-646.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 13,
        name: "Hand Rejuvenation",
        description: "Restore a youthful appearance to your hands with our specialized treatments.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRalrdoQZBQZTJVkZjIf34lWjfB1hyyfRyeFV_ndZaxRiO8cjnQvrcGwvVBUJ4BluGd2bQ&usqp=CAU",
      },
      {
        id: 14,
        name: "Polynucleotides Hair Loss Treatment",
        description: "Stimulate hair growth and improve hair density with our advanced polynucleotide therapy.",
        image: "https://img.freepik.com/free-photo/overhead-view-pen-spiral-notebook-stethoscope-grey-background_23-2148129623.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        id: 15,
        name: "Polynucleotides Skin Rejuvenation Treatment",
        description: "Revitalize your skin with polynucleotides for improved texture, tone, and elasticity.",
        image: "https://media.istockphoto.com/id/1437830105/photo/cropped-shot-of-a-female-nurse-hold-her-senior-patients-hand-giving-support-doctor-helping.jpg?s=612x612&w=0&k=20&c=oKR-00at4oXr4tY5IxzqsswaLaaPsPRkdw2MJbYHWgA=",
      }
    ]
  },
  {
    id: "skincare",
    name: "Skincare",
    treatments: [
      {
        id: 16,
        name: "Chemical Peels",
        description: "Revitalize your skin with our professional-grade chemical peels for a radiant complexion.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOphOwuZ-j4tfu-zKK3LmpjOay_rKdLhFsvzC0pS28rArMdh_dPQJlvuDvRFWlCXLEv5k&usqp=CAU",
      },
      {
        id: 17,
        name: "Microneedling",
        description: "Stimulate collagen production and improve skin texture with our microneedling treatments.",
        image: "https://thumbs.dreamstime.com/b/medical-treatment-26268599.jpg",
      },
      {
        id: 18,
        name: "RF Microneedling",
        description: "Combine microneedling with radio frequency for enhanced skin tightening and rejuvenation.",
        image: "https://img.freepik.com/free-photo/anonymous-doctor-helping-colleague-write-prescription_23-2147896202.jpg?semt=ais_hybrid&w=740&q=80",
      }
    ]
  },
  {
    id: "wellness",
    name: "Wellness",
    treatments: [
      {
        id: 19,
        name: "Exosome Therapy",
        description: "Advanced regenerative therapy using exosomes to promote healing and rejuvenation.",
        image: "https://img.freepik.com/free-photo/stethoscope-hanging-from-doctor-s-gown_1232-646.jpg?semt=ais_hybrid&w=740&q=80",
      }
    ]
  },
  {
    id: "minor-ops",
    name: "Minor Ops",
    treatments: [
      {
        id: 20,
        name: "Mole Removal",
        description: "Safe and effective removal of unwanted moles with minimal scarring.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRalrdoQZBQZTJVkZjIf34lWjfB1hyyfRyeFV_ndZaxRiO8cjnQvrcGwvVBUJ4BluGd2bQ&usqp=CAU",
      },
      {
        id: 21,
        name: "Skin Tag Removal",
        description: "Quick and painless removal of skin tags for smoother skin.",
        image: "https://img.freepik.com/free-photo/overhead-view-pen-spiral-notebook-stethoscope-grey-background_23-2148129623.jpg?semt=ais_hybrid&w=740&q=80",
      }
    ]
  }
];

// Function to generate slug from treatment name
const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export default function TreatmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Filter treatments based on search query and category
  const filteredTreatments = treatmentCategories.flatMap(category => {
    if (selectedCategory !== "all" && selectedCategory !== category.id) {
      return [];
    }
    
    return category.treatments
      .filter(treatment => 
        treatment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        treatment.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(treatment => ({ ...treatment, category: category.name }));
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const categoryButtonVariants = {
    rest: { 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Custom cursor styles */}
      <style jsx global>{`
        .category-button {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .category-button:hover {
          cursor: pointer;
        }
        .treatment-card {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .treatment-card:hover {
          cursor: pointer;
          transform: translateY(-5px);
        }
      `}</style>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Treatments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Discover our range of aesthetic treatments designed to enhance your natural beauty
          </motion.p>
        </div>
      </motion.section>

      {/* Filters Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="py-8 bg-section-bg sticky top-0 z-10 shadow-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary cursor-text"
              />
            </div>

            {/* Filter Toggle for Mobile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md category-button"
              onMouseEnter={() => setHoveredCategory("filter")}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Filter className="w-5 h-5" />
              Filters
              <motion.div
                animate={{ rotate: isFilterOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <motion.button
                    variants={categoryButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 py-1 rounded-full text-sm category-button ${selectedCategory === "all"
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                      }`}
                    onMouseEnter={() => setHoveredCategory("all")}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    All
                  </motion.button>
                  {treatmentCategories.map((category) => (
                    <motion.button
                      key={category.id}
                      variants={categoryButtonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1 rounded-full text-sm category-button ${selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                        }`}
                      onMouseEnter={() => setHoveredCategory(category.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Filters (Desktop) */}
          <motion.div 
            className="hidden md:flex flex-wrap gap-2 mt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              variants={categoryButtonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-md category-button ${selectedCategory === "all"
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
              onMouseEnter={() => setHoveredCategory("all")}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              All
            </motion.button>
            {treatmentCategories.map((category) => (
              <motion.button
                key={category.id}
                variants={categoryButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md category-button ${selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Treatments Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredTreatments.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <h3 className="text-2xl font-medium mb-4">No treatments found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 category-button"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          ) : (
            <>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center mb-8"
              >
                <h2 className="text-2xl font-bold">
                  {selectedCategory === "all" ? "All Treatments" : treatmentCategories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-muted-foreground">
                  {filteredTreatments.length} {filteredTreatments.length === 1 ? "treatment" : "treatments"} found
                </p>
              </motion.div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredTreatments.map((treatment) => (
                  <motion.div
                    key={treatment.id}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 treatment-card"
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={treatment.image}
                        alt={treatment.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x200?text=Treatment+Image";
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{treatment.name}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {treatment.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {treatment.category}
                        </span>
                        <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                          <Link
                            href={`/menu/injectables/${generateSlug(treatment.name)}`}
                            className="flex items-center text-primary hover:text-primary/80 font-medium"
                          >
                            Learn more
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-16 bg-section-bg"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Book a consultation with our experts to find the perfect treatment for you
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-md text-lg font-medium hover:bg-primary/90 transition-colors category-button"
          >
            Book a Consultation
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}