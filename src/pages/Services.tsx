import { Link } from "react-router-dom";
import {
  Ruler,
  Truck,
  Wrench,
  Palette,
  ShieldCheck,
  Clock,
  Package,
  Award,
  Gem,
  Building,
  FileCheck,
  Headphones,
  Leaf,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";

const iconMap: { [key: string]: any } = {
  Ruler,
  Truck,
  Wrench,
  Palette,
  ShieldCheck,
  Clock,
  Package,
  Award,
  Gem,
  Building,
  FileCheck,
  Headphones,
  Leaf,
};

const defaultServices = [
  {
    icon: "Ruler",
    title: "Custom Fabrication",
    description: "Precision cutting and fabrication to your exact specifications.",
    features: ["Accurate measurements", "CNC precision cutting", "Edge profiling", "Custom shapes"],
  },
  {
    icon: "Truck",
    title: "Delivery & Logistics",
    description: "Safe and timely delivery to your project site.",
    features: ["Secure packaging", "Pan-India delivery", "Real-time tracking", "Insurance coverage"],
  },
  {
    icon: "Wrench",
    title: "Installation Support",
    description: "Expert guidance and support for seamless installation.",
    features: ["Site inspection", "Technical support", "Installation training", "Best practices"],
  },
  {
    icon: "Palette",
    title: "Design Consultation",
    description: "Professional advice to select the perfect quartz for your space.",
    features: ["Color matching", "Material selection", "Space planning", "Trend insights"],
  },
  {
    icon: "ShieldCheck",
    title: "Quality Assurance",
    description: "Rigorous quality checks at every stage of production.",
    features: ["Material testing", "Dimension accuracy", "Finish inspection", "Certification"],
  },
  {
    icon: "Clock",
    title: "After-Sales Support",
    description: "Continued support and maintenance guidance post-installation.",
    features: ["Warranty service", "Care instructions", "Repair support", "Replacement parts"],
  },
  {
    icon: "Package",
    title: "Samples & Showroom",
    description: "View and order samples before you decide. Visit our showroom for a hands-on experience.",
    features: ["Sample kits", "Showroom visits", "Material swatches", "Comparison guides"],
  },
  {
    icon: "FileCheck",
    title: "Export & Documentation",
    description: "Full export support and documentation for international and industrial buyers.",
    features: ["Export documentation", "Customs support", "Certificates of origin", "Quality certificates"],
  },
  {
    icon: "Gem",
    title: "Raw & Processed Quartz",
    description: "Supply of raw quartz, lumps, grits, powder, and processed grades for industrial use.",
    features: ["Raw quartz", "Lumps & grits", "Powder & HPQ", "Snow white & specialty grades"],
  },
  {
    icon: "Headphones",
    title: "Technical Support",
    description: "Dedicated support for product specifications, usage, and troubleshooting.",
    features: ["Product specifications", "Usage guidance", "Technical queries", "Application advice"],
  },
  {
    icon: "Building",
    title: "Bulk & Project Supply",
    description: "Large-volume supply for projects, contractors, and commercial applications.",
    features: ["Bulk pricing", "Project timelines", "Dedicated coordination", "Volume discounts"],
  },
  {
    icon: "Award",
    title: "Certification & Compliance",
    description: "Quality certifications and compliance documentation for your requirements.",
    features: ["Quality certifications", "Test reports", "Compliance docs", "Sustainability info"],
  },
  {
    icon: "Leaf",
    title: "Sustainability",
    description: "Environmentally conscious sourcing and processes where applicable.",
    features: ["Responsible sourcing", "Efficiency practices", "Recyclability info", "Environmental compliance"],
  },
];

const Services = () => {
  const { data: services, isLoading } = useServices();

  const displayServices = services && services.length > 0 ? services : null;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsl(var(--primary-foreground)/0.08),transparent)]" />
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our Services
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Comprehensive solutions from selection to installation, ensuring your complete satisfaction.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(displayServices || defaultServices).map((service, index) => {
              const Icon = iconMap[(service as any).icon || "ShieldCheck"] || ShieldCheck;
              return (
                <Card key={(service as any).id || index} className="hover:shadow-lg transition-shadow bg-card/95 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden bg-muted/50">
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team is ready to help you with any special requirements or custom projects.
          </p>
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
