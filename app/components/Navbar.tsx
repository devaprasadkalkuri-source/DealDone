"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  Bell,
  MapPin,
  Menu,
  X,
  ArrowUpRight,
  UserRound,
  LogOut,
  Settings,
} from "lucide-react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/#categories" },
  { label: "Deals", href: "/#featured-deals" },
  { label: "Sell", href: "/sell" },
];

type ProfileData = {
  name?: string;
  email?: string;
  photoURL?: string;
  phoneNumber?: string;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      if (!currentUser) {
        setProfile(null);
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);

      unsubscribeProfile = onSnapshot(
        userRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setProfile(snapshot.data() as ProfileData);
          } else {
            setProfile({
              name: currentUser.displayName || "",
              email: currentUser.email || "",
              photoURL: currentUser.photoURL || "",
              phoneNumber: currentUser.phoneNumber || "",
            });
          }
        },
        (error) => {
          console.error("Profile listener error:", error);

          setProfile({
            name: currentUser.displayName || "",
            email: currentUser.email || "",
            photoURL: currentUser.photoURL || "",
            phoneNumber: currentUser.phoneNumber || "",
          });
        }
      );
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      setProfileOpen(false);
      setMenuOpen(false);

      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      alert("Could not log out. Please try again.");
    }
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const displayName =
    profile?.name?.trim() ||
    user?.displayName?.trim() ||
    "DealDone User";

  const displayEmail =
    profile?.email ||
    user?.email ||
    profile?.phoneNumber ||
    user?.phoneNumber ||
    "";

  const firstLetter = displayName.charAt(0).toUpperCase() || "D";

  const profilePhoto = profile?.photoURL || user?.photoURL || "";

  return (
    <nav className="relative z-50 mx-auto w-full max-w-7xl px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8">
      <div className="rounded-[22px] border border-emerald-950/10 bg-white/90 shadow-[0_15px_50px_rgba(10,61,46,0.09)] backdrop-blur-2xl sm:rounded-[26px]">

        {/* ===================================================== */}
        {/* MAIN NAVBAR */}
        {/* ===================================================== */}

        <div className="flex min-h-[68px] items-center gap-2 px-3 py-2.5 sm:min-h-[76px] sm:gap-4 sm:px-6 sm:py-3">

          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <Link
            href="/"
            aria-label="DealDone Home"
            className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
            onClick={closeMenus}
          >
            {/* Flower mark */}
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center sm:h-11 sm:w-11">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:rotate-90">
                {[0, 60, 120, 180, 240, 300].map((rotation) => (
                  <span
                    key={rotation}
                    className="absolute left-1/2 top-1/2 h-4.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4e84a] sm:h-5"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-8px)`,
                    }}
                  />
                ))}
              </div>

              <div className="relative flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#0a3d2e] shadow-[0_8px_25px_rgba(10,61,46,0.18)] sm:h-8 sm:w-8">
                <span className="text-xs font-black text-[#f2f7dc] sm:text-sm">
                  D
                </span>
              </div>
            </div>

            {/* Brand text */}
            <div className="hidden min-w-0 sm:block">
              <h1 className="text-xl font-black tracking-tight text-[#0a3d2e]">
                Deal<span className="text-emerald-700">Done</span>
              </h1>

              <p className="whitespace-nowrap text-[9px] font-semibold tracking-[0.18em] text-emerald-950/40">
                LOCAL MARKETPLACE
              </p>
            </div>
          </Link>

          {/* ================================================= */}
          {/* DESKTOP NAVIGATION */}
          {/* ================================================= */}

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-6 lg:flex xl:gap-7">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative whitespace-nowrap py-2 text-sm transition ${
                  index === 0
                    ? "font-bold text-[#0a3d2e]"
                    : "font-medium text-emerald-950/55 hover:text-[#0a3d2e]"
                }`}
              >
                {item.label}

                {index === 0 && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#d4e84a]" />
                )}

                {index !== 0 && (
                  <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-[#d4e84a] transition-all duration-300 group-hover:w-5" />
                )}
              </Link>
            ))}
          </div>

          {/* ================================================= */}
          {/* DESKTOP SEARCH */}
          {/* ================================================= */}

          <div className="hidden w-[200px] shrink-0 items-center rounded-full border border-emerald-950/10 bg-emerald-950/[0.035] px-4 transition-all duration-300 focus-within:border-emerald-700/30 focus-within:bg-white focus-within:shadow-[0_8px_25px_rgba(10,61,46,0.07)] xl:flex 2xl:w-[220px]">
            <Search
              size={17}
              className="shrink-0 text-emerald-950/35"
            />

            <input
              type="text"
              placeholder="Search deals..."
              aria-label="Search deals"
              className="min-w-0 w-full bg-transparent px-3 py-2.5 text-sm text-[#0a3d2e] outline-none placeholder:text-emerald-950/35"
            />
          </div>

          {/* ================================================= */}
          {/* ACTIONS */}
          {/* ================================================= */}

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">

            {/* LOCATION */}

            <button
              type="button"
              title="Location"
              aria-label="Location"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-emerald-950/10 bg-emerald-950/[0.025] text-emerald-950/60 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-700/20 hover:bg-[#d4e84a]/20 hover:text-[#0a3d2e] md:flex"
            >
              <MapPin size={18} />
            </button>

            {/* SAVED */}

            <Link
              href="/saved"
              title="Saved Products"
              aria-label="Saved Products"
              onClick={() => setProfileOpen(false)}
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-emerald-950/10 bg-emerald-950/[0.025] text-emerald-950/60 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-700/20 hover:bg-[#d4e84a]/20 hover:text-[#0a3d2e] md:flex"
            >
              <Heart size={18} />
            </Link>

            {/* NOTIFICATIONS */}

            <button
              type="button"
              title="Notifications"
              aria-label="Notifications"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-emerald-950/10 bg-emerald-950/[0.025] text-emerald-950/60 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-700/20 hover:bg-[#d4e84a]/20 hover:text-[#0a3d2e] md:flex"
            >
              <Bell size={18} />
            </button>

            {/* ================================================= */}
            {/* USER / LOGIN */}
            {/* ================================================= */}

            {user ? (
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setProfileOpen((value) => !value)}
                  className={`group flex items-center gap-2 rounded-xl border px-2 py-1.5 transition duration-300 ${
                    profileOpen
                      ? "border-emerald-700/25 bg-emerald-50"
                      : "border-emerald-950/10 bg-white hover:-translate-y-0.5 hover:border-emerald-700/20 hover:bg-emerald-50"
                  }`}
                  aria-expanded={profileOpen}
                  aria-label="Open profile menu"
                >
                  {/* AVATAR */}

                  <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#0a3d2e]">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt={displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-black text-[#f2f7dc]">
                        {firstLetter}
                      </span>
                    )}
                  </div>

                  {/* NAME */}

                  <div className="hidden max-w-[105px] min-w-0 text-left xl:block">
                    <p className="truncate text-[11px] font-black text-[#0a3d2e]">
                      {displayName}
                    </p>

                    <p className="truncate text-[9px] text-emerald-950/40">
                      My Profile
                    </p>
                  </div>

                  <ArrowUpRight
                    size={14}
                    className={`shrink-0 text-emerald-950/35 transition-transform duration-300 ${
                      profileOpen
                        ? "-translate-y-0.5 translate-x-0.5"
                        : ""
                    }`}
                  />
                </button>

                {/* ================================================= */}
                {/* PROFILE DROPDOWN */}
                {/* ================================================= */}

                {profileOpen && (
                  <div className="absolute right-0 top-[calc(100%+10px)] w-[min(280px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-emerald-950/10 bg-white shadow-[0_25px_70px_rgba(10,61,46,0.16)]">
                    {/* PROFILE HEADER */}

                    <div className="border-b border-emerald-950/10 bg-[#f4f8df] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0a3d2e] shadow-sm">
                          {profilePhoto ? (
                            <img
                              src={profilePhoto}
                              alt={displayName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-base font-black text-[#f2f7dc]">
                              {firstLetter}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-black text-[#0a3d2e]">
                            {displayName}
                          </p>

                          <p className="mt-0.5 truncate text-[10px] text-emerald-950/45">
                            {displayEmail}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* MENU */}

                    <div className="p-2">
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="group flex min-h-[58px] items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-[#d4e84a]/15"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-950/[0.045] text-[#0a3d2e] transition group-hover:bg-[#d4e84a]/30">
                          <UserRound size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#0a3d2e]">
                            My Profile
                          </p>

                          <p className="mt-0.5 truncate text-[10px] text-emerald-950/40">
                            View and edit your information
                          </p>
                        </div>

                        <ArrowUpRight
                          size={15}
                          className="shrink-0 text-emerald-950/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>

                      <Link
                        href="/profile/edit"
                        onClick={() => setProfileOpen(false)}
                        className="group flex min-h-[58px] items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-[#d4e84a]/15"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-950/[0.045] text-[#0a3d2e] transition group-hover:bg-[#d4e84a]/30">
                          <Settings size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#0a3d2e]">
                            Account Settings
                          </p>

                          <p className="mt-0.5 truncate text-[10px] text-emerald-950/40">
                            Manage your account
                          </p>
                        </div>

                        <ArrowUpRight
                          size={15}
                          className="shrink-0 text-emerald-950/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>

                      <div className="my-1 border-t border-emerald-950/10" />

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="group flex min-h-[58px] w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-red-50"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 transition group-hover:bg-red-100">
                          <LogOut size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-red-600">
                            Log out
                          </p>

                          <p className="mt-0.5 truncate text-[10px] text-red-400">
                            Sign out of DealDone
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden rounded-xl border border-emerald-950/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#0a3d2e] transition duration-300 hover:-translate-y-0.5 hover:border-emerald-700/20 hover:bg-emerald-50 md:block"
              >
                Login
              </Link>
            )}

            {/* ================================================= */}
            {/* SELL */}
            {/* ================================================= */}

            <Link
              href="/sell"
              className="group flex h-10 shrink-0 items-center gap-1 rounded-xl bg-[#0a3d2e] px-3 text-xs font-bold text-[#f2f7dc] shadow-[0_8px_25px_rgba(10,61,46,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-900 sm:h-auto sm:gap-1.5 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              <span className="hidden min-[380px]:inline">
                Sell Now
              </span>

              <span className="min-[380px]:hidden">
                Sell
              </span>

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-4 sm:w-4"
              />
            </Link>

            {/* ================================================= */}
            {/* MOBILE MENU BUTTON */}
            {/* ================================================= */}

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen((value) => !value);
                setProfileOpen(false);
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-950/10 bg-emerald-950/[0.025] text-[#0a3d2e] transition duration-300 hover:bg-[#d4e84a]/20 active:scale-95 lg:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ===================================================== */}
        {/* MOBILE MENU */}
        {/* ===================================================== */}

        {menuOpen && (
          <div className="border-t border-emerald-950/10 px-3 pb-4 pt-3 sm:px-4 sm:pb-5 sm:pt-4 lg:hidden">

            {/* MOBILE SEARCH */}

            <div className="mb-3 flex min-h-[48px] items-center rounded-2xl border border-emerald-950/10 bg-emerald-950/[0.025] px-3.5 sm:mb-4 sm:px-4">
              <Search
                size={17}
                className="shrink-0 text-emerald-950/35"
              />

              <input
                type="text"
                placeholder="Search deals..."
                aria-label="Search deals"
                className="min-w-0 w-full bg-transparent px-3 py-3 text-sm text-[#0a3d2e] outline-none placeholder:text-emerald-950/35"
              />
            </div>

            {/* MOBILE PROFILE */}

            {user && (
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="mb-3 flex min-h-[64px] items-center gap-3 rounded-2xl border border-emerald-950/10 bg-[#f4f8df] p-3 transition active:scale-[0.99]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0a3d2e] shadow-sm">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-base font-black text-[#f2f7dc]">
                      {firstLetter}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[#0a3d2e]">
                    {displayName}
                  </p>

                  <p className="mt-0.5 truncate text-[10px] text-emerald-950/45">
                    View my profile
                  </p>
                </div>

                <ArrowUpRight
                  size={17}
                  className="shrink-0 text-emerald-950/40"
                />
              </Link>
            )}

            {/* MOBILE NAV LINKS */}

            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[48px] items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-emerald-950/65 transition hover:bg-[#d4e84a]/15 hover:text-[#0a3d2e] active:scale-[0.99]"
                >
                  <span>{item.label}</span>

                  <ArrowUpRight size={16} className="shrink-0" />
                </Link>
              ))}

              {/* SAVED */}

              <Link
                href="/saved"
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[48px] items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-emerald-950/65 transition hover:bg-[#d4e84a]/15 hover:text-[#0a3d2e] active:scale-[0.99]"
              >
                <span>Saved Products</span>

                <Heart size={16} className="shrink-0" />
              </Link>

              {/* PROFILE / LOGIN */}

              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[48px] items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-emerald-950/65 transition hover:bg-[#d4e84a]/15 hover:text-[#0a3d2e] active:scale-[0.99]"
                  >
                    <span>My Profile</span>

                    <UserRound size={16} className="shrink-0" />
                  </Link>

                  <Link
                    href="/profile/edit"
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[48px] items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-emerald-950/65 transition hover:bg-[#d4e84a]/15 hover:text-[#0a3d2e] active:scale-[0.99]"
                  >
                    <span>Account Settings</span>

                    <Settings size={16} className="shrink-0" />
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex min-h-[48px] w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50 active:scale-[0.99]"
                  >
                    <span>Log out</span>

                    <LogOut size={16} className="shrink-0" />
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[48px] items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-emerald-950/65 transition hover:bg-[#d4e84a]/15 hover:text-[#0a3d2e] active:scale-[0.99]"
                >
                  <span>Login</span>

                  <ArrowUpRight size={16} className="shrink-0" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}