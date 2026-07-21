export default function FilterSidebar() {
  return (
    <div className="border rounded-lg p-6 shadow-sm bg-white">

      <h2 className="text-xl font-semibold mb-6">
        Filters
      </h2>

      {/* Category */}

      <div className="mb-6">
        <h3 className="font-medium mb-3">Category</h3>

        <div className="space-y-2">

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Electronics
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Fashion
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Home
          </label>

        </div>
      </div>

      {/* Price */}

      <div className="mb-6">
        <h3 className="font-medium mb-3">
          Price
        </h3>

        <input
          type="range"
          min="0"
          max="5000"
          className="w-full"
        />

        <p className="text-sm text-gray-500 mt-2">
          ₹0 - ₹5000
        </p>
      </div>

      {/* Rating */}

      <div>
        <h3 className="font-medium mb-3">
          Rating
        </h3>

        <div className="space-y-2">

          <label className="flex items-center gap-2">
            <input type="radio" name="rating" />
            4★ & Above
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="rating" />
            3★ & Above
          </label>

        </div>
      </div>

    </div>
  );
}