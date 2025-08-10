import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, MapPin, Clock, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddressAndSchedulingProps {
  onComplete: (data: {
    address: string;
    name: string;
    phone: string;
    timeSlot: string;
    instructions?: string;
  }) => void;
  onBack: () => void;
  email: string;
}

const AddressAndScheduling = ({ onComplete, onBack, email }: AddressAndSchedulingProps) => {
  const [formData, setFormData] = useState({
    address: "",
    name: "",
    phone: "",
    timeSlot: "",
    instructions: "",
  });
  const { toast } = useToast();

  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM", 
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.address || !formData.name || !formData.phone || !formData.timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onComplete(formData);
  };

  return (
    <section className="py-12 bg-service-gradient min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Service <span className="text-primary">Details</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Please provide your address and preferred time slot for the cleaning service.
          </p>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Contact & Service Information
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Email: {email}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Service Address *
              </Label>
              <Textarea
                id="address"
                placeholder="Enter your full address including street, city, state, and ZIP code"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="mt-1 min-h-[80px]"
              />
            </div>

            {/* Time Slot Selection */}
            <div>
              <Label className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-primary" />
                Preferred Time Slot *
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <Card
                    key={slot}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                      formData.timeSlot === slot ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleInputChange("timeSlot", slot)}
                  >
                    <CardContent className="p-3 text-center">
                      <p className="font-medium text-sm">{slot}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <Label htmlFor="instructions">Special Instructions (Optional)</Label>
              <Textarea
                id="instructions"
                placeholder="Any special requests, access instructions, or areas that need extra attention..."
                value={formData.instructions}
                onChange={(e) => handleInputChange("instructions", e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="outline"
            onClick={onBack}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back
          </Button>

          <Button 
            onClick={handleSubmit}
            className="hero-button"
          >
            Continue to Payment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddressAndScheduling;