import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";
import ProductImage from "../components/product/ProductImage";
import ProductInfo from "../components/product/ProductInfo";
import RelatedProducts from "../components/product/RelatedProducts";

export default function ProductDetails() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-10 px-4">

        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">

          <ProductImage />

          <ProductInfo />

        </div>

        {/* Related Products */}
        <RelatedProducts />

      </div>
    </MainLayout>
  );
}