// HowItWorks.jsx
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

  // Initialize AOS once
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out-sine",
    });
    // refresh AOS after mount in case layout changes (safe)
    AOS.refresh();
  }, []);

  // Structured data (SEO) — safe to append on client
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
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  const steps = [
    {
      id: 1,
      icon: <PhoneCall size={28} aria-hidden="true" />,
      title: t("step1_title"),
      subtitle: t("step1_subtitle"),
      details: t("step1_details"),
      extra: t("step1_extra"),
    },
    {
      id: 2,
      icon: <FileText size={28} aria-hidden="true" />,
      title: t("step2_title"),
      subtitle: t("step2_subtitle"),
      details: t("step2_details"),
      extra: t("step2_extra"),
    },
    {
      id: 3,
      icon: <ClipboardCheck size={28} aria-hidden="true" />,
      title: t("step3_title"),
      subtitle: t("step3_subtitle"),
      details: t("step3_details"),
      extra: t("step3_extra"),
    },
    {
      id: 4,
      icon: <Plane size={28} aria-hidden="true" />,
      title: t("step4_title"),
      subtitle: t("step4_subtitle"),
      details: t("step4_details"),
      extra: t("step4_extra"),
    },
    {
      id: 5,
      icon: <Hospital size={28} aria-hidden="true" />,
      title: t("step5_title"),
      subtitle: t("step5_subtitle"),
      details: t("step5_details"),
      extra: t("step5_extra"),
    },
    {
      id: 6,
      icon: <Handshake size={28} aria-hidden="true" />,
      title: t("step6_title"),
      subtitle: t("step6_subtitle"),
      details: t("step6_details"),
      extra: t("step6_extra"),
    },
  ];

  return (
    <section
      id="how-it-works"
      className={`relative overflow-hidden transition-colors duration-300 dark:bg-black dark:text-white`}
      aria-labelledby="how-it-works-heading"
    >
      {/* subtle decorative shapes (non-interactive) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full bg-sky-600/8 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-red-600/8 blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header */}
        <header className="text-center mb-12" data-aos="fade-up">
          <h2
            id="how-it-works-heading"
            className="text-3xl md:text-4xl font-extrabold flex flex-wrap items-center justify-center gap-3 text-red-600 dark:text-red-600"
          >
            <span>{t("howItWorks_title")}</span>
            <HeartPulse className="animate-pulse" aria-hidden="true" />
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
            {t("howItWorks_subtitle")}
          </p>
        </header>

        {/* Steps grid */}
        <div className="relative" data-aos="fade-up">
          {/* Large-screen connectors: a horizontal line behind cards */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-sky-200 to-red-200/40"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <article
                key={step.id}
                data-aos="zoom-in-up"
                data-aos-delay={idx * 100}
                className={`relative rounded-2xl p-6 text-center shadow-md transition-transform duration-300 transform hover:-translate-y-2 dark:bg-gray-800`}
                aria-labelledby={`step-${step.id}-title`}
              >
                {/* Connector dot on large screens */}
                <span
                  aria-hidden="true"
                  className="hidden lg:inline-block absolute left-1/2 -translate-x-1/2 -top-3 w-3.5 h-3.5 rounded-full bg-red-600 shadow"
                />

                {/* Step badge (mobile & desktop) */}
                <div className="mx-auto w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold -mt-8 shadow">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="mt-4 mb-3 flex justify-center">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center border ${
                      theme === "dark" ? "border-slate-700" : "border-sky-100"
                    }`}
                    aria-hidden="true"
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <h3
                  id={`step-${step.id}-title`}
                  className="text-lg font-semibold text-red-600 dark:text-red-600 mb-1"
                >
                  {step.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-3">
                  {step.subtitle}
                </p>

                {/* Details */}
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  {step.details}
                </p>

                {/* Extra */}
                {step.extra ? (
                  <p className="text-xs italic text-gray-600 dark:text-gray-400">
                    {step.extra}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-12 flex justify-center" data-aos="fade-up">
          <div className="h-1 w-40 bg-gradient-to-r from-sky-300 to-red-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}
