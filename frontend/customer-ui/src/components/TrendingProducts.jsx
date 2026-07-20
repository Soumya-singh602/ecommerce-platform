import ProductCard from "./ProductCard";

const trendingProducts = [
  {
    id: 1,
    title: "Gaming Mouse",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
  },
  {
    id: 2,
    title: "Mechanical Keyboard",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    price: 2799,
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500",
  },
  {
    id: 4,
    title: "DSLR Camera",
    price: 49999,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
  },
];

export default function TrendingProducts() {
  return (
    <section className="max-w-7xl mx-auto mt-20 px-4">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          Trending Products
        </h2>

        <button className="text-blue-600 font-semibold">
          View All
        </button>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {trendingProducts.map((product) => (

          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />

        ))}

      </div>

    </section>
  );
}