"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ProductGalleryProps {
  name: string;
  image: string;
  images?: string[];
}

export default function ProductGallery({
  name,
  image,
  images,
}: ProductGalleryProps) {
  const galleryImages = Array.from(
    new Set(
      [image, ...(images || [])].filter(
        (item): item is string =>
          typeof item === "string" && item.trim().length > 0
      )
    )
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeImage = galleryImages[activeIndex] || image;

  /* ==========================================
     RESET WHEN PRODUCT CHANGES
  ========================================== */

  useEffect(() => {
    setActiveIndex(0);
    setDirection(1);
    setIsFullscreen(false);
  }, [image, name]);

  /* ==========================================
     LOCK BODY SCROLL IN FULLSCREEN
  ========================================== */

  useEffect(() => {
    if (!isFullscreen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  /* ==========================================
     ESCAPE KEY
  ========================================== */

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  /* ==========================================
     IMAGE NAVIGATION
  ========================================== */

  const goToImage = (index: number) => {
    if (galleryImages.length <= 1) return;

    const nextIndex =
      (index + galleryImages.length) % galleryImages.length;

    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const previousImage = () => {
    if (galleryImages.length <= 1) return;

    setDirection(-1);

    setActiveIndex((current) =>
      current === 0
        ? galleryImages.length - 1
        : current - 1
    );
  };

  const nextImage = () => {
    if (galleryImages.length <= 1) return;

    setDirection(1);

    setActiveIndex((current) =>
      current === galleryImages.length - 1
        ? 0
        : current + 1
    );
  };

  return (
    <>
      {/* ==========================================
          NORMAL GALLERY
      ========================================== */}

      <div className="w-full">
        {/* ========================================
            MAIN IMAGE
        ======================================== */}

        <div className="relative aspect-square overflow-hidden rounded-[1.7rem] bg-[#f2f7dc] sm:rounded-[2rem]">
          {/* Background atmosphere */}

          <div className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4e84a]/20 blur-3xl"
            />

            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-200/30 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white/80 blur-3xl" />
          </div>

          {/* Image counter */}

          <div className="absolute left-5 top-5 z-30 flex items-center gap-2 rounded-full border border-emerald-950/10 bg-white/85 px-3.5 py-2 text-xs font-bold text-[#0a3d2e] shadow-sm backdrop-blur-xl">
            <ImageIcon size={14} />

            <span>
              {activeIndex + 1} / {galleryImages.length}
            </span>
          </div>

          {/* Fullscreen */}

          <motion.button
            type="button"
            title="View image fullscreen"
            aria-label="View image fullscreen"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsFullscreen(true)}
            className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-950/10 bg-white/85 text-[#0a3d2e] shadow-sm backdrop-blur-xl transition hover:bg-white"
          >
            <Maximize2 size={17} />
          </motion.button>

          {/* Main image */}

          <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={name}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction * 35,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: direction * -35,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
                className="relative z-10 h-full w-full cursor-zoom-in object-contain drop-shadow-[0_25px_35px_rgba(10,61,46,0.14)]"
                onClick={() => setIsFullscreen(true)}
              />
            </AnimatePresence>
          </div>

          {/* Previous */}

          {galleryImages.length > 1 && (
            <motion.button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              whileHover={{ scale: 1.06, x: -2 }}
              whileTap={{ scale: 0.94 }}
              className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/10 bg-white/90 text-[#0a3d2e] shadow-lg backdrop-blur-xl transition hover:bg-white sm:left-5"
            >
              <ChevronLeft size={21} />
            </motion.button>
          )}

          {/* Next */}

          {galleryImages.length > 1 && (
            <motion.button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              whileHover={{ scale: 1.06, x: 2 }}
              whileTap={{ scale: 0.94 }}
              className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/10 bg-white/90 text-[#0a3d2e] shadow-lg backdrop-blur-xl transition hover:bg-white sm:right-5"
            >
              <ChevronRight size={21} />
            </motion.button>
          )}

          {/* Progress dots */}

          {galleryImages.length > 1 &&
            galleryImages.length <= 8 && (
              <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-emerald-950/10 bg-white/85 px-3 py-2 backdrop-blur-xl">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`View image ${index + 1}`}
                    onClick={() => goToImage(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-6 bg-[#0a3d2e]"
                        : "w-1.5 bg-emerald-950/20 hover:bg-emerald-950/40"
                    }`}
                  />
                ))}
              </div>
            )}
        </div>

        {/* ========================================
            THUMBNAILS
        ======================================== */}

        {galleryImages.length > 1 && (
          <div className="mt-4">
            <div className="flex gap-3 overflow-x-auto pb-1">
              {galleryImages.map((galleryImage, index) => (
                <motion.button
                  key={`${galleryImage}-${index}`}
                  type="button"
                  onClick={() => goToImage(index)}
                  aria-label={`Select image ${index + 1}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`group relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-white transition-all duration-300 sm:h-24 sm:w-24 ${
                    index === activeIndex
                      ? "border-[#0a3d2e] shadow-[0_8px_25px_rgba(10,61,46,0.12)]"
                      : "border-transparent hover:border-emerald-950/15"
                  }`}
                >
                  <img
                    src={galleryImage}
                    alt={`${name} image ${index + 1}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Selected overlay */}

                  {index === activeIndex && (
                    <div className="absolute inset-0 bg-[#0a3d2e]/5" />
                  )}

                  {/* Number */}

                  <span
                    className={`absolute bottom-1.5 right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px] font-bold ${
                      index === activeIndex
                        ? "bg-[#0a3d2e] text-[#d4e84a]"
                        : "bg-white/90 text-[#0a3d2e]"
                    }`}
                  >
                    {index + 1}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================
            GALLERY FOOTER
        ======================================== */}

        <div className="mt-4 flex items-center justify-between px-1">
          <p className="max-w-[70%] truncate text-xs font-medium text-emerald-950/40">
            {name}
          </p>

          {galleryImages.length > 1 && (
            <span className="text-xs font-semibold text-emerald-950/40">
              {galleryImages.length}{" "}
              {galleryImages.length === 1 ? "photo" : "photos"}
            </span>
          )}
        </div>
      </div>

      {/* ==========================================
          FULLSCREEN LIGHTBOX
      ========================================== */}

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#061c15]/95 p-4 backdrop-blur-2xl sm:p-8"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsFullscreen(false);
              }
            }}
          >
            {/* Top controls */}

            <div className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-bold text-white/80 backdrop-blur-xl">
                <ImageIcon size={14} />

                {activeIndex + 1} / {galleryImages.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  aria-label="Close fullscreen"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main fullscreen image */}

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="relative flex h-full w-full items-center justify-center"
            >
              <AnimatePresence
                mode="wait"
                custom={direction}
              >
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={name}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction * 45,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: direction * -45,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="max-h-[78vh] max-w-[92vw] object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.4)]"
                />
              </AnimatePresence>
            </motion.div>

            {/* Previous fullscreen */}

            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition hover:-translate-x-1 hover:bg-white/20 sm:left-8 sm:h-14 sm:w-14"
              >
                <ChevronLeft size={25} />
              </button>
            )}

            {/* Next fullscreen */}

            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition hover:translate-x-1 hover:bg-white/20 sm:right-8 sm:h-14 sm:w-14"
              >
                <ChevronRight size={25} />
              </button>
            )}

            {/* Bottom thumbnail strip */}

            {galleryImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 z-30 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-black/20 p-2 backdrop-blur-xl sm:bottom-7">
                {galleryImages.map((galleryImage, index) => (
                  <button
                    key={`${galleryImage}-fullscreen-${index}`}
                    type="button"
                    onClick={() => goToImage(index)}
                    aria-label={`View fullscreen image ${index + 1}`}
                    className={`h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-16 sm:w-16 ${
                      index === activeIndex
                        ? "border-[#d4e84a]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={galleryImage}
                      alt={`${name} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product name */}

            <div className="absolute bottom-4 left-4 hidden max-w-xs sm:block sm:left-8 sm:bottom-8">
              <p className="truncate text-sm font-bold text-white/80">
                {name}
              </p>

              <p className="mt-1 text-xs text-white/40">
                Use ← → to navigate · ESC to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}