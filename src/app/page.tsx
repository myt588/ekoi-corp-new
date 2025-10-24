import { Hero } from '@/components/sections/Hero';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { LatestNews } from '@/components/sections/LatestNews';
import { Partners } from '@/components/sections/Partners';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <LatestNews />
      <Partners />
    </div>
  );
}