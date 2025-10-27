import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Menu, X, Sun, Moon, Home } from "lucide-react";
import { useLanguage } from "../context/useLanguage";
import { useTheme } from "../context/ThemeContext";
import { Link, useLocation } from "react-router-dom";

const LOGO_LIGHT =
  "https://res.cloudinary.com/dtqvpdacj/image/upload/v1760349338/Patients-fly-logo_light_ybcyj7.png";
const LOGO_DARK =
  "https://res.cloudinary.com/dtqvpdacj/image/upload/v1760349338/Patients-fly-logo_Dark_cydmzj.png";

export default function Navbar() {
  const { language, t, setLanguage } = useLanguage("en");
  const { darkMode, setDarkMode } = useTheme();
  const location = useLocation(); // ✅ detect current route

  const [openMobile, setOpenMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Active link detection using location.pathname
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    AOS.init({ duration: 650, once: true });
    setActiveLink(location.pathname); // update when route changes
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: t("about"), link: "/about-us" },
    { label: t("services"), link: "/services" },
    { label: t("airAmbulance"), link: "/air-ambulance" },
    { label: t("blog"), link: "/blog" },
    { label: t("contact"), link: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div
        className={`transition-colors duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-white/70 dark:bg-slate-900/70 shadow"
            : "bg-transparent"
        }`}
      >
        {/* ===== Navbar Container ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* ===== Logo ===== */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={darkMode ? LOGO_DARK : LOGO_LIGHT}
              alt="Patients Fly"
              className="h-8 w-auto transition-all duration-300 md:h-14"
            />
          </Link>

          {/* ===== Desktop Menu ===== */}
          <nav
            data-aos="zoom-in"
            className="hidden md:flex items-center gap-8 rounded-full bg-emerald-800/90 px-8 py-3 shadow-2xl bg-main-color"
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
          >
            {/* Home Button */}
            <Link
              to="/"
              onClick={() => {
                setActiveLink("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span
                className={`inline-flex items-center justify-center rounded-full p-2 shadow transition ${
                  activeLink === "/"
                    ? "bg-red-700"
                    : "bg-red-700/70 hover:bg-red-600"
                }`}
              >
                <Home className="w-4 h-4 text-white" />
              </span>
            </Link>

            {/* Navigation Links */}
            {links.map((l) => (
              <Link
                key={l.link}
                to={l.link}
                onClick={() => setActiveLink(l.link)}
                className={`text-sm font-medium transition ${
                  activeLink === l.link
                    ? "text-red-600 underline underline-offset-4"
                    : "text-white hover:opacity-80"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ===== Right Controls ===== */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Theme"
              className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Language Switch */}
            <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 rounded-full px-2 py-1 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLanguage("bn")}
                className={`text-xs px-2 py-1 rounded-full ${
                  language === "bn"
                    ? "bg-red-600 text-white"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                BN
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`text-xs px-2 py-1 rounded-full ${
                  language === "en"
                    ? "bg-red-600 text-white"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpenMobile((v) => !v)}
              className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              {openMobile ? (
                <X className="w-5 h-5 text-slate-800 dark:text-slate-200" />
              ) : (
                <Menu className="w-5 h-5 text-slate-800 dark:text-slate-200" />
              )}
            </button>
          </div>
        </div>

        {/* ===== Mobile Menu ===== */}
        {openMobile && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center gap-3 bg-emerald-800/90 rounded-full px-6 py-3 mb-4">
                <Link
                  to="/"
                  onClick={() => {
                    setActiveLink("/");
                    setOpenMobile(false);
                  }}
                >
                  <span className="inline-flex items-center justify-center bg-red-700 rounded-full p-2 shadow">
                    <Home className="w-4 h-4 text-white" />
                  </span>
                </Link>
                <span className="text-white font-semibold">Menu</span>
              </div>

              <nav className="flex flex-col gap-2">
                {links.map((l) => (
                  <Link
                    key={l.link}
                    to={l.link}
                    onClick={() => {
                      setActiveLink(l.link);
                      setOpenMobile(false);
                    }}
                    className={`py-2 px-3 rounded-md transition ${
                      activeLink === l.link
                        ? "bg-emerald-700 text-main-color"
                        : "text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
      
    </header>
  );
}
