"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Heart,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type ProfileData = {
  name?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  location?: string;
  bio?: string;
  photoURL?: string;
  createdAt?: any;
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] =
    useState<ProfileData | null>(null);

  const [listingCount, setListingCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;
    let unsubscribeListings: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }

        if (unsubscribeListings) {
          unsubscribeListings();
          unsubscribeListings = null;
        }

        if (!currentUser) {
          setUser(null);
          setProfile(null);
          setListingCount(0);
          setLoading(false);

          router.replace("/auth/login");

          return;
        }

        setUser(currentUser);

        /*
         * ================================================
         * LOAD USER PROFILE
         * ================================================
         */

        const userRef = doc(
          db,
          "users",
          currentUser.uid
        );

        unsubscribeProfile = onSnapshot(
          userRef,
          (snapshot) => {
            if (snapshot.exists()) {
              setProfile(
                snapshot.data() as ProfileData
              );
            } else {
              setProfile({
                name:
                  currentUser.displayName || "",

                email:
                  currentUser.email || "",

                phoneNumber:
                  currentUser.phoneNumber || "",

                photoURL:
                  currentUser.photoURL || "",
              });
            }

            setLoading(false);
          },
          (error) => {
            console.error(
              "Profile loading error:",
              error
            );

            setProfile({
              name:
                currentUser.displayName || "",

              email:
                currentUser.email || "",

              phoneNumber:
                currentUser.phoneNumber || "",

              photoURL:
                currentUser.photoURL || "",
            });

            setLoading(false);
          }
        );

        /*
         * ================================================
         * REAL MY LISTINGS COUNT
         * ================================================
         *
         * Counts products where sellerId matches
         * the currently logged-in user's UID.
         */

        const listingsQuery = query(
          collection(db, "products"),
          where(
            "sellerId",
            "==",
            currentUser.uid
          )
        );

        unsubscribeListings = onSnapshot(
          listingsQuery,
          (snapshot) => {
            setListingCount(
              snapshot.size
            );
          },
          (error) => {
            console.error(
              "Listings count error:",
              error
            );

            setListingCount(0);
          }
        );
      }
    );

    return () => {
      unsubscribeAuth();

      if (unsubscribeProfile) {
        unsubscribeProfile();
      }

      if (unsubscribeListings) {
        unsubscribeListings();
      }
    };
  }, [router]);

  /*
   * ================================================
   * LOGOUT
   * ================================================
   */

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await signOut(auth);

      router.replace("/");
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );

      alert(
        "Could not log out. Please try again."
      );

      setLoggingOut(false);
    }
  };

  /*
   * ================================================
   * LOADING STATE
   * ================================================
   */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6f8f3] text-[#0a3d2e]">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">

          <div className="mb-8 h-6 w-24 animate-pulse rounded-full bg-emerald-950/10" />

          <div className="overflow-hidden rounded-[32px] border border-emerald-950/10 bg-white shadow-[0_20px_70px_rgba(10,61,46,0.08)]">

            <div className="h-40 animate-pulse bg-emerald-950/10" />

            <div className="px-6 pb-8 sm:px-10">

              <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                <div className="flex items-end gap-4">

                  <div className="h-24 w-24 animate-pulse rounded-[28px] bg-white shadow-lg" />

                  <div className="pb-1">

                    <div className="h-5 w-40 animate-pulse rounded bg-emerald-950/10" />

                    <div className="mt-2 h-3 w-28 animate-pulse rounded bg-emerald-950/10" />

                  </div>

                </div>

              </div>

            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">

            <div className="h-80 animate-pulse rounded-[28px] bg-white" />

            <div className="h-80 animate-pulse rounded-[28px] bg-white" />

          </div>

        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  /*
   * ================================================
   * DISPLAY DATA
   * ================================================
   */

  const displayName =
    profile?.name?.trim() ||
    user.displayName?.trim() ||
    "DealDone User";

  const email =
    profile?.email ||
    user.email ||
    "";

  const phone =
    profile?.phone ||
    profile?.phoneNumber ||
    user.phoneNumber ||
    "";

  const location =
    profile?.location?.trim() ||
    "Location not added";

  const bio =
    profile?.bio?.trim() ||
    "Tell people a little about yourself.";

  const photoURL =
    profile?.photoURL ||
    user.photoURL ||
    "";

  const firstLetter =
    displayName.charAt(0).toUpperCase() ||
    "D";

  return (
    <main className="min-h-screen bg-[#f6f8f3] text-[#0a3d2e]">

      {/* ================================================= */}
      {/* PAGE */}
      {/* ================================================= */}

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">

        {/* ================================================= */}
        {/* TOP BAR */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          className="mb-6 flex items-center justify-between"
        >

          <Link
            href="/"
            className="group flex items-center gap-2 rounded-xl border border-emerald-950/10 bg-white px-3.5 py-2.5 text-xs font-bold text-emerald-950/60 shadow-sm transition hover:-translate-x-0.5 hover:text-[#0a3d2e]"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-0.5"
            />

            Back to DealDone
          </Link>

          <div className="hidden items-center gap-2 sm:flex">

            <div className="h-2 w-2 rounded-full bg-[#d4e84a]" />

            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-950/35">
              My Account
            </span>

          </div>

        </motion.div>

        {/* ================================================= */}
        {/* PROFILE HERO */}
        {/* ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
          }}
          className="relative overflow-hidden rounded-[32px] border border-emerald-950/10 bg-white shadow-[0_20px_70px_rgba(10,61,46,0.08)]"
        >

          {/* GREEN BACKGROUND */}

          <div className="relative h-36 overflow-hidden bg-[#0a3d2e] sm:h-44">

            <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#d4e84a]/20 blur-2xl" />

            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="absolute inset-0 opacity-[0.08]">

              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />

            </div>

            <div className="absolute bottom-5 left-6 sm:left-10">

              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-white/70 backdrop-blur">
                DealDone Member
              </span>

            </div>

          </div>

          {/* PROFILE CONTENT */}

          <div className="px-6 pb-8 sm:px-10">

            <div className="-mt-12 flex flex-col gap-6 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

              {/* USER */}

              <div className="flex items-end gap-4">

                {/* AVATAR */}

                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[28px] border-[5px] border-white bg-[#0a3d2e] shadow-[0_15px_35px_rgba(10,61,46,0.18)] sm:h-28 sm:w-28">

                  {photoURL ? (
                    <img
                      src={photoURL}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#0a3d2e]">
                      <span className="text-3xl font-black text-[#f2f7dc]">
                        {firstLetter}
                      </span>
                    </div>
                  )}

                </div>

                {/* NAME */}

                <div className="min-w-0 pb-2">

                  <div className="flex flex-wrap items-center gap-2">

                    <h1 className="text-2xl font-black tracking-[-0.04em] text-[#0a3d2e] sm:text-3xl">
                      {displayName}
                    </h1>

                    <span className="inline-flex items-center gap-1 rounded-full bg-[#d4e84a]/25 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-[#496100]">

                      <ShieldCheck size={11} />

                      Member

                    </span>

                  </div>

                  <p className="mt-1 text-xs text-emerald-950/40">
                    {email || phone || "DealDone account"}
                  </p>

                </div>

              </div>

              {/* EDIT */}

              <Link
                href="/profile/edit"
                className="group flex items-center justify-center gap-2 rounded-xl bg-[#0a3d2e] px-5 py-3 text-sm font-bold text-[#f2f7dc] shadow-[0_12px_30px_rgba(10,61,46,0.16)] transition hover:-translate-y-0.5 hover:bg-emerald-900"
              >

                <Pencil size={15} />

                Edit Profile

                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />

              </Link>

            </div>

          </div>

        </motion.section>

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_330px]">

          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div className="space-y-6">

            {/* ABOUT */}

            <motion.section
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.08,
              }}
              className="rounded-[28px] border border-emerald-950/10 bg-white p-6 shadow-[0_15px_50px_rgba(10,61,46,0.05)] sm:p-7"
            >

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700/60">
                    About
                  </p>

                  <h2 className="mt-1 text-xl font-black tracking-tight text-[#0a3d2e]">
                    About me
                  </h2>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4e84a]/20 text-[#496100]">
                  <UserRound size={18} />
                </div>

              </div>

              <p className="max-w-2xl text-sm leading-7 text-emerald-950/55">
                {bio}
              </p>

            </motion.section>

            {/* CONTACT INFORMATION */}

            <motion.section
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.14,
              }}
              className="rounded-[28px] border border-emerald-950/10 bg-white p-6 shadow-[0_15px_50px_rgba(10,61,46,0.05)] sm:p-7"
            >

              <div className="mb-6">

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700/60">
                  Your information
                </p>

                <h2 className="mt-1 text-xl font-black tracking-tight text-[#0a3d2e]">
                  Contact details
                </h2>

              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                {/* EMAIL */}

                <div className="rounded-2xl border border-emerald-950/10 bg-[#f8faf6] p-4">

                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#0a3d2e] shadow-sm">
                    <Mail size={16} />
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-950/35">
                    Email
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-[#0a3d2e]">
                    {email || "Not available"}
                  </p>

                </div>

                {/* PHONE */}

                <div className="rounded-2xl border border-emerald-950/10 bg-[#f8faf6] p-4">

                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#0a3d2e] shadow-sm">
                    <Phone size={16} />
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-950/35">
                    Phone
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-[#0a3d2e]">
                    {phone || "Not added"}
                  </p>

                </div>

                {/* LOCATION */}

                <div className="rounded-2xl border border-emerald-950/10 bg-[#f8faf6] p-4 sm:col-span-2">

                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#0a3d2e] shadow-sm">
                    <MapPin size={16} />
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-950/35">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#0a3d2e]">
                    {location}
                  </p>

                </div>

              </div>

            </motion.section>

          </div>

          {/* ================================================= */}
          {/* RIGHT */}
          {/* ================================================= */}

          <div className="space-y-6">

            {/* QUICK ACTIONS */}

            <motion.section
              initial={{
                opacity: 0,
                x: 15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
              className="rounded-[28px] border border-emerald-950/10 bg-white p-5 shadow-[0_15px_50px_rgba(10,61,46,0.05)]"
            >

              <p className="px-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700/60">
                Your DealDone
              </p>

              <h2 className="px-1 pt-1 text-lg font-black text-[#0a3d2e]">
                Quick access
              </h2>

              <div className="mt-4 space-y-2">

                {/* MY LISTINGS */}

                <Link
                  href="/my-listings"
                  className="group flex items-center gap-3 rounded-2xl border border-emerald-950/10 bg-[#f8faf6] p-3.5 transition hover:-translate-y-0.5 hover:border-emerald-700/15 hover:bg-[#d4e84a]/10"
                >

                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0a3d2e] shadow-sm">

                    <Package size={18} />

                    {/* COUNT DOT */}

                    {listingCount > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex min-w-[19px] items-center justify-center rounded-full bg-[#d4e84a] px-1 py-0.5 text-[9px] font-black text-[#0a3d2e] shadow-sm">
                        {listingCount > 99
                          ? "99+"
                          : listingCount}
                      </span>
                    )}

                  </div>

                  <div className="flex-1">

                    <div className="flex items-center gap-2">

                      <p className="text-xs font-black text-[#0a3d2e]">
                        My Listings
                      </p>

                      <span className="rounded-full bg-emerald-950/[0.06] px-1.5 py-0.5 text-[9px] font-black text-emerald-950/45">
                        {listingCount}
                      </span>

                    </div>

                    <p className="mt-0.5 text-[10px] text-emerald-950/40">
                      {listingCount === 0
                        ? "No products listed yet"
                        : listingCount === 1
                        ? "1 product you've listed"
                        : `${listingCount} products you've listed`}
                    </p>

                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-emerald-950/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />

                </Link>

                {/* SAVED */}

                <Link
                  href="/saved"
                  className="group flex items-center gap-3 rounded-2xl border border-emerald-950/10 bg-[#f8faf6] p-3.5 transition hover:-translate-y-0.5 hover:border-emerald-700/15 hover:bg-[#d4e84a]/10"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0a3d2e] shadow-sm">
                    <Heart size={18} />
                  </div>

                  <div className="flex-1">

                    <p className="text-xs font-black text-[#0a3d2e]">
                      Saved Products
                    </p>

                    <p className="mt-0.5 text-[10px] text-emerald-950/40">
                      Deals you've saved
                    </p>

                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-emerald-950/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />

                </Link>

                {/* SELL */}

                <Link
                  href="/sell"
                  className="group flex items-center gap-3 rounded-2xl border border-[#d4e84a]/30 bg-[#f4f8df] p-3.5 transition hover:-translate-y-0.5 hover:bg-[#d4e84a]/20"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a3d2e] text-[#f2f7dc] shadow-sm">
                    <ArrowUpRight size={18} />
                  </div>

                  <div className="flex-1">

                    <p className="text-xs font-black text-[#0a3d2e]">
                      Sell Something
                    </p>

                    <p className="mt-0.5 text-[10px] text-emerald-950/45">
                      Create a new listing
                    </p>

                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-emerald-950/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />

                </Link>

              </div>

            </motion.section>

            {/* ACCOUNT STATUS */}

            <motion.section
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.18,
              }}
              className="rounded-[28px] border border-emerald-950/10 bg-[#0a3d2e] p-6 text-white shadow-[0_20px_50px_rgba(10,61,46,0.14)]"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d4e84a]/75">
                    Account
                  </p>

                  <h2 className="mt-2 text-xl font-black tracking-tight">
                    Your profile
                  </h2>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#d4e84a]">
                  <ShieldCheck size={18} />
                </div>

              </div>

              <p className="mt-4 text-xs leading-6 text-white/55">
                Keep your DealDone information up to date so your marketplace experience stays simple.
              </p>

              <Link
                href="/profile/edit"
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#d4e84a] px-4 py-3 text-xs font-black text-[#0a3d2e] transition hover:-translate-y-0.5 hover:bg-[#e1ef70]"
              >

                Update information

                <ArrowUpRight size={15} />

              </Link>

            </motion.section>

            {/* LOGOUT */}

            <motion.button
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.4,
                delay: 0.22,
              }}
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-4 py-3.5 text-xs font-bold text-red-500 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <LogOut size={15} />

              {loggingOut
                ? "Logging out..."
                : "Log out"}

            </motion.button>

          </div>

        </div>

        {/* ================================================= */}
        {/* BOTTOM NOTE */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.25,
          }}
          className="mt-8 flex items-center justify-center gap-2 text-center"
        >

          <MessageCircle
            size={13}
            className="text-emerald-700/35"
          />

          <p className="text-[10px] text-emerald-950/35">
            Your DealDone profile helps you connect with other marketplace users.
          </p>

        </motion.div>

      </div>
    </main>
  );
}