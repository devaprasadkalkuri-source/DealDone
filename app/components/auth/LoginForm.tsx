"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

import {
  sendPhoneOTP,
  verifyPhoneOTP,
} from "@/lib/auth";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();

  const [loginMethod, setLoginMethod] =
    useState<"email" | "phone">("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --------------------------------------------------
  // EMAIL LOGIN
  // --------------------------------------------------

  const handleEmailLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email.trim() || !password) return;

    try {
      setLoading(true);

      const result =
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      await setDoc(
        doc(db, "users", result.user.uid),
        {
          uid: result.user.uid,
          email: result.user.email,
          lastLogin: serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      router.push("/");
    } catch (error: any) {
      console.error("Email login error:", error);

      if (
        error?.code === "auth/invalid-credential"
      ) {
        alert("Invalid email or password.");
      } else if (
        error?.code === "auth/user-not-found"
      ) {
        alert("No account found with this email.");
      } else if (
        error?.code === "auth/wrong-password"
      ) {
        alert("Incorrect password.");
      } else {
        alert(
          error?.message ||
            "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // FORGOT PASSWORD
  // --------------------------------------------------

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      alert("Enter your email address first.");
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(
        auth,
        email.trim()
      );

      alert(
        "Password reset email sent. Check your inbox."
      );
    } catch (error: any) {
      console.error(
        "Password reset error:",
        error
      );

      if (
        error?.code === "auth/invalid-email"
      ) {
        alert("Please enter a valid email address.");
      } else if (
        error?.code === "auth/user-not-found"
      ) {
        alert(
          "No DealDone account was found with this email."
        );
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

  // --------------------------------------------------
  // SEND PHONE OTP
  // --------------------------------------------------

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      alert(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    try {
      setLoading(true);

      await sendPhoneOTP(`+91${phone}`);

      setOtpSent(true);

      alert("OTP sent successfully.");
    } catch (error: any) {
      console.error("OTP error:", error);

      alert(
        error?.message ||
          "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // VERIFY PHONE OTP
  // --------------------------------------------------

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const user = await verifyPhoneOTP(otp);

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          lastLogin: serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      router.push("/");
    } catch (error: any) {
      console.error("OTP verification error:", error);

      alert(
        error?.message ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // SWITCH LOGIN METHOD
  // --------------------------------------------------

  const switchMethod = (
    method: "email" | "phone"
  ) => {
    setLoginMethod(method);
    setOtpSent(false);
    setOtp("");
  };

  return (
    <div className="w-full">
      {/* ------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------ */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="mb-5 flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <span
                  key={index}
                  className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#3b7df6] to-[#b8df4d]"
                  style={{
                    transform: `rotate(${
                      index * 60
                    }deg) translateY(-6px)`,
                  }}
                />
              )
            )}

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
          Sign in to discover nearby deals
          and connect directly.
        </p>
      </motion.div>

      {/* ------------------------------------------------ */}
      {/* LOGIN METHOD */}
      {/* ------------------------------------------------ */}

      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          delay: 0.08,
        }}
        className="mt-6 rounded-xl bg-[#f5f7fa] p-1"
      >
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() =>
              switchMethod("email")
            }
            className={`rounded-lg px-4 py-2.5 text-xs font-bold transition ${
              loginMethod === "email"
                ? "bg-white text-[#3b7df6] shadow-sm"
                : "text-[#8b99aa] hover:text-[#526174]"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Mail size={14} />
              Email
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              switchMethod("phone")
            }
            className={`rounded-lg px-4 py-2.5 text-xs font-bold transition ${
              loginMethod === "phone"
                ? "bg-white text-[#3b7df6] shadow-sm"
                : "text-[#8b99aa] hover:text-[#526174]"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Phone size={14} />
              Phone
            </span>
          </button>
        </div>
      </motion.div>

      {/* ------------------------------------------------ */}
      {/* FORM */}
      {/* ------------------------------------------------ */}

      <AnimatePresence mode="wait">
        {loginMethod === "email" ? (
          <motion.form
            key="email"
            initial={{
              opacity: 0,
              x: 12,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -12,
            }}
            transition={{
              duration: 0.25,
            }}
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
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
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
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-[#e1e8f0] bg-[#fbfcfd] py-3.5 pl-11 pr-11 text-sm text-[#172435] outline-none transition focus:border-[#8db5ff] focus:bg-white focus:ring-4 focus:ring-[#3b7df6]/8"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a6b3c9] transition hover:text-[#3b7df6]"
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}

            <motion.button
              whileHover={{
                y: -1,
              }}
              whileTap={{
                scale: 0.985,
              }}
              type="submit"
              disabled={loading}
              className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#17324d] py-3.5 text-sm font-bold text-white shadow-[0_12px_25px_rgba(23,50,77,0.16)] transition hover:bg-[#10283e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative">
                {loading
                  ? "Signing in..."
                  : "Continue"}
              </span>

              {!loading && (
                <ArrowRight
                  size={16}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="phone"
            initial={{
              opacity: 0,
              x: 12,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -12,
            }}
            transition={{
              duration: 0.25,
            }}
            className="mt-6"
          >
            {!otpSent ? (
              <div className="space-y-4">
                {/* PHONE */}

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold text-[#526174]">
                    Mobile number
                  </label>

                  <div className="flex gap-2">
                    <div className="flex w-[62px] shrink-0 items-center justify-center rounded-xl border border-[#e1e8f0] bg-[#f5f7fa] text-sm font-bold text-[#526174]">
                      +91
                    </div>

                    <div className="relative min-w-0 flex-1">
                      <Phone
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a6b3c9]"
                      />

                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={phone}
                        onChange={(e) =>
                          setPhone(
                            e.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                        placeholder="10-digit number"
                        autoComplete="tel"
                        className="w-full rounded-xl border border-[#e1e8f0] bg-[#fbfcfd] py-3.5 pl-11 pr-4 text-sm text-[#172435] outline-none transition focus:border-[#8db5ff] focus:bg-white focus:ring-4 focus:ring-[#3b7df6]/8"
                      />
                    </div>
                  </div>

                  <p className="mt-2 text-[10px] text-[#a6b3c9]">
                    A one-time verification code
                    will be sent to your phone.
                  </p>
                </div>

                {/* SEND OTP */}

                <motion.button
                  whileHover={{
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  type="button"
                  onClick={handleSendOTP}
                  disabled={
                    loading ||
                    phone.length !== 10
                  }
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#17324d] py-3.5 text-sm font-bold text-white shadow-[0_12px_25px_rgba(23,50,77,0.16)] transition hover:bg-[#10283e] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>
                    {loading
                      ? "Sending..."
                      : "Send verification code"}
                  </span>

                  {!loading && (
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="space-y-4"
              >
                {/* OTP INFO */}

                <div className="rounded-xl bg-[#f4f8ff] p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#3b7df6] shadow-sm">
                      <MessageCircle
                        size={15}
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-[#34465c]">
                        Verification code sent
                      </p>

                      <p className="mt-0.5 text-[10px] text-[#8b99aa]">
                        +91 {phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* OTP */}

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold text-[#526174]">
                    Verification code
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    placeholder="000000"
                    className="w-full rounded-xl border border-[#e1e8f0] bg-[#fbfcfd] px-4 py-3.5 text-center text-xl font-bold tracking-[0.4em] text-[#172435] outline-none transition placeholder:text-[#c4cdd8] focus:border-[#8db5ff] focus:bg-white focus:ring-4 focus:ring-[#3b7df6]/8"
                  />
                </div>

                {/* VERIFY */}

                <motion.button
                  whileHover={{
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={
                    loading ||
                    otp.length !== 6
                  }
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#17324d] py-3.5 text-sm font-bold text-white shadow-[0_12px_25px_rgba(23,50,77,0.16)] transition hover:bg-[#10283e] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShieldCheck size={16} />

                  <span>
                    {loading
                      ? "Verifying..."
                      : "Verify & continue"}
                  </span>

                  {!loading && (
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </motion.button>

                {/* CHANGE NUMBER */}

                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                  className="w-full text-center text-[11px] font-bold text-[#3b7df6] transition hover:text-[#255fca]"
                >
                  ← Use a different number
                </button>
              </motion.div>
            )}

            <div id="recaptcha-container" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------ */}
      {/* FOOTER */}
      {/* ------------------------------------------------ */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.4,
          delay: 0.25,
        }}
        className="mt-6 border-t border-[#edf1f5] pt-5"
      >
        <div className="flex items-center justify-center gap-2 text-[10px] text-[#a6b3c9]">
          <ShieldCheck
            size={12}
            className="text-[#7fa5e8]"
          />

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