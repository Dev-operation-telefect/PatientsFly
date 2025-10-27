// ClientTestimonials.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "../../component/context/useLanguage";
import { HeartPulse, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials.js";

export default function ClientTestimonials() {
  const { t } = useLanguage("en");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 3 } }, // 2XL
      { breakpoint: 1280, settings: { slidesToShow: 3 } }, // XL
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, // LG
      { breakpoint: 768, settings: { slidesToShow: 1 } },  // MD
      { breakpoint: 640, settings: { slidesToShow: 1 } },  // SM
      { breakpoint: 480, settings: { slidesToShow: 1 } },  // XS
    ],
    appendDots: (dots) => (
      <div>
        <ul className="mt-6 flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded-full hover:bg-red-600 transition-colors" />
    ),
  };

  return (
    <section
      id="testimonials"
      className="relative py-16 md:py-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden transition-colors duration-300"
    >
      {/* ===== Header ===== */}
      <div className="text-center mb-12 px-4" data-aos="fade-down">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold flex flex-wrap items-center justify-center gap-2 text-red-600 dark:text-red-500 leading-tight">
          <span className="text-[#d11d1d]">✚</span>
          {t("whatOurClientsSay")}
          <span className="text-[#114a74]">{t("aboutWorkingWith")}</span>
          <span className="text-[#d11d1d]">Patientfly</span>
          <HeartPulse className="animate-pulse text-red-600 w-6 h-6" />
        </h2>
        <div
          data-aos="fade-up"
          className="w-20 sm:w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"
        ></div>
      </div>

      {/* ===== Slider ===== */}
      <div
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8"
        data-aos="fade-up"
      >
        <Slider {...settings}>
          {testimonials.map((item) => (
            <div key={item.id} className="px-2 sm:px-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 transform hover:-translate-y-2 h-full">
                {/* ===== Quote Text ===== */}
                <div>
                  <p className="text-5xl text-[#114a74] mb-1 leading-none">“</p>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                    {item.text}
                  </p>
                  <p className="text-[#114a74] font-semibold text-sm sm:text-base">
                    – {item.author}
                  </p>
                </div>

                {/* ===== Footer ===== */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {/* Profile */}
                  <div className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-gray-800 dark:text-gray-100 font-medium text-sm sm:text-base">
                        {item.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {item.rating} Ratings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* ===== Soft Background Glow ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-red-500/10 w-[600px] sm:w-[800px] md:w-[1000px] h-[600px] sm:h-[800px] md:h-[1000px] blur-3xl rounded-full"></div>
      </div>
    </section>
  );
}
