import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowRight, ArrowLeft, Mail, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailVerificationProps {
  onEmailVerified: (email: string) => void;
  onBack: () => void;
}

const EmailVerification = ({ onEmailVerified, onBack }: EmailVerificationProps) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      toast({
        title: "OTP Sent",
        description: "Check your email for the verification code.",
      });
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit code.",
        variant: "destructive",
      });
      return;
    }

    // Simulate OTP verification
    if (otp === "123456") {
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified.",
      });
      onEmailVerified(email);
    } else {
      toast({
        title: "Invalid OTP",
        description: "The code you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-12 bg-service-gradient min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {step === "email" ? "Enter Your" : "Verify Your"} <span className="text-primary">Email</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {step === "email" 
              ? "We'll send you a verification code to confirm your email address." 
              : "Enter the 6-digit code we sent to your email."}
          </p>
        </div>

        <Card className="shadow-medium">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              {step === "email" ? (
                <Mail className="w-8 h-8 text-primary" />
              ) : (
                <Shield className="w-8 h-8 text-primary" />
              )}
            </div>
            <CardTitle className="text-xl">
              {step === "email" ? "Email Address" : "Verification Code"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === "email" ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button 
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="w-full hero-button"
                >
                  {isLoading ? "Sending..." : "Send Verification Code"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Code sent to: <span className="font-medium">{email}</span>
                  </p>
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={handleVerifyOTP}
                    disabled={otp.length !== 6}
                    className="w-full hero-button"
                  >
                    Verify Email
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setStep("email")}
                    className="w-full"
                  >
                    Change Email
                  </Button>
                </div>
                
                <p className="text-center text-sm text-muted-foreground">
                  Didn't receive the code?{" "}
                  <button 
                    onClick={handleSendOTP}
                    className="text-primary hover:underline"
                  >
                    Resend
                  </button>
                </p>
                
                <div className="text-center text-xs text-muted-foreground bg-muted p-3 rounded">
                  <strong>Demo:</strong> Use code <strong>123456</strong> to proceed
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button 
            variant="outline"
            onClick={onBack}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EmailVerification;