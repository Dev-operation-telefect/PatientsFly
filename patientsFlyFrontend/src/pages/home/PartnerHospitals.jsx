// PartnerHospitals.jsx
import React, { useEffect } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";
import { useLanguage } from "../../component/context/useLanguage";
import { ExternalLink, HeartPulse } from "lucide-react";
import { partnerHospitals } from "../../data/partnerHospitals";

const PartnerHospitals = () => {
  const { t } = useLanguage("en");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
      { breakpoint: 320, settings: { slidesToShow: 1 } },
      { breakpoint: 240, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      id="partner-hospitals"
      className="relative py-16 md:py-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden"
    >
      {/* ===== SEO Meta ===== */}
      <Helmet>
        <title>PatientsFly Trusted Hospitals</title>
        <meta
          name="description"
          content="Discover trusted global medical partners of PatientsFly. Explore top hospitals like Apollo, Bumrungrad, and Bangkok Hospital offering world-class healthcare."
        />
        <meta
          name="keywords"
          content="partner hospitals, patientsfly medical partners, international hospitals, global healthcare network, air ambulance partners"
        />
      </Helmet>

      {/* ===== Section Header ===== */}
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2
          data-aos="fade-down"
          className="text-3xl md:text-4xl font-extrabold flex items-center justify-center gap-2 text-red-600"
        >
          {t("partnerHospitals")}
          <HeartPulse className="animate-pulse text-red-600" />
        </h2>

        <p
          data-aos="fade-up"
          className="text-gray-700 dark:text-gray-300 text-lg md:text-xl font-medium mt-3"
        >
          {t("trustedMedicalPartners")}
        </p>

        <div
          data-aos="fade-up"
          className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"
        ></div>
      </div>

      {/* ===== Hospital Slider ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slider {...sliderSettings}>
          {partnerHospitals.map((hospital, index) => (
            <div key={index} data-aos="zoom-in" className="px-3">
              <a
                href={hospital.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Image */}
                <div className="overflow-hidden rounded-t-2xl">
                  <img
                    src={hospital.img}
                    alt={hospital.name}
                    className="w-full h-52 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-5 text-center">
                  <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {hospital.name}
                  </h3>
                  <button className="inline-flex items-center justify-center gap-1 px-4 py-2 text-sm md:text-base bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300">
                    {t("seeMore")}
                    <ExternalLink size={16} />
                  </button>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>

      {/* ===== Background Glow ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-red-500/10 w-[700px] h-[700px] blur-3xl rounded-full"></div>
      </div>
    </section>
  );
};

export default PartnerHospitals;
