import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

      {products.length > 0 ? (

        products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))

      ) : (

        <div className="col-span-full text-center py-10">

          <p className="text-gray-500 text-lg">
            No products found.
          </p>

        </div>

      )}

    </div>

  );

}