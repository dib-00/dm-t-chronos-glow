import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { House, ArrowLeft } from "phosphor-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="text-center space-y-8 relative z-10 max-w-2xl mx-auto px-4">
        
        {/* 404 Display */}
        <div className="space-y-4">
          <h1 className="text-8xl sm:text-9xl font-bold text-gradient animate-pulse-glow">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
        </div>

        {/* Error Message */}
        <div className="glass rounded-2xl p-8 shadow-glass">
          <p className="text-lg text-muted-foreground font-light mb-6">
            Oops! The page you're looking for seems to have vanished into the digital void. 
            Don't worry, our expert technicians can help you find your way back.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow glow-hover"
            >
              <Link to="/">
                <House size={20} weight="bold" className="mr-2" />
                Return Home
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass-subtle hover:glass border-glass-border"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={20} weight="bold" className="mr-2" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Looking for something specific?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { href: "/services", label: "Services" },
              { href: "/pricing", label: "Pricing" },
              { href: "/contact", label: "Contact" }
            ].map((link) => (
              <Button 
                key={link.href}
                variant="ghost" 
                size="sm" 
                asChild
                className="text-primary hover:text-accent transition-colors"
              >
                <Link to={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
