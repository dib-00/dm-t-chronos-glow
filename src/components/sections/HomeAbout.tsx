import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Clock, 
  Trophy, 
  ShieldCheck,
  ArrowRight
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const HomeAbout = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
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

    gsap.fromTo(statsRef.current?.children || [],
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: statsRef.current,
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

  const stats = [
    {
      icon: Users,
      value: '5000+',
      label: 'Happy Customers',
      description: 'Satisfied clients trust our expertise'
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Support Available',
      description: 'Round-the-clock assistance'
    },
    {
      icon: Trophy,
      value: '15+',
      label: 'Years Experience',
      description: 'Proven track record in repairs'
    },
    {
      icon: ShieldCheck,
      value: '99%',
      label: 'Success Rate',
      description: 'Most devices fully restored'
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gradient mb-6">
                Expert Electronics Repair Since 2009
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We're passionate about bringing your devices back to life. Our certified technicians 
                use advanced diagnostic tools and genuine parts to ensure quality repairs that last.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From smartphones to laptops, tablets to gaming consoles – we've mastered the art 
                of electronic restoration. Every repair comes with our comprehensive warranty and 
                commitment to excellence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-primary hover:shadow-glow">
                Learn More About Us
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="outline" className="glass-subtle hover:glass">
                Our Certifications
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-subtle rounded-xl p-6 hover:glass transition-all duration-300 text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-primary">
                    <stat.icon size={24} weight="bold" className="text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="font-semibold mb-2">{stat.label}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;