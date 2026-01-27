import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminServices from "./pages/admin/AdminServices";
import AdminFAQs from "./pages/admin/AdminFAQs";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/services" element={<Services />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/categories" element={<AdminCategories />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/gallery" element={<AdminGallery />} />
                  <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                  <Route path="/admin/blog" element={<AdminBlog />} />
                  <Route path="/admin/services" element={<AdminServices />} />
                  <Route path="/admin/faqs" element={<AdminFAQs />} />
                  <Route path="/admin/messages" element={<AdminMessages />} />
                </Route>
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
