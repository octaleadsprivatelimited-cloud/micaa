export const COMPANY_INFO = {
  name: "SVN EXIM",
  tagline: "Premium Quartz Surfaces",
  phone: "+91 8639132193",
  whatsapp: "+918639132193",
  email: "globalminerals@svnexim.in",
  address: "HOUSE NO: 345B, DOOR NO: 26-10/1/1208, WARD NO: 26, GROUND FLOOR, PADARUPALLI, NELLORE, SPSR NELLORE, ANDHRA PRADESH - 524004.",
  socialLinks: {
    facebook: "https://facebook.com/svnexim",
    instagram: "https://instagram.com/svnexim",
    linkedin: "https://linkedin.com/company/svnexim",
    youtube: "https://youtube.com/@svnexim",
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

export const DEFAULT_WHATSAPP_MESSAGE = `Hello SVN EXIM! I'm interested in your Quartz products. Please provide more information.`;

export const getWhatsAppLink = (message: string = DEFAULT_WHATSAPP_MESSAGE) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodedMessage}`;
};

export const getProductWhatsAppMessage = (productName: string) => {
  return `Hello SVN EXIM! I'm interested in the "${productName}" product. Please provide pricing and availability details.`;
};
