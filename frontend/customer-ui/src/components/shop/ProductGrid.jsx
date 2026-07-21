import ProductCard from "./ProductCard";

export default function ProductGrid() {

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 2999,
      description: "Premium wireless headphones",
      image: "https://picsum.photos/id/180/400/300",
    },
    {
      id: 2,
      name: "Gaming Laptop",
      price: 69999,
      description: "High performance gaming laptop",
      image: "https://picsum.photos/id/0/400/300",
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 4999,
      description: "Fitness tracking smartwatch",
      image: "https://picsum.photos/id/26/400/300",
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 2499,
      description: "Comfortable sports shoes",
      image: "https://picsum.photos/id/21/400/300",
    },
    {
      id: 5,
      name: "Backpack",
      price: 1499,
      description: "Travel backpack",
      image: "https://picsum.photos/id/20/400/300",
    },
    {
      id: 6,
      name: "DSLR Camera",
      price: 45999,
      description: "Professional camera",
      image: "https://picsum.photos/id/250/400/300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}