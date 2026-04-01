import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const message = encodeURIComponent(
    "Hi Daryl! I'm interested in booking a tour/taxi in Antigua. 🌴"
  );

  return (
    <a
      href={`https://wa.me/12681234567?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] group"
      aria-label="Chat with Daryl on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring" />
      <span className="relative flex items-center justify-center w-[60px] h-[60px] rounded-full bg-whatsapp shadow-xl hover:scale-110 transition-transform duration-200">
        <MessageCircle className="text-antigua-white" size={28} fill="white" />
      </span>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-antigua-black text-antigua-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with Daryl
      </span>
    </a>
  );
};

export default WhatsAppButton;
