import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Social Media */}
          <div>
            <div className="flex space-x-4">
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-background mb-4">COMPANY</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Career</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Press</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-background mb-4">SERVICES</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Residential</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Office Cleaning</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Commercial Cleaning</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-background mb-4">SUPPORT</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">FAQ's</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-background mr-4">CleanCo</h3>
              <span className="text-background/70 text-sm">© CleanCo. All rights reserved.</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/70 hover:text-background transition-colors">Terms of Service</a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;