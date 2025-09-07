import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  DeviceMobile,
  BatteryCharging,
  Drop,
  Cpu,
  Laptop,
  HardDrive,
  GearSix,
  Question,
  ArrowRight
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  features: string[];
  icon: string;
  price_from?: number;
  duration?: string;
  is_active: boolean;
}

const Services = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch services from database
  useEffect(() => {
    fetchServices();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('services-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'services'
      }, () => {
        fetchServices();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      setServices(data || fallbackServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices(fallbackServices);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation effects
  useEffect(() => {
    if (isLoading) return;

    // Title animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50, filter: 'blur(5px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Cards stagger animation
    gsap.fromTo(cardsRef.current?.children || [],
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading]);

  // Fallback services data (used if database is unavailable)
  const fallbackServices = [
    {
      id: '1',
      title: 'Screen & Glass Replacement',
      description: 'Professional screen repairs for phones and tablets with genuine parts and precision installation.',
      features: ['iPhone & Android', 'Same-day service', 'Warranty included'],
      icon: 'DeviceMobile',
      is_active: true
    },
    {
      id: '2',
      title: 'Battery & Charging Fixes',
      description: 'Battery replacement, charging port repair, and power management IC troubleshooting.',
      features: ['Original batteries', 'Charging diagnostics', 'Power optimization'],
      icon: 'BatteryCharging',
      is_active: true
    },
    {
      id: '3',
      title: 'Water Damage Recovery',
      description: 'Ultrasonic cleaning, corrosion removal, and complete motherboard restoration services.',
      features: ['Ultrasonic clean', 'Corrosion treatment', 'Data recovery'],
      icon: 'Drop',
      is_active: true
    },
    {
      id: '4',
      title: 'Motherboard & Micro-Soldering',
      description: 'Advanced IC-level repairs, BGA rework, and component-level troubleshooting.',
      features: ['BGA rework', 'IC replacement', 'Circuit repair'],
      icon: 'Cpu',
      is_active: true
    },
    {
      id: '5',
      title: 'Laptop Services',
      description: 'Complete laptop repair including SSD/RAM upgrades, keyboard replacement, and hinge fixes.',
      features: ['Hardware upgrades', 'Keyboard replacement', 'Thermal management'],
      icon: 'Laptop',
      is_active: true
    },
    {
      id: '6',
      title: 'Data Recovery & Backup',
      description: 'Professional data recovery from damaged phones, hard drives, and SSDs with secure handling.',
      features: ['Phone data recovery', 'HDD/SSD recovery', 'Secure backup'],
      icon: 'HardDrive',
      is_active: true
    },
    {
      id: '7',
      title: 'Diagnostics & Tune-ups',
      description: 'Comprehensive device diagnostics, performance optimization, and thermal management.',
      features: ['Performance testing', 'Thermal analysis', 'Software optimization'],
      icon: 'GearSix',
      is_active: true
    },
    {
      id: '8',
      title: 'Custom Requests',
      description: 'Specialized repairs and custom modifications. Get a personalized quote within 24 hours.',
      features: ['Custom solutions', '24h quote', 'Specialized repairs'],
      icon: 'Question',
      is_active: true
    }
  ];

  const getServiceIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      DeviceMobile,
      BatteryCharging,
      Drop,
      Cpu,
      Laptop,
      HardDrive,
      GearSix,
      Question
    };
    return iconMap[iconName] || Question;
  };

  const getServiceGradient = (index: number) => {
    const gradients = [
      'from-primary to-secondary',
      'from-secondary to-accent',
      'from-accent to-neon-cyan',
      'from-neon-cyan to-neon-violet',
      'from-neon-violet to-neon-magenta',
      'from-neon-magenta to-primary',
      'from-primary to-secondary',
      'from-secondary to-accent'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient">Professional</span> Repair Services
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            From basic screen replacements to advanced micro-soldering, we provide comprehensive electronics repair services with industry-leading expertise.
          </p>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="glass rounded-2xl p-6 lg:p-8 shadow-glass animate-pulse">
                <div className="w-16 h-16 bg-muted rounded-xl mb-6" />
                <div className="h-6 bg-muted rounded mb-4" />
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-2/3" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const ServiceIcon = getServiceIcon(service.icon);
              return (
                <div 
                  key={service.id}
                  className="group glass hover:glass-subtle rounded-2xl p-6 lg:p-8 shadow-glass hover:shadow-elevation transition-all duration-500 glow-hover cursor-pointer"
                >
                  
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getServiceGradient(index)} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <ServiceIcon size={32} className="text-white" weight="bold" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-gradient transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground font-light leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 group-hover:bg-accent transition-colors duration-300" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="pt-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="group/btn p-0 h-auto text-primary hover:text-accent transition-colors duration-300"
                        onClick={() => navigate(`/contact?service=${encodeURIComponent(service.title)}`)}
                      >
                        Book Now
                        <ArrowRight 
                          size={16} 
                          className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" 
                          weight="bold" 
                        />
                      </Button>
                    </div>
                  </div>

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-24">
          <p className="text-muted-foreground mb-6 font-light">
            Don't see your specific repair need? We handle custom requests too.
          </p>
          <Button size="lg" className="bg-gradient-primary hover:shadow-glow glow-hover">
            Get Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;