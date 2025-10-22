import React, { useEffect } from "react";
import { Phone, Mail } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";


export default function ContactSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
        <section
            className="bg-[#d11d1d] text-white py-12 px-4 dark:bg-black"
            data-aos="fade-up"
        >
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-2">Need Help?</h2>
            <p className="text-sm mb-6">
              Emergency Call-to-Action. Call our 24/7 Hotline
            </p>
    
            <div
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              {/* Phone / Whatsapp */}
              <a
                href="https://wa.me/8801929559911"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-main-color text-white px-5 py-3 rounded-md hover:bg-[#17669e] transition-all shadow-md dark:bg-main-color dark:hover:bg-[#17669e]"
              >
                <Phone size={18} />
                <div className="text-left">
                  <p className="text-xs leading-none opacity-80">
                    Phone/Whatsapp
                  </p>
                  <p className="text-sm font-medium">+8801929559911</p>
                </div>
              </a>
    
              {/* Email */}
              <a
                href="mailto:info@patientfly.com"
                className="flex items-center gap-2 border border-white px-5 py-3 rounded-md hover:bg-white hover:text-[#d11d1d] transition-all shadow-md dark:border-gray-200 dark:hover:text-[#b01717]"
              >
                <Mail size={18} />
                <div className="text-left">
                  <p className="text-xs leading-none opacity-80">Email</p>
                  <p className="text-sm font-medium">info@patientfly.com</p>
                </div>
              </a>
            </div>
          </div>
        </section>
    </>
  );
}
