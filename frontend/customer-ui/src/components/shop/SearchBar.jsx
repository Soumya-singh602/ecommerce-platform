import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex w-full border rounded-lg overflow-hidden">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-2 outline-none"
      />

      <button className="px-4 bg-blue-600 text-white hover:bg-blue-700">
        <Search size={20} />
      </button>
    </div>
  );
}