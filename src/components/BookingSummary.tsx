import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Home, Plus, DollarSign, Edit2, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingSummaryItem {
  service?: string;
  frequency?: string;
  bedrooms?: number;
  addOns?: string[];
  price?: number;
  location?: string;
}

interface BookingSummaryProps {
  bookingData: BookingSummaryItem;
  onEdit?: () => void;
}

const BookingSummary = ({ bookingData, onEdit }: BookingSummaryProps) => {
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

  const calculateSubtotal = () => {
    return bookingData.price || 0;
  };

  const calculateAddOnsTotal = () => {
    return (bookingData.addOns?.length || 0) * 25;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateAddOnsTotal();
  };

  const hasServices = bookingData.service || bookingData.frequency || bookingData.bedrooms || (bookingData.addOns && bookingData.addOns.length > 0);

  return (
    <div className="sticky top-6">
      <Card className="shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Booking Summary</CardTitle>
            {hasServices && onEdit && (
              <button
                onClick={onEdit}
                className="text-primary hover:text-primary-dark transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">Review your selection</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Location */}
          {bookingData.location && (
            <div className="flex items-start gap-3 p-3 bg-accent rounded-lg">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm">Service Location</p>
                <p className="text-muted-foreground text-sm break-words">{bookingData.location}</p>
              </div>
            </div>
          )}

          {/* Selected Services */}
          <div>
            <h4 className="font-semibold mb-3">Selected Services</h4>
            
            {!hasServices ? (
              <div className="text-center py-8 text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8" />
                </div>
                <p>No services selected yet</p>
                <p className="text-sm">Add services to see your booking summary</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Service */}
                {bookingData.service && (
                  <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{getServiceName(bookingData.service)}</p>
                      {bookingData.frequency && (
                        <p className="text-muted-foreground text-xs">{getFrequencyName(bookingData.frequency)}</p>
                      )}
                    </div>
                    {bookingData.price && (
                      <span className="font-medium">${bookingData.price}</span>
                    )}
                  </div>
                )}

                {/* Bedrooms */}
                {bookingData.bedrooms && (
                  <div className="flex items-center gap-3 p-3 bg-background border rounded-lg">
                    <Home className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      {bookingData.bedrooms} bedroom{bookingData.bedrooms > 1 ? 's' : ''}
                    </span>
                  </div>
                )}

                {/* Add-ons */}
                {bookingData.addOns && bookingData.addOns.length > 0 && (
                  <div className="space-y-2">
                    <p className="font-medium text-sm">Add-ons</p>
                    {bookingData.addOns.map((addOn, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-background border rounded text-sm">
                        <span>{addOn}</span>
                        <span className="font-medium">$25</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pricing Breakdown */}
                {bookingData.price && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Service Fee</span>
                        <span>${calculateSubtotal()}</span>
                      </div>
                      
                      {bookingData.addOns && bookingData.addOns.length > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span>Add-ons ({bookingData.addOns.length})</span>
                          <span>${calculateAddOnsTotal()}</span>
                        </div>
                      )}
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center font-bold text-lg mb-4">
                        <span>Total</span>
                        <span className="text-primary">${calculateTotal()}</span>
                      </div>

                      {/* Checkout Button */}
                      <Button 
                        className="w-full hero-button text-lg py-6"
                        size="lg"
                      >
                        <CreditCard className="mr-2 w-5 h-5" />
                        Proceed to Checkout
                      </Button>
                      
                      <div className="flex items-center justify-center gap-2 mt-3">
                        <Lock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Secure payment powered by Stripe
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSummary;