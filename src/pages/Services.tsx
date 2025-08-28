import Services from '@/components/Services';

const ServicesPage = () => {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional electronics repair services with certified technicians and genuine parts
          </p>
        </div>
        <Services />
      </div>
    </main>
  );
};

export default ServicesPage;