import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ParallaxBackground, ParallaxBackgroundSubtle } from "@/components/ui/parallax-background";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { getProductWhatsAppMessage, getWhatsAppLink } from "@/lib/constants";

// Background images
import bgProducts from "@/assets/bg-products.webp";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories } = useCategories();

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <ParallaxBackground imageSrc={bgProducts} overlay="bg-primary/80" speed={0.3} />
        <div className="container relative z-10 text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our Products
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            Explore our extensive collection of premium quartz surfaces for every application.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
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

      {/* Products Grid */}
      <section className="py-12 relative overflow-hidden">
        <ParallaxBackgroundSubtle imageSrc={bgProducts} overlay="bg-background/97" speed={0.1} />
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
                      <h3 className="font-display font-semibold mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description || "Premium quartz surface"}
                      </p>
                      <div className="flex gap-2">
                        <Button asChild size="sm" className="flex-1">
                          <Link to={`/products/${product.id}`}>View</Link>
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="bg-[#25D366] border-[#25D366] text-white hover:bg-[#128C7E]"
                        >
                          <a
                            href={getWhatsAppLink(
                              product.whatsapp_message || getProductWhatsAppMessage(product.name)
                            )}
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
