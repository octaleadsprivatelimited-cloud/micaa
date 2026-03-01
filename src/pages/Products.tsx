import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, FileText, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  getWhatsAppLink,
  PAYMENT_TERMS_OPTIONS,
  getProductEnquiryWhatsAppMessage,
} from "@/lib/constants";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories } = useCategories();
  const { formatPrice } = useCurrency();

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero – gradient background (no image = faster load) */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsl(var(--primary-foreground)/0.08),transparent)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="container relative z-10 text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our Products
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Explore our extensive collection of premium quartz surfaces for every application.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b relative bg-muted/40">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px] bg-background">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid – light gradient, no heavy image */}
      <section className="py-12 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="container relative z-10">
          {productsLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <CardContent className="p-4">
                    <div className="h-5 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow bg-card/95 backdrop-blur-sm">
                    <div className="relative h-48 bg-muted overflow-hidden">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Image
                        </div>
                      )}
                      {product.is_featured && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded">
                          Featured
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground mb-1">
                        {(product as any).product_categories?.name || "Uncategorized"}
                      </div>
                      {product.mine_name && (
                        <div className="text-xs text-muted-foreground mb-0.5">
                          Mine: {product.mine_name}
                        </div>
                      )}
                      <h3 className="font-display font-semibold mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {product.description || "Premium quartz surface"}
                      </p>
                      {(product.actual_price || product.offer_price) && (
                        <div className="flex flex-wrap gap-2 text-sm mb-3">
                          {product.actual_price && (
                            <span className="text-muted-foreground">
                              Price: <span className="font-medium text-foreground">{formatPrice(product.actual_price)}</span>
                            </span>
                          )}
                          {product.offer_price && (
                            <span className="text-primary font-medium">
                              Offer: {formatPrice(product.offer_price)}
                            </span>
                          )}
                        </div>
                      )}
                      {product.test_report_url && (
                        <a
                          href={product.test_report_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mb-3"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          Test Report
                        </a>
                      )}
                      <div className="flex gap-2 mt-2">
                        <Button asChild size="sm" className="flex-1">
                          <Link to={`/products/${product.id}`}>View</Link>
                        </Button>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-[#25D366] border-[#25D366] text-white hover:bg-[#128C7E]"
                            >
                              Enquire
                              <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56 p-2" align="end">
                            <p className="text-xs font-medium text-muted-foreground mb-2 px-1">
                              Payment terms
                            </p>
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
                          </PopoverContent>
                        </Popover>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="p-12 text-center bg-card/95 backdrop-blur-sm">
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedCategory !== "all"
                  ? "No products match your search criteria."
                  : "No products available yet. Check back soon!"}
              </p>
              {(searchQuery || selectedCategory !== "all") && (
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
