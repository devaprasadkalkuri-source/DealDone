"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Search,
  Sparkles,
  Tag,
} from "lucide-react";

/* =========================================================
   DEALDONE HERO SCENES
========================================================= */

const heroScenes = [
  {
    id: 1,
    category: "Electronics",
    title: "Find your\nnext deal",
    cutout:
      "https://purepng.com/public/uploads/large/purepng.com-music-headphonemusicheadphoneearphoneslisteningearssounds-231519334561l0ptl.png",
    color: "#8054dc",
    productClass:
      "h-[220px] w-[300px] sm:h-[275px] sm:w-[340px] md:h-[300px] md:w-[365px]",
    productPosition:
      "left-[2%] top-[39%] sm:left-[4%] md:left-[3%] md:top-[39%]",
    items: [
      {
        name: "Wireless Audio",
        price: "₹8,999",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=85",
      },
      {
        name: "Smart Gadgets",
        price: "₹4,500",
        image:
          "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=300&q=85",
      },
      {
        name: "Camera Gear",
        price: "₹18,500",
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=85",
      },
    ],
  },
  {
    id: 2,
    category: "Computers",
    title: "Upgrade your\nworkspace",
    cutout:
      "https://purepng.com/public/uploads/large/purepng.com-laptop-notebooklaptopsnotebooknotebook-computerclamshell-1701528354872vvf26.png",
    color: "#667f91",
    productClass:
      "h-[225px] w-[305px] sm:h-[260px] sm:w-[345px] md:h-[290px] md:w-[370px]",
    productPosition:
      "left-[2%] top-[40%] sm:left-[4%] md:left-[3%] md:top-[40%]",
    items: [
      {
        name: "Laptop",
        price: "₹1,24,000",
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=85",
      },
      {
        name: "Desk Setup",
        price: "₹12,500",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=85",
      },
      {
        name: "Work Gear",
        price: "₹7,999",
        image:
          "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=300&q=85",
      },
    ],
  },
  {
    id: 3,
    category: "Fashion",
    title: "Discover\nstyle",
    cutout:
      "https://purepng.com/public/uploads/large/purepng.com-running-shoesrunning-shoesrunningshoessportingphysical-activitiesstyle-1701528185973kzggn.png",
    color: "#d95b6b",
    productClass:
      "h-[175px] w-[330px] sm:h-[205px] sm:w-[370px] md:h-[225px] md:w-[400px]",
    productPosition:
      "left-[2%] top-[46%] sm:left-[4%] md:left-[3%] md:top-[45%]",
    items: [
      {
        name: "Sneakers",
        price: "₹6,499",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=85",
      },
      {
        name: "Street Style",
        price: "₹3,999",
        image:
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=300&q=85",
      },
      {
        name: "Accessories",
        price: "₹2,499",
        image:
          "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=85",
      },
    ],
  },
  {
    id: 4,
    category: "Home",
    title: "Make home\nfeel better",
    cutout:
      "https://purepng.com/public/uploads/large/purepng.com-sofasofafurniturearmrestsentirely-upholsteredloungecouchbedsteaddivan-1701527959834nkzp9.png",
    color: "#d49a42",
    productClass:
      "h-[155px] w-[325px] sm:h-[185px] sm:w-[365px] md:h-[205px] md:w-[390px]",
    productPosition:
      "left-[5%] top-[48%] sm:left-[6%] md:left-[5%] md:top-[47%]",
    items: [
      {
        name: "Sofa",
        price: "₹24,999",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=85",
      },
      {
        name: "Home Decor",
        price: "₹3,500",
        image:
          "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=300&q=85",
      },
      {
        name: "Furniture",
        price: "₹12,500",
        image:
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=300&q=85",
      },
    ],
  },
  {
    id: 5,
    category: "Vehicles",
    title: "Move with\nconfidence",
    cutout:
      "https://purepng.com/public/uploads/large/purepng.com-motorcyclemanpeoplepersonsmalebikebikercafe-racercb650easy-riderhondamotorcycle-126152632642947r6v.png",
    color: "#7d84c8",
    productClass:
      "h-[190px] w-[350px] sm:h-[225px] sm:w-[395px] md:h-[255px] md:w-[430px]",
    productPosition:
      "left-[3%] top-[43%] sm:left-[5%] md:left-[4%] md:top-[42%]",
    items: [
      {
        name: "Motorcycles",
        price: "₹85,000",
        image:
          "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=300&q=85",
      },
      {
        name: "Cars",
        price: "₹4,50,000",
        image:
          "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=300&q=85",
      },
      {
        name: "Accessories",
        price: "₹8,500",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=85",
      },
    ],
  },
];

/* =========================================================
   IMAGE PRELOADER
========================================================= */

function loadHeroImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = async () => {
      try {
        if (typeof image.decode === "function") {
          await image.decode();
        }
      } catch {
        // Image remains usable.
      }

      resolve(src);
    };

    image.onerror = () => {
      reject(new Error(`Failed to load hero image: ${src}`));
    };

    image.src = src;
  });
}

/* =========================================================
   FLOATING RELATED PHOTOS
========================================================= */

function FloatingObjects({
  scene,
}: {
  scene: (typeof heroScenes)[number];
}) {
  const objects = [
    {
      image: scene.items[0].image,
      position: "right-[7%] top-[9%]",
      size: "h-6 w-6 min-[400px]:h-7 min-[400px]:w-7 sm:h-10 sm:w-10",
      rotate: -10,
      duration: 6,
    },
    {
      image: scene.items[2].image,
      position: "right-[7%] bottom-[22%]",
      size: "h-6 w-6 min-[400px]:h-7 min-[400px]:w-7 sm:h-9 sm:w-9",
      rotate: 12,
      duration: 5.5,
    },
  ];

  return (
    <>
      {objects.map((object, index) => (
        <motion.div
          key={`${scene.id}-float-${index}`}
          className={`absolute z-20 overflow-hidden rounded-lg border border-white/65 bg-white/65 p-1 shadow-[0_8px_18px_rgba(0,0,0,0.07)] backdrop-blur-sm sm:rounded-[15px] sm:p-1.5 ${object.position} ${object.size}`}
          initial={{
            opacity: 0,
            scale: 0.35,
            x: index % 2 === 0 ? -35 : 35,
            y: 25,
            rotate: object.rotate - 15,
          }}
          animate={{
            opacity: [0.45, 0.7, 0.45],
            scale: [0.94, 1.04, 0.94],
            x: [0, index % 2 === 0 ? 4 : -4, 0],
            y: [0, -5, 0],
            rotate: [object.rotate, object.rotate + 3, object.rotate],
          }}
          exit={{
            opacity: 0,
            scale: 0.3,
            x: index % 2 === 0 ? -25 : 25,
          }}
          transition={{
            opacity: { duration: 0.55 },
            scale: {
              duration: object.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: object.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
            y: {
              duration: object.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: object.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <img
            src={object.image}
            alt=""
            loading="lazy"
            className="h-full w-full rounded-[7px] object-cover sm:rounded-[13px]"
          />
        </motion.div>
      ))}
    </>
  );
}

/* =========================================================
   ORGANIC BLOB
========================================================= */

function OrganicBlob({
  scene,
}: {
  scene: (typeof heroScenes)[number];
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`blob-${scene.id}`}
        initial={{ opacity: 0, scale: 0.82, x: -25 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
          borderRadius: [
            "23% 77% 65% 35% / 35% 38% 62% 65%",
            "42% 58% 30% 70% / 55% 30% 70% 45%",
            "70% 30% 55% 45% / 40% 65% 35% 60%",
            "23% 77% 65% 35% / 35% 38% 62% 65%",
          ],
        }}
        exit={{ opacity: 0, scale: 0.82, x: 25 }}
        transition={{
          opacity: { duration: 0.55 },
          scale: { duration: 0.8, ease: "easeOut" },
          x: { duration: 0.8, ease: "easeOut" },
          borderRadius: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute left-[15%] top-[24%] z-10 h-[44%] w-[70%] shadow-[0_20px_45px_rgba(0,0,0,0.08)] sm:left-[7%] sm:top-[16%] sm:h-[64%] sm:w-[51%]"
        style={{ backgroundColor: scene.color }}
      >
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/15 via-transparent to-black/5" />
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   HERO PRODUCT
========================================================= */

function HeroProduct({
  scene,
  imageSrc,
}: {
  scene: (typeof heroScenes)[number];
  imageSrc: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`product-${scene.id}`}
        className="absolute inset-0 z-[25] flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.65, x: 35, y: 20, rotate: 8 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.65, x: -35, y: -15, rotate: -8 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -7, 0], rotate: [0, -1.5, 1.5, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-full w-full items-center justify-center"
        >
          <motion.div
            className="absolute bottom-[23%] left-[20%] h-4 w-[60%] rounded-full bg-black/25 blur-2xl sm:bottom-[12%] sm:h-8"
            animate={{
              scaleX: [1, 0.78, 1],
              opacity: [0.3, 0.14, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <img
            src={imageSrc}
            alt={`${scene.category} product`}
            loading="eager"
            decoding="async"
            draggable={false}
            className="relative z-30 h-[61%] w-[112%] max-w-none select-none object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.20)] min-[400px]:h-[64%] min-[400px]:w-[118%] sm:h-[69%] sm:w-[108%] md:h-[74%] md:w-[112%]"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   SHOWCASE
========================================================= */

function Showcase({
  scene,
  activeScene,
  setActiveScene,
  activeImage,
}: {
  scene: (typeof heroScenes)[number];
  activeScene: number;
  setActiveScene: (index: number) => void;
  activeImage?: string;
}) {
  return (
    <div className="relative min-h-[340px] w-full overflow-hidden bg-[#f8f8f6] sm:min-h-[420px] md:absolute md:inset-y-0 md:right-0 md:h-full md:w-[55%] md:border-l md:border-zinc-200/70">
      <OrganicBlob scene={scene} />


      <AnimatePresence mode="sync">
        <FloatingObjects key={`floating-${scene.id}`} scene={scene} />
      </AnimatePresence>

      {activeImage && <HeroProduct scene={scene} imageSrc={activeImage} />}


      {/* SCENE INDICATOR */}
      <motion.div
        className="absolute right-[6%] top-[6%] z-50 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-white shadow-lg sm:h-9 sm:w-9"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.span
          key={`dot-${scene.id}`}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-2 w-2 rounded-full sm:h-3 sm:w-3"
          style={{ backgroundColor: scene.color }}
        />
      </motion.div>

      {/* BOTTOM CONTROLS */}
      <div className="absolute bottom-[5%] left-[5%] right-[5%] z-50 flex items-center justify-between sm:bottom-[7%] sm:left-[7%] sm:right-[7%]">
        <div className="flex items-center gap-1.5 rounded-xl border border-white/80 bg-white/75 px-2 py-2 shadow-sm backdrop-blur-xl sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 sm:h-2 sm:w-2" />
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 sm:h-2 sm:w-2" />
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-200 sm:h-2 sm:w-2" />
        </div>

        <div className="flex items-center gap-0.5 rounded-full border border-white/80 bg-white/80 p-1 shadow-sm backdrop-blur-xl sm:gap-1">
          {heroScenes.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveScene(index)}
              aria-label={`Show ${item.category}`}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: index === activeScene ? 16 : 5,
                backgroundColor:
                  index === activeScene ? scene.color : "#d4d4d4",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            setActiveScene((activeScene + 1) % heroScenes.length)
          }
          aria-label="Next showcase"
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-xl transition-transform duration-300 active:scale-95 sm:h-12 sm:w-12 sm:rounded-2xl"
        >
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN HERO
========================================================= */

export default function Hero() {
  const [activeScene, setActiveScene] = useState(0);
  const [search, setSearch] = useState("");
  const [readyImages, setReadyImages] = useState<Record<number, string>>({});

  const scene = heroScenes[activeScene];

  /* PRELOAD PRODUCTS */
  useEffect(() => {
    let cancelled = false;

    async function preloadAll() {
      const results: Record<number, string> = {};

      await Promise.all(
        heroScenes.map(async (heroScene) => {
          try {
            results[heroScene.id] = await loadHeroImage(heroScene.cutout);
          } catch (error) {
            console.error(
              `DEALDONE hero image failed for ${heroScene.category}`,
              error
            );
          }
        })
      );

      if (!cancelled) {
        setReadyImages(results);
      }
    }

    preloadAll();

    return () => {
      cancelled = true;
    };
  }, []);

  const allHeroImagesReady = heroScenes.every((heroScene) =>
    Boolean(readyImages[heroScene.id])
  );

  /* AUTOMATIC ROTATION */
  useEffect(() => {
    if (!allHeroImagesReady) return;

    const timer = setInterval(() => {
      setActiveScene((current) => (current + 1) % heroScenes.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [allHeroImagesReady]);

  /* SEARCH */
  const handleSearch = () => {
    const value = search.trim();

    window.location.href = value
      ? `/products?search=${encodeURIComponent(value)}`
      : "/products";
  };

  const activeImage = readyImages[scene.id];

  return (
    <section className="relative overflow-hidden bg-white px-2 pb-10 pt-3 text-zinc-950 min-[400px]:px-3 sm:px-6 sm:pb-16 sm:pt-5 md:px-8 md:pb-24">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-40 h-[500px] w-[500px] rounded-full bg-orange-100/30 blur-[130px]" />
        <div className="absolute -right-40 top-10 h-[550px] w-[550px] rounded-full bg-purple-100/25 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* MAIN HERO CARD */}
        <div className="relative grid grid-cols-[52%_48%] overflow-hidden rounded-[22px] border border-zinc-200 bg-[#f4f4f2] shadow-[0_25px_75px_rgba(0,0,0,0.09)] min-[400px]:rounded-[28px] sm:rounded-[34px] md:block md:min-h-[690px] md:rounded-[42px]">
          {/* LEFT CONTENT */}
          <div className="relative z-50 flex min-w-0 flex-col justify-center px-2.5 py-5 min-[360px]:px-3 min-[400px]:px-4 sm:px-10 sm:py-14 md:min-h-[690px] md:w-[53%] md:px-14 md:py-14 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-3 min-[400px]:mb-4 sm:mb-6"
            >
              <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-zinc-200 bg-white px-2 py-1.5 text-[6px] font-black uppercase tracking-[0.08em] text-zinc-600 shadow-sm min-[360px]:gap-1.5 min-[360px]:px-2.5 min-[360px]:text-[7px] min-[400px]:gap-2 min-[400px]:px-3 min-[400px]:text-[9px] sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.18em]">
                <Sparkles
                  size={9}
                  className="shrink-0 text-orange-500 min-[400px]:h-3 min-[400px]:w-3 sm:h-[13px] sm:w-[13px]"
                />
                <span>Real marketplace</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative z-50 whitespace-nowrap text-[clamp(21px,6.4vw,35px)] font-black leading-[0.92] tracking-[-1.5px] min-[400px]:text-[clamp(24px,6.5vw,43px)] min-[400px]:tracking-[-2px] sm:text-[66px] sm:tracking-[-3px] md:text-[72px] lg:text-[80px]"
            >
              FIND
              <br />
              SOMETHING
              <br />
              <span className="relative inline-block text-orange-500">
                <span className="relative z-10">YOU LOVE.</span>
                <span className="absolute bottom-0 left-0 z-0 h-1.5 w-[95%] bg-orange-200/80 min-[400px]:h-2 sm:bottom-1 sm:h-3" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-3 max-w-[480px] text-[9px] leading-[1.5] text-zinc-500 min-[360px]:text-[10px] min-[400px]:mt-4 min-[400px]:text-[11px] min-[400px]:leading-5 sm:mt-7 sm:text-base sm:leading-7 md:text-lg"
            >
              Buy what you need. Sell what you don't.
              Discover real products from people around you and make a better deal.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-4 flex w-full min-w-0 flex-col gap-2 min-[400px]:mt-5 sm:mt-8 sm:flex-row sm:gap-3"
            >
              <Link
                href="/products"
                className="group inline-flex min-h-[34px] w-full min-w-0 items-center justify-center gap-1 rounded-full bg-zinc-950 px-1.5 py-2 text-[8px] font-black text-white shadow-lg transition-all duration-300 min-[360px]:min-h-[38px] min-[360px]:text-[9px] min-[400px]:min-h-[42px] min-[400px]:gap-1.5 min-[400px]:px-2 min-[400px]:text-[10px] sm:min-h-[52px] sm:w-auto sm:gap-3 sm:px-5 sm:py-3.5 sm:text-sm sm:hover:-translate-y-1 sm:hover:shadow-xl"
              >
                <span className="whitespace-nowrap">Explore Deals</span>
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10 transition-all group-hover:bg-orange-500 min-[400px]:h-5 min-[400px]:w-5 sm:h-7 sm:w-7">
                  <ArrowRight size={10} className="min-[400px]:h-3 min-[400px]:w-3 sm:h-[15px] sm:w-[15px]" />
                </span>
              </Link>

              <Link
                href="/sell"
                className="inline-flex min-h-[34px] w-full min-w-0 items-center justify-center gap-1 rounded-full border border-zinc-200 bg-white px-1.5 py-2 text-[8px] font-bold text-zinc-800 shadow-sm transition-all duration-300 min-[360px]:min-h-[38px] min-[360px]:text-[9px] min-[400px]:min-h-[42px] min-[400px]:gap-1.5 min-[400px]:px-2 min-[400px]:text-[10px] sm:min-h-[52px] sm:w-auto sm:gap-2 sm:px-5 sm:py-3.5 sm:text-sm sm:hover:-translate-y-1 sm:hover:border-orange-200 sm:hover:text-orange-500"
              >
                <Tag size={11} className="shrink-0 min-[400px]:h-3 min-[400px]:w-3 sm:h-4 sm:w-4" />
                <span className="whitespace-nowrap">Sell Something</span>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT ANIMATION - SIDE BY SIDE ON MOBILE */}
          <Showcase
            scene={scene}
            activeScene={activeScene}
            setActiveScene={setActiveScene}
            activeImage={activeImage}
          />
        </div>

        {/* SEARCH */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-50 mx-auto -mt-4 w-full max-w-[1080px] rounded-[18px] border border-zinc-200 bg-white p-1 shadow-[0_18px_50px_rgba(0,0,0,0.11)] min-[400px]:-mt-5 min-[400px]:rounded-[22px] min-[400px]:p-1.5 sm:-mt-8 sm:rounded-[25px] sm:p-2"
        >
          <div className="flex flex-col gap-1 sm:gap-2 md:flex-row">
            <div className="flex min-h-[42px] min-w-0 flex-1 items-center gap-2 rounded-[13px] bg-zinc-50 px-3 min-[400px]:min-h-[48px] min-[400px]:gap-3 min-[400px]:px-4 sm:min-h-[58px] sm:rounded-[18px] sm:px-5">
              <Search size={15} className="shrink-0 text-zinc-400 min-[400px]:h-4 min-[400px]:w-4 sm:h-[19px] sm:w-[19px]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSearch();
                }}
                placeholder="Search phones, laptops, bikes..."
                aria-label="Search products"
                className="min-w-0 w-full bg-transparent text-[11px] font-medium text-zinc-900 outline-none placeholder:text-zinc-400 min-[400px]:text-xs sm:text-sm"
              />
            </div>

            <button
              type="button"
              className="flex min-h-[40px] items-center justify-center gap-2 rounded-[13px] bg-zinc-50 px-4 text-[11px] font-bold text-zinc-600 transition hover:bg-orange-50 hover:text-orange-500 min-[400px]:min-h-[45px] min-[400px]:text-xs sm:min-h-[58px] sm:rounded-[18px] sm:px-6 sm:text-sm"
            >
              <MapPin size={14} className="shrink-0 text-orange-500 min-[400px]:h-4 min-[400px]:w-4 sm:h-[17px] sm:w-[17px]" />
              Nearby
            </button>

            <button
              type="button"
              onClick={handleSearch}
              className="flex min-h-[42px] items-center justify-center gap-2 rounded-[13px] bg-orange-500 px-5 text-[11px] font-black text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 min-[400px]:min-h-[45px] min-[400px]:text-xs sm:min-h-[58px] sm:rounded-[18px] sm:px-8 sm:text-sm"
            >
              Search
              <ArrowRight size={14} className="sm:h-[17px] sm:w-[17px]" />
            </button>
          </div>
        </motion.div>

        {/* FEATURE STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-5 grid max-w-5xl grid-cols-2 gap-2 min-[400px]:mt-7 min-[400px]:gap-2.5 sm:mt-10 sm:gap-3 md:grid-cols-4"
        >
          {[
            { title: "BUY", text: "Find what you need" },
            { title: "SELL", text: "List what you don't" },
            { title: "LOCAL", text: "Deals around you" },
            { title: "DEALDONE", text: "Make better deals" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex min-h-[65px] flex-col items-center justify-center rounded-xl border border-zinc-100 bg-white px-1.5 py-2.5 text-center shadow-sm min-[400px]:min-h-[75px] min-[400px]:rounded-2xl min-[400px]:px-2.5 min-[400px]:py-3.5 sm:min-h-0 sm:px-4 sm:py-4"
            >
              <p className="text-[8px] font-black tracking-[0.14em] text-orange-500 min-[400px]:text-[9px] sm:text-[10px] sm:tracking-[0.16em]">
                {item.title}
              </p>
              <p className="mt-1 text-[9px] font-medium leading-4 text-zinc-500 min-[400px]:text-[10px] sm:text-xs">
                {item.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}