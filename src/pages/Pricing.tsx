import { Button } from '@/components/ui/button';
import { Check, Star, Phone, Calendar } from 'phosphor-react';

const Pricing = () => {
  const pricingCards = [
    {
      title: "Screen Replacement",
      price: "From ₹899",
      description: "iPhone, Android, Tablet screens",
      features: [
        "Original quality LCD/OLED",
        "30-day warranty",
        "Free installation",
        "Same-day service"
      ],
      popular: false
    },
    {
      title: "Battery Service", 
      price: "From ₹699",
      description: "Phone & Laptop batteries",
      features: [
        "Genuine battery cells",
        "90-day warranty", 
        "Health diagnostics",
        "Quick 2-hour service"
      ],
      popular: true
    },
    {
      title: "Water Damage Recovery",
      price: "From ₹1299",
      description: "Complete motherboard cleaning",
      features: [
        "Ultrasonic cleaning",
        "Component replacement",
        "Data recovery attempt", 
        "60-day warranty"
      ],
      popular: false
    },
    {
      title: "Laptop Repair",
      price: "From ₹999", 
      description: "Hardware & software fixes",
      features: [
        "Keyboard replacement",
        "SSD/RAM upgrades",
        "Thermal paste service",
        "180-day warranty"
      ],
      popular: false
    }
  ];

  return (
    <main className="min-h-screen pt-20">
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">
            Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Quality repairs at fair prices. All services include genuine parts and warranty.
          </p>
          
          {/* Trust Stats */}
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">5000+</div>
              <div className="text-sm text-muted-foreground">Devices Repaired</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2-4 Hours</div>
              <div className="text-sm text-muted-foreground">Avg. Turnaround</div>
            </div>
            <div className="text-center flex items-center gap-1">
              <div className="text-2xl font-bold text-primary">4.9</div>
              <Star size={20} className="text-yellow-500" weight="fill" />
              <div className="text-sm text-muted-foreground">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingCards.map((card, index) => (
            <div key={index} className={`glass rounded-2xl p-6 shadow-glass relative ${
              card.popular ? 'ring-2 ring-primary/30' : ''
            }`}>
              
              {card.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-primary px-4 py-1 rounded-full text-sm font-medium text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <div className="text-3xl font-bold text-gradient mb-2">{card.price}</div>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <Check size={16} className="text-primary mr-3 flex-shrink-0" weight="bold" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button className={`w-full ${
                card.popular ? 'bg-gradient-primary hover:shadow-glow' : 'variant-outline glass-subtle'
              }`}>
                Get Quote
              </Button>
            </div>
          ))}
        </div>

        {/* Warranty Section */}
        <div className="glass rounded-2xl p-8 shadow-glass mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gradient mb-4">Our Warranty Promise</h2>
            <p className="text-muted-foreground">
              We stand behind our work with comprehensive warranties on all repairs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-primary" weight="bold" />
              </div>
              <h3 className="font-semibold mb-2">Parts Warranty</h3>
              <p className="text-sm text-muted-foreground">30-180 days on all genuine parts and components</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-primary" weight="bold" />
              </div>
              <h3 className="font-semibold mb-2">Labor Warranty</h3>
              <p className="text-sm text-muted-foreground">90-day guarantee on all repair workmanship</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-primary" weight="bold" />
              </div>
              <h3 className="font-semibold mb-2">Free Re-repair</h3>
              <p className="text-sm text-muted-foreground">If the same issue occurs again, we fix it free</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Your Device Fixed?</h2>
          <p className="text-muted-foreground mb-8">Free diagnostics • Same-day service • Genuine parts</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
              <Calendar size={20} weight="bold" className="mr-2" />
              Book Repair Now
            </Button>
            <Button variant="outline" size="lg" className="glass-subtle">
              <Phone size={20} weight="bold" className="mr-2" />
              Call for Quote
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pricing;