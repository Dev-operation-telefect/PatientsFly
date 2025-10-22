import { useLanguage } from '../../component/context/useLanguage';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { HeartPulse, Users } from 'lucide-react';

const HeroSection = ({ value }) => {
  const { t } = useLanguage("en");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <section className="relative w-full py-16 md:py-32 overflow-hidden">
      {/* Left text area */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        <div
          className="md:w-1/2 text-center md:text-left"
          data-aos="fade-right"
        >
          <h1 className="text-3xl md:text-3xl font-bold text-[#004b54] leading-tight dark:text-white">
            {t(value.heroTitle) || "Where Counts Every Second, We Fly for You"}
          </h1>

          <p className="mt-4 text-gray-600 text-sm md:text-base max-w-xl mx-auto md:mx-0">
            {t(value.heroDescription) ||
              "Swift, safe, and specialized air ambulance services — ensuring patients receive world-class medical care without delay."}
          </p>

          <div className="flex justify-center md:justify-start gap-3 mt-6">
            <Link
              to="/contact"
              className="bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition-all"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              {t("bookNow") || "Book Now"}
            </Link>

            <a
              href="https://wa.me/8801929559911" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[#d32f2f] text-[#d32f2f] hover:bg-[#d32f2f] hover:text-white font-semibold px-4 py-2.5 rounded-full transition-all"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <i className="fa-solid fa-phone"></i> {t("callNow") || "Call Now"}
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                  <HeartPulse className="w-6 h-6 text-red-600 animate-pulse " />
                </div>
                <div>
                  <p className="font-semibold text-[#004b54] dark:text-white">Patient-first care</p>
                  <p className="text-sm opacity-80">24/7 medical and travel support</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                  <Users className="w-6 h-6 text-main-color animate-pulse" />
                </div>
                <div>
                  <p className="font-semibold text-[#004b54] dark:text-white">Trusted partners</p>
                  <p className="text-sm opacity-80">Top hospitals & clinics verified</p>
                </div>
              </div>
            </div>
        </div>

        {/* Right image */}
        <div
          className="md:w-1/2 flex justify-center"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <img
            src={value?.image}
            alt="Medical Equipment"
            className="w-full max-w-md md:max-w-xl rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
