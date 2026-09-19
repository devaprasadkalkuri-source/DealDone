import { Suspense } from "react";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

export default function ProductsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#08060d] text-white">
      <Navbar />

      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center text-white">
            Loading products...
          </div>
        }
      >
        <ProductGrid />
      </Suspense>

      <Footer />
    </main>
  );
}