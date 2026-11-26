
"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import {
  ArrowUpRight,
  ImagePlus,
  MapPin,
  Package,
  Phone,
  UserRound,
  Upload,
  X,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SellPage() {
  const [sellerName, setSellerName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("Mobiles");
  const [productCondition, setProductCondition] = useState("Like New");
  const [productDescription, setProductDescription] = useState("");

  const [productImages, setProductImages] = useState<File[]>([]);
  const [productImagePreviews, setProductImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    "Mobiles", "Tablets", "Laptops", "Computers",
    "Computer Accessories", "Mobile Accessories",
    "Cameras", "TVs", "Audio & Speakers", "Gaming",
    "Smart Watches", "Other Electronics",
    "Cars", "Bikes", "Scooters", "Cycles",
    "Commercial Vehicles", "Vehicle Accessories", "Spare Parts",
    "Men's Fashion", "Women's Fashion", "Kids Fashion",
    "Footwear", "Watches", "Bags & Luggage", "Jewellery",
    "Furniture", "Home Appliances", "Kitchen Appliances",
    "Home Decor", "Beds & Mattresses", "Kitchen & Dining",
    "Garden & Outdoor", "Books", "Study Materials",
    "School Supplies", "Office Supplies", "Educational Equipment",
    "Sports Equipment", "Fitness Equipment", "Gym Equipment",
    "Outdoor & Camping", "Toys & Games", "Musical Instruments",
    "Collectibles", "Pet Supplies", "Tools & Equipment",
    "Business & Industrial", "Other",
  ];

  const conditions = ["Like New", "Good", "Fair", "Used"];

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const files = Array.from(selectedFiles);

    if (files.length > 4) {
      alert("Please select maximum 4 images.");
      event.target.value = "";
      return;
    }

    if (files.some((file) => !file.type.startsWith("image/"))) {
      alert("Please select only image files.");
      event.target.value = "";
      return;
    }

    if (files.some((file) => file.size > 5 * 1024 * 1024)) {
      alert("Each image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    productImagePreviews.forEach((preview) =>
      URL.revokeObjectURL(preview)
    );

    setProductImages(files);
    setProductImagePreviews(
      files.map((file) => URL.createObjectURL(file))
    );

    event.target.value = "";
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(productImagePreviews[index]);

    setProductImages((current) =>
      current.filter((_, i) => i !== index)
    );

    setProductImagePreviews((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  const uploadImageToCloudinary = async (
    imageFile: File
  ): Promise<string> => {
    const signResponse = await fetch("/api/cloudinary/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!signResponse.ok) {
      throw new Error("Could not create upload signature.");
    }

    const signData = await signResponse.json();
    const formData = new FormData();

    formData.append("file", imageFile);
    formData.append("api_key", signData.apiKey);
    formData.append("timestamp", String(signData.timestamp));
    formData.append("signature", signData.signature);
    formData.append("upload_preset", signData.uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Cloudinary image upload failed.");
    }

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error("Image URL was not returned.");
    }

    return data.secure_url;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("Please login to publish a product.");
      return;
    }

    const cleanedPhone = phone.replace(/\D/g, "");

    if (cleanedPhone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!productName.trim()) {
      alert("Please enter a product name.");
      return;
    }

    if (!productPrice || Number(productPrice) <= 0) {
      alert("Please enter a valid product price.");
      return;
    }

    if (!productDescription.trim()) {
      alert("Please enter a product description.");
      return;
    }

    if (productImages.length === 0) {
      alert("Please select at least one product image.");
      return;
    }

    try {
      setIsUploading(true);

      const uploadedImageUrls: string[] = [];

      for (const imageFile of productImages) {
        const imageUrl = await uploadImageToCloudinary(imageFile);
        uploadedImageUrls.push(imageUrl);
      }

      await addDoc(collection(db, "products"), {
        name: productName.trim(),
        price: Number(productPrice),
        category: productCategory,
        condition: productCondition,
        description: productDescription.trim(),
        image: uploadedImageUrls[0],
        images: uploadedImageUrls,
        sellerId: currentUser.uid,
        sellerName: sellerName.trim(),
        sellerEmail: currentUser.email || "",
        phone: cleanedPhone,
        location: location.trim(),
        createdAt: new Date(),
      });

      alert("Product published successfully!");

      productImagePreviews.forEach((preview) =>
        URL.revokeObjectURL(preview)
      );

      setSellerName("");
      setPhone("");
      setLocation("");
      setProductName("");
      setProductPrice("");
      setProductCategory("Mobiles");
      setProductCondition("Like New");
      setProductDescription("");
      setProductImages([]);
      setProductImagePreviews([]);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Publishing error:", error);
      alert("Failed to publish product. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#111111] px-5 py-4 text-sm font-medium text-white outline-none transition placeholder:text-white/25 focus:border-white/50 focus:bg-[#151515] focus:ring-4 focus:ring-white/[0.04]";

  const labelClass =
    "mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40";

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-64 -top-64 h-[600px] w-[600px] rounded-full bg-white/[0.025] blur-[120px]" />
        <div className="absolute -right-64 top-1/3 h-[600px] w-[600px] rounded-full bg-white/[0.025] blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-14">

        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-black text-black">
              D
            </div>
            <span className="text-xs font-black tracking-[0.25em]">
              DEALDONE
            </span>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Marketplace / Sell
          </span>
        </motion.div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            Your marketplace starts here
          </p>

          <h1 className="text-6xl font-black leading-[0.9] tracking-[-0.07em] sm:text-8xl lg:text-[9rem]">
            SELL
            <br />
            <span className="text-white/20">YOUR</span>{" "}
            <span className="text-white">STORY.</span>
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-8">
            <p className="max-w-md text-sm leading-6 text-white/45">
              Every great deal begins with something worth sharing.
              Create your listing and find its next owner.
            </p>
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/25">
              01 — 04 / CREATE
            </span>
          </div>
        </motion.div>

        {/* FORM CARD */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b0b] shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:rounded-[36px]"
        >
          <form onSubmit={handleSubmit}>

            {/* SELLER */}
            <section className="border-b border-white/10 px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
              <SectionTitle number="01" label="Seller" title="Who are you?" />

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Seller name</label>
                  <div className="relative">
                    <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={17} />
                    <input
                      className={`${inputClass} pl-11`}
                      placeholder="Your name"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Phone number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={17} />
                    <input
                      className={`${inputClass} pl-11`}
                      type="tel"
                      placeholder="10-digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={10}
                      required
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-white/25">
                    Used for buyer contact.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={17} />
                    <input
                      className={`${inputClass} pl-11`}
                      placeholder="Hyderabad"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* PRODUCT */}
            <section className="border-b border-white/10 px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
              <SectionTitle number="02" label="Product" title="What are you selling?" />

              <div className="mt-8">
                <label className={labelClass}>Product name</label>
                <input
                  className={inputClass}
                  placeholder="Give your product a name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  maxLength={100}
                  required
                />
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Asking price</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-bold text-white/50">₹</span>
                    <input
                      className={`${inputClass} pl-11`}
                      type="number"
                      min="1"
                      placeholder="0"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    className={`${inputClass} appearance-none`}
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category} className="bg-black text-white">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-7">
                <label className={labelClass}>Condition</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {conditions.map((condition) => (
                    <button
                      key={condition}
                      type="button"
                      onClick={() => setProductCondition(condition)}
                      className={`rounded-xl border px-4 py-4 text-xs font-bold transition ${
                        productCondition === condition
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-[#111111] text-white/40 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {productCondition === condition && (
                        <Check size={13} className="mr-1 inline" />
                      )}
                      {condition}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <label className={labelClass}>Description</label>
                  <span className="text-[10px] text-white/25">
                    {productDescription.length}/250
                  </span>
                </div>
                <textarea
                  className={`${inputClass} resize-none leading-6`}
                  rows={5}
                  maxLength={250}
                  placeholder="Describe your product, its features and condition..."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  required
                />
              </div>
            </section>

            {/* IMAGES */}
            <section className="border-b border-white/10 px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
              <SectionTitle number="03" label="Visuals" title="Make it look good." />

              <p className="mt-3 text-sm text-white/35">
                Upload 1–4 clear product photographs.
              </p>

              <label
                htmlFor="product-images"
                className="group mt-8 flex min-h-[230px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-[#101010] px-6 py-10 text-center transition hover:border-white/50 hover:bg-[#151515]"
              >
                <input
                  id="product-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black transition group-hover:scale-105">
                  <Upload size={24} />
                </div>

                <p className="mt-5 text-sm font-bold text-white">
                  Choose product images
                </p>
                <p className="mt-2 text-xs text-white/35">
                  Select photographs from your device
                </p>
                <span className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
                  JPG · PNG · WEBP · MAX 5MB EACH
                </span>
              </label>

              <AnimatePresence>
                {productImagePreviews.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <div className="mb-3 flex justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                        Selected photographs
                      </span>
                      <span className="text-xs text-white/50">
                        {productImagePreviews.length}/4
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {productImagePreviews.map((preview, index) => (
                        <motion.div
                          key={preview}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
                        >
                          <img
                            src={preview}
                            alt={`Product ${index + 1}`}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <span className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[9px] text-white">
                            0{index + 1}
                          </span>

                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-white hover:text-black"
                            aria-label="Remove image"
                          >
                            <X size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* PUBLISH */}
            <section className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
              <SectionTitle number="04" label="Finish" title="Ready to make a deal?" />

              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-6 text-white/35">
                  Review your details and publish your listing.
                  Your next buyer could be looking for it.
                </p>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="group flex min-w-[220px] items-center justify-between gap-8 rounded-xl bg-white px-6 py-5 text-black transition hover:-translate-y-1 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                      DEALDONE
                    </span>
                    <span className="mt-1 block text-sm font-black">
                      {isUploading ? "Publishing..." : "Publish listing"}
                    </span>
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">
                    {isUploading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                    )}
                  </span>
                </button>
              </div>
            </section>

            {/* FOOTER */}
            <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:justify-between sm:px-10">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
                DEALDONE MARKETPLACE
              </span>
              <span className="text-[9px] text-white/20">
                Find it · Sell it · Make the deal
              </span>
            </div>
          </form>
        </motion.section>

        {/* BOTTOM */}
        <div className="mt-8 flex items-center justify-center gap-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
          <span className="h-px w-8 bg-white/10" />
          Premium marketplace experience
          <span className="h-px w-8 bg-white/10" />
        </div>
      </div>
    </main>
  );
}

function SectionTitle({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className="text-[10px] font-black tracking-[0.2em] text-white/50">
          {number}
        </span>
        <span className="h-px w-8 bg-white/20" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
          {label}
        </span>
      </div>
      <h2 className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
