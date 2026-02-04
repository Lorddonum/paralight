import { useState } from "react";
import { Phone, Mail, ArrowUp, X, ChevronLeft } from "lucide-react";
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
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50"
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className="relative"
                onMouseEnter={() => setShowPhone(true)}
                onMouseLeave={() => setShowPhone(false)}
              >
                <button className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:border-[#00A8E8] hover:text-[#00A8E8] hover:bg-[#00A8E8]/10 transition-all duration-200 flex items-center justify-center shadow-sm">
                  <Phone className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showPhone && (
                    <motion.div
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      className="absolute right-12 top-1/2 -translate-y-1/2 bg-[#0A1628] text-white rounded-lg shadow-xl px-4 py-2.5 whitespace-nowrap"
                    >
                      <a href={`tel:${companyPhone}`} className="text-sm font-medium tracking-wide">
                        {companyPhone}
                      </a>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-[#0A1628]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setShowEmail(true)}
                onMouseLeave={() => setShowEmail(false)}
              >
                <button className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:border-[#00A8E8] hover:text-[#00A8E8] hover:bg-[#00A8E8]/10 transition-all duration-200 flex items-center justify-center shadow-sm">
                  <Mail className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showEmail && (
                    <motion.div
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      className="absolute right-12 top-1/2 -translate-y-1/2 bg-[#0A1628] text-white rounded-lg shadow-xl px-4 py-2.5 whitespace-nowrap"
                    >
                      <a href={`mailto:${companyEmail}`} className="text-sm font-medium tracking-wide">
                        {companyEmail}
                      </a>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-[#0A1628]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setShowWeChat(true)}
                onMouseLeave={() => setShowWeChat(false)}
              >
                <button className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:border-[#07C160] hover:text-[#07C160] hover:bg-[#07C160]/10 transition-all duration-200 flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {showWeChat && (
                    <motion.div
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      className="absolute right-12 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-3 border border-gray-200"
                    >
                      <div className="text-xs text-gray-500 text-center mb-2 font-medium">Scan with WeChat</div>
                      <div className="w-48 h-auto">
                        <img src="/wechat-qr.png?v=4" alt="WeChat QR Code" className="w-full h-auto object-contain" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setShowWhatsApp(true)}
                onMouseLeave={() => setShowWhatsApp(false)}
              >
                <button className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-200 flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {showWhatsApp && (
                    <motion.div
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      className="absolute right-12 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-3 border border-gray-200"
                    >
                      <div className="text-xs text-gray-500 text-center mb-2 font-medium">Scan with WhatsApp</div>
                      <div className="w-48 h-auto">
                        <img src="/whatsapp-qr.png" alt="WhatsApp QR Code" className="w-full h-auto object-contain" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-6 h-px bg-gray-300 my-1" />

              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:border-[#ECAA00] hover:text-[#ECAA00] hover:bg-[#ECAA00]/10 transition-all duration-200 flex items-center justify-center shadow-sm"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsVisible(false)}
                className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 transition-all duration-200 flex items-center justify-center"
                title="Hide"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            onClick={() => setIsVisible(true)}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-all duration-200 flex items-center justify-center shadow-sm"
            title="Contact"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
