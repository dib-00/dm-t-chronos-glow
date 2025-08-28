import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scroll
    document.documentElement.classList.add('no-scroll');

    const tl = gsap.timeline();

    // Animate logo in
    tl.fromTo(logoRef.current, 
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }
    );

    // Start logo glow pulse
    gsap.to(logoRef.current, {
      opacity: 0.7,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Progress bar animation
    tl.to(progressBarRef.current, {
      width: '100%',
      duration: 2.2,
      ease: 'power2.out',
      delay: 0.5
    }, 0.5);

    // Complete animation
    tl.call(() => {
      gsap.to(progressBarRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });

      gsap.to(preloaderRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.3,
        onComplete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none';
          }
          document.documentElement.classList.remove('no-scroll');
          onComplete();
        }
      });
    });

    return () => {
      // Cleanup
      document.documentElement.classList.remove('no-scroll');
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background-secondary to-background"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-float-slow" />
      </div>

      <div className="text-center z-10">
        {/* Logo/Wordmark */}
        <div ref={logoRef} className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4 tracking-tight">
            Dm T Repairs
          </h1>
          <p className="text-lg text-muted-foreground font-light tracking-wide">
            Expert Electronics Repair
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-80 h-1 bg-muted/30 rounded-full mx-auto overflow-hidden">
          <div 
            ref={progressBarRef}
            className="absolute left-0 top-0 h-full w-0 bg-gradient-primary rounded-full shadow-glow"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-shimmer" />
        </div>

        {/* Loading text */}
        <div className="mt-6 text-sm text-muted-foreground font-light">
          Preparing your experience...
        </div>
      </div>
    </div>
  );
};

export default Preloader;