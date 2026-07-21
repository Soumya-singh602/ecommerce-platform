export default function ProductImage({ product }) {

  return (

    <div className="border rounded-xl overflow-hidden shadow-sm">

      <img
        src={
          product?.image
            ? `http://127.0.0.1:8002${product.image}`
            : "https://picsum.photos/600/600"
        }
        alt={product?.name || "Product"}
        className="w-full h-[500px] object-cover"
      />

    </div>

  );

}