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
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/998c81ed-f70a-4f9b-a040-9ffbe6dbd04e.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Content - Centered Layout */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Your One Stop Cleaning
            <span className="block text-primary">Centre For All Needs</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional cleaning services for your home and office. Book trusted cleaners with just a few clicks.
          </p>

          {/* Location Input */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
      </div>
    </section>
  );
};

export default Hero;