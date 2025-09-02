import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'phosphor-react';

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Repairs' },
    { id: 'screens', label: 'Screen Repairs' },
    { id: 'water', label: 'Water Damage' },
    { id: 'battery', label: 'Battery Replacement' },
    { id: 'motherboard', label: 'Motherboard Repair' }
  ];

  const repairGallery = [
    {
      id: 1,
      category: 'screens',
      title: 'iPhone 13 Pro Screen Replacement',
      before: '/placeholder.svg',
      after: '/placeholder.svg',
      description: 'Cracked OLED display replaced with genuine Apple part'
    },
    {
      id: 2,
      category: 'water',
      title: 'Samsung Galaxy Water Damage Recovery',
      before: '/placeholder.svg', 
      after: '/placeholder.svg',
      description: 'Complete motherboard cleaning and component replacement'
    },
    {
      id: 3,
      category: 'battery',
      title: 'MacBook Pro Battery Replacement',
      before: '/placeholder.svg',
      after: '/placeholder.svg', 
      description: 'Swollen battery replacement with health diagnostics'
    },
    {
      id: 4,
      category: 'motherboard',
      title: 'Micro-soldering BGA Repair',
      before: '/placeholder.svg',
      after: '/placeholder.svg',
      description: 'CPU replacement on damaged gaming laptop motherboard'
    },
    {
      id: 5,
      category: 'screens',
      title: 'iPad Air Screen & Digitizer',
      before: '/placeholder.svg',
      after: '/placeholder.svg',
      description: 'Shattered glass and non-responsive touch restored'
    },
    {
      id: 6,
      category: 'water',
      title: 'iPhone 12 Liquid Damage Recovery',
      before: '/placeholder.svg',
      after: '/placeholder.svg',
      description: 'Ultrasonic cleaning and corrosion treatment'
    }
  ];

  const filteredGallery = selectedCategory === 'all' 
    ? repairGallery 
    : repairGallery.filter(item => item.category === selectedCategory);

  return (
    <main className="min-h-screen pt-20">
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">
            Repair Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Before and after showcase of our professional electronics repair work
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id 
                ? "bg-gradient-primary hover:shadow-glow" 
                : "glass-subtle hover:glass"
              }
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGallery.map((item) => (
            <div key={item.id} className="glass rounded-2xl overflow-hidden shadow-glass group">
              
              {/* Before/After Images */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 relative overflow-hidden">
                    <img 
                      src={item.before} 
                      alt={`${item.title} - Before`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500/90 text-white text-xs px-2 py-1 rounded">
                      Before
                    </div>
                  </div>
                  <div className="w-1/2 relative overflow-hidden">
                    <img 
                      src={item.after} 
                      alt={`${item.title} - After`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded">
                      After
                    </div>
                  </div>
                </div>
                
                {/* Divider Line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/50 -translate-x-0.5" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 mb-16">
          <div className="text-center glass rounded-xl p-6">
            <div className="text-3xl font-bold text-gradient mb-2">5000+</div>
            <div className="text-sm text-muted-foreground">Successful Repairs</div>
          </div>
          <div className="text-center glass rounded-xl p-6">
            <div className="text-3xl font-bold text-gradient mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center glass rounded-xl p-6">
            <div className="text-3xl font-bold text-gradient mb-2">2-4hrs</div>
            <div className="text-sm text-muted-foreground">Avg. Repair Time</div>
          </div>
          <div className="text-center glass rounded-xl p-6">
            <div className="text-3xl font-bold text-gradient mb-2">180d</div>
            <div className="text-sm text-muted-foreground">Max Warranty</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gradient mb-4">
            Need Your Device Repaired?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of satisfied customers who trust us with their electronics
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow"
            onClick={() => navigate('/contact')}
          >
            Book Your Repair Today
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Gallery;