import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  HeartPulse,
  PhoneCall,
  FileText,
  Plane,
  Hospital,
  ClipboardCheck,
  Handshake,
} from "lucide-react";
import { useLanguage } from "../../component/context/useLanguage";
import { useTheme } from "../../component/context/ThemeContext";

export default function HowItWorks() {
  const { t } = useLanguage("en");
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out-sine",
    });
  }, []);

  // ✅ Structured Data for SEO
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How Medical Travel Works with Patients Fly",
      description:
        "A step-by-step process of how Patients Fly assists international patients from consultation to recovery with expert coordination.",
      totalTime: "P7D",
      supply: [
        { "@type": "HowToSupply", name: "Medical documents and reports" },
        { "@type": "HowToSupply", name: "Passport and visa" },
      ],
      step: [
        { "@type": "HowToStep", name: "Request Assistance" },
        { "@type": "HowToStep", name: "Medical Evaluation" },
        { "@type": "HowToStep", name: "Treatment Planning" },
        { "@type": "HowToStep", name: "Travel & Visa Support" },
        { "@type": "HowToStep", name: "Hospital Admission" },
        { "@type": "HowToStep", name: "Post-Treatment Follow-Up" },
      ],
    });
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  const steps = [
    {
      id: 1,
      icon: <PhoneCall size={36} />,
      title: t("step1_title"),
      subtitle: t("step1_subtitle"),
      details: t("step1_details"),
      extra: t("step1_extra"),
    },
    {
      id: 2,
      icon: <FileText size={36} />,
      title: t("step2_title"),
      subtitle: t("step2_subtitle"),
      details: t("step2_details"),
      extra: t("step2_extra"),
    },
    {
      id: 3,
      icon: <ClipboardCheck size={36} />,
      title: t("step3_title"),
      subtitle: t("step3_subtitle"),
      details: t("step3_details"),
      extra: t("step3_extra"),
    },
    {
      id: 4,
      icon: <Plane size={36} />,
      title: t("step4_title"),
      subtitle: t("step4_subtitle"),
      details: t("step4_details"),
      extra: t("step4_extra"),
    },
    {
      id: 5,
      icon: <Hospital size={36} />,
      title: t("step5_title"),
      subtitle: t("step5_subtitle"),
      details: t("step5_details"),
      extra: t("step5_extra"),
    },
    {
      id: 6,
      icon: <Handshake size={36} />,
      title: t("step6_title"),
      subtitle: t("step6_subtitle"),
      details: t("step6_details"),
      extra: t("step6_extra"),
    },
  ];

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <section
        id="how-it-works"
        className={`relative overflow-hidden transition-colors duration-300 ${
          theme === "dark" ? "bg-slate-900 text-white" : " text-gray-800"
        }`}
      >
        {/* ===== Decorative Background ===== */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20">
          {/* ===== Header ===== */}
          <header
            className="text-center mb-16"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h2 className="text-3xl sm:text-3xl font-extrabold flex items-center justify-center gap-3 text-red-600 dark:text-red-600">
              <span>{t("howItWorks_title")}</span>
              <HeartPulse className="animate-pulse" />
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("howItWorks_subtitle")}
            </p>
          </header>

          {/* ===== Process Steps Grid ===== */}
          <div
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            data-aos="fade-up"
          >
            {/* Connector Line for Large Screens */}
            {steps.map((step, idx) => (
              <article
                key={step.id}
                data-aos="zoom-in-up"
                data-aos-delay={idx * 150}
                className={`relative z-10 rounded-3xl p-8 text-center shadow-xl backdrop-blur-md transform transition duration-300 bg-white hover:-translate-y-2 hover:shadow-2xl dark:bg-[#1e1e1e] border border-red-500`}
              >
                {/* Step Badge */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="h-10 w-10 rounded-full bg-red-600/70 text-white font-semibold flex items-center justify-center shadow-lg dark:bg-main-color/70">
                    {step.id}
                  </div>
                </div>

                {/* Icon */}
                <div className="mt-6 mb-4 flex justify-center">
                  <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-br from-sky-500/20 to-red-500/20 text-sky-700 dark:text-red-600 border border-sky-200/30 dark:border-slate-600">
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-red-600 dark:text-red-600 mb-2">
                  {step.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-3">
                  {step.subtitle}
                </p>

                {/* Details */}
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  {step.details}
                </p>

                {/* Extra */}
                <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-6">
                  {step.extra}
                </p>
              </article>
            ))}
          </div>

          {/* Decorative Bottom Line */}
          <div className="mt-16 flex justify-center" data-aos="fade-up">
            <div className="h-1 w-40 bg-gradient-to-r from-sky-500 to-red-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
