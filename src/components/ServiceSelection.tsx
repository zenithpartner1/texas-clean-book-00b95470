import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Home, Sparkles, ArrowRight } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: any;
  popular?: boolean;
}

interface ServiceSelectionProps {
  onServiceSelect: (serviceId: string) => void;
}

const ServiceSelection = ({ onServiceSelect }: ServiceSelectionProps) => {
  const [selectedService, setSelectedService] = useState<string>("");

  const services: Service[] = [
    {
      id: "recurring-standard",
      name: "Recurring Standard Clean",
      description: "Regular maintenance cleaning to keep your home spotless",
      icon: Clock,
      popular: true,
    },
    {
      id: "one-time-standard",
      name: "One Time Standard Clean",
      description: "Perfect for occasional deep cleaning sessions",
      icon: CheckCircle,
    },
    {
      id: "initial-deep",
      name: "Initial Deep Clean & Ongoing Standard Service",
      description: "Start with deep clean, continue with regular service",
      icon: Sparkles,
    },
    {
      id: "deep-cleaning",
      name: "Deep Cleaning",
      description: "Comprehensive deep cleaning for every corner",
      icon: Home,
    },
    {
      id: "moving-in",
      name: "Moving In Clean",
      description: "Get your new home ready before you move in",
      icon: Home,
    },
    {
      id: "moving-out",
      name: "Moving Out Clean",
      description: "Leave your old place spotless for the next tenant",
      icon: Home,
    },
    {
      id: "make-ready",
      name: "Make Ready Clean",
      description: "Property preparation for new tenants or sale",
      icon: Home,
    },
    {
      id: "post-renovation",
      name: "Post Renovation Clean Up",
      description: "Clean up after renovation or remodeling work",
      icon: Sparkles,
    },
    {
      id: "post-construction",
      name: "Post Construction Cleanup",
      description: "Remove construction debris and dust thoroughly",
      icon: Sparkles,
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
    <section className="py-12 bg-service-gradient min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Choose Your <span className="text-primary">Cleaning Service</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the cleaning service that best fits your needs. We offer comprehensive solutions for every situation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            const isSelected = selectedService === service.id;
            
            return (
              <Card 
                key={service.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
                  isSelected ? 'ring-2 ring-primary shadow-medium' : ''
                } ${service.popular ? 'relative' : ''}`}
                onClick={() => handleServiceSelect(service.id)}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedService && (
          <div className="text-center">
            <Button 
              onClick={handleContinue}
              className="hero-button"
            >
              Continue with {services.find(s => s.id === selectedService)?.name}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceSelection;