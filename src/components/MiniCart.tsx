import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, MapPin, Calendar, Home, Plus } from "lucide-react";

interface CartItem {
  service?: string;
  frequency?: string;
  bedrooms?: number;
  addOns?: string[];
  price?: number;
}

interface MiniCartProps {
  cartData: CartItem;
  location?: string;
}

const MiniCart = ({ cartData, location }: MiniCartProps) => {
  const getServiceName = (serviceId: string) => {
    const services: { [key: string]: string } = {
      "recurring-standard": "Recurring Standard Clean",
      "one-time-standard": "One Time Standard Clean", 
      "initial-deep": "Initial Deep Clean & Ongoing",
      "deep-cleaning": "Deep Cleaning",
      "moving-in": "Moving In Clean",
      "moving-out": "Moving Out Clean",
      "make-ready": "Make Ready Clean",
      "post-renovation": "Post Renovation Clean Up",
      "post-construction": "Post Construction Cleanup",
    };
    return services[serviceId] || serviceId;
  };

  const getFrequencyName = (frequencyId: string) => {
    const frequencies: { [key: string]: string } = {
      "weekly": "Weekly",
      "bi-weekly": "Every 2 Weeks",
      "tri-weekly": "Every 3 Weeks", 
      "monthly": "Every 4 Weeks",
    };
    return frequencies[frequencyId] || frequencyId;
  };

  const calculateTotal = () => {
    let total = cartData.price || 0;
    if (cartData.addOns) {
      total += cartData.addOns.length * 25; // Assuming $25 per add-on
    }
    return total;
  };

  return (
    <Card className="sticky top-24 shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShoppingCart className="w-5 h-5 text-primary" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {location && (
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Service Location</p>
              <p className="text-muted-foreground text-sm">{location}</p>
            </div>
          </div>
        )}

        {cartData.service && (
          <div className="flex items-start gap-3">
            <Plus className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Service</p>
              <p className="text-muted-foreground text-sm">{getServiceName(cartData.service)}</p>
            </div>
          </div>
        )}

        {cartData.frequency && (
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Frequency</p>
              <p className="text-muted-foreground text-sm">{getFrequencyName(cartData.frequency)}</p>
            </div>
          </div>
        )}

        {cartData.bedrooms && (
          <div className="flex items-start gap-3">
            <Home className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Bedrooms</p>
              <p className="text-muted-foreground text-sm">{cartData.bedrooms} bedroom{cartData.bedrooms > 1 ? 's' : ''}</p>
            </div>
          </div>
        )}

        {cartData.addOns && cartData.addOns.length > 0 && (
          <div>
            <p className="font-medium text-sm mb-2">Add-ons</p>
            {cartData.addOns.map((addOn, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{addOn}</span>
                <span className="font-medium">$25</span>
              </div>
            ))}
          </div>
        )}

        {cartData.price && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Service Fee</span>
                <span className="font-medium">${cartData.price}</span>
              </div>
              {cartData.addOns && cartData.addOns.length > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm">Add-ons ({cartData.addOns.length})</span>
                  <span className="font-medium">${cartData.addOns.length * 25}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${calculateTotal()}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MiniCart;