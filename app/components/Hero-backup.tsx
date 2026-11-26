"use client";

import { useEffect, useRef, useState } from "react";
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
   INTERACTIVE LIQUID BLUE LINE
========================================================= */

function InteractiveBlueLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const baseY = height * 0.52;
      const mouse = pointerRef.current;

      const drawLine = (
        blur: number,
        alpha: number,
        thickness: number
      ) => {
        ctx.beginPath();

        for (let x = 0; x <= width; x += 3) {
          const distance = x - mouse.x;
          const influence = Math.exp(
            -(distance * distance) / 18000
          );

          const wave =
            Math.sin(x * 0.008 + time) * 7 +
            Math.sin(x * 0.018 - time * 1.5) * 3;

          const ripple =
            influence *
            Math.sin(distance * 0.025) *
            65 *
            Math.exp(-Math.abs(distance) / 180);

          const y = baseY + wave + ripple;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(55, 145, 255, ${alpha})`;
        ctx.lineWidth = thickness;
        ctx.shadowColor = "#168bff";
        ctx.shadowBlur = blur;
        ctx.stroke();
      };

      drawLine(24, 0.12, 8);
      drawLine(14, 0.28, 3);
      drawLine(5, 0.85, 1.2);

      animationFrame = requestAnimationFrame(draw);
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();

      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

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
   