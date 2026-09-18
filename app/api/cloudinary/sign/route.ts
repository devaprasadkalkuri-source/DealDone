import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Cloudinary environment variables are missing." },
        { status: 500 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const uploadPreset = "dealdone_signed";

    const signatureString = `timestamp=${timestamp}&upload_preset=${uploadPreset}`;

    const signature = crypto
      .createHash("sha1")
      .update(signatureString + apiSecret)
      .digest("hex");

    return NextResponse.json({
      cloudName,
      apiKey,
      timestamp,
      signature,
      uploadPreset,
    });
  } catch (error) {
    console.error("Cloudinary signing error:", error);

    return NextResponse.json(
      { error: "Failed to create Cloudinary signature." },
      { status: 500 }
    );
  }
}