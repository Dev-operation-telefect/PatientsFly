import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../../component/context/useLanguage";


const AboutPatientFly = () => {
  const { t } = useLanguage("en"); // Using multi-language hook

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="w-full dark:bg-slate-900 py-12 md:py-20"
      id="about"
    >
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-6 md:px-10 lg:px-16"
        data-aos="fade-up"
      >
        {/* ===== Image Section ===== */}
        <div className="flex-1" data-aos="fade-right" data-aos-delay="100">
          <img
            src="https://res.cloudinary.com/dtqvpdacj/image/upload/v1760617449/airAmbulanceThai_tuinek.png"
            alt={t("about_image_alt")}
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        {/* ===== Text Section ===== */}
        <div
          className="flex-1"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-600 mb-2">
            {t("about_title")}
          </h2>
          <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium mb-3">
            {t("about_subtitle")}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {t("about_description")}
          </p>

          <button
            className="inline-flex items-center gap-2 px-5 py-2 border border-emerald-700 dark:border-emerald-500 
            text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-700 hover:bg-main-color hover:text-white
            dark:hover:bg-emerald-500 dark:hover:text-slate-900 transition-all duration-300"
          >
            {t("learn_more")} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPatientFly;
