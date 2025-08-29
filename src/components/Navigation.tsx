import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DeviceMobile, 
  List, 
  X, 
  Phone, 
  WhatsappLogo,
  Calendar
} from 'phosphor-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass shadow-glass' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-lg bg-gradient-primary shadow-glow group-hover:shadow-elevation transition-all duration-300">
                <DeviceMobile size={24} className="text-primary-foreground" weight="bold" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gradient">Dm T Repairs</span>
                <div className="text-xs text-muted-foreground font-light">
                  Expert Electronics
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                    location.pathname === item.href ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-primary">
                <Phone size={16} weight="bold" className="mr-2" />
                Call Now
              </Button>
              <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Calendar size={16} weight="bold" className="mr-2" />
                Book Repair
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <List size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
          <div className="relative glass h-full flex flex-col items-center justify-center space-y-8">
            
            {/* Mobile Navigation Links */}
            <div className="space-y-6 text-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block text-2xl font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href ? 'text-primary' : 'text-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="space-y-4 w-full max-w-xs px-8">
              <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Calendar size={20} weight="bold" className="mr-2" />
                Book a Repair
              </Button>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => window.open('tel:+917003920793')}
                >
                  <Phone size={16} weight="bold" className="mr-2" />
                  Call
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => window.open('https://wa.me/917003920793')}
                >
                  <WhatsappLogo size={16} weight="bold" className="mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden glass border-t border-glass-border">
        <div className="flex items-center justify-between p-4 space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => window.open('tel:+917003920793')}
          >
            <Phone size={16} weight="bold" className="mr-2" />
            Call
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => window.open('https://wa.me/917003920793')}
          >
            <WhatsappLogo size={16} weight="bold" className="mr-2" />
            WhatsApp
          </Button>
          <Button size="sm" className="flex-1 bg-gradient-primary hover:shadow-glow">
            <Calendar size={16} weight="bold" className="mr-2" />
            Book
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navigation;