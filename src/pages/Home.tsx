import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Shield, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFeaturedProducts } from "@/hooks/useProducts";
import { useTestimonials } from "@/hooks/useTestimonials";
import { COMPANY_INFO, getProductWhatsAppMessage, getWhatsAppLink } from "@/lib/constants";

// Hero images
import heroQuartz1 from "@/assets/hero-quartz-1.webp";
import heroQuartz2 from "@/assets/hero-quartz-2.webp";
import heroQuartz3 from "@/assets/hero-quartz-3.webp";
import heroQuartz4 from "@/assets/hero-quartz-4.webp";

const heroSlides = [
  {
    image: heroQuartz1,
    title: "Premium White Quartz",
    subtitle: "Elegant marble-like surfaces for modern kitchens",
  },
  {
    image: heroQuartz2,
    title: "Natural Quartz Crystal",
    subtitle: "Stunning blue and gold mineral textures",
  },
  {
    image: heroQuartz3,
    title: "Grey Marble Quartz",
    subtitle: "Sophisticated veining for luxury interiors",
  },
  {
    image: heroQuartz4,
    title: "Black & Gold Quartz",
    subtitle: "Premium engineered stone with dramatic appeal",
  },
];

const Home = () => {
  const { data: featuredProducts, isLoading: productsLoading } = useFeaturedProducts();
  const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Engineered quartz surfaces with superior durability and elegance.",
    },
    {
      icon: Shield,
      title: "10 Year Warranty",
      description: "Industry-leading warranty coverage for complete peace of mind.",
    },
    {
      icon: Sparkles,
      title: "Stunning Designs",
      description: "Wide range of colors and patterns to match any aesthetic.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section with Slider */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/70" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="container relative z-10 py-20 text-center text-primary-foreground">
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
              key={`badge-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4"
            >
              Premium Quartz Surfaces
            </motion.div>
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link to="/products">
                  Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contact">Get Free Quote</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/20 text-white hover:bg-background/40 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/20 text-white hover:bg-background/40 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-secondary w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Why Choose {COMPANY_INFO.name}?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver exceptional quartz surfaces that combine beauty, durability, and value.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Explore our most popular quartz surfaces.
              </p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link to="/products">
                View All Products <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {productsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-muted overflow-hidden">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex gap-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link to={`/products/${product.id}`}>View Details</Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="bg-[#25D366] border-[#25D366] text-white hover:bg-[#128C7E]"
                      >
                        <a
                          href={getWhatsAppLink(getProductWhatsAppMessage(product.name))}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Enquire
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No featured products yet. Check back soon!</p>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Our experts are ready to help you choose the perfect quartz surface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/contact">Request a Quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href={`tel:${COMPANY_INFO.phone}`}>
                Call Now: {COMPANY_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                What Our Clients Say
              </h2>
              <p className="text-muted-foreground">
                Don't just take our word for it.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((testimonial) => (
                <Card key={testimonial.id} className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-secondary fill-secondary" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    {testimonial.image_url ? (
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      {testimonial.company && (
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/testimonials">View All Testimonials</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
