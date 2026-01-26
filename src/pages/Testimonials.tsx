import { Card } from "@/components/ui/card";
import { ParallaxBackground, ParallaxBackgroundSubtle } from "@/components/ui/parallax-background";
import { useTestimonials } from "@/hooks/useTestimonials";

// Background images
import bgTestimonials from "@/assets/bg-testimonials.webp";

const Testimonials = () => {
  const { data: testimonials, isLoading } = useTestimonials();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <ParallaxBackground imageSrc={bgTestimonials} overlay="bg-primary/80" speed={0.3} />
        <div className="container relative z-10 text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Customer Testimonials
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            See what our satisfied customers have to say about their experience with us.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 relative overflow-hidden">
        <ParallaxBackgroundSubtle imageSrc={bgTestimonials} overlay="bg-background/95" speed={0.15} />
        <div className="container relative z-10">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="h-5 w-5 bg-muted rounded" />
                    ))}
                  </div>
                  <div className="h-24 bg-muted rounded mb-4" />
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div>
                      <div className="h-4 w-24 bg-muted rounded mb-1" />
                      <div className="h-3 w-16 bg-muted rounded" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-shadow bg-card/95 backdrop-blur-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-secondary fill-secondary" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    {[...Array(5 - (testimonial.rating || 5))].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-muted-foreground/30" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    {testimonial.image_url ? (
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-lg">
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
          ) : (
            <Card className="p-12 text-center bg-card/95 backdrop-blur-sm">
              <p className="text-muted-foreground">
                No testimonials yet. Check back soon!
              </p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
