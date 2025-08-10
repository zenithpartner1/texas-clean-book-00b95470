import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background/95 backdrop-blur-sm border-t border-border py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright and Links */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-xs">
              <span className="font-semibold text-foreground">Cléan</span> © Clean Co. All rights reserved
            </p>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
