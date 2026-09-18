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
      "h-[235px] w-[300px] sm:h-[275px] sm:w-[340px] md:h-[300px] md:w-[365px]",

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
        // Image is still usable even if decode fails.
      }

      resolve(src);
    };

    image.onerror = () => {
      reject(
        new Error(`Failed to load hero image: ${src}`)
      );
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
      position:
        "left-[4%] top-[8%] sm:left-[5%] sm:top-[10%]",
      size:
        "h-10 w-10 sm:h-14 sm:w-14 md:h-18 md:w-18 lg:h-20 lg:w-20",
      rotate: -12,
      duration: 5.5,
    },

    {
      image: scene.items[1].image,
      position:
        "left-[7%] bottom-[29%] sm:left-[13%] sm:bottom-[18%]",
      size:
        "h-9 w-9 sm:h-11 sm:w-11 md:h-15 md:w-15 lg:h-16 lg:w-16",
      rotate: 14,
      duration: 4.8,
    },

    {
      image: scene.items[2].image,
      position:
        "right-[28%] top-[8%] sm:right-[40%] sm:top-[8%]",
      size:
        "h-10 w-10 sm:h-13 sm:w-13 md:h-18 md:w-18 lg:h-20 lg:w-20",
      rotate: 10,
      duration: 6,
    },

    {
      image: scene.items[1].image,
      position:
        "right-[20%] bottom-[29%] sm:right-[36%] sm:bottom-[17%]",
      size:
        "h-8 w-8 sm:h-9 sm:w-9 md:h-13 md:w-13 lg:h-14 lg:w-14",
      rotate: -18,
      duration: 5,
    },
  ];

  return (
    <>
      {objects.map((object, index) => (
        <motion.div
          key={`${scene.id}-float-${index}`}
          className={`absolute z-30 overflow-hidden rounded-xl border border-white/80 bg-white/80 p-1 shadow-[0_12px_28px_rgba(0,0,0,0.12)] backdrop-blur-md sm:rounded-[18px] sm:p-1.5 ${object.position} ${object.size}`}
          initial={{
            opacity: 0,
            scale: 0.35,
            x: index % 2 === 0 ? -35 : 35,
            y: 25,
            rotate: object.rotate - 15,
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [0.94, 1.04, 0.94],
            x: [
              0,
              index % 2 === 0 ? 10 : -10,
              0,
            ],
            y: [0, -14, 0],
            rotate: [
              object.rotate,
              object.rotate + 6,
              object.rotate,
            ],
          }}
          exit={{
            opacity: 0,
            scale: 0.3,
            x: index % 2 === 0 ? -25 : 25,
          }}
          transition={{
            opacity: {
              duration: 0.55,
            },

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
            className="h-full w-full rounded-[9px] object-cover sm:rounded-[13px]"
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
        initial={{
          opacity: 0,
          scale: 0.82,
          x: -45,
        }}
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
        exit={{
          opacity: 0,
          scale: 0.82,
          x: 35,
        }}
        transition={{
          opacity: {
            duration: 0.55,
          },

          scale: {
            duration: 0.8,
            ease: "easeOut",
          },

          x: {
            duration: 0.8,
            ease: "easeOut",
          },

          borderRadius: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute left-[4%] top-[17%] z-10 h-[58%] w-[62%] shadow-[0_30px_65px_rgba(0,0,0,0.09)] sm:left-[7%] sm:top-[16%] sm:h-[64%] sm:w-[51%]"
        style={{
          backgroundColor: scene.color,
        }}
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
  mobile = false,
}: {
  scene: (typeof heroScenes)[number];
  imageSrc: string;
  mobile?: boolean;
}) {
  const positionClass = mobile
    ? "left-1/2 top-[34%] -translate-x-1/2 sm:left-[5%] sm:top-[39%] sm:translate-x-0"
    : scene.productPosition;

  const imageClass = mobile
    ? "h-[175px] w-[270px] min-[360px]:h-[190px] min-[360px]:w-[295px] min-[400px]:h-[210px] min-[400px]:w-[320px] sm:h-[220px] sm:w-[330px]"
    : scene.productClass;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${mobile ? "mobile" : "desktop"}-product-${scene.id}`}
        className={`absolute z-[25] flex items-center justify-center ${positionClass}`}
        initial={{
          opacity: 0,
          scale: 0.65,
          x: mobile ? 80 : 100,
          y: 55,
          rotate: 8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotate: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.65,
          x: -100,
          y: -30,
          rotate: -8,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          animate={{
            y: [0, -9, 0],
            rotate: [0, -1.5, 1.5, 0],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          {/* PRODUCT SHADOW */}

          <motion.div
            className={`absolute bottom-[2%] left-[14%] ${
              mobile ? "h-5" : "h-8"
            } w-[72%] rounded-full bg-black/25 blur-2xl`}
            animate={{
              scaleX: [1, 0.78, 1],
              opacity: [0.3, 0.14, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* TRANSPARENT PRODUCT */}

          <img
            src={imageSrc}
            alt={`${scene.category} product`}
            loading="eager"
            decoding="async"
            draggable={false}
            className={`relative z-20 max-w-full select-none object-contain drop-shadow-[0_25px_28px_rgba(0,0,0,0.25)] sm:drop-shadow-[0_30px_30px_rgba(0,0,0,0.28)] ${imageClass}`}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   SCENE TITLE
========================================================= */

function SceneTitle({
  scene,
}: {
  scene: (typeof heroScenes)[number];
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`title-${scene.id}`}
        initial={{
          opacity: 0,
          x: -25,
          y: 12,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        exit={{
          opacity: 0,
          x: 25,
          y: -12,
        }}
        transition={{
          duration: 0.55,
          ease: "easeOut",
        }}
        className="absolute left-[10%] top-[25%] z-50 max-w-[185px]"
      >
        <motion.p
          className="text-[9px] font-black uppercase tracking-[0.22em] text-white/70"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.15,
          }}
        >
          {scene.category}
        </motion.p>

        <h2 className="mt-3 whitespace-pre-line text-3xl font-black leading-[0.94] tracking-[-1.5px] text-white sm:text-4xl">
          {scene.title}
        </h2>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   PRODUCT LIST
========================================================= */

function ProductList({
  scene,
}: {
  scene: (typeof heroScenes)[number];
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`list-${scene.id}`}
        initial={{
          opacity: 0,
          x: 45,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: -35,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="absolute right-[7%] top-[17%] z-40 hidden w-[35%] max-w-[220px] md:block"
      >
        <div className="mb-8">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
            My
          </p>

          <h3 className="mt-1 text-2xl font-medium leading-none tracking-[-1px] text-zinc-900">
            DealDone
          </h3>
        </div>

        <div className="mb-4 flex items-center justify-between border-b border-zinc-900/10 pb-2">
          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-zinc-400">
            Product
          </span>

          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-zinc-400">
            +
          </span>
        </div>

        <div className="space-y-3">
          {scene.items.map((item, index) => (
            <motion.div
              key={`${scene.id}-${item.name}`}
              initial={{
                opacity: 0,
                x: 22,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.15 + index * 0.1,
                duration: 0.4,
              }}
              className="flex items-center gap-2 border-b border-zinc-900/10 pb-3"
            >
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-medium text-zinc-700">
                  {item.name}
                </p>

                <p className="mt-1 text-[8px] text-zinc-400">
                  {item.price}
                </p>
              </div>

              <span className="text-sm text-zinc-400">
                +
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   MAIN HERO
========================================================= */

export default function Hero() {
  const [activeScene, setActiveScene] = useState(0);
  const [search, setSearch] = useState("");

  const [readyImages, setReadyImages] = useState<
    Record<number, string>
  >({});

  const scene = heroScenes[activeScene];

  /* =======================================================
     PRELOAD ALL MAIN PRODUCTS
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function preloadAll() {
      const results: Record<number, string> = {};

      await Promise.all(
        heroScenes.map(async (heroScene) => {
          try {
            const loadedSrc = await loadHeroImage(
              heroScene.cutout
            );

            results[heroScene.id] = loadedSrc;
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

  /* =======================================================
     CHECK ALL IMAGES
  ======================================================= */

  const allHeroImagesReady =
    heroScenes.every(
      (heroScene) =>
        Boolean(readyImages[heroScene.id])
    );

  /* =======================================================
     AUTOMATIC ROTATION
  ======================================================= */

  useEffect(() => {
    if (!allHeroImagesReady) {
      return;
    }

    const timer = setInterval(() => {
      setActiveScene(
        (current) =>
          (current + 1) % heroScenes.length
      );
    }, 4200);

    return () => clearInterval(timer);
  }, [allHeroImagesReady]);

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = () => {
    const value = search.trim();

    if (value) {
      window.location.href =
        `/products?search=${encodeURIComponent(value)}`;
    } else {
      window.location.href = "/products";
    }
  };

  const activeImage = readyImages[scene.id];

  return (
    <section className="relative overflow-hidden bg-white px-3 pb-12 pt-4 text-zinc-950 sm:px-6 sm:pb-16 sm:pt-5 md:px-8 md:pb-24">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

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
        {/* =================================================
            MAIN HERO CARD
        ================================================== */}

        <div className="relative overflow-hidden rounded-[28px] border border-zinc-200 bg-[#f4f4f2] shadow-[0_25px_75px_rgba(0,0,0,0.09)] sm:rounded-[34px] md:min-h-[690px] md:rounded-[42px]">

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div className="relative z-50 flex min-h-[505px] flex-col justify-center px-5 pb-8 pt-10 sm:min-h-[570px] sm:px-10 sm:py-14 md:min-h-[690px] md:w-[53%] md:px-14 md:py-14 lg:px-16">
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="mb-5 sm:mb-6"
            >
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-[9px] font-black uppercase tracking-[0.15em] text-zinc-600 shadow-sm sm:px-4 sm:text-[10px] sm:tracking-[0.18em]">
                <Sparkles
                  size={12}
                  className="shrink-0 text-orange-500 sm:h-[13px] sm:w-[13px]"
                />

                <span>Real marketplace</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="relative z-50 max-w-[650px] text-[43px] font-black leading-[0.92] tracking-[-3px] min-[360px]:text-[47px] min-[400px]:text-[52px] sm:text-[66px] md:text-[72px] lg:text-[80px]"
            >
              FIND
              <br />
              SOMETHING
              <br />

              <span className="relative inline-block text-orange-500">
                <span className="relative z-10">
                  YOU LOVE.
                </span>

                <span className="absolute bottom-0.5 left-0 z-0 h-2.5 w-[95%] bg-orange-200/80 sm:bottom-1 sm:h-3" />
              </span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
              className="mt-5 max-w-[480px] text-sm leading-6 text-zinc-500 sm:mt-7 sm:text-base sm:leading-7 md:text-lg"
            >
              Buy what you need. Sell what you don't.
              Discover real products from people around
              you and make a better deal.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
              }}
              className="mt-6 flex w-full flex-col gap-2.5 min-[400px]:flex-row sm:mt-8 sm:gap-3"
            >
              <Link
                href="/products"
                className="group inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full bg-zinc-950 px-5 py-3.5 text-sm font-black text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl min-[400px]:w-auto sm:px-6 sm:py-4"
              >
                Explore Deals

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 transition-all group-hover:bg-orange-500">
                  <ArrowRight size={15} />
                </span>
              </Link>

              <Link
                href="/sell"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3.5 text-sm font-bold text-zinc-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:text-orange-500 min-[400px]:w-auto sm:px-6 sm:py-4"
              >
                <Tag size={16} />

                Sell Something
              </Link>
            </motion.div>
          </div>

          {/* =================================================
              DESKTOP SHOWCASE
          ================================================== */}

          <div className="absolute inset-y-0 right-0 hidden w-[55%] overflow-hidden border-l border-zinc-200/70 md:block">
            <div className="absolute inset-0 bg-[#f8f8f6]" />

            <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-px bg-zinc-300/30" />

            <OrganicBlob scene={scene} />

            <SceneTitle scene={scene} />

            <AnimatePresence mode="sync">
              <FloatingObjects
                key={`floating-${scene.id}`}
                scene={scene}
              />
            </AnimatePresence>

            {activeImage && (
              <HeroProduct
                scene={scene}
                imageSrc={activeImage}
              />
            )}

            <ProductList scene={scene} />

            {/* SCENE INDICATOR */}

            <motion.div
              className="absolute right-[6%] top-[7%] z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white bg-white shadow-lg"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.span
                key={`dot-${scene.id}`}
                initial={{
                  scale: 0.4,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: scene.color,
                }}
              />
            </motion.div>

            {/* BOTTOM CONTROLS */}

            <div className="absolute bottom-[7%] left-[7%] right-[7%] z-50 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-zinc-500" />
                <span className="h-2 w-2 rounded-full bg-zinc-300" />
                <span className="h-2 w-2 rounded-full bg-zinc-200" />
              </div>

              <div className="flex items-center gap-1 rounded-full border border-white/80 bg-white/80 p-1.5 shadow-sm backdrop-blur-xl">
                {heroScenes.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveScene(index)}
                    aria-label={`Show ${item.category}`}
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width:
                        index === activeScene
                          ? 24
                          : 6,

                      backgroundColor:
                        index === activeScene
                          ? scene.color
                          : "#d4d4d4",
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveScene(
                    (activeScene + 1) %
                      heroScenes.length
                  )
                }
                aria-label="Next showcase"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-xl transition-transform duration-300 hover:scale-105"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          {/* =================================================
              MOBILE SHOWCASE
          ================================================== */}

          <div className="relative block h-[400px] overflow-hidden border-t border-zinc-200/60 min-[360px]:h-[420px] min-[400px]:h-[440px] md:hidden">
            <div className="absolute inset-0 bg-[#f8f8f6]" />

            {/* MOBILE BLOB */}

            <OrganicBlob scene={scene} />

            {/* MOBILE TITLE */}

            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-title-${scene.id}`}
                initial={{
                  opacity: 0,
                  x: -25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: 25,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="absolute left-[8%] top-[12%] z-50 max-w-[150px] sm:top-[16%]"
              >
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/70 sm:text-[9px]">
                  {scene.category}
                </p>

                <h2 className="mt-2 whitespace-pre-line text-[26px] font-black leading-none tracking-[-0.8px] text-white sm:text-3xl">
                  {scene.title}
                </h2>
              </motion.div>
            </AnimatePresence>

            {/* MOBILE MAIN PRODUCT */}

            {activeImage && (
              <HeroProduct
                scene={scene}
                imageSrc={activeImage}
                mobile
              />
            )}

            {/* MOBILE FLOATING IMAGES */}

            <AnimatePresence mode="sync">
              <FloatingObjects
                key={`mobile-floating-${scene.id}`}
                scene={scene}
              />
            </AnimatePresence>

            {/* MOBILE PRODUCT INFO */}

            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-info-${scene.id}`}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 15,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="absolute bottom-4 left-3 right-3 z-50 rounded-2xl border border-white/70 bg-white/90 p-3.5 shadow-lg backdrop-blur-xl min-[360px]:left-5 min-[360px]:right-5 min-[360px]:p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[8px] font-black uppercase tracking-[0.16em] text-zinc-400">
                      {scene.category}
                    </p>

                    <h3 className="mt-1 truncate text-base font-black text-zinc-900 sm:text-lg">
                      {scene.items[0].name}
                    </h3>
                  </div>

                  <p className="shrink-0 text-base font-black text-zinc-900 sm:text-lg">
                    {scene.items[0].price}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* MOBILE SCENE DOTS */}

            <div className="absolute bottom-[27%] left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/80 bg-white/75 px-2.5 py-2 shadow-sm backdrop-blur-xl">
              {heroScenes.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveScene(index)}
                  aria-label={`Show ${item.category}`}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width:
                      index === activeScene
                        ? 20
                        : 6,
                    backgroundColor:
                      index === activeScene
                        ? scene.color
                        : "#d4d4d4",
                  }}
                />
              ))}
            </div>

            {/* MOBILE NEXT BUTTON */}

            <button
              type="button"
              onClick={() =>
                setActiveScene(
                  (activeScene + 1) %
                    heroScenes.length
                )
              }
              aria-label="Next showcase"
              className="absolute bottom-[26%] right-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-xl transition-transform duration-300 active:scale-95 sm:right-6"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* =================================================
            SEARCH
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          className="relative z-50 mx-auto -mt-5 w-full max-w-[1080px] rounded-[22px] border border-zinc-200 bg-white p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.11)] sm:-mt-8 sm:rounded-[25px] sm:p-2"
        >
          <div className="flex flex-col gap-1.5 sm:gap-2 md:flex-row">
            {/* SEARCH INPUT */}

            <div className="flex min-h-[54px] min-w-0 flex-1 items-center gap-3 rounded-[17px] bg-zinc-50 px-4 sm:min-h-[58px] sm:rounded-[18px] sm:px-5">
              <Search
                size={18}
                className="shrink-0 text-zinc-400 sm:h-[19px] sm:w-[19px]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search phones, laptops, bikes..."
                aria-label="Search products"
                className="min-w-0 w-full bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-400"
              />
            </div>

            {/* NEARBY */}

            <button
              type="button"
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-[17px] bg-zinc-50 px-5 text-sm font-bold text-zinc-600 transition hover:bg-orange-50 hover:text-orange-500 sm:min-h-[58px] sm:rounded-[18px] sm:px-6"
            >
              <MapPin
                size={17}
                className="shrink-0 text-orange-500"
              />

              Nearby
            </button>

            {/* SEARCH */}

            <button
              type="button"
              onClick={handleSearch}
              className="flex min-h-[52px] items-center justify-center gap-3 rounded-[17px] bg-orange-500 px-6 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 hover:shadow-xl sm:min-h-[58px] sm:rounded-[18px] sm:px-8"
            >
              Search

              <ArrowRight size={17} />
            </button>
          </div>
        </motion.div>

        {/* =================================================
            FEATURE STRIP
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto mt-7 grid max-w-5xl grid-cols-2 gap-2.5 sm:mt-10 sm:gap-3 md:grid-cols-4"
        >
          {[
            {
              title: "BUY",
              text: "Find what you need",
            },
            {
              title: "SELL",
              text: "List what you don't",
            },
            {
              title: "LOCAL",
              text: "Deals around you",
            },
            {
              title: "DEALDONE",
              text: "Make better deals",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex min-h-[82px] flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-white px-2.5 py-3.5 text-center shadow-sm sm:min-h-0 sm:px-4 sm:py-4"
            >
              <p className="text-[9px] font-black tracking-[0.14em] text-orange-500 sm:text-[10px] sm:tracking-[0.16em]">
                {item.title}
              </p>

              <p className="mt-1 text-[10px] font-medium leading-4 text-zinc-500 sm:text-xs">
                {item.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}