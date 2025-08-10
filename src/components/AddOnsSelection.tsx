import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Refrigerator, ChefHat, Car, Lightbulb, Home, Trash2 } from "lucide-react";

interface AddOnsSelectionProps {
  onAddOnsSelect: (addOns: string[]) => void;
  onBack: () => void;
}

const AddOnsSelection = ({ onAddOnsSelect, onBack }: AddOnsSelectionProps) => {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const addOnOptions = [
    {
      id: "fridge-cleaning",
      name: "Fridge Cleaning",
      description: "Deep clean inside and outside of refrigerator",
      price: 25,
      icon: Refrigerator,
    },
    {
      id: "oven-cleaning",
      name: "Oven Cleaning", 
      description: "Interior and exterior oven deep cleaning",
      price: 30,
      icon: ChefHat,
    },
    {
      id: "garage-cleaning",
      name: "Garage Cleaning",
      description: "Sweep, organize, and clean garage space",
      price: 40,
      icon: Car,
    },
    {
      id: "light-fixtures",
      name: "Light Fixtures",
      description: "Clean all light fixtures and ceiling fans",
      price: 20,
      icon: Lightbulb,
    },
    {
      id: "cabinet-cleaning",
      name: "Cabinet Cleaning",
      description: "Inside and outside cabinet cleaning",
      price: 35,
      icon: Home,
    },
    {
      id: "trash-bins",
      name: "Trash Bin Cleaning",
      description: "Clean and sanitize indoor trash bins",
      price: 15,
      icon: Trash2,
    },
  ];

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleContinue = () => {
    onAddOnsSelect(selectedAddOns);
  };

  const totalAddOnPrice = selectedAddOns.length * 25; // Simplified pricing

  return (
    <section className="py-12 bg-service-gradient min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Choose <span className="text-primary">Add-On Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enhance your cleaning service with additional options. You can skip this step if not needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {addOnOptions.map((addOn) => {
            const isSelected = selectedAddOns.includes(addOn.id);
            const Icon = addOn.icon;
            
            return (
              <Card 
                key={addOn.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
                  isSelected ? 'ring-2 ring-primary shadow-medium' : ''
                }`}
                onClick={() => handleAddOnToggle(addOn.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <Checkbox 
                        checked={isSelected}
                        onChange={() => handleAddOnToggle(addOn.id)}
                      />
                    </div>
                    <span className="text-lg font-bold text-primary">${addOn.price}</span>
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {addOn.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {addOn.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedAddOns.length > 0 && (
          <div className="text-center mb-8">
            <p className="text-lg text-foreground">
              Selected Add-ons: <span className="font-bold text-primary">${totalAddOnPrice}</span>
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            onClick={onBack}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back
          </Button>

          <div className="flex gap-4">
            <Button 
              variant="outline"
              onClick={() => onAddOnsSelect([])}
              className="border-muted-foreground text-muted-foreground hover:bg-muted"
            >
              Skip Add-ons
            </Button>
            <Button 
              onClick={handleContinue}
              className="hero-button"
            >
              Continue
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddOnsSelection;