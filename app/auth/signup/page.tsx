"use client";

import { motion } from "framer-motion";
import SignupHero from "../../components/auth/SignupHero";
import SignupForm from "../../components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fafbfc]">
      {/* =========================================
          SIGNUP ANIMATION BACKGROUND
      ========================================= */}

      <div className="absolute inset-0 z-0">
        <SignupHero />
      </div>

      {/* =========================================
          SOFT READABILITY OVERLAY
      ========================================= */}

      <div className="pointer-events-none absolute inset-0 z-10 bg-white/[0.05]" />

      {/* =========================================
          SIGNUP CARD
      ========================================= */}

      <section className="relative z-20 flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:justify-end lg:px-12 xl:px-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.75,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full max-w-[430px]"
        >
          <div className="rounded-[2rem] border border-white/90 bg-white/[0.96] p-6 shadow-[0_35px_100px_rgba(31,55,82,0.16)] backdrop-blur-2xl sm:p-8">
            <SignupForm />
          </div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.9,
              duration: 0.6,
            }}
            className="mt-4 text-center"
          >
            <span className="text-[11px] font-medium text-[#9aa8b8]">
              Simple. Direct. Local.
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* =========================================
          MOBILE BRAND
      ========================================= */}

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
          duration: 0.7,
          delay: 0.5,
        }}
        className="absolute left-6 top-6 z-30 flex items-center gap-2 lg:hidden"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-[0_10px_30px_rgba(59,125,246,0.12)]">
          <div className="h-2.5 w-2.5 rounded-full bg-[#3b7df6] shadow-[0_0_12px_rgba(59,125,246,0.5)]" />
        </div>

        <span className="text-sm font-black tracking-tight text-[#27384e]">
          DEAL
          <span className="text-[#3b7df6]">
            DONE
          </span>
        </span>
      </motion.div>

      {/* =========================================
          EDGE GLOWS
      ========================================= */}

      <div className="pointer-events-none absolute -right-40 top-1/2 z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#3b7df6]/5 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 left-1/4 z-10 h-[400px] w-[400px] rounded-full bg-[#b8df4d]/5 blur-[120px]" />
    </main>
  );
}