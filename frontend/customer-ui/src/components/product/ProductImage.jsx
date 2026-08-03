export default function ProductImage({ product }) {

  return (

    <div className="border rounded-xl overflow-hidden shadow-sm">

      <img
        src={
          product?.image
            ? product.image
            : "/placeholder.png"
        }
        alt={product?.name || "Product"}
        className="w-full h-[500px] object-cover"
      />

    </div>

  );

}