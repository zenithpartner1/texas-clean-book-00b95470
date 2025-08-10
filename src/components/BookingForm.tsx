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
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('/lovable-uploads/44284c23-4f83-456f-99bd-c2a9f90d868c.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/10"></div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-12 leading-tight">
          Your One Stop Cleaning
          <br />
          Centre For All Needs
        </h1>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleCheckAvailability} className="flex gap-4 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Enter Zip Code"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-12 h-14 text-lg border-0 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground"
                disabled={isChecking}
              />
            </div>
            <Button 
              type="submit" 
              className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold"
              disabled={!address.trim() || isChecking}
            >
              {isChecking ? "Checking..." : "Check Availability"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;