import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Ambulance,
  HeartPulse,
  Stethoscope,
  Activity,
  Hospital,
  Plane,
} from "lucide-react";
import { useLanguage } from "../../../component/context/useLanguage";

const OurServicesSection = () => {
  const { t } = useLanguage("en");

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  // ✅ SEO Structured Data
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "Patients Fly Medical Travel Assistance",
      description: t("ourServices_subtitle"),
      url: "https://patientsfly.com/services",
      sameAs: [
        "https://www.facebook.com/patientsfly",
        "https://www.linkedin.com/company/patientsfly",
      ],
      service: [
        { "@type": "MedicalTransport", name: t("ourServices_airAmbulance_title") },
        { "@type": "MedicalTransport", name: t("ourServices_groundAmbulance_title") },
        { "@type": "MedicalProcedure", name: t("ourServices_criticalCare_title") },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }, [t]);

  const services = [
    {
      icon: <Plane className="w-10 h-10 text-emerald-700 dark:text-emerald-400" />,
      title: t("ourServices_airAmbulance_title"),
      desc: t("ourServices_airAmbulance_desc"),
    },
    {
      icon: <Stethoscope className="w-10 h-10 text-emerald-700 dark:text-emerald-400" />,
      title: t("ourServices_medicalEscort_title"),
      desc: t("ourServices_medicalEscort_desc"),
    },
    {
      icon: <Ambulance className="w-10 h-10 text-emerald-700 dark:text-emerald-400" />,
      title: t("ourServices_groundAmbulance_title"),
      desc: t("ourServices_groundAmbulance_desc"),
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-emerald-700 dark:text-emerald-400" />,
      title: t("ourServices_icuSupport_title"),
      desc: t("ourServices_icuSupport_desc"),
    },
    {
      icon: <Hospital className="w-10 h-10 text-emerald-700 dark:text-emerald-400" />,
      title: t("ourServices_hospitalTransfer_title"),
      desc: t("ourServices_hospitalTransfer_desc"),
    },
    {
      icon: <Activity className="w-10 h-10 text-emerald-700 dark:text-emerald-400" />,
      title: t("ourServices_criticalCare_title"),
      desc: t("ourServices_criticalCare_desc"),
    },
  ];

  return (
    <section
      id="services"
      className="w-full dark:bg-slate-900 py-16 sm:py-20 transition-colors duration-300"
      aria-labelledby="services-heading"
    >
      {/* SEO metadata */}
      <title>{t("ourServices_title")} | Patients Fly</title>
      <meta name="description" content={t("ourServices_subtitle")} />
      <meta
        name="keywords"
        content="medical travel, air ambulance, hospital transfer, medical escort, ICU support, critical care, patients fly, emergency transport"
      />

      <div
        className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 text-center"
        data-aos="fade-up"
      >
        <header className="mb-14">
          <h2
            id="services-heading"
            className="text-3xl sm:text-3xl font-extrabold text-red-600 dark:text-red-600 flex justify-center items-center gap-3"
          >
            {t("ourServices_title")}
            <HeartPulse className="animate-pulse text-red-600" />
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">
            {t("ourServices_subtitle")}
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <article
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 120}
              className="group bg-white dark:bg-[#1e1e1e] rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="flex items-center justify-center mb-5 relative z-10">
                <span className="p-4 rounded-full bg-emerald-50 dark:text-red-600 bg-slate-700 shadow-md">
                  {service.icon}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-red-600 dark:text-red-600 mb-3 relative z-10">
                {service.title}
              </h3>

              <p className="text-gray-700 dark:text-white text-sm leading-relaxed relative z-10">
                {service.desc}
              </p>

              <div className="mt-5 h-1 w-16 bg-gradient-to-r from-red-500 to-emerald-500 rounded-full mx-auto opacity-80 group-hover:w-24 transition-all duration-500"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
