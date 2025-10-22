import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import { useTheme } from "../../../component/context/ThemeContext";
import { useLanguage } from "../../../component/context/useLanguage";
import { Globe, HeartPulse, Users, Plane } from "lucide-react";
import GlobalReach from "./GlobalReach";

const TEAM = [
  {
    name: "Dr. Sarah Ahmed",
    role: "Chief Medical Officer",
    photo: "https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg",
    bio: "15+ years of experience in international patient coordination and clinical quality assurance.",
  },
  {
    name: "Jonathan Lee",
    role: "Head of Global Operations",
    photo: "https://images.pexels.com/photos/32976/pexels-photo.jpg",
    bio: "Leads strategic partnerships and ensures seamless patient experiences across 12+ countries.",
  },
  {
    name: "Nadia Rahman",
    role: "Patient Care Manager",
    photo: "https://images.pexels.com/photos/4347368/pexels-photo-4347368.jpeg",
    bio: "Specializes in multilingual support and personalized care for patients traveling abroad.",
  },
];

export default function AboutUs() {
  const { darkMode } = useTheme();
  const { t, currentLang } = useLanguage(); // detects current language automatically

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      <Helmet>
        <title>{t("aboutTitle")}</title>
        <meta name="description" content={t("aboutDescription")} />
        <link rel="canonical" href="https://patientsfly.com/about-us" />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/demo/image/upload/v1725000001/hero-medical.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" data-aos="fade-up">
            {t("aboutUSheroTitle")}
          </h1>
          <p
            className="mt-6 text-lg sm:text-xl opacity-90"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {t("aboutUSheroSubtitle")}
          </p>
          <div
            className="mt-8 flex justify-center gap-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <a
              href="/contact"
              className="px-6 py-3 bg-main-color hover:bg-main-hover text-white font-semibold rounded-lg shadow"
            >
              {t("contactExperts")}
            </a>
            <a
              href="/services"
              className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-red-600 transition"
            >
              {t("learnMore")}
            </a>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-up">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {t("ourMission")} <HeartPulse className="animate-pulse text-red-600" />
            </h2>
            <p className="mt-4 text-lg opacity-90 leading-relaxed">
              {t("missionText")}
            </p>

            <h2 className="text-3xl font-bold mt-10 flex items-center gap-2">{t("ourVision")}<HeartPulse className="animate-pulse text-red-600" /></h2>
            <p className="mt-4 text-lg opacity-90 leading-relaxed">
              {t("visionText")}
            </p>
          </div>

          <div data-aos="fade-left">
            <div
              className={`p-8 rounded-2xl shadow-lg ${
                darkMode ? "bg-slate-800/70" : "bg-slate-50"
              }`}
            >
              <h3 className="font-semibold text-lg">{t("howWeWork")}</h3>
              <ol className="mt-4 list-decimal pl-6 space-y-2 text-base opacity-90">
                <li>{t("step1")}</li>
                <li>{t("step2")}</li>
                <li>{t("step3")}</li>
                <li>{t("step4")}</li>
                <li>{t("step5")}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl sm:text-3xl font-extrabold flex items-center justify-center gap-3 text-red-600 dark:text-red-600 " data-aos="fade-up">
            {t("ourValues")} <HeartPulse className="animate-pulse text-red-600" />
          </h3>
          <p
            data-aos="fade-up"
            className="text-gray-600 dark:text-white text-lg font-medium mb-10"
          >
            {t("ourCoreValuesDesc")}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <HeartPulse className="w-10 h-10 text-red-600" />,
                title: t("value1Title"),
                text: t("value1Text"),
              },
              {
                icon: <Globe className="w-10 h-10 text-red-600" />,
                title: t("value2Title"),
                text: t("value2Text"),
              },
              {
                icon: <Users className="w-10 h-10 text-red-600" />,
                title: t("value3Title"),
                text: t("value3Text"),
              },
              {
                icon: <Plane className="w-10 h-10 text-red-600" />,
                title: t("value4Title"),
                text: t("value4Text"),
              },
            ].map((v, i) => (
              <div
                key={v.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={`p-6 rounded-2xl shadow-lg ${
                  darkMode ? "bg-slate-800" : "bg-white"
                }`}
              >
                <div className="flex justify-center mb-4">{v.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{v.title}</h4>
                <p className="text-sm opacity-90">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3
            className="text-3xl sm:text-3xl font-extrabold flex items-center justify-center gap-3 text-red-600 dark:text-red-600"
            data-aos="fade-up"
          >
            {t("ourTeam")} <HeartPulse className="animate-pulse text-red-600" />
          </h3>
          <p
            data-aos="fade-up"
            className="text-gray-600 text-center dark:text-white text-lg font-medium mb-10"
          >
            {t("ourTeamDesc")}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((m, i) => (
              <article
                key={m.name}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={`p-6 rounded-2xl shadow hover:scale-[1.02] transition ${
                  darkMode ? "bg-slate-800" : "bg-white"
                }`}
              >
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover shadow-md"
                />
                <div className="text-center mt-4">
                  <h4 className="font-semibold">{m.name}</h4>
                  <p className="text-sm opacity-80">{m.role}</p>
                  <p className="text-sm mt-3 opacity-90">{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GlobalReach/>

      

    </main>
  );
}
