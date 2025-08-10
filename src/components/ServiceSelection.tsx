import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Check, Star, Clock, Home, Sparkles, Users, Building, Hammer } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: any;
  price: string;
  duration: string;
  popular?: boolean;
  features: string[];
}

interface ServiceSelectionProps {
  onServiceSelect: (serviceId: string) => void;
}

const ServiceSelection = ({ onServiceSelect }: ServiceSelectionProps) => {
  const [selectedService, setSelectedService] = useState<string>("recurring-standard");

  const services: Service[] = [
    {
      id: "recurring-standard",
      name: "Recurring Clean",
      description: "Regular weekly or bi-weekly cleaning service for busy households",
      icon: Clock,
      price: "From $120",
      duration: "2-3 hours",
      popular: true,
      features: ["Dusting & vacuuming", "Kitchen & bathroom cleaning", "Mopping floors", "Trash removal"],
    },
    {
      id: "one-time-standard", 
      name: "One-Time Clean",
      description: "Perfect for special occasions or when you need a thorough clean",
      icon: Check,
      price: "From $150",
      duration: "3-4 hours",
      features: ["Complete home cleaning", "All rooms included", "Kitchen deep clean", "Bathroom sanitization"],
    },
    {
      id: "deep-cleaning",
      name: "Deep Clean",
      description: "Comprehensive cleaning that covers every corner of your home",
      icon: Sparkles,
      price: "From $250",
      duration: "4-6 hours",
      features: ["Baseboards & trim", "Inside appliances", "Light fixtures", "Window sills"],
    },
    {
      id: "moving-in",
      name: "Move-In Clean",
      description: "Get your new home spotless before you settle in",
      icon: Home,
      price: "From $200",
      duration: "3-5 hours",
      features: ["Empty home cleaning", "Cabinet interiors", "Appliance cleaning", "Floor deep clean"],
    },
    {
      id: "moving-out",
      name: "Move-Out Clean",
      description: "Leave your old place pristine for the next residents",
      icon: Users,
      price: "From $200",
      duration: "3-5 hours",
      features: ["Security deposit clean", "All surfaces", "Inside appliances", "Final walkthrough"],
    },
    {
      id: "post-construction",
      name: "Post-Construction",
      description: "Remove construction dust and debris thoroughly",
      icon: Hammer,
      price: "From $300",
      duration: "4-8 hours",
      features: ["Dust removal", "Paint splatter cleanup", "Window cleaning", "Floor polishing"],
    },
  ];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleContinue = () => {
    if (selectedService) {
      onServiceSelect(selectedService);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/10 min-h-screen pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your <span className="text-primary">Cleaning Service</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional cleaning services tailored to your needs. Select the perfect service for your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const IconComponent = service.icon;
            const isSelected = selectedService === service.id;
            
            return (
              <Card 
                key={service.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${
                  isSelected ? 'ring-2 ring-primary shadow-lg border-primary' : 'border-border hover:border-primary/50'
                } ${service.popular ? 'relative' : ''}`}
                onClick={() => handleServiceSelect(service.id)}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                  }`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {service.name}
                  </CardTitle>
                  <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="font-semibold text-lg text-primary">{service.price}</span>
                    <span>•</span>
                    <span>{service.duration}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-center text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {isSelected && (
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center text-sm font-medium text-primary">
                        <Check className="w-4 h-4 mr-2" />
                        Selected
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Sticky Continue Button */}
      {selectedService && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Selected Service:</p>
                <p className="font-semibold text-foreground">
                  {services.find(s => s.id === selectedService)?.name} - {services.find(s => s.id === selectedService)?.price}
                </p>
              </div>
              <Button 
                onClick={handleContinue}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                Continue
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceSelection;