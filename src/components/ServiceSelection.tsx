import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

// Import service images (using existing assets temporarily)
import heroCleanImg from "@/assets/hero-cleaning.jpg";
import bookIconImg from "@/assets/book-icon.jpg";
import cleanIconImg from "@/assets/clean-icon.jpg";
import freedomIconImg from "@/assets/freedom-icon.jpg";

interface Service {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  image: string;
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
      detailedDescription: "Weekly, bi-weekly, or monthly cleaning service that includes dusting, vacuuming, mopping, bathroom and kitchen cleaning. Perfect for busy households who want to maintain a consistently clean home.",
      image: heroCleanImg,
      popular: true,
    },
    {
      id: "one-time-standard",
      name: "One Time Standard Clean",
      description: "Perfect for occasional deep cleaning sessions",
      detailedDescription: "Complete home cleaning service for special occasions, events, or when you need a thorough clean. Includes all standard cleaning tasks with attention to detail.",
      image: cleanIconImg,
    },
    {
      id: "initial-deep",
      name: "Initial Deep Clean & Ongoing Standard Service",
      description: "Start with deep clean, continue with regular service",
      detailedDescription: "Begins with intensive deep cleaning to establish a clean baseline, followed by regular maintenance cleaning. Ideal for starting a long-term cleaning relationship.",
      image: bookIconImg,
    },
    {
      id: "deep-cleaning",
      name: "Deep Cleaning",
      description: "Comprehensive deep cleaning for every corner",
      detailedDescription: "Intensive cleaning service that covers areas often missed in regular cleaning. Includes baseboards, light fixtures, inside appliances, and detailed sanitization.",
      image: freedomIconImg,
    },
    {
      id: "moving-in",
      name: "Moving In Clean",
      description: "Get your new home ready before you move in",
      detailedDescription: "Complete sanitization and cleaning of your new home before you move in. Ensures every surface is clean and ready for your family to settle in comfortably.",
      image: heroCleanImg,
    },
    {
      id: "moving-out",
      name: "Moving Out Clean",
      description: "Leave your old place spotless for the next tenant",
      detailedDescription: "Thorough cleaning to help you get your security deposit back. Covers all areas including inside appliances, cabinets, and deep cleaning of all surfaces.",
      image: cleanIconImg,
    },
    {
      id: "make-ready",
      name: "Make Ready Clean",
      description: "Property preparation for new tenants or sale",
      detailedDescription: "Professional cleaning service for landlords and real estate agents. Prepares properties for showings, new tenants, or sale with detailed cleaning and sanitization.",
      image: bookIconImg,
    },
    {
      id: "post-renovation",
      name: "Post Renovation Clean Up",
      description: "Clean up after renovation or remodeling work",
      detailedDescription: "Specialized cleaning to remove renovation dust, debris, and residue. Includes detailed cleaning of all surfaces affected by construction work.",
      image: freedomIconImg,
    },
    {
      id: "post-construction",
      name: "Post Construction Cleanup",
      description: "Remove construction debris and dust thoroughly",
      detailedDescription: "Heavy-duty cleaning service for new construction or major renovations. Removes construction dust, adhesives, paint splatters, and prepares the space for occupancy.",
      image: heroCleanImg,
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
            const isSelected = selectedService === service.id;
            
            return (
              <Card 
                key={service.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
                  isSelected ? 'ring-2 ring-primary shadow-medium' : ''
                } ${service.popular ? 'relative' : ''} overflow-hidden`}
                onClick={() => handleServiceSelect(service.id)}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-foreground">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground mb-2">
                    {service.description}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground/80">
                    {service.detailedDescription}
                  </p>
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