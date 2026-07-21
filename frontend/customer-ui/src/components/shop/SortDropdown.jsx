export default function SortDropdown() {
  return (
    <select
      className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      defaultValue=""
    >
      <option value="" disabled>
        Sort By
      </option>

      <option value="latest">Latest</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="name">Name (A-Z)</option>
    </select>
  );
}