import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChoose from "@/components/WhyChoose";
import ServiceSelection from "@/components/ServiceSelection";
import FrequencySelection from "@/components/FrequencySelection";
import MiniCart from "@/components/MiniCart";
import Footer from "@/components/Footer";

interface BookingData {
  location?: string;
  service?: string;
  frequency?: string;
  bedrooms?: number;
  addOns?: string[];
  price?: number;
}

const Index = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'landing' | 'services' | 'frequency' | 'bedrooms' | 'addons' | 'checkout'>('landing');
  const [bookingData, setBookingData] = useState<BookingData>({});

  const handleLocationSubmit = (location: string) => {
    // Validate Texas location (simplified check)
    const texasZipPattern = /^7[0-9]{4}$/;
    if (texasZipPattern.test(location)) {
      setBookingData(prev => ({ ...prev, location }));
      setCurrentStep('services');
      toast({
        title: "Location Verified!",
        description: "Service is available in your area.",
      });
    } else {
      toast({
        title: "Service Not Available",
        description: "We currently only serve Texas locations. Please enter a valid Texas zip code.",
        variant: "destructive",
      });
    }
  };

  const handleServiceSelect = (service: string) => {
    const prices = {
      "recurring-standard": 120,
      "one-time-standard": 150,
      "initial-deep": 200,
      "deep-cleaning": 180,
      "moving-in": 160,
      "moving-out": 160,
      "make-ready": 140,
      "post-renovation": 220,
      "post-construction": 250,
    };
    
    setBookingData(prev => ({ 
      ...prev, 
      service,
      price: prices[service as keyof typeof prices] || 150
    }));
    
    if (service === 'recurring-standard') {
      setCurrentStep('frequency');
    } else {
      // For other services, skip frequency selection
      setCurrentStep('bedrooms');
    }
  };

  const handleFrequencySelect = (frequency: string) => {
    setBookingData(prev => ({ ...prev, frequency }));
    setCurrentStep('bedrooms');
  };

  const handleBackToServices = () => {
    setCurrentStep('services');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return (
          <>
            <Hero onLocationSubmit={handleLocationSubmit} />
            <WhyChoose />
          </>
        );
      case 'services':
        return <ServiceSelection onServiceSelect={handleServiceSelect} />;
      case 'frequency':
        return (
          <FrequencySelection 
            onFrequencySelect={handleFrequencySelect}
            onBack={handleBackToServices}
          />
        );
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-service-gradient">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Coming Soon!
              </h2>
              <p className="text-lg text-muted-foreground">
                Additional booking steps are being developed.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <div className={`flex-1 ${currentStep !== 'landing' ? 'lg:pr-80' : ''}`}>
          {renderCurrentStep()}
        </div>
        
        {/* Mini Cart - Only show after location is set */}
        {currentStep !== 'landing' && (
          <div className="hidden lg:block fixed right-0 top-16 w-80 h-full bg-background border-l border-border p-6 overflow-y-auto">
            <MiniCart cartData={bookingData} location={bookingData.location} />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
