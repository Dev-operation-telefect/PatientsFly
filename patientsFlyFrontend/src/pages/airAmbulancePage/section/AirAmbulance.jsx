import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  HeartPulse,
  Plane,
  Stethoscope,
  Hospital,
  ShieldCheck,
  Headphones,
  Ambulance,
  Activity,
  CheckCircle,
  Clock,
  Globe,
  Users,
  DollarSign,
  MapPin,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useLanguage } from "../../../component/context/useLanguage";
import { useTheme } from "../../../component/context/ThemeContext";
import { partnerHospitals } from "../../../data/partnerHospitals";

export default function AirAmbulance() {
  const { t, language } = useLanguage("en");
  const { darkMode } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
    AOS.refresh();
  }, [language, darkMode]);

  // ---------- Data ----------
  const serviceTypes = [
    {
      icon: Ambulance,
      title: t("emergencyEvac") || "Emergency Medical Evacuation",
      desc:
        t("emergencyEvacDesc") ||
        "Rapid-response air transport for critically ill or injured patients requiring immediate relocation with full ICU-level care onboard.",
    },
    {
      icon: Stethoscope,
      title: t("bedToBed") || "Bed-to-Bed Transfer",
      desc:
        t("bedToBedDesc") ||
        "End-to-end patient transfer supervised by specialized medical teams — we handle stretcher transfers, medical records, and safe handover at destination hospital.",
    },
    {
      icon: Plane,
      title: t("internationalRepatriation") || "International Repatriation",
      desc:
        t("internationalRepatriationDesc") ||
        "Global repatriation services including chartering, diplomatic clearance, medical escorts and consular coordination for cross-border patient return.",
    },
    {
      icon: Activity,
      title: t("organTransport") || "Organ & Critical Supply Transport",
      desc:
        t("organTransportDesc") ||
        "Time-critical organ transport with temperature-controlled containment and prioritized logistics to support transplant surgeries.",
    },
    {
      icon: Hospital,
      title: t("hospitalLiaison") || "Hospital Liaison & Admission",
      desc:
        t("hospitalLiaisonDesc") ||
        "We coordinate pre-acceptance, emergency admissions, bed reservation and smooth transfer to partner hospitals worldwide.",
    },
  ];

  const fleet = [
    {
      name: "Learjet 45XR",
      type: "Jet",
      range: "3000+ nm",
      speed: "470 KTAS",
      equipment:
        "Full ICU configuration, invasive ventilator, advanced patient monitor, syringe pumps, oxygen system.",
      image: "https://images.pexels.com/photos/28321034/pexels-photo-28321034.jpeg",
    },
    {
      name: "Beechcraft King Air B200",
      type: "Turboprop",
      range: "1500 nm",
      speed: "300 KTAS",
      equipment:
        "Compact ICU setup, oxygen, monitor, suction and basic ventilator for regional transfers.",
      image: "https://res.cloudinary.com/dtqvpdacj/image/upload/v1761041937/images_owv4a3.webp",
    },
    {
      name: "EC135 Helicopter",
      type: "Helicopter",
      range: "300 nm",
      speed: "140 KTAS",
      equipment:
        "Short-range rescue missions, rooftop transfers, neonatal cradle option and rapid response kit.",
      image: "https://images.pexels.com/photos/25649835/pexels-photo-25649835.jpeg",
    },
  ];

  const quickStats = [
    { label: t("avgResponse") || "Avg. Activation Time", value: "2–3 hours", icon: Clock },
    { label: t("coverage") || "Coverage", value: "Global (100+ countries)", icon: Globe },
    { label: t("missions") || "Missions Completed", value: "1,200+ (last year)", icon: Users },
    { label: t("medicalTeam") || "Medical Team", value: "Critical Care MDs & Nurses", icon: ShieldCheck },
  ];

  const pricingExample = {
    route: "Dhaka → Bangkok (Learjet)",
    estimate: "$9,500 - $60,000",
    inclusions:"Aircraft, medical crew, oxygen & consumables, stretcher service, ground ambulance handover, flight coordination & clearance.",
  };

  const insurancePartners = [
    "GlobalHealth Insurance",
    "AsiaCare Insurers",
    "International Medical Cover",
  ];

  const faqs = [
    {
      q: "How fast can you deploy an aircraft?",
      a:
        "Typical activation for domestic/regional missions is 2–6 hours (depending on distance & readiness). International activations vary by clearances but we prioritize fastest possible routing.",
    },
    {
      q: "Is the patient accompanied by doctors?",
      a:
        "Yes — every medically necessary mission includes an appropriate medical escort (critical care physician / flight nurse / paramedic) based on patient condition.",
    },
    {
      q: "Do you handle insurance & repatriation paperwork?",
      a:
        "We coordinate with insurers, consulates, and receiving hospitals to expedite approvals and documentation for a seamless transfer.",
    },
  ];

  // ---------- Component ----------
  return (
    <>
      <Helmet>
        <title>
          {t("pageTitle") ||
            "Air Ambulance & Medical Evacuation Services — 24/7 Emergency Medical Flights | Patients Fly Health & Care"}
        </title>
        <meta
          name="description"
          content={
            t("pageDescription") ||
            "Patients Fly Air Ambulance: 24/7 emergency medical flights, international repatriation, bed-to-bed transfers, neonatal transport, and organ logistics. Rapid global activation, ICU-equipped aircraft, experienced critical-care teams and hospital coordination across Asia, the Middle East and Europe."
          }
        />
        <meta property="og:title" content={t("pageTitle") || "Air Ambulance & Medical Evacuation Services | Patients Fly"} />
        <meta
          property="og:description"
          content={
            t("pageDescription") ||
            "24/7 rapid-response air ambulance services with ICU-capable aircraft, international clearances, and certified medical crews — available worldwide."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/air-ambulance-og.jpg" />
      </Helmet>

      <main className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
        {/* ================= HERO ================= */}
        <section
          className={`relative overflow-hidden ${
            darkMode ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" : "bg-gradient-to-r from-red-50 via-white to-red-50"
          } py-20`}
          aria-labelledby="air-ambulance-hero"
        >
          <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full " data-aos="fade-right">
              <div className="mt-6 grid grid-cols-6 sm:grid-cols-4 gap-3">
                {quickStats.map((s, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/60" : "bg-white"} shadow-sm text-center`}
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                  >
                    <s.icon className="w-5 h-5 mx-auto text-red-600 mb-2" />
                    <div className="text-sm font-semibold">{s.value}</div>
                    <div className="text-xs opacity-80">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section className="py-12 max-w-5xl mx-auto px-6 text-center" data-aos="fade-up">
          <h2 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
            {t("aboutTitle") || "About Our Air Ambulance Service"} <HeartPulse className="animate-pulse text-red-600" />
          </h2>
          <p className="max-w-3xl mx-auto opacity-90">
            {t("aboutText") ||
              "Patients Fly operates a 24/7 global air ambulance service delivering ICU-level care during transport. We combine aviation expertise with experienced medical teams and hospital partnerships to deliver safe, timely, and compassionate patient transfers worldwide."}
          </p>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="py-12 max-w-6xl mx-auto px-6">
          <h3 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
            {t("servicesTitle") || "Air Medical Services"} <HeartPulse className="animate-pulse text-red-600" />
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceTypes.map((s, i) => (
              <article
                key={i}
                className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                aria-labelledby={`service-${i}`}
              >
                <s.icon className="w-8 h-8 text-red-600 mb-4 mx-auto" />
                <h4 id={`service-${i}`} className="text-xl font-semibold mb-2 text-center">
                  {s.title}
                </h4>
                <p className="opacity-85 text-sm leading-relaxed">{s.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ================= FLEET ================= */}
        <section className={`py-12 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
              {t("fleetTitle") || "Medical Aircraft Fleet & Equipment"} <HeartPulse className="animate-pulse text-red-600" />
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fleet.map((f, i) => (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden shadow-md ${darkMode ? "bg-gray-900" : "bg-white"}`}
                  data-aos="fade-up"
                  data-aos-delay={i * 90}
                >
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold">{f.name}</h4>
                      <span className="text-sm opacity-80">{f.type}</span>
                    </div>
                    <p className="text-sm opacity-80 mb-3">{f.equipment}</p>
                    <div className="text-xs opacity-70 flex justify-between">
                      <div>Range: {f.range}</div>
                      <div>Speed: {f.speed}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PARTNERS ================= */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
              {t("partnersTitle") || "Partner Hospitals & Networks"} <HeartPulse className="animate-pulse text-red-600" />
            </h3>
            <p className="max-w-3xl mx-auto opacity-90 mb-8" data-aos="fade-up" data-aos-delay={70}>
              {t("partnersText") ||
                "We coordinate directly with leading hospitals and specialty centers to ensure fast admissions and continuity of care upon arrival."}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerHospitals.map((h, i) => (
                <a
                  key={i}
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:-translate-y-2 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  <img src={h.img} alt={h.name} className="w-full h-36 object-cover" loading="lazy" />
                  <div className="p-3 font-semibold text-center">{h.name}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE US ================= */}
        <section className={`py-12 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
              {t("whyTitle") || "Why Choose Our Air Ambulance"} <HeartPulse className="animate-pulse text-red-600" />
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: t("certifiedCrew") || "Certified Medical Crew",
                  desc: t("certifiedCrewDesc") || "Experienced critical care physicians, flight nurses and paramedics certified for aero-medical operations.",
                },
                {
                  icon: CheckCircle,
                  title: t("icuequipped") || "Fully Equipped ICU Aircraft",
                  desc: t("icuequippedDesc") || "Aircraft outfitted with invasive ventilators, cardiac monitoring, syringe pumps and full resuscitation kits.",
                },
                {
                  icon: Headphones,
                  title: t("support247") || "24/7 Global Coordination",
                  desc: t("support247Desc") || "Dedicated operations desk handling clearances, diplomatic support, and hospital handovers any time, any day.",
                },
              ].map((it, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl shadow-md ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
                  data-aos="fade-up"
                  data-aos-delay={idx * 80}
                >
                  <it.icon className="w-8 h-8 text-red-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold mb-2">{it.title}</h4>
                  <p className="opacity-80 text-sm">{it.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRICING & INSURANCE ================= */}
        <section className="py-12 max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div data-aos="fade-right">
              <h3 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
                {t("pricingTitle") || "Pricing Example & What’s Included"} <HeartPulse className="animate-pulse text-red-600" />
              </h3>
              <p className="opacity-90 mb-4">
                {t("pricingIntro") || "Air ambulance pricing depends on aircraft, distance, medical staffing, and support services. Below is a sample estimate for planning purposes."}
              </p>
              <div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="text-sm opacity-80">{pricingExample.route}</div>
                    <div className="text-xl font-bold mt-1">{pricingExample.estimate}</div>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-sm opacity-85">{pricingExample.inclusions}</div>
              </div>
            </div>
            <div data-aos="fade-left">
              <h4 className="text-lg font-semibold mb-2">{t("insuranceTitle") || "Insurance & Partners"}</h4>
              <p className="opacity-90 mb-4">{t("insuranceText") || "We work with major insurers to facilitate approvals and claims for medical flights."}</p>
              <ul className="grid grid-cols-1 gap-2">
                {insurancePartners.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm opacity-90">
                    <CheckCircle className="w-4 h-4 text-green-500" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className={`py-12 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h3 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
              {t("faqTitle") || "Frequently Asked Questions"} <HeartPulse className="animate-pulse text-red-600" />
            </h3>
            <div className="space-y-4 text-left">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl shadow-md ${darkMode ? "bg-gray-900" : "bg-white"}`}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <h4 className="font-semibold mb-1">{f.q}</h4>
                  <p className="opacity-85 text-sm">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
