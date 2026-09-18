import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";

import { auth } from "./firebase";

// Google Authentication
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// Email/Password Registration
export const registerUser = (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

// Email/Password Login
export const loginUser = (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

// Logout
export const logoutUser = () => {
  return signOut(auth);
};

// --------------------------------------------------
// PHONE OTP AUTHENTICATION
// --------------------------------------------------

let confirmationResult: ConfirmationResult | null = null;

// Create invisible reCAPTCHA
export const setupRecaptcha = () => {
  if (typeof window === "undefined") return null;

  const container = document.getElementById("recaptcha-container");

  if (!container) {
    throw new Error("reCAPTCHA container not found.");
  }

  // Prevent creating multiple reCAPTCHA instances
  if ((window as any).recaptchaVerifier) {
    return (window as any).recaptchaVerifier;
  }

  const verifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "invisible",
    }
  );

  (window as any).recaptchaVerifier = verifier;

  return verifier;
};

// Send OTP
export const sendPhoneOTP = async (
  phoneNumber: string
) => {
  const verifier = setupRecaptcha();

  if (!verifier) {
    throw new Error("Unable to initialize reCAPTCHA.");
  }

  confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    verifier
  );

  return confirmationResult;
};

// Verify OTP
export const verifyPhoneOTP = async (
  otp: string
) => {
  if (!confirmationResult) {
    throw new Error(
      "No OTP request found. Please request a new OTP."
    );
  }

  const result = await confirmationResult.confirm(otp);

  return result.user;
};