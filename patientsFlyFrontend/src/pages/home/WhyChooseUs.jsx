import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "../../component/context/useLanguage";
import { Helmet } from "react-helmet";
import { HeartPulse } from "lucide-react";

const WhyChooseUs = () => {
  const { t } = useLanguage("en"); // use your hook exactly

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section
      className="py-16 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
      id="why-choose-us"
    >
      {/* SEO Meta & Structured Data */}
      <Helmet>
        <meta
          name="title"
          content="PatientsFly Air Ambulance & Medical Support"
        />
        <meta
          name="description"
          content="Discover why PatientsFly is the preferred choice for international medical travel. Our ICU-equipped fleet, certified medical team, global hospital partnerships, and 24/7 support ensure top-tier patient safety and care."
        />
        <meta
          name="keywords"
          content="medical flight, air ambulance, ICU air transport, international patient transfer, medical evacuation, hospital partnership, global medical support"
        />
        <meta property="og:title" content="PatientsFly – Air Ambulance & Medical Services" />
        <meta
          property="og:description"
          content="Safe, reliable, and fast international patient transfer with ICU-equipped aircraft and certified medical teams."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "PatientsFly",
            "url": "https://www.patientsfly.com",
            "logo": "https://www.patientsfly.com/logo.png",
            "sameAs": [
              "https://www.facebook.com/PatientsFly",
              "https://www.linkedin.com/company/patientsfly"
            ],
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+880123456789",
                "contactType": "customer service",
                "availableLanguage": ["English", "Bangla"]
              }
            ],
            "medicalSpecialty": "Emergency Medicine",
            "description": "International air ambulance service with ICU-equipped aircraft, certified medical team, and hospital partnerships worldwide."
          })}
        </script>
      </Helmet>

      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h2
          className="text-3xl md:text-3xl font-extrabold text-red-600 flex items-center justify-center gap-2"
          data-aos="fade-down"
        >
          {/* <span>💓</span>  */}
          {t("whyChooseUs")} <HeartPulse className="animate-pulse text-red-600" />
        </h2>
        <p
          className="text-main-color dark:text-white mt-2 text-lg font-medium"
          data-aos="fade-up"
        >
          {t("theRightChoice")}
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">

        {/* ICU Fleet */}
        <div
          data-aos="fade-right"
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl text-red-600">🛩️</span>
            <div>
              <h3 className="text-lg font-semibold text-red-600">{t("icuFleet")}</h3>
              <p className="text-sm mt-2 leading-relaxed">{t("icuFleetDesc")}</p>
            </div>
          </div>
        </div>

        {/* Global Support */}
        <div
          data-aos="fade-up"
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl text-blue-600">🌐</span>
            <div>
              <h3 className="text-lg font-semibold">{t("globalSupport")}</h3>
              <p className="text-sm mt-2 leading-relaxed">{t("globalSupportDesc")}</p>
            </div>
          </div>
        </div>

        {/* Partnerships */}
        <div
          data-aos="fade-left"
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl text-teal-600">🏥</span>
            <div>
              <h3 className="text-lg font-semibold">{t("partnerships")}</h3>
              <p className="text-sm mt-2 leading-relaxed">{t("partnershipsDesc1")}</p>
              <p className="text-sm mt-1 leading-relaxed">{t("partnershipsDesc2")}</p>
              <a href="https://wa.me/8801929559911" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl transition-all duration-300">
                {t("bookNow")}
              </a>
            </div>
          </div>
        </div>

        {/* Certified Team */}
        <div
          data-aos="zoom-in-up"
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 md:col-span-2 lg:col-span-3"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl text-sky-600">➕</span>
            <div>
              <h3 className="text-lg font-semibold">{t("certifiedTeam")}</h3>
              <p className="text-sm mt-2 leading-relaxed">{t("certifiedTeamDesc1")}</p>
              <p className="text-sm mt-2 leading-relaxed">{t("certifiedTeamDesc2")}</p>
            </div>
          </div>
        </div>

        {/* Personalized Care */}
        <div
          data-aos="fade-up"
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 md:col-span-2 lg:col-span-3"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl text-purple-600">❤️</span>
            <div>
              <h3 className="text-lg font-semibold">{t("personalizedCare")}</h3>
              <p className="text-sm mt-2 leading-relaxed">{t("personalizedCareDesc1")}</p>
              <p className="text-sm mt-1 leading-relaxed">{t("personalizedCareDesc2")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
