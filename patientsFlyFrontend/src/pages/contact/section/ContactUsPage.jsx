import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
  HeartPulse,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useTheme } from "../../../component/context/ThemeContext";
import { useLanguage } from "../../../component/context/useLanguage";

export default function ContactUsPage() {
  const { darkMode } = useTheme();
  const { t } = useLanguage("en");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Your message has been sent successfully!");
  };

  return (
    <main
      className={`min-h-screen ${
        darkMode ? " text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* 🧠 SEO */}
      <Helmet>
        <title>
          {t("contactPageTitle") ||
            "Contact Us | Patients Fly Health — Air Ambulance & Medical Visa Support"}
        </title>
        <meta
          name="description"
          content={
            t("contactPageDesc") ||
            "Contact Patients Fly Health for air ambulance, medical visa, or hospital coordination. Available 24/7 for patient support."
          }
        />
      </Helmet>

      {/* 🟥 HERO SECTION */}
      <section
        className={`py-24 text-center ${
          darkMode
            ? "bg-gradient-to-b from-gray-800 to-gray-900"
            : "bg-gradient-to-b from-blue-50 to-white"
        }`}
      >
        <h1 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
          {t("contactHeroTitle") || "Get in Touch with Patients Fly Health"} <HeartPulse className="animate-pulse text-red-600" />
        </h1>
        <p
          className="text-lg opacity-80 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t("contactHeroDesc") ||
            "We’re here 24/7 to assist you with air ambulance, medical travel, and international hospital support."}
        </p>
      </section>

      {/* 🟦 CONTACT CARDS */}
      <section className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
        {[
          {
            icon: <Phone className="text-red-600 w-8 h-8" />,
            title: "Emergency Hotline",
            info: "+880 1929-559911",
            desc: "Available 24/7 for patient transfer and medical emergencies.",
          },
          {
            icon: <Mail className="text-red-600 w-8 h-8" />,
            title: "Email Support",
            info: "support@Patients Fly.com",
            desc: "We reply within 1 hour on business days.",
          },
          {
            icon: <Clock className="text-red-600 w-8 h-8" />,
            title: "Working Hours",
            info: "Sat–Thu: 10:00 AM – 7:00 PM",
            desc: "Emergency service available 24/7.",
          },
          {
            icon: <MapPin className="text-red-600 w-8 h-8" />,
            title: "Our Main Office",
            info: "2B, House: 88, Road: 17A, Block-E, Banani, Dhaka-1213",
            desc: "Visit us for consultation and document assistance.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all ${
              darkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="font-semibold text-red-600">{item.info}</p>
            <p className="opacity-80 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 🟩 CONTACT FORM */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div
          className={`rounded-3xl shadow-xl p-10 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
          data-aos="fade-up"
        >
          <h2 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
            {t("sendUsMessage") || "Send Us a Message"} <HeartPulse className="animate-pulse text-red-600" />
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div>
              <label className="block font-semibold mb-2">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500 ${
                  darkMode
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Email Address</label>
              <input
                type="email"
                required
                placeholder="example@mail.com"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500 ${
                  darkMode
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+880 1XXXXXXXXX"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500 ${
                  darkMode
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Subject</label>
              <input
                type="text"
                placeholder="Message subject"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500 ${
                  darkMode
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "border-gray-300"
                }`}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold mb-2">Message</label>
              <textarea
                rows="6"
                required
                placeholder="Type your message here..."
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500 ${
                  darkMode
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "border-gray-300"
                }`}
              ></textarea>
            </div>
            <div className="sm:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-red-600 text-white font-semibold px-10 py-3 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
              >
                <Send size={18} /> Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 🟨 GOOGLE MAP */}
      <section className="py-20" data-aos="fade-up">
        <h3 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
          {t("findUsMap") || "Find Us on the Map"} <HeartPulse className="animate-pulse text-red-600" />
        </h3>
        <div className="max-w-6xl mx-auto px-6">
          <iframe
            title="Patients Fly Office Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1225.8753501154974!2d90.40855923440843!3d23.792456018501504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7d3409c9803%3A0x33240291aec3770d!2sSamitivej%20Hospital%20Bangladesh%20Office%2C%20Banani%2C%20Dhaka.!5e1!3m2!1sen!2sbd!4v1761117919537!5m2!1sen!2sbd"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
            className="rounded-2xl shadow-md"
          ></iframe>
        </div>
      </section>

      {/* 🟪 FAQ SECTION */}
      <section
        className={`py-20 ${
          darkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
        data-aos="fade-up"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
            {t("frequentlyAskedQuestions") || "Frequently Asked Questions"} <HeartPulse className="animate-pulse text-red-600" />
          </h3>
          <div className="text-left space-y-6">
            {[
              {
                q: "How quickly can an air ambulance be arranged?",
                a: "Usually within 2–4 hours depending on flight availability, medical clearance, and destination.",
              },
              {
                q: "Do you help with hospital appointments abroad?",
                a: "Yes. We partner with global hospitals to schedule treatment before travel.",
              },
              {
                q: "Can I get visa support for treatment in India or Thailand?",
                a: "Absolutely. We handle documentation and embassy liaison for quick visa approval.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl shadow-sm ${
                  darkMode ? "bg-gray-900" : "bg-white"
                }`}
              >
                <h4 className="font-bold text-lg mb-2 text-red-600">
                  {faq.q}
                </h4>
                <p className="opacity-80">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟫 SOCIAL CONNECT */}
      <section className="py-16 text-center" data-aos="fade-up">
        <h3 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
          {t("connectWithUs") || "Connect with Us"} <HeartPulse className="animate-pulse text-red-600" />
        </h3>
        <p className="opacity-80 mb-6">
          Follow us on social media for health tips, patient stories, and
          updates.
        </p>
        <div className="flex justify-center gap-6">
          {[
            {
              icon: <Facebook className="w-7 h-7" />,
              link: "https://www.facebook.com/PatientsFly",
            },
            {
              icon: <Instagram className="w-7 h-7" />,
              link: "https://instagram.com/PatientsFly",
            },
            {
              icon: <Linkedin className="w-7 h-7" />,
              link: "https://linkedin.com/PatientsFly",
            },
            {
              icon: <MessageSquare className="w-7 h-7" />,
              link: "https://t.me/PatientsFly",
            },
          ].map((social, i) => (
            <a
              key={i}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}
