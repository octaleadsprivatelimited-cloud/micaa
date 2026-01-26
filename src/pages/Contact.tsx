import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY_INFO, getWhatsAppLink } from "@/lib/constants";
import { z } from "zod";

// Background images
import bgContact from "@/assets/bg-contact.webp";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
  subject: z.string().trim().max(200, "Subject must be less than 200 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([{
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone || null,
          subject: result.data.subject || null,
          message: result.data.message,
        }]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "Our Office",
      content: COMPANY_INFO.address,
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: COMPANY_INFO.phone,
      link: `tel:${COMPANY_INFO.phone}`,
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon - Sat: 9:00 AM - 6:00 PM",
    },
    {
      icon: Mail,
      title: "Email",
      content: COMPANY_INFO.email,
      link: `mailto:${COMPANY_INFO.email}`,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgContact})` }}
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="container relative z-10 text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            Get in touch with our team. We're here to help with your quartz surface needs.
          </p>
        </div>
      </section>

      {/* Contact Section - New Layout */}
      <section className="py-16 bg-navy-dark">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Side - Contact Info Cards (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-4">
              {contactCards.map((card, index) => (
                <Card key={index} className="bg-background border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full min-h-[180px]">
                    <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center mb-4">
                      <card.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">{card.title}</h3>
                    {card.link ? (
                      <a
                        href={card.link}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors text-center leading-relaxed"
                      >
                        {card.content}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center leading-relaxed">{card.content}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right Side - Contact Form */}
            <Card className="bg-primary border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-display font-bold mb-6 text-primary-foreground">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Enter your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      maxLength={100}
                      className="bg-background border-0 h-12 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter a valid email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      maxLength={255}
                      className="bg-background border-0 h-12 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number (optional)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      maxLength={20}
                      className="bg-background border-0 h-12 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Enter your message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      maxLength={1000}
                      className="bg-background border-0 text-foreground placeholder:text-muted-foreground resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8 h-12"
                  >
                    {loading ? "Sending..." : "SUBMIT"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-8">
            <Card className="bg-[#25D366] border-0">
              <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="font-display font-semibold text-lg text-white mb-1">
                    Prefer WhatsApp?
                  </h3>
                  <p className="text-white/80 text-sm">
                    Chat with us instantly for quick responses.
                  </p>
                </div>
                <Button
                  asChild
                  className="bg-white text-[#25D366] hover:bg-white/90 font-semibold"
                >
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
