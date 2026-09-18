"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  UserRound,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

interface SellerCardProps {
  sellerName: string;
  phone: string;
  location: string;
  sellerId: string;
}

export default function SellerCard({
  sellerName,
  phone,
  location,
  sellerId,
}: SellerCardProps) {
  const displayName = sellerName?.trim() || "DealDone Seller";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 }}
      className="overflow-hidden rounded-[1.7rem] border border-emerald-950/10 bg-white shadow-[0_18px_55px_rgba(10,61,46,0.07)]"
    >
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="relative overflow-hidden bg-[#0a3d2e] px-5 py-5 sm:px-6">
        {/* Decorative glow */}

        <div className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-[#d4e84a]/15 blur-3xl" />

        <div className="relative flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4e84a]/70">
              Connect directly
            </p>

            <h3 className="mt-1 text-2xl font-black tracking-tight text-white">
              Seller
            </h3>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d4e84a] text-[#0a3d2e] shadow-[0_8px_25px_rgba(212,232,74,0.12)]">
            <UserRound className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* ==========================================
          SELLER CONTENT
      ========================================== */}

      <div className="space-y-3 p-5 sm:p-6">
        {/* Seller identity */}

        <div className="flex items-center gap-4 rounded-2xl border border-emerald-950/8 bg-[#f7f9ee] p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0a3d2e] text-[#d4e84a] shadow-sm">
            <UserRound className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-950/35">
              Listed by
            </p>

            <p className="mt-1 truncate text-base font-black text-[#0a3d2e]">
              {displayName}
            </p>
          </div>
        </div>

        {/* Phone */}

        {phone && (
          <motion.a
            href={`tel:${phone}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="group flex items-center gap-4 rounded-2xl border border-emerald-950/8 bg-[#f7f9ee] p-4 transition-all duration-300 hover:border-[#c9e265] hover:bg-[#f2f7dc] hover:shadow-[0_10px_25px_rgba(10,61,46,0.06)]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0a3d2e] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Phone className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-950/35">
                Phone
              </p>

              <p className="mt-1 truncate text-base font-black text-[#0a3d2e]">
                {phone}
              </p>
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-emerald-950/35 shadow-sm transition-all duration-300 group-hover:bg-[#0a3d2e] group-hover:text-[#d4e84a]">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </motion.a>
        )}

        {/* Location */}

        {location && (
          <div className="flex items-center gap-4 rounded-2xl border border-emerald-950/8 bg-[#f7f9ee] p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0a3d2e] shadow-sm">
              <MapPin className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-950/35">
                Location
              </p>

              <p className="mt-1 line-clamp-2 break-words text-base font-black leading-snug text-[#0a3d2e]">
                {location}
              </p>
            </div>
          </div>
        )}

        {/* ==========================================
            SELLER PROFILE
        ========================================== */}

        {sellerId && (
          <Link
            href={`/seller/${sellerId}`}
            className="group relative mt-4 flex w-full items-center justify-between overflow-hidden rounded-2xl bg-[#0a3d2e] px-4 py-4 text-white shadow-[0_10px_30px_rgba(10,61,46,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(10,61,46,0.18)] sm:px-5"
          >
            {/* Animated glow */}

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="pointer-events-none absolute -right-8 -top-12 h-32 w-32 rounded-full bg-[#d4e84a]/20 blur-3xl"
            />

            <div className="relative z-10 flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d4e84a] text-[#0a3d2e]">
                <UserRound className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/40">
                  Seller profile
                </p>

                <p className="mt-0.5 truncate text-sm font-black text-white">
                  View {displayName}&apos;s profile
                </p>
              </div>
            </div>

            <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 transition-all duration-300 group-hover:bg-[#d4e84a] group-hover:text-[#0a3d2e]">
              <ExternalLink
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </Link>
        )}
      </div>

      {/* ==========================================
          FOOTER MESSAGE
      ========================================== */}

      <div className="mx-5 mb-5 rounded-2xl border border-emerald-950/5 bg-[#f2f7dc] px-4 py-3.5 sm:mx-6 sm:mb-6">
        <p className="text-sm font-medium leading-6 text-emerald-950/60">
          Contact the seller directly to ask questions, discuss the item, and
          arrange your deal.
        </p>
      </div>
    </motion.div>
  );
}