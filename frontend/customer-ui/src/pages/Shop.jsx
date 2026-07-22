import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";
import SearchBar from "../components/shop/SearchBar";
import SortDropdown from "../components/shop/SortDropdown";
import FilterSidebar from "../components/shop/FilterSidebar";
import ProductGrid from "../components/shop/ProductGrid";
import Pagination from "../components/shop/Pagination";

import { getProducts } from "../services/productService";


export default function Shop() {


  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    fetchProducts();

  }, []);




  const fetchProducts = async () => {

    try {


      const response = await getProducts();


      console.log("PRODUCT RESPONSE:", response);



      /*
        Backend response:

        {
          success:true,
          message:"Products fetched successfully",
          data:{
              products:[]
          }
        }

      */



      if (Array.isArray(response)) {


        setProducts(response);


      }


      else if (Array.isArray(response.data)) {


        setProducts(response.data);


      }


      else if (
        response.data &&
        Array.isArray(response.data.products)
      ) {


        setProducts(response.data.products);


      }


      else {


        setProducts([]);


      }



    }


    catch(error) {


      console.log(
        "PRODUCT ERROR:",
        error
      );


      setProducts([]);


    }


    finally {


      setLoading(false);


    }


  };




  return (

    <MainLayout>


      <div className="max-w-7xl mx-auto py-10 px-4">


        <Breadcrumb />



        <h1 className="text-4xl font-bold">
          Shop
        </h1>




        <div className="mt-6 flex flex-col md:flex-row gap-4 md:items-center">


          <div className="flex-1">

            <SearchBar />

          </div>



          <SortDropdown />


        </div>





        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">



          <div>

            <FilterSidebar />

          </div>





          <div className="lg:col-span-3">



            <h2 className="text-2xl font-semibold mb-6">

              Products

            </h2>





            {


              loading ? (

                <p>
                  Loading products...
                </p>


              ) : (


                <ProductGrid
                  products={products}
                />


              )


            }





            <Pagination />



          </div>




        </div>



      </div>



    </MainLayout>

  );


}