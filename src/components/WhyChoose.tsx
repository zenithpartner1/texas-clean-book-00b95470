import bookIcon from "@/assets/book-icon.jpg";
import cleanIcon from "@/assets/clean-icon.jpg";
import freedomIcon from "@/assets/freedom-icon.jpg";

const WhyChoose = () => {
  const features = [
    {
      icon: bookIcon,
      title: "BOOK",
      description: "Tell us when and where you want your cleaning.",
    },
    {
      icon: cleanIcon,
      title: "CLEAN",
      description: "A Professional cleaner comes over and cleans your place.",
    },
    {
      icon: freedomIcon,
      title: "FREEDOM",
      description: "Enjoy your life and come back to a clean space!",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Choose
              <span className="block text-primary">CleanCo?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We understand your home is important to you. That's why we focus on the quality of the clean. Our cleaners aren't contract workers - they are full-time employees. They care as much as we do.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="service-card mb-4">
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-16 h-16 mx-auto mb-4 rounded-lg"
                  />
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;