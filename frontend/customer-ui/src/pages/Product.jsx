import MainLayout from "../layouts/MainLayout";
import ProductGrid from "../components/shop/ProductGrid";

export default function Product() {
  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto py-10 px-4">

        <h1 className="text-4xl font-bold mb-8">
          Products
        </h1>

        <ProductGrid />

      </div>

    </MainLayout>
  );
}