import { useState } from "react";
import { Phone, Mail, ArrowUp, X, MessageCircle, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingSidebar() {
  const [isVisible, setIsVisible] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showWeChat, setShowWeChat] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const companyPhone = "+86 750 3830 391";
  const companyEmail = "sales@paralight-led.com";

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
                    className="absolute right-14 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-xl shadow-xl p-3"
                  >
                    <div className="text-xs text-center text-gray-500 mb-2 font-medium">Scan to add on WeChat</div>
                    <img src="/wechat-qr.png" alt="WeChat QR Code" className="w-40 h-40 object-contain" />
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
