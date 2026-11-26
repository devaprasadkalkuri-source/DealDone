"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Search,
  Heart,
  Menu,
  X,
  ArrowUpRight,
  UserRound,
  LogOut,
  Settings,
  Home,
  PackageSearch,
  Plus,
} from "lucide-react";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/#categories" },
  { label: "Deals", href: "/#featured-deals" },
  { label: "Explore", href: "/products" },
];

type ProfileData = {
  name?: string;
  email?: string;
  photoURL?: string;
  phoneNumber?: string;
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      unsubscribeProfile?.();
      unsubscribeProfile = null;

      if (!currentUser) {
        setProfile(null);
        return;
      }

      unsubscribeProfile = onSnapshot(
        doc(db, "users", currentUser.uid),
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
        }
      );
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProfile?.();
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const search = searchQuery.trim();

    if (!search) {
      router.push("/products");
      closeMenus();
      return;
    }

    router.push(`/products?search=${encodeURIComponent(search)}`);
    closeMenus();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMenus();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Could not log out. Please try again.");
    }
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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Shared profile avatar for desktop and mobile menus.
  const avatar = (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0a3d2e]">
      {profilePhoto ? (
        <img
          src={profilePhoto}
          alt={displayName}
          className="h-full w-full origin-top scale-[2] object-cover"
        />
      ) : (
        <span className="text-sm font-black text-[#f2f7dc]">
          {firstLetter}
        </span>
      )}
    </div>
  );

  return (
    <>
      {/* ================= DESKTOP + MOBILE HEADER ================= */}

      <nav className="relative z-50 mx-auto w-full max-w-7xl px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8">
        <div className="rounded-[20px] border border-emerald-950/10 bg-white/95 shadow-[0_12px_40px_rgba(10,61,46,0.07)] backdrop-blur-xl sm:rounded-[26px]">

          <div className="flex min-h-[62px] items-center gap-2 px-3 py-2 sm:min-h-[76px] sm:gap-4 sm:px-6">

            {/* LOGO + BRAND NAME */}

            <Link
              href="/"
              onClick={closeMenus}
              aria-label="DealDone Home"
              className="group flex shrink-0 items-center gap-2 sm:gap-3"
            >
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center sm:h-11 sm:w-11">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:rotate-90">
                  {[0, 60, 120, 180, 240, 300].map((rotation) => (
                    <span
                      key={rotation}
                      className="absolute left-1/2 top-1/2 h-4 w-2.5 rounded-full bg-[#d4e84a]"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-8px)`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#0a3d2e] sm:h-8 sm:w-8">
                  <span className="text-xs font-black text-[#f2f7dc]">
                    D
                  </span>
                </div>
              </div>

              {/* Brand name visible on mobile */}

              <div className="block min-w-0">
                <h1 className="whitespace-nowrap text-[15px] font-black tracking-tight text-[#0a3d2e] sm:text-xl">
                  Deal<span className="text-emerald-700">Done</span>
                </h1>

                <p className="hidden text-[9px] font-semibold tracking-[0.18em] text-emerald-950/40 sm:block">
                  LOCAL MARKETPLACE
                </p>
              </div>
            </Link>

            {/* DESKTOP LINKS */}

            <div className="hidden flex-1 items-center justify-center gap-6 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative whitespace-nowrap py-2 text-sm font-medium transition ${
                    isActive(item.href)
                      ? "font-bold text-[#0a3d2e]"
                      : "text-emerald-950/55 hover:text-[#0a3d2e]"
                  }`}
                >
                  {item.label}

                  {isActive(item.href) && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#d4e84a]" />
                  )}
                </Link>
              ))}
            </div>

            {/* DESKTOP SEARCH */}

            <form
              onSubmit={handleSearch}
              className="hidden w-[190px] shrink-0 items-center rounded-full border border-emerald-950/10 bg-emerald-950/[0.035] px-3 xl:flex 2xl:w-[220px]"
            >
              <Search
                size={16}
                className="shrink-0 text-emerald-950/35"
              />

              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="min-w-0 w-full bg-transparent px-2 py-2.5 text-sm text-[#0a3d2e] outline-none placeholder:text-emerald-950/35"
              />
            </form>

            {/* RIGHT ACTIONS */}

            <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">

              {/* DESKTOP SAVED */}

              <Link
                href="/saved"
                title="Saved Products"
                className="hidden h-10 w-10 items-center justify-center rounded-xl border border-emerald-950/10 text-emerald-950/60 transition hover:bg-[#d4e84a]/20 md:flex"
              >
                <Heart size={18} />
              </Link>

              {/* DESKTOP PROFILE */}

              {user ? (
                <div className="relative hidden md:block">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((value) => !value)}
                    aria-expanded={profileOpen}
                    className="flex items-center gap-2 rounded-xl border border-emerald-950/10 bg-white p-1.5 transition hover:bg-emerald-50"
                  >
                    {avatar}

                    <div className="hidden max-w-[100px] text-left xl:block">
                      <p className="truncate text-[11px] font-black text-[#0a3d2e]">
                        {displayName}
                      </p>
                      <p className="text-[9px] text-emerald-950/40">
                        My Profile
                      </p>
                    </div>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-[calc(100%+10px)] w-[270px] overflow-hidden rounded-2xl border border-emerald-950/10 bg-white shadow-xl">
                      <div className="flex items-center gap-3 bg-[#f4f8df] p-4">
                        {avatar}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-black text-[#0a3d2e]">
                            {displayName}
                          </p>
                          <p className="truncate text-xs text-emerald-950/45">
                            {displayEmail}
                          </p>
                        </div>
                      </div>

                      <div className="p-2">
                        <Link
                          href="/profile"
                          onClick={closeMenus}
                          className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-[#0a3d2e] hover:bg-emerald-50"
                        >
                          <UserRound size={17} />
                          My Profile
                        </Link>

                        <Link
                          href="/profile/edit"
                          onClick={closeMenus}
                          className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-[#0a3d2e] hover:bg-emerald-50"
                        >
                          <Settings size={17} />
                          Account Settings
                        </Link>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          <LogOut size={17} />
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="hidden rounded-xl border border-emerald-950/10 px-4 py-2.5 text-sm font-semibold text-[#0a3d2e] hover:bg-emerald-50 md:block"
                >
                  Login
                </Link>
              )}

              {/* SELL BUTTON */}

              <Link
                href="/sell"
                className="flex h-10 items-center gap-1.5 rounded-xl bg-[#0a3d2e] px-3 text-xs font-bold text-[#f2f7dc] transition hover:bg-emerald-900 sm:px-4 sm:text-sm"
              >
                <Plus size={16} />

                <span className="hidden min-[380px]:inline">
                  Sell Now
                </span>

                <span className="min-[380px]:hidden">
                  Sell
                </span>
              </Link>

              {/* MOBILE MENU */}

              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => {
                  setMenuOpen((value) => !value);
                  setProfileOpen(false);
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-950/10 text-[#0a3d2e] lg:hidden"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}

          {menuOpen && (
            <div className="border-t border-emerald-950/10 px-3 pb-4 pt-3 lg:hidden">

              <form
                onSubmit={handleSearch}
                className="mb-3 flex min-h-12 items-center rounded-xl border border-emerald-950/10 bg-emerald-950/[0.025] px-3"
              >
                <Search
                  size={17}
                  className="shrink-0 text-emerald-950/40"
                />

                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="min-w-0 w-full bg-transparent px-3 py-3 text-sm outline-none"
                />
              </form>

              {user && (
                <Link
                  href="/profile"
                  onClick={closeMenus}
                  className="mb-3 flex items-center gap-3 rounded-xl bg-[#f4f8df] p-3"
                >
                  {avatar}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#0a3d2e]">
                      {displayName}
                    </p>
                    <p className="text-xs text-emerald-950/45">
                      My Profile
                    </p>
                  </div>

                  <ArrowUpRight size={16} className="ml-auto" />
                </Link>
              )}

              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenus}
                  className="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold text-emerald-950/65 hover:bg-emerald-50"
                >
                  {item.label}
                  <ArrowUpRight size={16} />
                </Link>
              ))}

              <Link
                href="/saved"
                onClick={closeMenus}
                className="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold text-emerald-950/65 hover:bg-emerald-50"
              >
                Saved Products
                <Heart size={16} />
              </Link>

              {user ? (
                <>
                  <Link
                    href="/profile/edit"
                    onClick={closeMenus}
                    className="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold text-emerald-950/65 hover:bg-emerald-50"
                  >
                    Account Settings
                    <Settings size={16} />
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex min-h-12 w-full items-center justify-between rounded-xl px-4 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Log out
                    <LogOut size={16} />
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={closeMenus}
                  className="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold text-emerald-950/65 hover:bg-emerald-50"
                >
                  Login
                  <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAVIGATION ================= */}

      <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-[max(10px,env(safe-area-inset-bottom))] lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 rounded-[22px] border border-emerald-950/10 bg-white/95 p-2 shadow-[0_-8px_35px_rgba(10,61,46,0.10)] backdrop-blur-2xl">

          {/* HOME */}

          <Link
            href="/"
            className={`flex min-h-[55px] flex-col items-center justify-center gap-1 rounded-2xl transition ${
              isActive("/")
                ? "bg-[#f2f7dc] text-[#0a3d2e]"
                : "text-emerald-950/45"
            }`}
          >
            <Home
              size={20}
              strokeWidth={isActive("/") ? 2.5 : 1.8}
            />

            <span className="text-[10px] font-semibold">
              Home
            </span>
          </Link>

          {/* EXPLORE */}

          <Link
            href="/products"
            className={`flex min-h-[55px] flex-col items-center justify-center gap-1 rounded-2xl transition ${
              isActive("/products")
                ? "bg-[#f2f7dc] text-[#0a3d2e]"
                : "text-emerald-950/45"
            }`}
          >
            <PackageSearch
              size={20}
              strokeWidth={isActive("/products") ? 2.5 : 1.8}
            />

            <span className="text-[10px] font-semibold">
              Explore
            </span>
          </Link>

          {/* SAVED */}

          <Link
            href="/saved"
            className={`flex min-h-[55px] flex-col items-center justify-center gap-1 rounded-2xl transition ${
              isActive("/saved")
                ? "bg-[#f2f7dc] text-[#0a3d2e]"
                : "text-emerald-950/45"
            }`}
          >
            <Heart
              size={20}
              strokeWidth={isActive("/saved") ? 2.5 : 1.8}
            />

            <span className="text-[10px] font-semibold">
              Saved
            </span>
          </Link>

          {/* PROFILE */}

          <Link
            href={user ? "/profile" : "/auth/login"}
            className={`flex min-h-[55px] flex-col items-center justify-center gap-1 rounded-2xl transition ${
              isActive("/profile") || isActive("/auth")
                ? "bg-[#f2f7dc] text-[#0a3d2e]"
                : "text-emerald-950/45"
            }`}
          >
            {/* Perfect circular profile image */}

            {user && profilePhoto ? (
              <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full border border-emerald-950/10 bg-[#0a3d2e]">
                <img
                  src={profilePhoto}
                  alt={displayName}
                  className="block h-full w-full origin-top scale-[2] rounded-full object-cover"
                />
              </div>
            ) : (
              <UserRound size={20} strokeWidth={1.8} />
            )}

            <span className="text-[10px] font-semibold">
              {user ? "Profile" : "Login"}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}