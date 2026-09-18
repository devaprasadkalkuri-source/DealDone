"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Mobiles");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, "products", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setName(data.name);
          setPrice(data.price.toString());
          setCategory(data.category);
          setDescription(data.description);
        } else {
          alert("Product not found.");
          router.push("/my-listings");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUpdating(true);

      await updateDoc(doc(db, "products", id as string), {
        name,
        price: Number(price),
        category,
        description,
      });

      alert("✅ Product updated successfully!");

      router.push("/my-listings");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to update product.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-2xl mx-auto bg-zinc-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-2">
          Edit Product
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Update your product details.
        </p>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">
              Product Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-orange-500"
            >
              <option>Mobiles</option>
              <option>Computers</option>
              <option>Vehicles</option>
              <option>Furniture</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-bold text-lg"
          >
            {updating ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </main>
  );
}