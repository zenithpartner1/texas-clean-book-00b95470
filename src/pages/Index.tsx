import { useState } from "react";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import ServiceSelection from "@/components/ServiceSelection";
import FrequencySelection from "@/components/FrequencySelection";
import BookingSummary from "@/components/BookingSummary";
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
  const [currentStep, setCurrentStep] = useState<'booking' | 'services' | 'frequency' | 'bedrooms' | 'addons' | 'checkout'>('booking');
  const [bookingData, setBookingData] = useState<BookingData>({});

  const handleLocationVerified = (location: string) => {
    setBookingData(prev => ({ ...prev, location }));
    setCurrentStep('services');
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

  const handleEditBooking = () => {
    setCurrentStep('services');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'booking':
        return <BookingForm onLocationVerified={handleLocationVerified} />;
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
            <div className="text-center max-w-md mx-auto p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Coming Soon!
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Additional booking steps (bedrooms, add-ons, checkout) are being developed.
              </p>
              <p className="text-sm text-muted-foreground">
                Your current selection has been saved in the booking summary.
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
        {/* Main Content */}
        <div className={`flex-1 ${currentStep !== 'booking' ? 'lg:pr-96' : ''}`}>
          {renderCurrentStep()}
        </div>
        
        {/* Booking Summary Sidebar - Fixed position like the reference app */}
        {currentStep !== 'booking' && (
          <div className="hidden lg:block fixed right-0 top-16 w-96 h-full bg-background border-l border-border overflow-y-auto">
            <div className="p-6">
              <BookingSummary 
                bookingData={bookingData} 
                onEdit={handleEditBooking}
              />
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
