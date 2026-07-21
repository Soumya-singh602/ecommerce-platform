import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";
import SearchBar from "../components/shop/SearchBar";
import SortDropdown from "../components/shop/SortDropdown";
import FilterSidebar from "../components/shop/FilterSidebar";
import ProductGrid from "../components/shop/ProductGrid";
import Pagination from "../components/shop/Pagination";

export default function Shop() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-10 px-4">

        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Page Title */}
        <h1 className="text-4xl font-bold">
          Shop
        </h1>

        {/* Search + Sort */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 md:items-center">

          <div className="flex-1">
            <SearchBar />
          </div>

          <SortDropdown />

        </div>

        {/* Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">

          {/* Filters */}
          <div>
            <FilterSidebar />
          </div>

          {/* Products */}
          <div className="lg:col-span-3">

            <h2 className="text-2xl font-semibold mb-6">
              Products
            </h2>

            <ProductGrid />

            <Pagination />

          </div>

        </div>

      </div>
    </MainLayout>
  );
}