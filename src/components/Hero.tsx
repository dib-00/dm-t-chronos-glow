import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Phone, 
  WhatsappLogo, 
  ShieldCheck, 
  Wrench, 
  Lightning, 
  CheckCircle 
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate headline
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' }
    );

    // Animate subtext
    tl.fromTo(subtextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    // Animate CTA buttons
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );

    // Animate Spline container
    tl.fromTo(splineRef.current,
      { opacity: 0, x: 40, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    // Animate badges with stagger
    tl.fromTo(badgesRef.current?.children || [],
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.6'
    );

    // Animate brand logos
    tl.fromTo(brandsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const trustBadges = [
    { icon: ShieldCheck, text: 'Warranty' },
    { icon: Wrench, text: 'Genuine Parts' },
    { icon: Lightning, text: 'Free Diagnosis' },
    { icon: CheckCircle, text: 'Express Service' }
  ];

  const brands = ['Apple', 'Samsung', 'Xiaomi', 'OnePlus', 'Lenovo', 'Dell', 'HP', 'Asus'];

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8">
          
          {/* Main Headline */}
          <h1 ref={headlineRef} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="text-gradient">Fast, Expert</span>
            <br />
            <span className="text-foreground">Electronics Repair</span>
          </h1>

          {/* Subtext */}
          <p ref={subtextRef} className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl">
            Smartphones, Laptops, Tablets & More. Same-day diagnostics with certified technicians using genuine parts.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow glow-hover text-lg px-8 py-4">
              <Calendar size={20} weight="bold" className="mr-3" />
              Book a Repair
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="glass-subtle hover:glass border-glass-border">
                <Phone size={20} weight="bold" className="mr-2" />
                Call Now
              </Button>
              <Button variant="outline" size="lg" className="glass-subtle hover:glass border-glass-border">
                <WhatsappLogo size={20} weight="bold" className="mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div ref={badgesRef} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            {trustBadges.map((badge, index) => (
              <div key={index} className="glass-subtle rounded-full px-4 py-2 flex items-center space-x-2 hover:glass transition-all duration-300">
                <badge.icon size={16} className="text-primary" weight="bold" />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Brands We Service */}
          <div ref={brandsRef} className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">Brands we service:</p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {brands.map((brand, index) => (
                <span key={index} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors cursor-default">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Spline 3D */}
        <div ref={splineRef} className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
          <div className="absolute inset-0 glass rounded-2xl overflow-hidden shadow-glass">
            <iframe 
              src='https://my.spline.design/retrofuturisticcircuitloop-lWAjhe1YBswHO5xm9HyZSHjS/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="rounded-2xl"
              title="3D Electronics Scene"
            />
          </div>
          
          {/* Overlay glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;