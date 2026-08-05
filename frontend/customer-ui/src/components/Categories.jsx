import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/categories/`
      );

      setCategories(response.data.data);
    } catch (error) {
      console.log("CATEGORY ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto mt-20 px-4">
        <h2 className="text-3xl font-bold mb-8">
          Shop By Category
        </h2>

        <p className="text-gray-500">
          Loading Categories...
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto mt-20 px-4">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          Shop By Category
        </h2>

        <Link
          to="/shop"
          className="text-blue-600 font-semibold hover:text-blue-800 transition"
        >
          View All
        </Link>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        {categories.map((category) => (

          <Link
            key={category.id}
            to={`/shop?category=${category.id}`}
            className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
          >

            <img
              src={
                category.image
                  ? `${import.meta.env.VITE_MEDIA_URL}${category.image}`
                  : "https://via.placeholder.com/600x400?text=Category"
              }
              alt={category.name}
              className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">

              <h3 className="text-white text-2xl font-bold text-center px-2">
                {category.name}
              </h3>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}