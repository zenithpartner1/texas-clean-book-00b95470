import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";

interface FrequencyOption {
  id: string;
  title: string;
  description: string;
  price: number;
  savings?: string;
}

interface FrequencySelectionProps {
  onFrequencySelect: (frequency: string) => void;
  onBack: () => void;
}

const FrequencySelection = ({ onFrequencySelect, onBack }: FrequencySelectionProps) => {
  const [selectedFrequency, setSelectedFrequency] = useState<string>("");

  const frequencies: FrequencyOption[] = [
    {
      id: "weekly",
      title: "Weekly Standard after Initial Deep Clean",
      description: "Perfect for busy households that want consistent cleanliness",
      price: 120,
      savings: "Save 15%",
    },
    {
      id: "bi-weekly",
      title: "Every 2 Weeks Standard after Initial Deep Clean",
      description: "Most popular choice for regular maintenance",
      price: 140,
      savings: "Save 10%",
    },
    {
      id: "tri-weekly",
      title: "Every 3 Weeks Standard after Initial Deep Clean",
      description: "Good balance of cost and cleanliness",
      price: 160,
    },
    {
      id: "monthly",
      title: "Every 4 Weeks Standard After Initial Deep Clean",
      description: "Basic maintenance for low-traffic homes",
      price: 180,
    },
  ];

  const handleContinue = () => {
    if (selectedFrequency) {
      onFrequencySelect(selectedFrequency);
    }
  };

  return (
    <section className="py-12 bg-service-gradient min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How Often Would You Like <span className="text-primary">Cleaning?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred cleaning frequency. All options include an initial deep clean followed by regular maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {frequencies.map((frequency) => {
            const isSelected = selectedFrequency === frequency.id;
            
            return (
              <Card 
                key={frequency.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
                  isSelected ? 'ring-2 ring-primary shadow-medium' : ''
                } ${frequency.savings ? 'relative' : ''}`}
                onClick={() => setSelectedFrequency(frequency.id)}
              >
                {frequency.savings && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {frequency.savings}
                    </span>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">${frequency.price}</span>
                      <p className="text-sm text-muted-foreground">per cleaning</p>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground mt-4">
                    {frequency.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {frequency.description}
                  </CardDescription>
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
            Back to Services
          </Button>

          {selectedFrequency && (
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

export default FrequencySelection;