import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, MessageCircle, FileText, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProduct } from "@/hooks/useProducts";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  getWhatsAppLink,
  PAYMENT_TERMS_OPTIONS,
  getProductEnquiryWhatsAppMessage,
} from "@/lib/constants";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id || "");
  const { formatPrice } = useCurrency();

  if (isLoading) {
    return (
      <div className="container py-12">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-12">
        <Card className="p-12 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <section className="py-4 border-b">
        <div className="container">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link to="/products">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </section>

      {/* Product Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image Available
                  </div>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        className="w-full h-full object-cover hover:opacity-80 cursor-pointer transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  {(product as any).product_categories?.name || "Quartz Surface"}
                </p>
                {product.mine_name && (
                  <p className="text-sm text-muted-foreground mb-1">Mine: {product.mine_name}</p>
                )}
                <h1 className="text-3xl md:text-4xl font-display font-bold">{product.name}</h1>
              </div>

              {(product.actual_price || product.offer_price) && (
                <div className="flex flex-wrap gap-4 text-base">
                  {product.actual_price && (
                    <div>
                      <span className="text-muted-foreground">Actual price: </span>
                      <span className="font-semibold">{formatPrice(product.actual_price)}</span>
                    </div>
                  )}
                  {product.offer_price && (
                    <div>
                      <span className="text-muted-foreground">Offer price: </span>
                      <span className="font-semibold text-primary">{formatPrice(product.offer_price)}</span>
                    </div>
                  )}
                </div>
              )}

              {product.description && (
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              )}

              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="font-display font-semibold mb-3">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="lg"
                      className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Enquire on WhatsApp
                      <ChevronDown className="h-5 w-5 ml-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3" align="start">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Select payment terms
                    </p>
                    <div className="space-y-1">
                      {PAYMENT_TERMS_OPTIONS.map((opt) => (
                        <a
                          key={opt.value}
                          href={getWhatsAppLink(
                            getProductEnquiryWhatsAppMessage(product.name, opt.label)
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                        >
                          {opt.label}
                        </a>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Button asChild variant="outline" size="lg" className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/contact">Get Quote</Link>
                </Button>
              </div>

              {/* YouTube Video */}
              {product.youtube_url && (
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video">
                      <iframe
                        src={product.youtube_url.replace("watch?v=", "embed/")}
                        title={`${product.name} Video`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* PDF Brochure & Test Report */}
              {product.pdf_url && (
                <Button asChild variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground" size="lg">
                  <a href={product.pdf_url} target="_blank" rel="noopener noreferrer">
                    <Download className="h-5 w-5 mr-2" />
                    Download Product Brochure (PDF)
                  </a>
                </Button>
              )}
              {product.test_report_url && (
                <Button asChild variant="outline" className="w-full" size="lg">
                  <a href={product.test_report_url} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-5 w-5 mr-2" />
                    View Test Report
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
