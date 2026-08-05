import { useEffect, useState } from "react";
import axios from "axios";


export default function Categories() {

  const [categories, setCategories] = useState([]);


  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/categories/`
        );

        console.log(
          "CATEGORY RESPONSE:",
          response.data
        );


        setCategories(
          response.data.data
        );


      } catch (error) {

        console.log(
          "CATEGORY ERROR:",
          error
        );

      }

    };


    fetchCategories();

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


        {
          categories.length > 0 ? (

            categories.map((category)=>(


              <div
                key={category.id}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >


                <img
                  src={
                    category.image
                    ?
                    `${import.meta.env.VITE_MEDIA_URL}${category.image}`
                    :
                    "https://via.placeholder.com/600x400?text=Category"
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


            ))

          )
          :
          (

            <p className="text-gray-500">
              Loading Categories...
            </p>

          )

        }


      </div>


    </section>

  );

}