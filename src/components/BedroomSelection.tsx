import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed, ArrowRight, ArrowLeft } from "lucide-react";

interface BedroomSelectionProps {
  onBedroomSelect: (bedrooms: number) => void;
  onBack: () => void;
}

const BedroomSelection = ({ onBedroomSelect, onBack }: BedroomSelectionProps) => {
  const [selectedBedrooms, setSelectedBedrooms] = useState<number>(0);

  const bedroomOptions = [
    { count: 1, price: 0, description: "Studio or 1 bedroom apartment" },
    { count: 2, price: 25, description: "2 bedroom home or apartment" },
    { count: 3, price: 50, description: "3 bedroom family home" },
    { count: 4, price: 75, description: "4 bedroom large home" },
    { count: 5, price: 100, description: "5+ bedroom house" },
  ];

  const handleContinue = () => {
    if (selectedBedrooms > 0) {
      onBedroomSelect(selectedBedrooms);
    }
  };

  return (
    <section className="py-12 bg-service-gradient min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How Many <span className="text-primary">Bedrooms?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the number of bedrooms in your home to customize your cleaning service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {bedroomOptions.map((option) => {
            const isSelected = selectedBedrooms === option.count;
            
            return (
              <Card 
                key={option.count}
                className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
                  isSelected ? 'ring-2 ring-primary shadow-medium' : ''
                }`}
                onClick={() => setSelectedBedrooms(option.count)}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Bed className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {option.count} {option.count === 1 ? 'Bedroom' : 'Bedrooms'}
                  </CardTitle>
                  {option.price > 0 && (
                    <p className="text-lg font-semibold text-primary">+${option.price}</p>
                  )}
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm">
                    {option.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            onClick={onBack}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back
          </Button>

          {selectedBedrooms > 0 && (
            <Button 
              onClick={handleContinue}
              className="hero-button"
            >
              Continue
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BedroomSelection;