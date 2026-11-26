"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedDeals from "./components/FeaturedDeals";
import WhyChoose from "./components/WhyChoose";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-zinc-950">
      <Navbar />

      <Hero />

      <Categories />

      <FeaturedDeals />

      <WhyChoose />

      <Testimonials />

      <Footer />
    </main>
  );
}