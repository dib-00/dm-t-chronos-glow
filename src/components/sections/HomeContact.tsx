import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { 
  MapPin, 
  Phone, 
  Envelope, 
  Clock,
  WhatsappLogo,
  PaperPlaneTilt
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const HomeContact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    gsap.fromTo(formRef.current,
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

    gsap.fromTo(infoRef.current,
      { opacity: 0, x: 50 },
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save to Supabase database
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          status: 'new',
          is_read: false
        });

      if (dbError) throw dbError;

      // Send to Telegram
      const { error: telegramError } = await supabase.functions.invoke('send-telegram-message', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }
      });

      if (telegramError) {
        console.error('Telegram error:', telegramError);
        // Don't fail the whole process if Telegram fails
      }

      // Show success message
      alert('✅ Thank you, we\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error submitting your message. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Tech Street, Electronics Hub', 'Kolkata, West Bengal 700001']
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 7003920793', 'Mon-Sat: 9 AM - 8 PM']
    },
    {
      icon: Envelope,
      title: 'Email Us',
      details: ['info@electrorepair.com', 'support@electrorepair.com']
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Monday - Saturday: 9 AM - 8 PM', 'Sunday: 10 AM - 6 PM']
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gradient mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to repair your device? Contact us today for a free diagnosis and quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <div ref={formRef} className="glass-subtle rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className="glass-subtle border-glass-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    required
                    className="glass-subtle border-glass-border"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  className="glass-subtle border-glass-border"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your device issue or repair needs..."
                  rows={4}
                  required
                  className="glass-subtle border-glass-border resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-glow"
              >
                <PaperPlaneTilt size={16} className="mr-2" weight="bold" />
                Send Message
              </Button>
            </form>

            {/* Quick Contact Buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                className="flex-1 glass-subtle hover:glass"
                onClick={() => window.open('tel:+917003920793')}
              >
                <Phone size={16} className="mr-2" />
                Call Now
              </Button>
              <Button
                variant="outline"
                className="flex-1 glass-subtle hover:glass"
                onClick={() => window.open('https://wa.me/917003920793')}
              >
                <WhatsappLogo size={16} className="mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="glass-subtle rounded-xl p-6 hover:glass transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gradient-primary flex-shrink-0">
                    <info.icon size={20} weight="bold" className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;