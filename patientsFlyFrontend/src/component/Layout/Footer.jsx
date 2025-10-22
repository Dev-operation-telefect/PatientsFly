import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
} from "lucide-react";
import { useLanguage } from "../context/useLanguage";
import { useTheme } from "../context/ThemeContext";

const LOGO_LIGHT =
  "https://res.cloudinary.com/dtqvpdacj/image/upload/v1760349338/Patients-fly-logo_Dark_cydmzj.png";
const LOGO_DARK =
  "https://res.cloudinary.com/dtqvpdacj/image/upload/v1760349338/Patients-fly-logo_light_ybcyj7.png";

export default function Footer() {
  const { t } = useLanguage("en");
  const { darkMode } = useTheme();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <footer
        className={`w-full ${
          darkMode ? "bg-[#a5a3a3] text-slate-200" : "bg-main-color text-white"
        }`}
      >
        {/* ===== Main Footer Section ===== */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 dark:text-white"
          data-aos="fade-up"
        >
          {/* ===== Column 1: Logo & Description ===== */}
          <div>
            <img
              src={darkMode ? LOGO_DARK : LOGO_LIGHT}
              alt="PatientFly Logo"
              className="h-10 mb-4"
            />
            <p className="text-sm leading-relaxed opacity-90">
              {t("description")}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-5">
              <a href="#" className="hover:opacity-80 transition" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:opacity-80 transition" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:opacity-80 transition" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:opacity-80 transition" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* ===== Column 2: Useful Links ===== */}
          <div>
            <h3 className="text-base font-semibold mb-4">{t("usefulLinks")}</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="/about-us" className="hover:underline">
                  {t("aboutUs")}
                </a>
              </li>
              <li>
                <a href="/services" className="hover:underline">
                  {t("ourServices")}
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:underline">
                  {t("privacyPolicy")}
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:underline">
                  {t("blog")}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* ===== Column 3: Contact Info ===== */}
          <div>
            <h3 className="text-base font-semibold mb-4">{t("contactTitle")}</h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>{t("address")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+8801928559911</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@patientfly.com</span>
              </li>
            </ul>
          </div>

          {/* ===== Column 4: Newsletter ===== */}
          <div>
            <h3 className="text-base font-semibold mb-4">{t("newsletterTitle")}</h3>
            <p className="text-sm opacity-90 mb-3">{t("newsletterText")}</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className={`w-full px-3 py-2 rounded-md text-sm outline-none ${
                  darkMode
                    ? "bg-slate-800 border border-slate-700 text-white"
                    : "bg-white text-gray-800"
                }`}
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
              >
                {t("sendButton")}
              </button>
            </form>
          </div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <div
          className={`text-center text-xs py-3 border-t ${
            darkMode
              ? "border-slate-800 text-slate-400"
              : "border-teal-700 text-white/70"
          }`}
        >
          © {new Date().getFullYear()} PatientFly.co. {t("rights")}
        </div>
      </footer>

      {/* ===== Back to Top Button ===== */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-5 right-5 p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 ${
            darkMode
              ? "bg-red-600 text-white"
              : "bg-white text-[#075e67] hover:bg-gray-100"
          }`}
          aria-label="Back to Top"
          data-aos="zoom-in"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </>
  );
}
