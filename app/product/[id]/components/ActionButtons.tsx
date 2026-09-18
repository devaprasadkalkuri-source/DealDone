"use client";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import {
  Phone,
  MessageCircle,
  Heart,
  Loader2,
  ArrowUpRight,
  Check,
  LogIn,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ActionButtonsProps {
  phone: string;
  productId: string;
}

export default function ActionButtons({
  phone,
  productId,
}: ActionButtonsProps) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checkingSaved, setCheckingSaved] = useState(true);

  // ==========================================
  // CHECK IF PRODUCT IS ALREADY SAVED
  // ==========================================

  useEffect(() => {
    let active = true;

    async function checkSavedProduct() {
      const user = auth.currentUser;

      if (!user) {
        if (active) {
          setSaved(false);
          setCheckingSaved(false);
        }
        return;
      }

      try {
        const savedRef = doc(
          db,
          "users",
          user.uid,
          "savedProducts",
          productId
        );

        const savedSnap = await getDoc(savedRef);

        if (active) {
          setSaved(savedSnap.exists());
        }
      } catch (error) {
        console.error("Error checking saved product:", error);

        if (active) {
          setSaved(false);
        }
      } finally {
        if (active) {
          setCheckingSaved(false);
        }
      }
    }

    checkSavedProduct();

    return () => {
      active = false;
    };
  }, [productId]);

  // ==========================================
  // SAVE / REMOVE PRODUCT
  // ==========================================

  const handleSave = async () => {
    const user = auth.currentUser;

    if (!user) {
      window.location.href = `/auth/login?redirect=/product/${productId}`;
      return;
    }

    try {
      setSaving(true);

      const savedRef = doc(
        db,
        "users",
        user.uid,
        "savedProducts",
        productId
      );

      if (saved) {
        await deleteDoc(savedRef);
        setSaved(false);
      } else {
        await setDoc(savedRef, {
          productId,
          savedAt: new Date(),
        });

        setSaved(true);
      }
    } catch (error) {
      console.error("Save product error:", error);
      alert("Could not update saved product.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // PHONE / WHATSAPP
  // ==========================================

  const cleanPhone = phone?.replace(/\D/g, "") || "";

  const whatsappNumber = cleanPhone.startsWith("91")
    ? cleanPhone
    : `91${cleanPhone}`;

  const hasPhone = cleanPhone.length > 0;

  // ==========================================
  // UI
  // ==========================================

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="space-y-3"
    >
      {/* ======================================
          CONTACT ACTIONS
      ======================================= */}

      <div className="grid gap-3 sm:grid-cols-2">
        {/* CALL SELLER */}
        {hasPhone ? (
          <motion.a
            href={`tel:${phone}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="group relative flex items-center justify-between overflow-hidden rounded-[1.35rem] bg-[#0a3d2e] px-5 py-4 text-white shadow-[0_15px_35px_rgba(10,61,46,0.16)] transition duration-300 hover:bg-[#0d4a38] hover:shadow-[0_20px_40px_rgba(10,61,46,0.20)]"
          >
            <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#d4e84a]/15 blur-2xl transition duration-500 group-hover:bg-[#d4e84a]/25" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d4e84a] text-[#0a3d2e] shadow-sm">
                <Phone className="h-5 w-5" />
              </div>

              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">
                  Contact
                </p>

                <p className="mt-0.5 font-bold">
                  Call Seller
                </p>
              </div>
            </div>

            <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/45 transition duration-300 group-hover:bg-[#d4e84a] group-hover:text-[#0a3d2e]">
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </motion.a>
        ) : (
          <div className="flex items-center gap-3 rounded-[1.35rem] border border-emerald-950/10 bg-white px-5 py-4 text-emerald-950/40">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f2f7dc]">
              <Phone className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]">
                Contact
              </p>

              <p className="mt-0.5 text-sm font-bold">
                Phone unavailable
              </p>
            </div>
          </div>
        )}

        {/* WHATSAPP */}
        {hasPhone ? (
          <motion.a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="group relative flex items-center justify-between overflow-hidden rounded-[1.35rem] border border-emerald-950/10 bg-[#f2f7dc] px-5 py-4 text-[#0a3d2e] transition duration-300 hover:border-[#c9e265] hover:bg-[#eaf3ce] hover:shadow-[0_15px_35px_rgba(10,61,46,0.08)]"
          >
            <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#d4e84a]/25 blur-2xl opacity-70 transition duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0a3d2e] shadow-sm">
                <MessageCircle className="h-5 w-5" />
              </div>

              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-950/35">
                  Message
                </p>

                <p className="mt-0.5 font-bold">
                  WhatsApp
                </p>
              </div>
            </div>

            <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-950/30 shadow-sm transition duration-300 group-hover:bg-[#0a3d2e] group-hover:text-[#d4e84a]">
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </motion.a>
        ) : (
          <div className="flex items-center gap-3 rounded-[1.35rem] border border-emerald-950/10 bg-[#f2f7dc] px-5 py-4 text-emerald-950/40">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <MessageCircle className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]">
                Message
              </p>

              <p className="mt-0.5 text-sm font-bold">
                WhatsApp unavailable
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ======================================
          SAVE PRODUCT
      ======================================= */}

      <motion.button
        type="button"
        onClick={handleSave}
        disabled={saving || checkingSaved}
        whileHover={
          !saving && !checkingSaved
            ? { y: -2 }
            : undefined
        }
        whileTap={
          !saving && !checkingSaved
            ? { scale: 0.995 }
            : undefined
        }
        className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[1.35rem] border px-5 py-4 transition duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${
          saved
            ? "border-[#0a3d2e] bg-[#0a3d2e] text-white shadow-[0_15px_35px_rgba(10,61,46,0.14)]"
            : "border-emerald-950/10 bg-white text-[#0a3d2e] hover:border-[#0a3d2e]/20 hover:shadow-[0_15px_35px_rgba(10,61,46,0.08)]"
        }`}
      >
        {saved && (
          <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#d4e84a]/15 blur-3xl" />
        )}

        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            animate={
              saved && !saving
                ? { scale: [1, 1.08, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.35 }}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
              saved
                ? "bg-[#d4e84a] text-[#0a3d2e]"
                : "bg-[#f2f7dc] text-[#0a3d2e]"
            }`}
          >
            {checkingSaved || saving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Heart
                className={`h-5 w-5 transition ${
                  saved ? "fill-current" : ""
                }`}
              />
            )}
          </motion.div>

          <div className="text-left">
            <p
              className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
                saved
                  ? "text-white/45"
                  : "text-emerald-950/35"
              }`}
            >
              Your list
            </p>

            <p className="mt-0.5 font-bold">
              {checkingSaved
                ? "Checking..."
                : saving
                ? "Updating..."
                : saved
                ? "Saved Product"
                : "Save Product"}
            </p>
          </div>
        </div>

        <div className="relative z-10">
          {checkingSaved || saving ? (
            <span
              className={`text-xs font-semibold ${
                saved
                  ? "text-white/40"
                  : "text-emerald-950/30"
              }`}
            >
              Please wait
            </span>
          ) : saved ? (
            <span className="flex items-center gap-1.5 text-sm font-bold text-[#d4e84a]">
              <Check className="h-4 w-4" />
              Saved
            </span>
          ) : (
            <span className="text-sm font-semibold text-emerald-950/30 transition group-hover:text-[#0a3d2e]">
              Save
            </span>
          )}
        </div>
      </motion.button>

      {/* ======================================
          LOGIN NOTE
      ======================================= */}

      {!auth.currentUser && (
        <Link
          href={`/auth/login?redirect=/product/${productId}`}
          className="group flex items-center justify-center gap-2 rounded-2xl border border-emerald-950/8 bg-[#f7f9ee] px-4 py-3 text-xs font-semibold text-emerald-950/45 transition hover:border-emerald-950/15 hover:bg-[#f2f7dc] hover:text-[#0a3d2e]"
        >
          <LogIn className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Login to save this product
        </Link>
      )}

      {/* ======================================
          INFORMATION NOTE
      ======================================= */}

      <div className="flex items-center justify-center gap-2 pt-1 text-center">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4e84a]" />

        <p className="text-xs font-medium text-emerald-950/40">
          Connect directly and discuss the deal with the seller.
        </p>
      </div>
    </motion.div>
  );
}