import { Package, MessageSquare, FileText, Users, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";
import { useContactMessages } from "@/hooks/useContactMessages";
import { useAllBlogPosts } from "@/hooks/useBlogPosts";
import { useTestimonials } from "@/hooks/useTestimonials";

const AdminDashboard = () => {
  const { data: products } = useProducts();
  const { data: messages } = useContactMessages();
  const { data: posts } = useAllBlogPosts();
  const { data: testimonials } = useTestimonials();

  const unreadMessages = messages?.filter((m) => !m.is_read).length || 0;

  const stats = [
    {
      icon: Package,
      label: "Products",
      value: products?.length || 0,
      color: "bg-blue-500",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      value: messages?.length || 0,
      subValue: unreadMessages > 0 ? `${unreadMessages} unread` : undefined,
      color: "bg-orange-500",
    },
    {
      icon: FileText,
      label: "Blog Posts",
      value: posts?.length || 0,
      color: "bg-purple-500",
    },
    {
      icon: Users,
      label: "Testimonials",
      value: testimonials?.length || 0,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              {stat.subValue && (
                <p className="text-xs text-orange-500 mt-1">{stat.subValue}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          {messages && messages.length > 0 ? (
            <div className="space-y-4">
              {messages.slice(0, 5).map((message) => (
                <div
                  key={message.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-semibold">
                      {message.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.name}</span>
                      {!message.is_read && (
                        <span className="px-2 py-0.5 text-xs bg-orange-100 text-orange-600 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {message.subject || message.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No messages yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
