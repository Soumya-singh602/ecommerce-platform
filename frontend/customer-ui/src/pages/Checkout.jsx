import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";

export default function Checkout() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-10 px-4">

        <Breadcrumb />

        <h1 className="text-4xl font-bold mt-6">
          Checkout
        </h1>

      </div>
    </MainLayout>
  );
}