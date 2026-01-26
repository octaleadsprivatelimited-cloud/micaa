import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFAQs } from "@/hooks/useFAQs";

const defaultFAQs = [
  {
    question: "What is engineered quartz?",
    answer: "Engineered quartz is a man-made stone product that combines natural quartz crystals (one of the hardest minerals on earth) with resins, polymers, and pigments. This creates a durable, non-porous surface that's ideal for countertops and other applications.",
  },
  {
    question: "How durable are quartz surfaces?",
    answer: "Quartz surfaces are extremely durable and resistant to scratches, stains, and heat. They're harder than granite and don't require sealing. With proper care, they can last a lifetime.",
  },
  {
    question: "Do you offer installation services?",
    answer: "We provide comprehensive installation support and can recommend certified installation partners in your area. Our team will guide you through the entire process from measurement to final installation.",
  },
  {
    question: "What warranty do you offer?",
    answer: "We offer a 10-year warranty on all our quartz surfaces, covering manufacturing defects. Terms and conditions apply. Please contact us for complete warranty details.",
  },
  {
    question: "How do I maintain quartz surfaces?",
    answer: "Quartz surfaces are easy to maintain. Simply clean with mild soap and water. Avoid harsh chemicals and abrasive cleaners. For stubborn stains, use a non-abrasive cleaner and a soft cloth.",
  },
  {
    question: "Can I see samples before ordering?",
    answer: "Yes! We encourage customers to view samples before making a decision. Contact us to arrange a sample viewing at our showroom or request samples to be delivered to your location.",
  },
  {
    question: "What is the lead time for orders?",
    answer: "Standard orders typically take 7-10 business days for fabrication. Custom orders may take longer. Delivery times vary based on location. Contact us for specific timelines for your project.",
  },
  {
    question: "Do you deliver across India?",
    answer: "Yes, we deliver quartz surfaces across India. Delivery charges and timelines vary based on location. We ensure safe packaging and handling for all shipments.",
  },
];

const FAQ = () => {
  const { data: faqs, isLoading } = useFAQs();

  const displayFAQs = faqs && faqs.length > 0 ? faqs : defaultFAQs;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-navy text-primary-foreground">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            Find answers to common questions about our quartz products and services.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container max-w-3xl">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="p-4 animate-pulse">
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </Card>
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {displayFAQs.map((faq, index) => (
                <AccordionItem
                  key={(faq as any).id || index}
                  value={`item-${index}`}
                  className="border rounded-lg px-6 data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-display font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {/* Still have questions */}
          <Card className="mt-12 p-8 text-center bg-muted/30">
            <h3 className="text-xl font-display font-semibold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
