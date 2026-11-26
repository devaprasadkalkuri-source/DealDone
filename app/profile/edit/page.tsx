"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  Check,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type FormData = {
  name: string;
  phone: string;
  location: string;
  bio: string;
  photoURL: string;
};

/**
 * Crops any image to a centered square, fills transparent areas with white,
 * limits the size to 600x600 and returns a JPEG file.
 */
async function cropToSquare(file: File, maxSize = 600): Promise<File> {
  const bitmap = await createImageBitmap(file, {
    imageOrientation: "from-image",
  });

  const side = Math.min(bitmap.width, bitmap.height);
  const sx = (bitmap.width - side) / 2;
  const sy = (bitmap.height - side) / 2;
  const outSize = Math.min(side, maxSize);

  const canvas = document.createElement("canvas");
  canvas.width = outSize;
  canvas.height = outSize;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not process the image.");
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, outSize, outSize);
  ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, outSize, outSize);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.9)
  );

  if (!blob) throw new Error("Could not process the image.");

  const baseName = file.name.replace(/\.[^.]+$/, "") || "profile";
  return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
}

const inputCls =
  "w-full rounded-2xl border border-emerald-950/10 bg-[#f8faf6] py-3.5 pl-11 pr-4 text-sm font-semibold text-[#0a3d2e] outline-none transition placeholder:text-emerald-950/25 focus:border-[#0a3d2e]/25 focus:bg-white focus:ring-4 focus:ring-[#d4e84a]/15";
const iconCls =
  "absolute left-4 top-1/2 -translate-y-1/2 text-emerald-950/30";

export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [processingPhoto, setProcessingPhoto] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    location: "",
    bio: "",
    photoURL: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load authenticated user and profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace("/auth/login");
        return;
      }

      setUser(currentUser);

      try {
        const snapshot = await getDoc(doc(db, "users", currentUser.uid));

        if (snapshot.exists()) {
          const data = snapshot.data();
          setForm({
            name: data.name || currentUser.displayName || "",
            phone: data.phone || data.phoneNumber || currentUser.phoneNumber || "",
            location: data.location || "",
            bio: data.bio || "",
            photoURL: data.photoURL || currentUser.photoURL || "",
          });
        } else {
          setForm({
            name: currentUser.displayName || "",
            phone: currentUser.phoneNumber || "",
            location: "",
            bio: "",
            photoURL: currentUser.photoURL || "",
          });
        }
      } catch (err) {
        console.error("Profile loading error:", err);
        setError("We couldn't load your profile. Please try again.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Temporary preview URL for the selected (already cropped) photo
  useEffect(() => {
    if (!selectedPhoto) {
      setPhotoPreview("");
      return;
    }

    const preview = URL.createObjectURL(selectedPhoto);
    setPhotoPreview(preview);

    return () => URL.revokeObjectURL(preview);
  }, [selectedPhoto]);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setError("");
    setSuccess("");
  };

  // Choose photo, then crop it to a centered square automatically
  const handlePhotoSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target;
    const file = input.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      input.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Please select an image smaller than 10 MB.");
      input.value = "";
      return;
    }

    try {
      setProcessingPhoto(true);
      setError("");
      setSuccess("");

      const squareFile = await cropToSquare(file);
      setSelectedPhoto(squareFile);
    } catch (err) {
      console.error("Photo processing error:", err);
      setError(
        "We couldn't read that image. Please try a JPG, PNG or WEBP photo."
      );
    } finally {
      setProcessingPhoto(false);
      input.value = "";
    }
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
    setForm((previous) => ({ ...previous, photoURL: "" }));

    if (fileInputRef.current) fileInputRef.current.value = "";

    setError("");
    setSuccess("");
  };

  // Upload selected photo to Cloudinary
  const uploadPhoto = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error(
        "Cloudinary is not configured. Please check your .env.local file."
      );
    }

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", uploadPreset);
    uploadData.append("folder", "dealdone/profiles");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadData }
    );

    const result = await response.json();

    if (!response.ok || !result.secure_url) {
      console.error("Cloudinary upload error:", result);
      throw new Error(
        result.error?.message || "Photo upload failed. Please try again."
      );
    }

    return result.secure_url as string;
  };

  // Save profile
  const handleSave = async () => {
    if (!user) return;

    const name = form.name.trim();
    const phone = form.phone.trim();
    const location = form.location.trim();
    const bio = form.bio.trim();

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (name.length < 2) {
      setError("Your name should contain at least 2 characters.");
      return;
    }

    if (phone && phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (bio.length > 250) {
      setError("Your bio should be 250 characters or less.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      let photoURL = form.photoURL.trim();

      if (selectedPhoto) {
        photoURL = await uploadPhoto(selectedPhoto);
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name,
          email: user.email || "",
          phone,
          phoneNumber: user.phoneNumber || "",
          location,
          bio,
          photoURL,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      setForm((previous) => ({ ...previous, photoURL }));
      setSelectedPhoto(null);
      setSuccess("Your profile has been updated successfully.");

      setTimeout(() => {
        router.push("/profile");
      }, 900);
    } catch (err) {
      console.error("Profile save error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't save your profile. Please try again."
      );
      setSaving(false);
    }
  };

  const firstLetter = form.name.trim().charAt(0).toUpperCase() || "D";
  const displayedPhoto = photoPreview || form.photoURL;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6f8f3] text-[#0a3d2e]">
        <div className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <div className="mb-7 h-10 w-32 animate-pulse rounded-xl bg-emerald-950/10" />
          <div className="overflow-hidden rounded-[32px] border border-emerald-950/10 bg-white shadow-[0_20px_70px_rgba(10,61,46,0.07)]">
            <div className="h-44 animate-pulse bg-emerald-950/10 sm:h-52" />
            <div className="p-6 sm:p-10">
              <div className="h-8 w-52 animate-pulse rounded-lg bg-emerald-950/10" />
              <div className="mt-3 h-4 w-72 animate-pulse rounded bg-emerald-950/10" />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse rounded-2xl bg-emerald-950/5"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#f6f8f3] text-[#0a3d2e]">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#d4e84a]/10 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-lime-200/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* TOP BAR */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <Link
            href="/profile"
            className="group flex items-center gap-2 rounded-xl border border-emerald-950/10 bg-white px-4 py-2.5 text-xs font-bold text-emerald-950/55 shadow-sm transition hover:text-[#0a3d2e]"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Profile
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#d4e84a]" />
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-950/35">
              Account Settings
            </span>
          </div>
        </motion.div>

        {/* MAIN CARD */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-[28px] border border-emerald-950/10 bg-white shadow-[0_25px_80px_rgba(10,61,46,0.08)] sm:rounded-[32px]"
        >
          {/* HERO */}
          <div className="relative overflow-hidden bg-[#0a3d2e] px-6 py-8 sm:px-10 sm:py-10">
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#d4e84a]/20 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />

            <div className="absolute inset-0 opacity-[0.07]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "34px 34px",
                }}
              />
            </div>

            <div className="relative">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d4e84a] text-[#0a3d2e]">
                  <Pencil size={17} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4e84a]">
                  DealDone Profile
                </span>
              </div>

              <h1 className="mt-5 max-w-xl text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                Make your profile
                <span className="text-[#d4e84a]"> yours.</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
                Keep your information fresh so buyers and sellers can connect
                with you easily.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="p-5 sm:p-10">
            {/* PROFILE PHOTO */}
            <div className="mb-9 flex flex-col gap-5 rounded-[26px] border border-emerald-950/10 bg-[#f8faf6] p-5 sm:flex-row sm:items-center sm:p-6">
              {/* AVATAR */}
              <div className="relative h-24 w-24 shrink-0">
                <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-[28px] border-4 border-white bg-white shadow-[0_12px_30px_rgba(10,61,46,0.15)]">
                  {processingPhoto ? (
                    <div className="flex h-full w-full items-center justify-center bg-[#0a3d2e]">
                      <Loader2 size={24} className="animate-spin text-[#d4e84a]" />
                    </div>
                  ) : displayedPhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={displayedPhoto}
                      alt="Profile preview"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#0a3d2e]">
                      <span className="text-3xl font-black text-[#f2f7dc]">
                        {firstLetter}
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-white bg-[#d4e84a] text-[#0a3d2e] shadow-sm">
                  <Camera size={13} />
                </div>
              </div>

              {/* PHOTO PICKER */}
              <div className="flex-1">
                <p className="text-sm font-black">Profile photo</p>

                <p className="mt-1 text-xs leading-5 text-emerald-950/45">
                  Choose any picture. It is automatically cropped to a square
                  from the center. JPG, PNG, WEBP.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={processingPhoto || saving}
                    className="flex items-center gap-2 rounded-xl bg-[#0a3d2e] px-4 py-3 text-xs font-black text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Camera size={15} />
                    {selectedPhoto ? "Choose another photo" : "Choose Photo"}
                  </button>

                  {(selectedPhoto || form.photoURL) && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      disabled={processingPhoto || saving}
                      className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-xs font-bold text-red-500 transition hover:bg-red-50 disabled:opacity-60"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  )}
                </div>

                {selectedPhoto && (
                  <p className="mt-2 break-all text-[10px] font-medium text-emerald-700">
                    Ready to upload: {selectedPhoto.name}
                  </p>
                )}
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-xs font-medium text-red-600"
              >
                <X size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* SUCCESS */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-xs font-bold text-emerald-700"
              >
                <Check size={16} className="mt-0.5 shrink-0" />
                <span>{success}</span>
              </motion.div>
            )}

            {/* BASIC INFORMATION */}
            <div className="mb-8">
              <div className="mb-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700/60">
                  Personal
                </p>
                <h2 className="mt-1 text-xl font-black tracking-tight">
                  Basic information
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* NAME */}
                <div>
                  <label className="mb-2 block text-xs font-black">Full name</label>
                  <div className="relative">
                    <UserRound size={17} className={iconCls} />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Your full name"
                      maxLength={60}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-xs font-black">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail size={17} className={iconCls} />
                    <input
                      type="email"
                      value={user.email || ""}
                      readOnly
                      className="w-full cursor-not-allowed rounded-2xl border border-emerald-950/10 bg-emerald-950/[0.035] py-3.5 pl-11 pr-4 text-sm font-semibold text-emerald-950/45 outline-none"
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-emerald-950/35">
                    Your account email can&apos;t be edited here.
                  </p>
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-2 block text-xs font-black">
                    Phone number
                  </label>
                  <div className="relative">
                    <Phone size={17} className={iconCls} />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 9876543210"
                      maxLength={15}
                      className={inputCls}
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-emerald-950/35">
                    This is your DealDone contact number.
                  </p>
                </div>

                {/* LOCATION */}
                <div>
                  <label className="mb-2 block text-xs font-black">Location</label>
                  <div className="relative">
                    <MapPin size={17} className={iconCls} />
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="Hyderabad, Telangana"
                      maxLength={100}
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ABOUT */}
            <div className="border-t border-emerald-950/10 pt-8">
              <div className="mb-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700/60">
                  About you
                </p>
                <h2 className="mt-1 text-xl font-black tracking-tight">
                  Tell people about yourself
                </h2>
              </div>

              <div className="relative">
                <textarea
                  value={form.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  placeholder="Example: I love finding great deals on electronics and furniture..."
                  maxLength={250}
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-emerald-950/10 bg-[#f8faf6] px-4 py-4 text-sm font-medium leading-6 text-[#0a3d2e] outline-none transition placeholder:text-emerald-950/25 focus:border-[#0a3d2e]/25 focus:bg-white focus:ring-4 focus:ring-[#d4e84a]/15"
                />
                <div className="pointer-events-none absolute bottom-3 right-3 rounded-lg bg-white/80 px-2 py-1 text-[9px] font-bold text-emerald-950/35 backdrop-blur">
                  {form.bio.length}/250
                </div>
              </div>
            </div>

            {/* PREVIEW */}
            <div className="mt-8 overflow-hidden rounded-[26px] border border-[#d4e84a]/40 bg-[#f4f8df]">
              <div className="flex items-center gap-3 border-b border-[#d4e84a]/30 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a3d2e] text-[#d4e84a]">
                  <UserRound size={16} />
                </div>
                <div>
                  <p className="text-xs font-black">Profile preview</p>
                  <p className="text-[10px] text-emerald-950/45">
                    This is how your profile will look.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <div className="relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#0a3d2e]">
                  {displayedPhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={displayedPhoto}
                      alt="Preview"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-xl font-black text-[#d4e84a]">
                        {firstLetter}
                      </span>
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="break-words text-base font-black">
                      {form.name.trim() || "DealDone User"}
                    </p>
                    <span className="rounded-full bg-[#d4e84a] px-2 py-1 text-[8px] font-black uppercase tracking-wide">
                      Member
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-emerald-950/40">
                    {form.location.trim() || "Location not added"}
                  </p>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-emerald-950/10 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/profile"
                className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-950/10 bg-white px-5 py-3.5 text-xs font-black text-emerald-950/55 transition hover:bg-[#f8faf6] hover:text-[#0a3d2e]"
              >
                Cancel
              </Link>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving || processingPhoto}
                className="group flex items-center justify-center gap-2 rounded-2xl bg-[#0a3d2e] px-6 py-3.5 text-xs font-black text-[#f2f7dc] shadow-[0_14px_30px_rgba(10,61,46,0.16)] transition hover:-translate-y-0.5 hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {selectedPhoto ? "Uploading & Saving..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.section>

        {/* FOOT NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-6 flex items-center justify-center gap-2 text-center"
        >
          <Check size={13} className="text-emerald-700/35" />
          <p className="text-[10px] text-emerald-950/35">
            Your information is stored with your DealDone account.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
