import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Medal,
  Clock,
  Shield,
  Users,
  Wrench,
  Lightning,
  Phone,
  Calendar
} from 'phosphor-react';
import { useAboutContent } from '@/hooks/useAboutContent';
import { Skeleton } from '@/components/ui/skeleton';

const About = () => {
  const navigate = useNavigate();
  const { content, loading } = useAboutContent();
  
  // Get dynamic content from database or use fallback
  const aboutContent = content.find(item => item.section_key === 'main') || {
    title: 'About Dm T Repairs',
    content: 'Your trusted electronics repair specialist with a passion for bringing devices back to life'
  };

  const missionContent = content.find(item => item.section_key === 'mission') || {
    title: 'Our Mission',
    content: 'To provide exceptional electronics repair services that combine technical expertise with genuine customer care. We\'re not just fixing devices – we\'re restoring connections, preserving memories, and empowering productivity.'
  };
  
  const skills = [
    { icon: Wrench, title: "Micro-Soldering", description: "BGA rework & component-level repair" },
    { icon: Lightning, title: "Fast Turnaround", description: "Most repairs completed same day" },
    { icon: Shield, title: "Genuine Parts", description: "Only authentic OEM components used" },
    { icon: Medal, title: "Certified Technician", description: "Industry-certified repair expertise" },
    { icon: Clock, title: "7+ Years Experience", description: "Thousands of successful repairs" },
    { icon: Users, title: "Customer First", description: "Transparent pricing & communication" }
  ];

  const certifications = [
    "IPC J-STD-001 Certified",
    "Mobile Device Repair Specialist", 
    "Apple Authorized Service Training",
    "Samsung Certified Technician",
    "Micro-Soldering Specialist"
  ];

  return (
    <main className="min-h-screen pt-20">
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          {loading ? (
            <div>
              <Skeleton className="h-12 w-2/3 mx-auto mb-4" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>
          ) : (
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">
                {aboutContent.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {aboutContent.content}
              </p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Profile Image */}
          <div className="relative">
            <div className="glass rounded-2xl overflow-hidden shadow-glass group">
              <img 
                src="/placeholder.svg" 
                alt="Dm T Repairs Workshop"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 glass rounded-xl p-4 shadow-glass">
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">5000+</div>
                <div className="text-xs text-muted-foreground">Repairs Completed</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gradient">
              Expert Electronics Repair Since 2017
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Welcome to Dm T Repairs, where precision meets passion in the world of electronics restoration. 
                With over 7 years of hands-on experience, we specialize in bringing your beloved devices back to life.
              </p>
              
              <p>
                From cracked smartphone screens to complex motherboard repairs, our state-of-the-art workshop 
                is equipped with professional-grade tools and genuine replacement parts. We believe every device 
                deserves a second chance, and every customer deserves transparent, honest service.
              </p>
              
              <p>
                Our commitment goes beyond just fixing devices – we educate our customers about proper device 
                care and provide comprehensive warranties on all repairs. Your trust is our most valuable asset.
              </p>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-semibold mb-3 text-foreground">Certifications & Training</h3>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Medal size={16} className="text-primary mr-3 flex-shrink-0" weight="bold" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                <Calendar size={20} weight="bold" className="mr-2" />
                Book Consultation
              </Button>
              <Button variant="outline" size="lg" className="glass-subtle hover:glass">
                <Phone size={20} weight="bold" className="mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gradient mb-12">
            Our Expertise
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="glass rounded-xl p-6 shadow-glass hover:shadow-elevation transition-all duration-300 group">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <skill.icon size={24} className="text-primary" weight="bold" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{skill.title}</h3>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="glass rounded-2xl p-8 shadow-glass text-center mb-16">
          {loading ? (
            <div>
              <Skeleton className="h-8 w-1/3 mx-auto mb-4" />
              <Skeleton className="h-4 w-full max-w-3xl mx-auto mb-2" />
              <Skeleton className="h-4 w-5/6 max-w-3xl mx-auto" />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gradient mb-4">{missionContent.title}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {missionContent.content}
              </p>
            </div>
          )}
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield size={28} className="text-primary" weight="bold" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Quality First</h3>
            <p className="text-sm text-muted-foreground">
              We use only genuine parts and follow industry best practices for every repair
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Clock size={28} className="text-primary" weight="bold" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fast Service</h3>
            <p className="text-sm text-muted-foreground">
              Most repairs completed same day with free diagnostics and transparent pricing
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users size={28} className="text-primary" weight="bold" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Customer Care</h3>
            <p className="text-sm text-muted-foreground">
              Your satisfaction is our priority, backed by comprehensive warranties
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of satisfied customers who trust Dm T Repairs with their devices
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow"
            onClick={() => navigate('/contact')}
          >
            Get Your Free Diagnosis Today
          </Button>
        </div>
      </div>
    </main>
  );
};

export default About;