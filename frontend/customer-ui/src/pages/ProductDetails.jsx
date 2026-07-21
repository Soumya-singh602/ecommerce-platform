import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";
import ProductImage from "../components/product/ProductImage";
import ProductInfo from "../components/product/ProductInfo";
import RelatedProducts from "../components/product/RelatedProducts";

import { getProductDetails } from "../services/productService";

export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetchProduct();

  }, [id]);


  const fetchProduct = async () => {

    try {

      const response = await getProductDetails(id);

      console.log("PRODUCT DETAILS:", response);

      setProduct(response.data);

    } catch (error) {

      console.log("ERROR:", error);

    } finally {

      setLoading(false);

    }

  };


  if (loading) {

    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-20 text-center">
          Loading...
        </div>
      </MainLayout>
    );

  }


  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto py-10 px-4">

        <Breadcrumb />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">

          <ProductImage product={product} />

          <ProductInfo product={product} />

        </div>

        <RelatedProducts />

      </div>

    </MainLayout>

  );

}