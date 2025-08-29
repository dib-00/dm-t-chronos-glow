import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const HomePricing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    gsap.fromTo(cardsRef.current?.children || [],
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: cardsRef.current,
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

  const pricingPlans = [
    {
      name: 'Basic Repair',
      price: '₹199',
      features: [
        'Free Diagnosis',
        'Basic Repairs',
        '7-Day Warranty',
        'Genuine Parts'
      ],
      popular: false
    },
    {
      name: 'Premium Service',
      price: '₹499',
      features: [
        'Free Diagnosis',
        'Advanced Repairs',
        '30-Day Warranty',
        'Express Service',
        'Pickup & Drop'
      ],
      popular: true
    },
    {
      name: 'Complete Care',
      price: '₹899',
      features: [
        'Free Diagnosis',
        'Full Restoration',
        '90-Day Warranty',
        'Same-Day Service',
        'Pickup & Drop',
        'Data Recovery'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gradient mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No hidden costs. Professional repair services at competitive prices.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`glass-subtle rounded-2xl p-8 hover:glass transition-all duration-300 relative ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star size={14} weight="fill" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gradient">{plan.price}</div>
                <p className="text-sm text-muted-foreground">Starting from</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-primary flex-shrink-0" weight="fill" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${plan.popular ? 'bg-gradient-primary hover:shadow-glow' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePricing;