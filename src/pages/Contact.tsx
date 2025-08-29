import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  MapPin,
  Phone,
  WhatsappLogo,
  EnvelopeSimple,
  Clock,
  Calendar,
  CheckCircle
} from 'phosphor-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    device: '',
    issue: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      info: "+91 7003920793",
      subInfo: "Mon-Sat 9AM-8PM",
      action: "tel:+917003920793"
    },
    {
      icon: WhatsappLogo,
      title: "WhatsApp",
      info: "+91 7003920793", 
      subInfo: "Quick response guaranteed",
      action: "https://wa.me/917003920793"
    },
    {
      icon: EnvelopeSimple,
      title: "Email Us",
      info: "info@dmtrepairs.com",
      subInfo: "We reply within 2 hours",
      action: "mailto:info@dmtrepairs.com"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "123 Tech Street, Electronics Hub",
      subInfo: "Near Metro Station, City Center",
      action: "https://maps.google.com"
    }
  ];

  const businessHours = [
    { day: "Monday - Saturday", time: "9:00 AM - 8:00 PM" },
    { day: "Sunday", time: "10:00 AM - 6:00 PM" },
    { day: "Emergency Service", time: "Available on call" }
  ];

  return (
    <main className="min-h-screen pt-20">
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to get your device repaired? Contact us for a free diagnosis and quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="glass rounded-2xl p-8 shadow-glass">
            <h2 className="text-2xl font-bold text-gradient mb-6">Book Your Repair</h2>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" weight="fill" />
                <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
                <p className="text-muted-foreground">
                  We'll contact you within 30 minutes to confirm your booking.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full glass rounded-xl px-4 py-3 border border-glass-border focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-transparent text-foreground placeholder:text-muted-foreground"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full glass rounded-xl px-4 py-3 border border-glass-border focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-transparent text-foreground placeholder:text-muted-foreground"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full glass rounded-xl px-4 py-3 border border-glass-border focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-transparent text-foreground placeholder:text-muted-foreground"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Device Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Device Type *</label>
                  <select
                    name="device"
                    value={formData.device}
                    onChange={handleChange}
                    required
                    className="w-full glass rounded-xl px-4 py-3 border border-glass-border focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-background text-foreground"
                  >
                    <option value="">Select device type</option>
                    <option value="iPhone">iPhone</option>
                    <option value="Android Phone">Android Phone</option>
                    <option value="iPad">iPad</option>
                    <option value="Android Tablet">Android Tablet</option>
                    <option value="Laptop">Laptop</option>
                    <option value="MacBook">MacBook</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Issue Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Issue Type *</label>
                  <select
                    name="issue"
                    value={formData.issue}
                    onChange={handleChange}
                    required
                    className="w-full glass rounded-xl px-4 py-3 border border-glass-border focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-background text-foreground"
                  >
                    <option value="">Select issue type</option>
                    <option value="Screen/Display">Screen/Display Issue</option>
                    <option value="Battery">Battery Problem</option>
                    <option value="Water Damage">Water Damage</option>
                    <option value="Charging">Charging Issues</option>
                    <option value="Audio">Audio Problems</option>
                    <option value="Camera">Camera Issues</option>
                    <option value="Performance">Performance/Software</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">Describe the Issue</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full glass rounded-xl px-4 py-3 border border-glass-border focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-transparent text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder="Describe what happened and any symptoms you've noticed..."
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  <Calendar size={20} weight="bold" className="mr-2" />
                  Book Free Diagnosis
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            
            {/* Contact Methods */}
            <div className="grid gap-4">
              {contactInfo.map((contact, index) => (
                <a 
                  key={index}
                  href={contact.action}
                  className="glass rounded-xl p-6 shadow-glass hover:shadow-elevation transition-all duration-300 group block"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <contact.icon size={24} className="text-primary" weight="bold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {contact.title}
                      </h3>
                      <p className="text-foreground font-medium">{contact.info}</p>
                      <p className="text-sm text-muted-foreground">{contact.subInfo}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Business Hours */}
            <div className="glass rounded-xl p-6 shadow-glass">
              <div className="flex items-center mb-4">
                <Clock size={24} className="text-primary mr-3" weight="bold" />
                <h3 className="font-semibold text-lg">Business Hours</h3>
              </div>
              <div className="space-y-3">
                {businessHours.map((hours, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{hours.day}</span>
                    <span className="font-medium">{hours.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open('https://wa.me/917003920793', '_blank')}
              >
                <WhatsappLogo size={20} weight="bold" className="mr-2" />
                WhatsApp
              </Button>
              <Button 
                variant="outline"
                className="glass-subtle hover:glass"
                onClick={() => window.open('tel:+917003920793')}
              >
                <Phone size={20} weight="bold" className="mr-2" />
                Call Now
              </Button>
            </div>

            {/* Map Placeholder */}
            <div className="glass rounded-xl p-6 shadow-glass">
              <h3 className="font-semibold text-lg mb-4">Find Us</h3>
              <div className="bg-muted/20 rounded-xl h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-primary mx-auto mb-2" weight="bold" />
                  <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;