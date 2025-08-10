import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Calendar, MapPin, User, Phone, Mail, Clock, CreditCard, FileText } from "lucide-react";

interface BookingConfirmationProps {
  bookingData: {
    location?: string;
    service?: string;
    frequency?: string;
    bedrooms?: number;
    addOns?: string[];
    price?: number;
    email?: string;
    name?: string;
    phone?: string;
    address?: string;
    timeSlot?: string;
    instructions?: string;
  };
}

const BookingConfirmation = ({ bookingData }: BookingConfirmationProps) => {
  const bookingId = `CLS${Date.now().toString().slice(-6)}`;
  const trackingNumber = `TRK${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  
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
    const basePrice = bookingData.price || 0;
    const addOnsPrice = (bookingData.addOns?.length || 0) * 25;
    const bedroomPrice = (bookingData.bedrooms || 1) > 1 ? ((bookingData.bedrooms || 1) - 1) * 25 : 0;
    return basePrice + addOnsPrice + bedroomPrice;
  };

  return (
    <section className="py-12 bg-service-gradient min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Booking <span className="text-primary">Confirmed!</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Your cleaning service has been successfully booked. We'll be in touch soon!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">Booking ID</p>
                  <p className="font-bold">{bookingId}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Tracking Number</p>
                  <p className="font-bold text-primary">{trackingNumber}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{getServiceName(bookingData.service || "")}</p>
                    {bookingData.frequency && (
                      <p className="text-sm text-muted-foreground">
                        {getFrequencyName(bookingData.frequency)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Service Address</p>
                    <p className="text-sm text-muted-foreground">{bookingData.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Preferred Time</p>
                    <p className="text-sm text-muted-foreground">{bookingData.timeSlot}</p>
                  </div>
                </div>

                {bookingData.bedrooms && (
                  <div className="text-sm">
                    <span className="font-medium">Bedrooms:</span> {bookingData.bedrooms}
                  </div>
                )}

                {bookingData.addOns && bookingData.addOns.length > 0 && (
                  <div className="text-sm">
                    <span className="font-medium">Add-ons:</span> {bookingData.addOns.join(", ")}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact & Payment Info */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{bookingData.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{bookingData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{bookingData.phone}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Payment</p>
                  <p className="text-sm text-muted-foreground">Payment on service completion</p>
                </div>
              </div>

              <Separator />

              <div className="bg-accent rounded-lg p-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">${calculateTotal()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="shadow-medium mt-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-foreground font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Confirmation Call</h4>
                <p className="text-sm text-muted-foreground">
                  We'll call you within 24 hours to confirm your booking details.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-foreground font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Service Day</h4>
                <p className="text-sm text-muted-foreground">
                  Our professional team will arrive at your scheduled time.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-foreground font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Enjoy Clean Space</h4>
                <p className="text-sm text-muted-foreground">
                  Relax and enjoy your sparkling clean home!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button 
            onClick={() => window.location.reload()}
            className="hero-button"
          >
            Book Another Service
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookingConfirmation;