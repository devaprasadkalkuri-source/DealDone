import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

export default function ProductsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#08060d] text-white">
      <Navbar />

      <ProductGrid />

      <Footer />
    </main>
  );
}