import { MessageCircle } from "lucide-react";
import { getWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

interface WhatsAppFloatProps {
  message?: string;
}

const WhatsAppFloat = ({ message = DEFAULT_WHATSAPP_MESSAGE }: WhatsAppFloatProps) => {
  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 animate-pulse-glow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppFloat;
