import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { ParallaxBackground, ParallaxBackgroundSubtle } from "@/components/ui/parallax-background";
import { useBlogPosts } from "@/hooks/useBlogPosts";

// Background images
import bgBlog from "@/assets/bg-blog.webp";

const Blog = () => {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <ParallaxBackground imageSrc={bgBlog} overlay="bg-primary/80" speed={0.3} />
        <div className="container relative z-10 text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Blog & News
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            Stay updated with the latest trends, tips, and news from the world of quartz surfaces.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 relative overflow-hidden">
        <ParallaxBackgroundSubtle imageSrc={bgBlog} overlay="bg-background/97" speed={0.1} />
        <div className="container relative z-10">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-1/3 mb-3" />
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow bg-card/95 backdrop-blur-sm">
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative h-48 bg-muted overflow-hidden">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        {post.published_at
                          ? format(new Date(post.published_at), "MMMM d, yyyy")
                          : format(new Date(post.created_at), "MMMM d, yyyy")}
                      </p>
                      <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-card/95 backdrop-blur-sm">
              <p className="text-muted-foreground">
                No blog posts yet. Check back soon for updates!
              </p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
