import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <MainLayout>

      <Hero />

      <Categories />

      <FeaturedProducts />

      <TrendingProducts />

      <Newsletter />

    </MainLayout>
  );
}