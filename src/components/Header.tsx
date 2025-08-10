import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/5ed26db5-c793-4c52-9bc8-7e08b46bc4e2.png" 
              alt="Cléan Logo" 
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#residential" className="text-foreground hover:text-primary transition-colors font-medium">
              Residential
            </a>
            <a href="#office" className="text-foreground hover:text-primary transition-colors font-medium">
              Office
            </a>
            <a href="#commercial" className="text-foreground hover:text-primary transition-colors font-medium">
              Commercial
            </a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors font-medium">
              FAQ's
            </a>
          </nav>

          {/* Login Button */}
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;