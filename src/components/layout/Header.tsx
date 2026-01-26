import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Logo
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
        when: "afterChildren" as const,
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
        when: "beforeChildren" as const,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <>
      {/* Top Bar - Hides on scroll */}
      <div
        className={cn(
          "bg-primary text-primary-foreground hidden md:block transition-all duration-300 overflow-hidden",
          isScrolled ? "h-0 opacity-0" : "h-auto opacity-100"
        )}
      >
        <div className="container py-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-1.5 hover:text-secondary transition-colors">
                <Mail className="h-3.5 w-3.5" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-1.5 hover:text-secondary transition-colors">
                <Phone className="h-3.5 w-3.5" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <span className="flex items-center gap-1.5 text-primary-foreground/70">
                <MapPin className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">{COMPANY_INFO.address}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a href={COMPANY_INFO.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a href={COMPANY_INFO.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a href={COMPANY_INFO.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logo} 
                alt={COMPANY_INFO.name} 
                className="h-12 w-12 object-contain rounded"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-display text-xl font-bold text-foreground leading-tight">{COMPANY_INFO.name}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{COMPANY_INFO.tagline}</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors relative",
                    isActive(link.path)
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  )}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-secondary" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button asChild size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-sm">
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="lg:hidden absolute top-16 left-0 right-0 z-50 bg-background border-t shadow-lg overflow-hidden"
            >
              <nav className="container py-4 flex flex-col">
                {NAV_LINKS.map((link) => (
                  <motion.div key={link.path} variants={itemVariants}>
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-sm font-medium border-b border-border/50",
                        isActive(link.path)
                          ? "text-primary bg-muted/50"
                          : "text-foreground/70 hover:text-primary hover:bg-muted/30"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants} className="pt-4 px-4 space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                  <Button asChild className="w-full bg-secondary text-secondary-foreground">
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                      Get a Quote
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
