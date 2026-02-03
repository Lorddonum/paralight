import { useState } from "react";
import { Phone, Mail, ArrowUp, X, MessageCircle, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingSidebar() {
  const [isVisible, setIsVisible] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showWeChat, setShowWeChat] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('.overflow-y-scroll');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const companyPhone = "+86 181 2825 9727";
  const companyEmail = "inquiry@paralight.cc";

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-2"
          >
            <div
              className="relative group"
              onMouseEnter={() => setShowPhone(true)}
              onMouseLeave={() => setShowPhone(false)}
            >
              <button className="w-12 h-12 rounded-full bg-white border-2 border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg">
                <Phone className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {showPhone && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute right-14 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-lg shadow-xl px-4 py-2 whitespace-nowrap"
                  >
                    <a href={`tel:${companyPhone}`} className="text-sm font-medium text-gray-700 hover:text-[#00A8E8]">
                      {companyPhone}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => setShowEmail(true)}
              onMouseLeave={() => setShowEmail(false)}
            >
              <button className="w-12 h-12 rounded-full bg-white border-2 border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg">
                <Mail className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {showEmail && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute right-14 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-lg shadow-xl px-4 py-2 whitespace-nowrap"
                  >
                    <a href={`mailto:${companyEmail}`} className="text-sm font-medium text-gray-700 hover:text-[#00A8E8]">
                      {companyEmail}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => setShowWeChat(true)}
              onMouseLeave={() => setShowWeChat(false)}
            >
              <button className="w-12 h-12 rounded-full bg-white border-2 border-[#07C160] text-[#07C160] hover:bg-[#07C160] hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg">
                <MessageCircle className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {showWeChat && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute right-14 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-xl shadow-xl p-4"
                  >
                    <div className="w-72 h-auto">
                      <img src="/wechat-qr.png?v=4" alt="WeChat QR Code" className="w-full h-auto object-contain" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => setShowWhatsApp(true)}
              onMouseLeave={() => setShowWhatsApp(false)}
            >
              <button className="w-12 h-12 rounded-full bg-white border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
              <AnimatePresence>
                {showWhatsApp && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute right-14 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-xl shadow-xl p-4"
                  >
                    <div className="w-72 h-auto">
                      <img src="/whatsapp-qr.png" alt="WhatsApp QR Code" className="w-full h-auto object-contain" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-white border-2 border-[#ECAA00] text-[#ECAA00] hover:bg-[#ECAA00] hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
            >
              <ArrowUp className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsVisible(false)}
              className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 text-gray-500 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center shadow-lg mt-2"
              title="Hide sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            onClick={() => setIsVisible(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 w-8 h-16 bg-[#00A8E8] text-white rounded-l-lg shadow-lg flex items-center justify-center hover:bg-[#0090c8] transition-colors"
            title="Show contact options"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
