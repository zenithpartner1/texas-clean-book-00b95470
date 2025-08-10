import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, CheckCircle, Shield, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-cleaning.jpg";

interface BookingFormProps {
  onLocationVerified: (location: string) => void;
}

const BookingForm = ({ onLocationVerified }: BookingFormProps) => {
  const [address, setAddress] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const handleCheckAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setIsChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      // Validate Texas location (simplified check)
      const texasZipPattern = /^7[0-9]{4}$/;
      const isTexasAddress = texasZipPattern.test(address) || address.toLowerCase().includes('texas') || address.toLowerCase().includes('tx');
      
      if (isTexasAddress) {
        onLocationVerified(address);
        toast({
          title: "Service Available!",
          description: "Great news! We provide service in your area.",
        });
      } else {
        toast({
          title: "Service Not Available",
          description: "We currently only serve Texas locations. Please enter a valid Texas address or ZIP code.",
          variant: "destructive",
        });
      }
      setIsChecking(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-service-gradient">
      {/* Service Area Check */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="max-w-2xl mx-auto shadow-medium">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Service Area Check
            </CardTitle>
            <CardDescription className="text-lg">
              Enter your Texas address or ZIP code to check if we service your area.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCheckAvailability} className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Enter your address or ZIP code"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  disabled={isChecking}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-lg hero-button"
                disabled={!address.trim() || isChecking}
              >
                {isChecking ? "Checking..." : "Check Availability"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;