import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import heroImage from "@/assets/hero-cleaning.jpg";

interface HeroProps {
  onLocationSubmit: (location: string) => void;
}

const Hero = ({ onLocationSubmit }: HeroProps) => {
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim()) {
      onLocationSubmit(zipCode.trim());
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-service-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full border-2 border-primary"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full border-2 border-primary"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full border-2 border-primary"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Your One Stop Cleaning
            <span className="block text-primary">Centre For All Needs</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
            Professional cleaning services for your home and office. Book trusted cleaners with just a few clicks.
          </p>

          {/* Location Input */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto lg:mx-0">
            <div className="flex gap-3 bg-background p-2 rounded-xl shadow-soft border border-border">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Enter Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="pl-10 border-0 focus-visible:ring-0 bg-transparent"
                />
              </div>
              <Button 
                type="submit" 
                className="hero-button whitespace-nowrap"
                disabled={!zipCode.trim()}
              >
                Check Availability
              </Button>
            </div>
          </form>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <img 
            src={heroImage} 
            alt="Professional cleaning team at work" 
            className="w-full h-auto rounded-2xl shadow-medium"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;