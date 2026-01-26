import { Award, Users, Building, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ParallaxBackground, ParallaxBackgroundSubtle } from "@/components/ui/parallax-background";
import { COMPANY_INFO } from "@/lib/constants";

// Section background images
import bgAboutHero from "@/assets/bg-about-hero.webp";
import bgStory from "@/assets/bg-story.webp";
import bgMission from "@/assets/bg-mission.webp";
import bgValues from "@/assets/bg-values.webp";

const About = () => {
  const stats = [
    { icon: Award, value: "15+", label: "Years of Excellence" },
    { icon: Users, value: "5000+", label: "Happy Customers" },
    { icon: Building, value: "200+", label: "Projects Completed" },
    { icon: Globe, value: "20+", label: "Cities Served" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <ParallaxBackground imageSrc={bgAboutHero} overlay="bg-primary/80" speed={0.3} />
        <div className="container relative z-10 text-primary-foreground">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              About {COMPANY_INFO.name}
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Your trusted partner for premium quartz surfaces, delivering excellence in quality and service since 2009.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 relative overflow-hidden">
        <ParallaxBackgroundSubtle imageSrc={bgStory} overlay="bg-background/95" speed={0.2} />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {COMPANY_INFO.name} was founded with a vision to bring world-class quartz surfaces to homes and businesses across India. 
                  What started as a small enterprise has grown into one of the leading suppliers of premium engineered quartz in the region.
                </p>
                <p>
                  Our commitment to quality, innovation, and customer satisfaction has been the cornerstone of our success. 
                  We source the finest raw materials and employ cutting-edge manufacturing techniques to create surfaces that are not only beautiful but also incredibly durable.
                </p>
                <p>
                  Today, we serve architects, interior designers, contractors, and homeowners with a comprehensive range of quartz surfaces 
                  that cater to diverse aesthetic preferences and functional requirements.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="About SVN Global"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary/20 rounded-lg -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 md:gap-3">
                <div className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <stat.icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div>
                  <div className="text-lg md:text-2xl font-display font-bold text-primary leading-tight">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground leading-tight">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative overflow-hidden">
        <ParallaxBackgroundSubtle imageSrc={bgMission} overlay="bg-background/92" speed={0.15} />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-l-4 border-l-primary bg-card/95 backdrop-blur-sm">
              <h3 className="text-2xl font-display font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To provide premium quality quartz surfaces that transform living and working spaces, 
                while delivering exceptional value and service to our customers. We aim to be the preferred choice 
                for architects, designers, and homeowners seeking excellence in surface solutions.
              </p>
            </Card>
            <Card className="p-8 border-l-4 border-l-secondary bg-card/95 backdrop-blur-sm">
              <h3 className="text-2xl font-display font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the most trusted and innovative quartz surface provider in India, 
                setting new standards in quality, design, and sustainability. We envision a future where every 
                space is enhanced by the beauty and functionality of our products.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-10 md:py-20 relative overflow-hidden">
        <ParallaxBackground imageSrc={bgValues} overlay="bg-primary/85" speed={0.25} />
        <div className="container relative z-10 text-primary-foreground">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 md:mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { title: "Quality", description: "Uncompromising standards in every product we deliver." },
              { title: "Innovation", description: "Continuously improving our designs and processes." },
              { title: "Integrity", description: "Honest and transparent in all our dealings." },
              { title: "Customer First", description: "Your satisfaction is our ultimate goal." },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <span className="text-lg md:text-2xl font-display font-bold text-secondary-foreground">{index + 1}</span>
                </div>
                <h3 className="text-sm md:text-xl font-display font-semibold mb-1 md:mb-2">{value.title}</h3>
                <p className="text-primary-foreground/70 text-[10px] md:text-sm leading-tight">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
