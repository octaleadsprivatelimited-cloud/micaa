import { useState } from "react";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ParallaxBackground, ParallaxBackgroundSubtle } from "@/components/ui/parallax-background";
import { useGallery } from "@/hooks/useGallery";

// Background images
import bgGallery from "@/assets/bg-gallery.webp";

const Gallery = () => {
  const { data: images, isLoading } = useGallery();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <ParallaxBackground imageSrc={bgGallery} overlay="bg-primary/80" speed={0.3} />
        <div className="container relative z-10 text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Gallery
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            Explore our stunning quartz installations and get inspired for your next project.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 relative overflow-hidden">
        <ParallaxBackgroundSubtle imageSrc={bgGallery} overlay="bg-background/95" speed={0.15} />
        <div className="container relative z-10">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : images && images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <Card
                  key={image.id}
                  className="overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image.image_url)}
                >
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <img
                      src={image.image_url}
                      alt={image.title || "Gallery image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {image.title && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div>
                          <p className="text-white font-medium">{image.title}</p>
                          {image.description && (
                            <p className="text-white/70 text-sm">{image.description}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-card/95 backdrop-blur-sm">
              <p className="text-muted-foreground">
                No gallery images yet. Check back soon for beautiful quartz installations!
              </p>
            </Card>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>
          <img
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
