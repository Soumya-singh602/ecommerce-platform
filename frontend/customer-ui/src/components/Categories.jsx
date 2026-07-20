const categories = [
  {
    id: 1,
    title: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
  },
  {
    id: 2,
    title: "Fashion",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
  },
  {
    id: 3,
    title: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
  },
  {
    id: 4,
    title: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
  },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto mt-20 px-4">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          Shop By Category
        </h2>

        <button className="text-blue-600 font-semibold">
          View All
        </button>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        {categories.map((category) => (

          <div
            key={category.id}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
          >

            <img
              src={category.image}
              alt={category.title}
              className="h-64 w-full object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

              <h3 className="text-white text-2xl font-bold">
                {category.title}
              </h3>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}