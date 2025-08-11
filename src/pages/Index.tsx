import { useState } from "react";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import ServiceSelection from "@/components/ServiceSelection";
import FrequencySelection from "@/components/FrequencySelection";
import BedroomSelection from "@/components/BedroomSelection";
import AddOnsSelection from "@/components/AddOnsSelection";
import EmailVerification from "@/components/EmailVerification";
import AddressAndScheduling from "@/components/AddressAndScheduling";
import BookingConfirmation from "@/components/BookingConfirmation";
import BookingSummary from "@/components/BookingSummary";
import Footer from "@/components/Footer";

interface BookingData {
  location?: string;
  service?: string;
  frequency?: string;
  bedrooms?: number;
  addOns?: string[];
  price?: number;
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  timeSlot?: string;
  instructions?: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'booking' | 'services' | 'frequency' | 'bedrooms' | 'addons' | 'email' | 'address' | 'confirmation'>('booking');
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

  const handleBedroomSelect = (bedrooms: number) => {
    const bedroomPrice = bedrooms > 1 ? (bedrooms - 1) * 25 : 0;
    setBookingData(prev => ({ 
      ...prev, 
      bedrooms,
      price: (prev.price || 0) + bedroomPrice
    }));
    setCurrentStep('addons');
  };

  const handleAddOnsSelect = (addOns: string[]) => {
    const addOnsPrice = addOns.length * 25;
    setBookingData(prev => ({ 
      ...prev, 
      addOns,
      price: (prev.price || 0) + addOnsPrice
    }));
    setCurrentStep('email');
  };

  const handleEmailVerified = (email: string) => {
    setBookingData(prev => ({ ...prev, email }));
    setCurrentStep('address');
  };

  const handleAddressComplete = (data: {
    address: string;
    name: string;
    phone: string;
    timeSlot: string;
    instructions?: string;
  }) => {
    setBookingData(prev => ({ 
      ...prev, 
      ...data
    }));
    setCurrentStep('confirmation');
  };

  const handleBackToServices = () => {
    setCurrentStep('services');
  };

  const handleBackToFrequency = () => {
    setCurrentStep('frequency');
  };

  const handleBackToBedrooms = () => {
    setCurrentStep('bedrooms');
  };

  const handleBackToAddOns = () => {
    setCurrentStep('addons');
  };

  const handleBackToEmail = () => {
    setCurrentStep('email');
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
      case 'bedrooms':
        return (
          <BedroomSelection 
            onBedroomSelect={handleBedroomSelect}
            onBack={handleBackToFrequency}
          />
        );
      case 'addons':
        return (
          <AddOnsSelection 
            onAddOnsSelect={handleAddOnsSelect}
            onBack={handleBackToBedrooms}
          />
        );
      case 'email':
        return (
          <EmailVerification 
            onEmailVerified={handleEmailVerified}
            onBack={handleBackToAddOns}
          />
        );
      case 'address':
        return (
          <AddressAndScheduling 
            onComplete={handleAddressComplete}
            onBack={handleBackToEmail}
            email={bookingData.email || ""}
          />
        );
      case 'confirmation':
        return <BookingConfirmation bookingData={bookingData} />;
      default:
        return <BookingForm onLocationVerified={handleLocationVerified} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 ${currentStep !== 'booking' ? 'lg:pr-96' : ''} ${currentStep !== 'services' ? 'pb-16' : ''}`}>
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
      
      {/* Sticky Footer - only show when not on services page */}
      {currentStep !== 'services' && (
        <div className="fixed bottom-0 left-0 right-0 z-40">
          <Footer />
        </div>
      )}
      
      {/* Regular Footer for services page */}
      {currentStep === 'services' && <Footer />}
    </div>
  );
};

export default Index;
