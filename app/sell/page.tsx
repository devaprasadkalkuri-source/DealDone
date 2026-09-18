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
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

export default function SellPage() {
  // ==========================================
  // SELLER DETAILS
  // ==========================================

  const [sellerName, setSellerName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  // ==========================================
  // PRODUCT DETAILS
  // ==========================================

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [productCategory, setProductCategory] =
    useState("Mobiles");

  const [productCondition, setProductCondition] =
    useState("Like New");

  const [productDescription, setProductDescription] =
    useState("");

  // ==========================================
  // IMAGES
  // ==========================================

  const [productImages, setProductImages] =
    useState<File[]>([]);

  const [productImagePreviews, setProductImagePreviews] =
    useState<string[]>([]);

  // ==========================================
  // UPLOAD STATE
  // ==========================================

  const [isUploading, setIsUploading] =
    useState(false);

  // ==========================================
  // CATEGORIES
  // ==========================================

  const categories = [
    // Electronics
    "Mobiles",
    "Tablets",
    "Laptops",
    "Computers",
    "Computer Accessories",
    "Mobile Accessories",
    "Cameras",
    "TVs",
    "Audio & Speakers",
    "Gaming",
    "Smart Watches",
    "Other Electronics",

    // Vehicles
    "Cars",
    "Bikes",
    "Scooters",
    "Cycles",
    "Commercial Vehicles",
    "Vehicle Accessories",
    "Spare Parts",

    // Fashion
    "Men's Fashion",
    "Women's Fashion",
    "Kids Fashion",
    "Footwear",
    "Watches",
    "Bags & Luggage",
    "Jewellery",

    // Home
    "Furniture",
    "Home Appliances",
    "Kitchen Appliances",
    "Home Decor",
    "Beds & Mattresses",
    "Kitchen & Dining",
    "Garden & Outdoor",

    // Books & Education
    "Books",
    "Study Materials",
    "School Supplies",
    "Office Supplies",
    "Educational Equipment",

    // Sports
    "Sports Equipment",
    "Fitness Equipment",
    "Gym Equipment",
    "Outdoor & Camping",

    // Entertainment
    "Toys & Games",
    "Musical Instruments",
    "Collectibles",

    // Pets
    "Pet Supplies",

    // Tools & Business
    "Tools & Equipment",
    "Business & Industrial",

    // Other
    "Other",
  ];

  // ==========================================
  // CONDITIONS
  // ==========================================

  const conditions = [
    "Like New",
    "Good",
    "Fair",
    "Used",
  ];

  // ==========================================
  // IMAGE CHANGE
  // ==========================================

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;

    if (
      !selectedFiles ||
      selectedFiles.length === 0
    ) {
      return;
    }

    const files = Array.from(selectedFiles);

    if (files.length > 4) {
      alert("Please select maximum 4 images.");
      event.target.value = "";
      return;
    }

    setProductImages(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setProductImagePreviews(previews);

    event.target.value = "";
  };

  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  const removeImage = (index: number) => {
    const removedPreview =
      productImagePreviews[index];

    if (removedPreview) {
      URL.revokeObjectURL(removedPreview);
    }

    setProductImages((current) =>
      current.filter(
        (_, imageIndex) =>
          imageIndex !== index
      )
    );

    setProductImagePreviews((current) =>
      current.filter(
        (_, imageIndex) =>
          imageIndex !== index
      )
    );
  };

  // ==========================================
  // SECURE CLOUDINARY UPLOAD
  // ==========================================

  const uploadImageToCloudinary = async (
    imageFile: File
  ): Promise<string> => {
    // ----------------------------------------
    // STEP 1
    // Ask our server for a Cloudinary signature
    // ----------------------------------------

    const signResponse = await fetch(
      "/api/cloudinary/sign",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!signResponse.ok) {
      throw new Error(
        "Could not create Cloudinary upload signature."
      );
    }

    const signData = await signResponse.json();

    // ----------------------------------------
    // STEP 2
    // Prepare signed Cloudinary upload
    // ----------------------------------------

    const formData = new FormData();

    formData.append(
      "file",
      imageFile
    );

    formData.append(
      "api_key",
      signData.apiKey
    );

    formData.append(
      "timestamp",
      String(signData.timestamp)
    );

    formData.append(
      "signature",
      signData.signature
    );

    formData.append(
      "upload_preset",
      signData.uploadPreset
    );

    // ----------------------------------------
    // STEP 3
    // Upload directly to Cloudinary
    // ----------------------------------------

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.text();

      console.error(
        "Cloudinary upload response:",
        errorData
      );

      throw new Error(
        "Cloudinary image upload failed."
      );
    }

    const cloudinaryData =
      await response.json();

    if (!cloudinaryData.secure_url) {
      throw new Error(
        "Cloudinary did not return an image URL."
      );
    }

    return cloudinaryData.secure_url;
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const currentUser = auth.currentUser;

    // ========================================
    // LOGIN CHECK
    // ========================================

    if (!currentUser) {
      alert(
        "Please login to publish a product."
      );
      return;
    }

    // ========================================
    // PHONE VALIDATION
    // ========================================

    const cleanedPhone =
      phone.replace(/\D/g, "");

    if (cleanedPhone.length !== 10) {
      alert(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    // ========================================
    // IMAGE VALIDATION
    // ========================================

    if (productImages.length === 0) {
      alert(
        "Please select at least one product image."
      );
      return;
    }

    if (productImages.length > 4) {
      alert(
        "Please select maximum 4 images."
      );
      return;
    }

    try {
      setIsUploading(true);

      // ========================================
      // SECURE CLOUDINARY UPLOAD
      // ========================================

      const uploadedImageUrls: string[] = [];

      for (const imageFile of productImages) {
        const imageUrl =
          await uploadImageToCloudinary(
            imageFile
          );

        uploadedImageUrls.push(
          imageUrl
        );
      }

      console.log(
        "Uploaded images:",
        uploadedImageUrls
      );

      // ========================================
      // FIRESTORE
      // ========================================

      await addDoc(
        collection(db, "products"),
        {
          // Product
          name: productName,
          price: Number(productPrice),
          category: productCategory,
          condition: productCondition,
          description: productDescription,

          // Images
          image:
            uploadedImageUrls[0],

          images:
            uploadedImageUrls,

          // Seller
          sellerId:
            currentUser.uid,

          sellerName:
            sellerName,

          sellerEmail:
            currentUser.email || "",

          phone:
            cleanedPhone,

          location:
            location,

          // Timestamp
          createdAt:
            new Date(),
        }
      );

      // ========================================
      // SUCCESS
      // ========================================

      alert(
        "✅ Product published successfully!"
      );

      // ========================================
      // RESET PREVIEWS
      // ========================================

      productImagePreviews.forEach(
        (preview) =>
          URL.revokeObjectURL(preview)
      );

      // ========================================
      // RESET FORM
      // ========================================

      setSellerName("");
      setPhone("");
      setLocation("");

      setProductName("");
      setProductPrice("");

      setProductCategory(
        "Mobiles"
      );

      setProductCondition(
        "Like New"
      );

      setProductDescription("");

      setProductImages([]);

      setProductImagePreviews([]);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Upload error:",
        error
      );

      alert(
        "❌ Failed to publish product. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090304] text-white">

      {/* ======================================
          BACKGROUND
      ======================================= */}

      <div className="pointer-events-none fixed inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#500812_0%,#220408_34%,#090304_72%)]" />

        <motion.div
          animate={{
            x: [0, 35, -20, 0],
            y: [0, -20, 25, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-[18rem] -top-[15rem] h-[48rem] w-[48rem] rounded-full bg-[#b20b1d]/35 blur-[100px]"
        />

        <motion.div
          animate={{
            x: [0, -30, 25, 0],
            y: [0, 25, -15, 0],
            scale: [1, 0.94, 1.08, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-[18rem] top-[12rem] h-[45rem] w-[45rem] rounded-full bg-[#ff172f]/25 blur-[110px]"
        />

        <motion.div
          animate={{
            y: [0, -25, 0],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-18rem] left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[#760817]/30 blur-[100px]"
        />

        <div className="absolute left-[15%] top-[8%] h-[35rem] w-[35rem] rounded-full bg-black/50 blur-[90px]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.55%22/%3E%3C/svg%3E')]" />

      </div>

      {/* ======================================
          PAGE
      ======================================= */}

      <div className="relative z-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

        <div className="mx-auto max-w-5xl">

          {/* ==================================
              BRAND
          ================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-8 flex items-center justify-between px-2"
          >

            <div className="flex items-center gap-2">

              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[10px] font-black backdrop-blur-xl">
                D
              </div>

              <span className="text-xs font-bold tracking-[0.18em] text-white/50">
                DEALDONE
              </span>

            </div>

            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25 sm:block">
              Create a listing
            </span>

          </motion.div>

          {/* ==================================
              MAIN GLASS CARD
          ================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="relative overflow-hidden rounded-[2rem] border border-white/[0.18] bg-white/[0.075] shadow-[0_45px_140px_rgba(0,0,0,0.55)] backdrop-blur-[35px] sm:rounded-[2.75rem]"
          >

            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.09] to-transparent" />

            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#ff1b35]/15 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#9d071b]/20 blur-[90px]" />

            <form
              onSubmit={handleSubmit}
              className="relative z-10"
            >

              {/* =================================
                  INTRO
              ================================= */}

              <div className="border-b border-white/[0.09] px-6 pb-9 pt-8 sm:px-10 sm:pb-12 sm:pt-10 lg:px-14">

                <div className="flex items-start justify-between gap-6">

                  <div>

                    <p className="mb-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                      Let's create
                    </p>

                    <h1 className="max-w-3xl text-[3.7rem] font-black leading-[0.88] tracking-[-0.07em] text-white sm:text-7xl lg:text-[6.7rem]">

                      SELL
                      <br />

                      <span className="text-white/25">
                        SOMETHING
                      </span>

                      <br />

                      <span className="text-[#ff3048]">
                        GREAT.
                      </span>

                    </h1>

                  </div>

                  <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 sm:flex">

                    <ArrowUpRight
                      size={20}
                      className="text-white/45"
                    />

                  </div>

                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">

                  <p className="text-sm leading-6 text-white/40">
                    Add your details.
                    <br className="sm:hidden" />
                    {" "}Show your product.
                    Make the deal.
                  </p>

                  <div className="hidden h-px w-20 bg-white/10 sm:block" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">
                    01 — 04
                  </span>

                </div>

              </div>

              {/* =================================
                  SELLER
              ================================= */}

              <div className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14">

                <div className="mb-8 flex items-end justify-between gap-5">

                  <div>

                    <div className="mb-3 flex items-center gap-3">

                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff3048]">
                        01
                      </span>

                      <span className="h-px w-8 bg-[#ff3048]/40" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
                        Seller
                      </span>

                    </div>

                    <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                      Who&apos;s making the deal?
                    </h2>

                  </div>

                  <UserRound
                    size={20}
                    className="text-white/20"
                  />

                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <div className="sm:col-span-2">

                    <label className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                      Seller name
                    </label>

                    <div className="group relative">

                      <UserRound
                        size={16}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-[#ff3048]"
                      />

                      <input
                        type="text"
                        placeholder="Your name"
                        value={sellerName}
                        onChange={(event) =>
                          setSellerName(
                            event.target.value
                          )
                        }
                        className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-12 pr-5 text-sm font-medium text-white outline-none backdrop-blur-xl transition-all placeholder:text-white/20 focus:border-[#ff3048]/50 focus:bg-black/30 focus:ring-4 focus:ring-[#ff3048]/10"
                        required
                      />

                    </div>

                  </div>

                  <div>

                    <label className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                      Phone number
                    </label>

                    <div className="group relative">

                      <Phone
                        size={16}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-[#ff3048]"
                      />

                      <input
                        type="tel"
                        placeholder="10-digit number"
                        value={phone}
                        onChange={(event) =>
                          setPhone(
                            event.target.value
                          )
                        }
                        maxLength={10}
                        className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-12 pr-5 text-sm font-medium text-white outline-none backdrop-blur-xl transition-all placeholder:text-white/20 focus:border-[#ff3048]/50 focus:bg-black/30 focus:ring-4 focus:ring-[#ff3048]/10"
                        required
                      />

                    </div>

                    <p className="mt-2 text-[10px] text-white/20">
                      Used for Call and WhatsApp.
                    </p>

                  </div>

                  <div>

                    <label className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                      Location
                    </label>

                    <div className="group relative">

                      <MapPin
                        size={16}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-[#ff3048]"
                      />

                      <input
                        type="text"
                        placeholder="Example: Hyderabad"
                        value={location}
                        onChange={(event) =>
                          setLocation(
                            event.target.value
                          )
                        }
                        className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-12 pr-5 text-sm font-medium text-white outline-none backdrop-blur-xl transition-all placeholder:text-white/20 focus:border-[#ff3048]/50 focus:bg-black/30 focus:ring-4 focus:ring-[#ff3048]/10"
                        required
                      />

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================
                  PRODUCT
              ================================= */}

              <div className="border-t border-white/[0.09] px-6 py-9 sm:px-10 sm:py-12 lg:px-14">

                <div className="mb-8 flex items-end justify-between gap-5">

                  <div>

                    <div className="mb-3 flex items-center gap-3">

                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff3048]">
                        02
                      </span>

                      <span className="h-px w-8 bg-[#ff3048]/40" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
                        Product
                      </span>

                    </div>

                    <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                      Tell us about it.
                    </h2>

                  </div>

                  <Package
                    size={20}
                    className="text-white/20"
                  />

                </div>

                <div>

                  <label className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                    Product name
                  </label>

                  <input
                    type="text"
                    placeholder="What are you selling?"
                    value={productName}
                    onChange={(event) =>
                      setProductName(
                        event.target.value
                      )
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm font-medium text-white outline-none backdrop-blur-xl transition-all placeholder:text-white/20 focus:border-[#ff3048]/50 focus:bg-black/30 focus:ring-4 focus:ring-[#ff3048]/10"
                    required
                  />

                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">

                  <div>

                    <label className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                      Asking price
                    </label>

                    <div className="relative">

                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-black text-[#ff3048]/70">
                        ₹
                      </span>

                      <input
                        type="number"
                        min="1"
                        placeholder="0"
                        value={productPrice}
                        onChange={(event) =>
                          setProductPrice(
                            event.target.value
                          )
                        }
                        className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-11 pr-5 text-base font-bold text-white outline-none backdrop-blur-xl transition-all placeholder:text-white/20 focus:border-[#ff3048]/50 focus:bg-black/30 focus:ring-4 focus:ring-[#ff3048]/10"
                        required
                      />

                    </div>

                  </div>

                  <div>

                    <label className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                      Category
                    </label>

                    <select
                      value={productCategory}
                      onChange={(event) =>
                        setProductCategory(
                          event.target.value
                        )
                      }
                      className="w-full appearance-none rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm font-semibold text-white outline-none backdrop-blur-xl transition-all focus:border-[#ff3048]/50 focus:ring-4 focus:ring-[#ff3048]/10"
                    >

                      {categories.map(
                        (category) => (
                          <option
                            key={category}
                            value={category}
                            className="bg-[#18070a] text-white"
                          >
                            {category}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>

                <div className="mt-7">

                  <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                    Condition
                  </label>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                    {conditions.map(
                      (condition) => (
                        <button
                          key={condition}
                          type="button"
                          onClick={() =>
                            setProductCondition(
                              condition
                            )
                          }
                          className={`rounded-2xl border px-4 py-3 text-xs font-bold transition-all duration-300 ${
                            productCondition ===
                            condition
                              ? "border-[#ff3048]/60 bg-[#ff3048]/15 text-white shadow-[0_0_25px_rgba(255,48,72,0.08)]"
                              : "border-white/10 bg-black/15 text-white/35 hover:border-white/20 hover:bg-white/5 hover:text-white/60"
                          }`}
                        >
                          {condition}
                        </button>
                      )
                    )}

                  </div>

                </div>

                <div className="mt-7">

                  <div className="mb-2.5 flex items-center justify-between">

                    <label className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                      Description
                    </label>

                    <span className="text-[10px] font-medium text-white/20">
                      {
                        productDescription.length
                      }
                      /250
                    </span>

                  </div>

                  <textarea
                    rows={6}
                    maxLength={250}
                    placeholder="Describe your product..."
                    value={productDescription}
                    onChange={(event) =>
                      setProductDescription(
                        event.target.value
                      )
                    }
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm font-medium leading-6 text-white outline-none backdrop-blur-xl transition-all placeholder:text-white/20 focus:border-[#ff3048]/50 focus:bg-black/30 focus:ring-4 focus:ring-[#ff3048]/10"
                    required
                  />

                </div>

              </div>

              {/* =================================
                  IMAGES
              ================================= */}

              <div className="border-t border-white/[0.09] px-6 py-9 sm:px-10 sm:py-12 lg:px-14">

                <div className="mb-8 flex items-end justify-between gap-5">

                  <div>

                    <div className="mb-3 flex items-center gap-3">

                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff3048]">
                        03
                      </span>

                      <span className="h-px w-8 bg-[#ff3048]/40" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
                        Visuals
                      </span>

                    </div>

                    <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                      Show it off.
                    </h2>

                    <p className="mt-2 text-sm text-white/30">
                      Add 1–4 clear product images.
                    </p>

                  </div>

                  <ImagePlus
                    size={20}
                    className="text-white/20"
                  />

                </div>

                <label
                  htmlFor="product-images"
                  className="group relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border border-dashed border-white/15 bg-black/20 px-6 py-10 text-center backdrop-blur-xl transition-all duration-300 hover:border-[#ff3048]/50 hover:bg-[#ff3048]/5"
                >

                  <input
                    id="product-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,48,72,0.08),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#ff3048] shadow-[0_15px_50px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#ff3048]/30 group-hover:bg-[#ff3048]/10">

                    <Upload
                      size={24}
                    />

                  </div>

                  <p className="relative z-10 mt-5 text-sm font-bold text-white/80">
                    Upload product images
                  </p>

                  <p className="relative z-10 mt-2 text-xs text-white/25">
                    Click to choose from your device
                  </p>

                  <div className="relative z-10 mt-5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/25">
                    JPG · PNG · WEBP · MAX 4
                  </div>

                </label>

                <AnimatePresence>

                  {productImagePreviews.length >
                    0 && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="mt-6"
                    >

                      <div className="mb-3 flex items-center justify-between">

                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
                          Selected
                        </span>

                        <span className="text-[10px] font-bold text-[#ff3048]">
                          {
                            productImagePreviews.length
                          }{" "}
                          / 4
                        </span>

                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                        {productImagePreviews.map(
                          (
                            preview,
                            index
                          ) => (
                            <motion.div
                              key={preview}
                              initial={{
                                opacity: 0,
                                scale: 0.9,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/30"
                            >

                              <img
                                src={preview}
                                alt={`Product preview ${
                                  index + 1
                                }`}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />

                              <div className="absolute left-2 top-2 rounded-full border border-white/10 bg-black/60 px-2 py-1 text-[9px] font-black text-white/70 backdrop-blur-xl">
                                0{index + 1}
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeImage(
                                    index
                                  )
                                }
                                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white backdrop-blur-xl transition-all hover:bg-[#ff3048]"
                                aria-label="Remove image"
                              >
                                <X
                                  size={13}
                                />
                              </button>

                            </motion.div>
                          )
                        )}

                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>

              </div>

              {/* =================================
                  FINAL
              ================================= */}

              <div className="border-t border-white/[0.09] px-6 py-9 sm:px-10 sm:py-12 lg:px-14">

                <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">

                  <div>

                    <div className="mb-3 flex items-center gap-3">

                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff3048]">
                        04
                      </span>

                      <span className="h-px w-8 bg-[#ff3048]/40" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
                        Finish
                      </span>

                    </div>

                    <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                      Ready to make a deal?
                    </h2>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-white/30">
                      Review your information and
                      publish your listing when you&apos;re
                      ready.
                    </p>

                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="group relative flex min-w-[220px] items-center justify-between gap-8 overflow-hidden rounded-2xl bg-[#ff3048] px-5 py-4 text-left text-white shadow-[0_20px_60px_rgba(255,48,72,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff4158] hover:shadow-[0_25px_70px_rgba(255,48,72,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <span>

                      <span className="block text-[9px] font-black uppercase tracking-[0.18em] text-white/50">
                        DealDone
                      </span>

                      <span className="mt-1 block text-sm font-black">
                        {isUploading
                          ? "Publishing..."
                          : "Publish listing"}
                      </span>

                    </span>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/20">

                      {isUploading ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <ArrowUpRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      )}

                    </span>

                  </button>

                </div>

              </div>

              {/* =================================
                  FOOTER
              ================================= */}

              <div className="flex flex-col gap-3 border-t border-white/[0.08] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">

                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/15">
                  DealDone Marketplace
                </p>

                <p className="text-[9px] font-medium text-white/15">
                  Find it · Sell it · Make the deal
                </p>

              </div>

            </form>

          </motion.div>

          {/* ==================================
              BOTTOM TEXT
          ================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
              duration: 0.8,
            }}
            className="mt-6 flex items-center justify-center gap-3 text-center"
          >

            <span className="h-px w-8 bg-white/10" />

            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15">
              Your next deal starts here
            </span>

            <span className="h-px w-8 bg-white/10" />

          </motion.div>

        </div>

      </div>

    </main>
  );
}