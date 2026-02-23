import { Link } from "react-router-dom";
import { Award, Users, Building, Globe, Gem, Lightbulb, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";

import aboutStoryImage from "@/assets/bg-story.webp";

const About = () => {
  const stats = [
    { icon: Award, value: "15+", label: "Years of Excellence" },
    { icon: Users, value: "5000+", label: "Happy Customers" },
    { icon: Building, value: "200+", label: "Projects Completed" },
    { icon: Globe, value: "20+", label: "Cities Served" },
  ];

  const values = [
    { icon: Gem, title: "Quality", description: "Uncompromising standards in every product we deliver." },
    { icon: Lightbulb, title: "Innovation", description: "Continuously improving our designs and processes." },
    { icon: ShieldCheck, title: "Integrity", description: "Honest and transparent in all our dealings." },
    { icon: Heart, title: "Customer First", description: "Your satisfaction is our ultimate goal." },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(var(--primary-foreground)/0.12),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary-foreground)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary-foreground)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative z-10 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground/90 text-sm font-medium mb-6">
              Who we are
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              About {COMPANY_INFO.name}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-8">
              Your trusted partner for premium quartz surfaces, delivering excellence in quality and service since 2009.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold rounded-full px-6">
                <Link to="/products">Explore products</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-6">
                <Link to="/contact">Get in touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 relative bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] max-h-[520px] rounded-2xl overflow-hidden bg-muted shadow-2xl shadow-primary/5">
                <img
                  src={aboutStoryImage}
                  alt={`${COMPANY_INFO.name} – Our story`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-primary/5 border border-primary/10" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Our story</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-8 text-foreground">
                From a small enterprise to a leading name
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
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
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-muted/40 border-y border-border/50">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/15 transition-colors">
                  <stat.icon className="h-6 w-6 md:h-7 md:w-7" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground tabular-nums tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Purpose</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 text-foreground">
              Our mission & vision
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <Card className="overflow-hidden rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 md:p-10">
                <div className="inline-flex h-12 w-12 rounded-xl bg-primary/10 text-primary items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
                  <span className="text-xl font-display font-bold">M</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-4 text-foreground">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide premium quality quartz surfaces that transform living and working spaces,
                  while delivering exceptional value and service to our customers. We aim to be the preferred choice
                  for architects, designers, and homeowners seeking excellence in surface solutions.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 md:p-10">
                <div className="inline-flex h-12 w-12 rounded-xl bg-secondary/20 text-secondary-foreground items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors">
                  <span className="text-xl font-display font-bold">V</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-4 text-foreground">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become the most trusted and innovative quartz surface provider in India,
                  setting new standards in quality, design, and sustainability. We envision a future where every
                  space is enhanced by the beauty and functionality of our products.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,hsl(var(--primary-foreground)/0.1),transparent)]" />
        <div className="container relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="text-sm font-medium text-primary-foreground/80 uppercase tracking-wider">What we stand for</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              Our core values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 md:p-8 bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-300 text-center"
              >
                <div className="inline-flex h-12 w-12 rounded-xl bg-primary-foreground/10 items-center justify-center mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-primary-foreground/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="secondary" className="rounded-full px-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold">
              <Link to="/contact" className="inline-flex items-center gap-2">
                Work with us <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
