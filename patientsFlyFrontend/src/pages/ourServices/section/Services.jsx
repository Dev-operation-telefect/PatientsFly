import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Hospital,
  Plane,
  PhoneCall,
  ClipboardCheck,
  FileText,
  Stethoscope,
  HeartPulse,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useLanguage } from "../../../component/context/useLanguage";
import { useTheme } from "../../../component/context/ThemeContext";
import WhyChooseUs from "../../home/WhyChooseUs.jsx";
import GlobalReach from "../../about/section/GlobalReach.jsx";
import { partnerHospitals } from "../../../data/partnerHospitals.js";
import ContactSection from "../../home/ContactSection.jsx";
import FooterOffices from "../../home/FooterOffices.jsx";
const Services = () => {
  const { t, language } = useLanguage("en");
  const { darkMode } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const services = [
    {
      icon: <Hospital className="w-10 h-10 text-red-600" />,
      title: t("hospitalAppointment"),
      desc: t("hospitalAppointmentDesc"),
    },
    {
      icon: <Plane className="w-10 h-10 text-blue-600" />,
      title: t("medicalTourism"),
      desc: t("medicalTourismDesc"),
    },
    {
      icon: <ClipboardCheck className="w-10 h-10 text-green-600" />,
      title: t("documentSupport"),
      desc: t("documentSupportDesc"),
    },
    {
      icon: <PhoneCall className="w-10 h-10 text-yellow-500" />,
      title: t("emergencySupport"),
      desc: t("emergencySupportDesc"),
    },
    {
      icon: <Stethoscope className="w-10 h-10 text-pink-500" />,
      title: t("secondOpinion"),
      desc: t("secondOpinionDesc"),
    },
    {
      icon: <FileText className="w-10 h-10 text-indigo-500" />,
      title: t("insuranceSupport"),
      desc: t("insuranceSupportDesc"),
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {language === "bn"
            ? "আমাদের সেবা | টেলিফেক্ট হেলথ অ্যান্ড কেয়ার"
            : "Our Services | Telefect Health & Care"}
        </title>
        <meta
          name="description"
          content={t("ourServicesText")}
        />
      </Helmet>

      {/* Services Grid */}
     {/* Services Grid Section */}
      <section
        className={`pb-16 ${
          darkMode ? " text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Section Title */}
          <h2
            className="text-3xl sm:text-4xl font-extrabold flex items-center justify-center gap-3 text-red-600 dark:text-red-600 mb-4"
            data-aos="fade-up"
          >
            {t("ourServiceFeaturesTitle") || "What We Offer"}
            <HeartPulse className="animate-pulse text-red-600" />
          </h2>
      
          {/* Section Description */}
          <p
            className="text-lg opacity-80 max-w-3xl mx-auto mb-12"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("ourServiceFeaturesDesc") ||
              "We provide a complete range of healthcare and travel medical services — connecting patients to specialized doctors, top hospitals, and round-the-clock global assistance to ensure your journey to wellness is smooth and stress-free."}
          </p>
      
          {/* Services Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 ${
                  darkMode ? "bg-white/10" : "bg-gray-50"
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-center mb-5">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-center opacity-90">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Partner Hospitals */}
      <section
        className={`py-20 ${
          darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2
            className="text-3xl sm:text-3xl font-extrabold flex items-center justify-center gap-3 text-red-600 dark:text-red-600"
            data-aos="fade-up"
          >
            {t("partnerHospitalsTitle") || "Our Partner Hospitals"} <HeartPulse className="animate-pulse text-red-600" />
          </h2>
          <p
            className="text-lg opacity-80 mb-12 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("partnerHospitalsText") ||
              "We collaborate with the most reputed hospitals in Thailand, Singapore, and other regions — ensuring our patients receive world-class medical care, advanced treatment options, and international standard services."}
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {partnerHospitals.map((hospital, index) => (
              <a
                href={hospital.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className={`group block overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 ${
                  darkMode ? "bg-white/10" : "bg-white"
                }`}
              >
                <img
                  src={hospital.img}
                  alt={hospital.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold group-hover:text-primary-600 transition-colors">
                    {hospital.name}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* Global Reach */}
      <GlobalReach/>
      <WhyChooseUs/>
      <ContactSection/>
      <FooterOffices/>
    </>
  );
};

export default Services;
