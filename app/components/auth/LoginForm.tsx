
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // EMAIL LOGIN
  const handleEmailLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      return;
    }

    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      router.push("/");
    } catch (error: any) {
      console.error("Email login error:", error);

      if (error?.code === "auth/invalid-credential") {
        alert("Invalid email or password.");
      } else if (error?.code === "auth/user-not-found") {
        alert("No account found with this email.");
      } else if (error?.code === "auth/wrong-password") {
        alert("Incorrect password.");
      } else {
        alert(
          error?.message || "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE SIGN-IN
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      router.push("/");
    } catch (error: any) {
      console.error("Google login error:", error);

      if (error?.code === "auth/popup-closed-by-user") {
        return;
      }

      if (error?.code === "auth/popup-blocked") {
        alert("Please allow popups for DealDone.");
      } else {
        alert(
          error?.message ||
            "Google sign-in failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // FORGOT PASSWORD
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      alert("Enter your email address first.");
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(auth, email.trim());

      alert("Password reset email sent. Check your inbox.");
    } catch (error: any) {
      console.error("Password reset error:", error);

      if (error?.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else {
        alert(
          error?.message ||
            "Could not send password reset email."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-5 flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <span
                key={index}
                className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#3b7df6] to-[#b8df4d]"
                style={{
                  transform: `rotate(${index * 60}deg) translateY(-6px)`,
                }}
              />
            ))}

            <span className="h-1.5 w-1.5 rounded-full bg-[#3b7df6]" />
          </div>

          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#718096]">
            DealDone
          </span>
        </div>

        <h1 className="text-[2rem] font-black tracking-[-0.055em] text-[#172435] sm:text-[2.15rem]">
          Welcome back.
        </h1>

        <p className="mt-2 max-w-[330px] text-sm leading-6 text-[#8997a9]">
          Sign in to discover nearby deals and connect directly.
        </p>
      </motion.div>

      {/* EMAIL LOGIN FORM */}
      <motion.form
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        onSubmit={handleEmailLogin}
        className="mt-6 space-y-4"
      >
        {/* EMAIL */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold text-[#526174]">
            Email address
          </label>

          <div className="relative">
            <Mail
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a6b3c9]"
            />

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-xl border border-[#e1e8f0] bg-[#fbfcfd] py-3.5 pl-11 pr-4 text-sm text-[#172435] outline-none transition focus:border-[#8db5ff] focus:bg-white focus:ring-4 focus:ring-[#3b7df6]/8"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-[11px] font-bold text-[#526174]">
              Password
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={loading}
              className="text-[11px] font-bold text-[#3b7df6] transition hover:text-[#255fca] disabled:opacity-50"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <LockKeyhole
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a6b3c9]"
            />

            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-[#e1e8f0] bg-[#fbfcfd] py-3.5 pl-11 pr-11 text-sm text-[#172435] outline-none transition focus:border-[#8db5ff] focus:bg-white focus:ring-4 focus:ring-[#3b7df6]/8"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a6b3c9] transition hover:text-[#3b7df6]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* CONTINUE BUTTON */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.985 }}
          type="submit"
          disabled={loading}
          className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#17324d] py-3.5 text-sm font-bold text-white shadow-[0_12px_25px_rgba(23,50,77,0.16)] transition hover:bg-[#10283e] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <span className="relative">
            {loading ? "Signing in..." : "Continue"}
          </span>

          {!loading && (
            <ArrowRight
              size={16}
              className="relative transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </motion.button>
      </motion.form>

      {/* DIVIDER */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#e1e8f0]" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs text-[#8997a9]">
            or continue with
          </span>
        </div>
      </div>

      {/* GOOGLE SIGN-IN */}
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.985 }}
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#e1e8f0] bg-white py-3.5 text-sm font-bold text-[#34465c] transition hover:bg-[#f8fafc] disabled:opacity-50"
      >
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path
            fill="#4285F4"
            d="M43.6 20.5H42V20H24v8h11.3A12 12 0 1 1 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7A19.9 19.9 0 0 0 24 4a20 20 0 1 0 20 20c0-1.2-.1-2.3-.4-3.5Z"
          />
          <path
            fill="#34A853"
            d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7A19.9 19.9 0 0 0 24 4C16.3 4 9.7 8.4 6.3 14.7Z"
          />
          <path
            fill="#FBBC05"
            d="M24 44c5.4 0 10.2-2.1 13.6-5.7l-6.3-5.3A12 12 0 0 1 12.9 29l-6.6 5A20 20 0 0 0 24 44Z"
          />
          <path
            fill="#EA4335"
            d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5l6.3 5.3A20 20 0 0 0 44 24c0-1.2-.1-2.3-.4-3.5Z"
          />
        </svg>

        Continue with Google
      </motion.button>

      {/* FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="mt-6 border-t border-[#edf1f5] pt-5"
      >
        <div className="flex items-center justify-center gap-2 text-[10px] text-[#a6b3c9]">
          <ShieldCheck size={12} className="text-[#7fa5e8]" />
          Secure sign-in
        </div>

        <p className="mt-3 text-center text-xs text-[#8997a9]">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-bold text-[#3b7df6] transition hover:text-[#255fca]"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
