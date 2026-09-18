export default function SearchBar() {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <input
        type="text"
        placeholder="🔍 Search products..."
        className="w-full px-5 py-4 rounded-xl bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}