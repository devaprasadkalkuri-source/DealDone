
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Firebase automatically signs in the new user.
      router.push("/");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };

      switch (firebaseError.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please login.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setError("Please choose a stronger password.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;

        default:
          setError("Unable to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");

    try {
      setGoogleLoading(true);

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      await signInWithPopup(auth, provider);

      // Google account is authenticated.
      router.push("/");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };

      if (firebaseError.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled.");
      } else if (
        firebaseError.code === "auth/popup-blocked"
      ) {
        setError("Please allow popups for this website.");
      } else {
        setError("Google sign-up failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
      <h2 className="mb-2 text-3xl font-bold text-gray-900">
        Create Account
      </h2>

      <p className="mb-8 text-gray-500">
        Join DealDone today
      </p>

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-5">
        <div>
          <label
            htmlFor="signup-email"
            className="mb-2 block text-gray-700"
          >
            Email
          </label>

          <input
            id="signup-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border px-4 py-3 text-black outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="mb-2 block text-gray-700"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full rounded-xl border px-4 py-3 pr-20 text-black outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Minimum 6 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-sm text-gray-400">OR</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={loading || googleLoading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
      >
        {googleLoading ? (
          "Connecting to Google..."
        ) : (
          <>
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.59 12.04 17.75 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.27 5.48-4.8 7.18l7.73 6C44.38 37.95 46.98 31.75 46.98 24.55z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.5 14.5 0 0 1 9.75 24c0-1.6.28-3.14.78-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.92-2.14 15.87-5.8l-7.73-6c-2.14 1.44-4.87 2.3-8.14 2.3-6.25 0-11.41-4.23-13.28-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Continue with Google
          </>
        )}
      </button>

      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
