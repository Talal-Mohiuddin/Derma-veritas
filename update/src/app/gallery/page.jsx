import GallerySection from "@/components/GallerySection";

export const metadata = {
  title: "Client Gallery | Derma Veritas",
  description: "Browse our gallery of client transformations and success stories from Derma Veritas treatments.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <GallerySection />
    </div>
  );
}
