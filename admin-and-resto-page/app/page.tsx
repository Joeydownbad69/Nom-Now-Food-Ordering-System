import { SearchBar } from '@/components/search-bar';
import RestaurantGrid from '@/components/restaurant-grid';
import FeaturedRestaurants from '@/components/featured-restaurants';
import HeroSection from '@/components/hero-section';
import CategoriesSection from '@/components/categories-section';
import PromotionSection from '@/components/promotion-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-nomnow-background">
      <HeroSection />
      
      <div className="container-custom py-12">
        <SearchBar />
        
        <section className="mt-12">
          <CategoriesSection />
        </section>
        
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-nomnow-dark">Featured Restaurants</h2>
          <FeaturedRestaurants />
        </section>
        
        <section className="mt-16">
          <PromotionSection />
        </section>
        
        <section className="mt-16 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-nomnow-dark">All Restaurants</h2>
          <RestaurantGrid />
        </section>
      </div>
    </div>
  );
}