import { useEffect, useState } from "react";
import axios from "axios";


export default function Categories() {

  const [categories, setCategories] = useState([]);


  useEffect(() => {

    axios
      .get(`${import.meta.env.VITE_API_URL}/categories/`)
      .then((res) => {

        console.log("CATEGORY DATA:", res.data);

        setCategories(res.data.data);

      })
      .catch((error) => {

        console.log("Category Error:", error);

      });

  }, []);


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
              src={
                category.image
                ? `${import.meta.env.VITE_MEDIA_URL}${category.image}`
                : "https://via.placeholder.com/600"
              }
              alt={category.name}
              className="h-64 w-full object-cover group-hover:scale-105 transition duration-500"
            />


            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

              <h3 className="text-white text-2xl font-bold">
                {category.name}
              </h3>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}