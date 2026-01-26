export const COMPANY_INFO = {
  name: "SVN Global",
  tagline: "Premium Quartz Surfaces",
  phone: "+91 8639132193",
  whatsapp: "+918639132193",
  email: "info@svnglobal.com",
  address: "Industrial Area, Hyderabad, Telangana, India",
  socialLinks: {
    facebook: "https://facebook.com/svnglobal",
    instagram: "https://instagram.com/svnglobal",
    linkedin: "https://linkedin.com/company/svnglobal",
    youtube: "https://youtube.com/@svnglobal",
  },
};

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Gallery", path: "/gallery" },
  { name: "Services", path: "/services" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Blog", path: "/blog" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact", path: "/contact" },
];

export const DEFAULT_WHATSAPP_MESSAGE = `Hello SVN Global! I'm interested in your Quartz products. Please provide more information.`;

export const getWhatsAppLink = (message: string = DEFAULT_WHATSAPP_MESSAGE) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodedMessage}`;
};

export const getProductWhatsAppMessage = (productName: string) => {
  return `Hello SVN Global! I'm interested in the "${productName}" product. Please provide pricing and availability details.`;
};
