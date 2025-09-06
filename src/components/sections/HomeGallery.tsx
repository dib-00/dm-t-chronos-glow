import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'phosphor-react';
import { useGalleryItems } from '@/hooks/useGalleryItems';
import { Skeleton } from '@/components/ui/skeleton';

gsap.registerPlugin(ScrollTrigger);

const HomeGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const { items, loading } = useGalleryItems();

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(galleryRef.current?.children || [],
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Fallback data for offline scenarios
  const fallbackImages = [
    {
      id: '1',
      title: 'iPhone Screen Repair',
      category: 'Mobile',
      description: 'Professional screen replacement with genuine parts',
      image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      is_active: true
    },
    {
      id: '2',
      title: 'Laptop Motherboard',
      category: 'Laptop', 
      description: 'Advanced motherboard repair and diagnostics',
      image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop',
      is_active: true
    },
    {
      id: '3',
      title: 'Tablet Display Fix',
      category: 'Tablet',
      description: 'Complete display assembly replacement',
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      is_active: true
    },
    {
      id: '4',
      title: 'Gaming Console',
      category: 'Console',
      description: 'Gaming console repair and maintenance',
      image_url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
      is_active: true
    },
    {
      id: '5',
      title: 'Smart Watch Repair',
      category: 'Wearable',
      description: 'Precision repair for wearable devices',
      image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      is_active: true
    },
    {
      id: '6',
      title: 'Headphones Fix',
      category: 'Audio',
      description: 'Audio device repair and restoration',
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      is_active: true
    }
  ];

  const displayItems = items.length > 0 ? items : fallbackImages;

  return (
    <section id="gallery" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gradient mb-4">
            Our Work Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the quality of our repairs and the devices we've brought back to life.
          </p>
        </div>

        <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="glass-subtle rounded-lg overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-4">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))
          ) : (
            displayItems.map((item, index) => (
              <div
                key={item.id}
                className="glass-subtle rounded-lg overflow-hidden hover:glass transition-all duration-300 group cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-primary font-medium mb-1">{item.category}</div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center">
          <Button variant="outline" className="glass-subtle hover:glass">
            View Full Gallery
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;