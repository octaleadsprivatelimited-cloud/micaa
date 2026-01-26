import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_INFO, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const CollapsibleSection = ({
    title,
    children,
    sectionKey,
  }: {
    title: string;
    children: React.ReactNode;
    sectionKey: string;
  }) => {
    const isOpen = openSection === sectionKey;

    return (
      <div className="lg:block">
        {/* Mobile: Collapsible */}
        <button
          onClick={() => toggleSection(sectionKey)}
          className="lg:hidden w-full flex items-center justify-between py-3 border-b border-primary-foreground/20"
        >
          <h3 className="font-display font-semibold">{title}</h3>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-3">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop: Always visible */}
        <div className="hidden lg:block">
          <h3 className="font-display font-semibold mb-4">{title}</h3>
          {children}
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-8 lg:py-12">
        <div className="grid gap-4 lg:gap-8 lg:grid-cols-4">
          {/* Company Info - Always visible */}
          <div className="space-y-4 pb-4 lg:pb-0 border-b lg:border-b-0 border-primary-foreground/20">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <span className="font-display text-xl font-bold text-secondary-foreground">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold">{COMPANY_INFO.name}</span>
                <span className="text-xs text-primary-foreground/70">{COMPANY_INFO.tagline}</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 hidden lg:block">
              Leading manufacturer and supplier of premium quartz surfaces for residential and commercial applications.
            </p>
            <div className="flex gap-4">
              <a
                href={COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Collapsible on mobile */}
          <CollapsibleSection title="Quick Links" sectionKey="quicklinks">
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* Resources - Collapsible on mobile */}
          <CollapsibleSection title="Resources" sectionKey="resources">
            <ul className="space-y-2">
              {NAV_LINKS.slice(5).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </CollapsibleSection>

          {/* Contact Info - Collapsible on mobile */}
          <CollapsibleSection title="Contact Us" sectionKey="contact">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
          </CollapsibleSection>
        </div>

        <div className="mt-8 pt-6 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-primary-foreground/60">
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
