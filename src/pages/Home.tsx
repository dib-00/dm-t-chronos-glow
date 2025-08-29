import Hero from '@/components/Hero';
import Services from '@/components/Services';
import HomePricing from '@/components/sections/HomePricing';
import HomeGallery from '@/components/sections/HomeGallery';
import HomeAbout from '@/components/sections/HomeAbout';
import HomeContact from '@/components/sections/HomeContact';

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <HomePricing />
      <HomeGallery />
      <HomeAbout />
      <HomeContact />
    </main>
  );
};

export default Home;