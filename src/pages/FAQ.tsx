import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ParallaxBackground, ParallaxBackgroundSubtle } from "@/components/ui/parallax-background";
import { useFAQs } from "@/hooks/useFAQs";
import { cn } from "@/lib/utils";

// Background images
import bgFaq from "@/assets/bg-faq.webp";

const faqCategories = [
  { id: "general", label: "General Questions" },
  { id: "products", label: "Products & Materials" },
  { id: "installation", label: "Installation" },
  { id: "maintenance", label: "Maintenance & Care" },
  { id: "ordering", label: "Ordering & Delivery" },
];

const defaultFAQs = [
  {
    id: "1",
    question: "What is engineered quartz?",
    answer: "Engineered quartz is a man-made stone product that combines natural quartz crystals (one of the hardest minerals on earth) with resins, polymers, and pigments. This creates a durable, non-porous surface that's ideal for countertops and other applications.",
    category: "general",
  },
  {
    id: "2",
    question: "How durable are quartz surfaces?",
    answer: "Quartz surfaces are extremely durable and resistant to scratches, stains, and heat. They're harder than granite and don't require sealing. With proper care, they can last a lifetime.",
    category: "products",
  },
  {
    id: "3",
    question: "Do you offer installation services?",
    answer: "We provide comprehensive installation support and can recommend certified installation partners in your area. Our team will guide you through the entire process from measurement to final installation.",
    category: "installation",
  },
  {
    id: "4",
    question: "What warranty do you offer?",
    answer: "We offer a 10-year warranty on all our quartz surfaces, covering manufacturing defects. Terms and conditions apply. Please contact us for complete warranty details.",
    category: "general",
  },
  {
    id: "5",
    question: "How do I maintain quartz surfaces?",
    answer: "Quartz surfaces are easy to maintain. Simply clean with mild soap and water. Avoid harsh chemicals and abrasive cleaners. For stubborn stains, use a non-abrasive cleaner and a soft cloth.",
    category: "maintenance",
  },
  {
    id: "6",
    question: "Can I see samples before ordering?",
    answer: "Yes! We encourage customers to view samples before making a decision. Contact us to arrange a sample viewing at our showroom or request samples to be delivered to your location.",
    category: "ordering",
  },
  {
    id: "7",
    question: "What is the lead time for orders?",
    answer: "Standard orders typically take 7-10 business days for fabrication. Custom orders may take longer. Delivery times vary based on location. Contact us for specific timelines for your project.",
    category: "ordering",
  },
  {
    id: "8",
    question: "Do you deliver across India?",
    answer: "Yes, we deliver quartz surfaces across India. Delivery charges and timelines vary based on location. We ensure safe packaging and handling for all shipments.",
    category: "ordering",
  },
  {
    id: "9",
    question: "What colors and patterns are available?",
    answer: "We offer a wide range of colors and patterns including marble-look, solid colors, and natural stone patterns. Visit our showroom or browse our products page to see our complete collection.",
    category: "products",
  },
  {
    id: "10",
    question: "Is professional installation required?",
    answer: "While DIY installation is possible, we strongly recommend professional installation to ensure proper fitting, sealing, and warranty coverage. Improper installation can void the warranty.",
    category: "installation",
  },
];

const FAQ = () => {
  const { data: faqs, isLoading } = useFAQs();
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Use database FAQs if available, otherwise use defaults with categories
  const displayFAQs = faqs && faqs.length > 0 
    ? faqs.map((faq, index) => ({ ...faq, category: faqCategories[index % faqCategories.length].id }))
    : defaultFAQs;

  const filteredFAQs = displayFAQs.filter((faq: any) => faq.category === selectedCategory);

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <ParallaxBackground imageSrc={bgFaq} overlay="bg-primary/80" speed={0.3} />
        <div className="container relative z-10 text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            Our platform is built to help you work smarter, not harder. It adapts to your needs and supports your goals. Make the most of every feature.
          </p>
        </div>
      </section>

      {/* FAQ Section - Two Column Layout */}
      <section className="py-16 relative overflow-hidden">
        <ParallaxBackgroundSubtle imageSrc={bgFaq} overlay="bg-background/95" speed={0.15} />
        <div className="container relative z-10">
          <Card className="overflow-hidden border-0 shadow-xl bg-background/80 backdrop-blur-sm">
            <div className="grid lg:grid-cols-[280px_1fr]">
              {/* Left Side - Category Tabs */}
              <div className="bg-muted/30 p-6 border-r border-border/50">
                <nav className="space-y-2">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setExpandedFaq(null);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200",
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-background hover:bg-muted text-foreground"
                      )}
                    >
                      <span className="font-medium text-sm">{category.label}</span>
                      <ChevronRight className={cn(
                        "h-4 w-4 transition-transform",
                        selectedCategory === category.id && "rotate-90"
                      )} />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Right Side - FAQ Items */}
              <div className="p-6 lg:p-8">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : filteredFAQs.length > 0 ? (
                  <div className="space-y-3">
                    {filteredFAQs.map((faq: any) => {
                      const faqId = faq.id || faq.question;
                      const isExpanded = expandedFaq === faqId;
                      
                      return (
                        <div
                          key={faqId}
                          className={cn(
                            "border-b border-border/50 pb-3 last:border-0",
                            isExpanded && "pb-4"
                          )}
                        >
                          <button
                            onClick={() => toggleFaq(faqId)}
                            className="w-full flex items-start justify-between gap-4 text-left group"
                          >
                            <span className={cn(
                              "font-medium transition-colors",
                              isExpanded ? "text-primary" : "text-foreground group-hover:text-primary"
                            )}>
                              {faq.question}
                            </span>
                            <div className={cn(
                              "shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-all",
                              isExpanded 
                                ? "bg-primary/10 text-primary" 
                                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                            )}>
                              {isExpanded ? (
                                <X className="h-3.5 w-3.5" />
                              ) : (
                                <ChevronRight className="h-3.5 w-3.5" />
                              )}
                            </div>
                          </button>
                          
                          {isExpanded && (
                            <div className="mt-3 text-muted-foreground text-sm leading-relaxed pl-0 pr-10 animate-fade-in">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No FAQs available in this category yet.
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Still have questions */}
          <Card className="mt-8 p-8 text-center bg-primary text-primary-foreground border-0">
            <h3 className="text-xl font-display font-semibold mb-2">Still have questions?</h3>
            <p className="text-primary-foreground/80 mb-6">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
