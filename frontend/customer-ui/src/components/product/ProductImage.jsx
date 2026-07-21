export default function ProductImage() {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm">

      <img
        src="https://picsum.photos/600/600"
        alt="Product"
        className="w-full h-[500px] object-cover"
      />

    </div>
  );
}