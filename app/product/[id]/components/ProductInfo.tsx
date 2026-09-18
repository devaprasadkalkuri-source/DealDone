"use client";

import {
  MapPin,
  ShieldCheck,
  Tag,
  Sparkles,
  CircleCheck,
} from "lucide-react";
import { motion } from "framer-motion";

interface ProductInfoProps {
  name: string;
  price: number;
  category: string;
  condition: string;
  location: string;
  description: string;
}

export default function ProductInfo({
  name,
  price,
  category,
  condition,
  location,
  description,
}: ProductInfoProps) {
  return (
    <div className="space-y-7">
      {/* ==========================================
          CATEGORY + CONDITION
      ========================================== */}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex flex-wrap items-center gap-2.5"
      >
        {category && (
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#0a3d2e]/10 bg-[#f2f7dc] px-4 py-2 text-xs font-bold text-[#0a3d2e] shadow-sm">
            <Tag className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{category}</span>
          </div>
        )}

        {condition && (
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#d4e84a]/50 bg-[#d4e84a]/25 px-4 py-2 text-xs font-bold text-[#0a3d2e] shadow-sm">
            <CircleCheck className="h-3.5 w-3.5 shrink-0" />
            <span>{condition}</span>
          </div>
        )}
      </motion.div>

      {/* ==========================================
          PRODUCT NAME
      ========================================== */}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-950/35">
          DealDone Listing
        </p>

        <h1 className="max-w-3xl text-[2.45rem] font-black leading-[0.98] tracking-[-0.045em] text-[#0a3d2e] sm:text-5xl lg:text-[3.55rem]">
          {name}
        </h1>
      </motion.div>

      {/* ==========================================
          PRICE
      ========================================== */}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative overflow-hidden rounded-[1.6rem] border border-emerald-950/10 bg-[#f2f7dc] p-5 sm:p-6"
      >
        {/* Decorative glow */}

        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#d4e84a]/30 blur-2xl" />

        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-950/35">
            Asking price
          </p>

          <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-4xl font-black tracking-[-0.04em] text-[#0a3d2e] sm:text-5xl">
              ₹{Number(price || 0).toLocaleString("en-IN")}
            </span>

            <span className="pb-1 text-xs font-semibold text-emerald-950/40">
              negotiable with seller
            </span>
          </div>
        </div>
      </motion.div>

      {/* ==========================================
          QUICK INFORMATION
      ========================================== */}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="grid gap-3 sm:grid-cols-2"
      >
        {/* Condition */}

        <div className="group rounded-[1.35rem] border border-emerald-950/10 bg-white p-5 shadow-[0_12px_35px_rgba(10,61,46,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(10,61,46,0.09)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.17em] text-emerald-950/35">
                Condition
              </p>

              <p className="mt-2 text-lg font-black text-[#0a3d2e]">
                {condition || "Not specified"}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f2f7dc] text-[#0a3d2e] transition-transform duration-300 group-hover:scale-105">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-emerald-950/5">
            <div className="h-full w-2/3 rounded-full bg-[#d4e84a]" />
          </div>
        </div>

        {/* Location */}

        <div className="group rounded-[1.35rem] border border-emerald-950/10 bg-white p-5 shadow-[0_12px_35px_rgba(10,61,46,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(10,61,46,0.09)]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.17em] text-emerald-950/35">
                Location
              </p>

              <p className="mt-2 line-clamp-2 text-lg font-black leading-snug text-[#0a3d2e]">
                {location || "Location not specified"}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f4df] text-[#0a3d2e] transition-transform duration-300 group-hover:scale-105">
              <MapPin className="h-5 w-5" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==========================================
          DESCRIPTION
      ========================================== */}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="overflow-hidden rounded-[1.6rem] border border-emerald-950/10 bg-white shadow-[0_12px_35px_rgba(10,61,46,0.05)]"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-emerald-950/8 px-5 py-5 sm:px-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-950/35">
              Product details
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight text-[#0a3d2e]">
              About this item
            </h2>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f2f7dc] text-[#0a3d2e]">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>

        {/* Description body */}

        <div className="px-5 py-6 sm:px-6">
          {description ? (
            <p className="whitespace-pre-line text-[15px] leading-7 text-emerald-950/65">
              {description}
            </p>
          ) : (
            <p className="text-sm italic text-emerald-950/35">
              The seller hasn&apos;t added a description for this listing.
            </p>
          )}
        </div>
      </motion.div>

      {/* ==========================================
          DEALDONE MESSAGE
      ========================================== */}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="relative overflow-hidden rounded-[1.5rem] border border-[#0a3d2e] bg-[#0a3d2e] p-5 text-white sm:p-6"
      >
        {/* Background glow */}

        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#d4e84a]/15 blur-3xl" />

        <div className="relative flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d4e84a] text-[#0a3d2e]">
            <MapPin className="h-5 w-5" />
          </div>

          <div>
            <p className="text-base font-black">
              Meet locally. Make the deal.
            </p>

            <p className="mt-1.5 text-sm leading-6 text-white/55">
              Review the listing, check the details, and contact the seller
              directly when you&apos;re ready.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}