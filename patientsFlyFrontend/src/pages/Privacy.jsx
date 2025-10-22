// PrivacyPolicy.jsx
import { useState, useEffect } from "react";
import Layout from "../component/Layout/Layout";
import { useTheme } from "../component/context/ThemeContext";
import HeroSection from "./home/HeroSection";

const defaultText = {
  companyName: "Thai Air Ambulance",
  effectiveDate: "August 25, 2025",
  contactEmail: "AirAmbulance@gmail.com",
};

const Section = ({ id, title, children, openByDefault = false }) => {
  const [open, setOpen] = useState(openByDefault);
  return (
    <section id={id} className="mb-6">
      <button
        className="w-full flex items-center justify-between text-left focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${id}-content`}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <svg
          className={`h-6 w-6 transform transition-transform ${
            open ? "rotate-180" : ""
          } text-gray-600 dark:text-gray-300`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.707.293l6 6a1 1 0 01-1.414 1.414L10 5.414 4.707 10.707A1 1 0 113.293 9.293l6-6A1 1 0 0110 3z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        id={`${id}-content`}
        className={`mt-3 prose max-w-none dark:prose-invert ${
          open ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </section>
  );
};

const Privacy = ({
  companyName = defaultText.companyName,
  effectiveDate = defaultText.effectiveDate,
  contactEmail = defaultText.contactEmail,
}) => {
  const { darkMode } = useTheme();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);
  const homeHeroFormText = {
    heroTitle: "privacyPolicy",
    heroSubTitle: "realJourneysRealPeopleRealExperiences",
    heroDescription:"ourProcessDescription",
    contactUs: "contactUs",
  };

  return (
    <Layout
      title={`${companyName} - Privacy Policy`}
      description={`${companyName} Privacy Policy`}
      className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300"
    >
      <div className=" dark:bg-black">
      {/* Hero Section */}
        <HeroSection value={homeHeroFormText}/>
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar / TOC */}
          <nav className="col-span-1 sticky top-6 self-start hidden md:block">
            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Contents
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><a href="#introduction" className="hover:underline">Introduction</a></li>
                <li><a href="#information" className="hover:underline">Information We Collect</a></li>
                <li><a href="#use" className="hover:underline">How We Use Information</a></li>
                <li><a href="#sharing" className="hover:underline">Sharing of Information</a></li>
                <li><a href="#cookies" className="hover:underline">Cookies & Tracking</a></li>
                <li><a href="#security" className="hover:underline">Data Security</a></li>
                <li><a href="#rights" className="hover:underline">Your Rights</a></li>
                <li><a href="#thirdparty" className="hover:underline">Third-Party Services</a></li>
                <li><a href="#children" className="hover:underline">Children’s Privacy</a></li>
                <li><a href="#changes" className="hover:underline">Changes</a></li>
                <li><a href="#contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>
          </nav>

          {/* Content */}
          <article className="col-span-2 prose max-w-none dark:prose-invert dark:text-gray-300">
            <Section id="introduction" title="1. Introduction" openByDefault>
              <p>
                {companyName} ("we", "our", "us") respects your privacy and is
                committed to protecting your personal data. This Privacy Policy
                explains how we collect, use, and safeguard your information
                when you use our services.
              </p>
            </Section>

            <Section id="information" title="2. Information We Collect">
              <ul>
                <li>Personal information such as name, email, phone number, and address when you register or contact us.</li>
                <li>Payment details if you purchase services.</li>
                <li>Technical data including IP address, browser type, and usage information.</li>
              </ul>
            </Section>

            <Section id="use" title="3. How We Use Information">
              <ul>
                <li>To provide and improve our services.</li>
                <li>To process payments and fulfill requests.</li>
                <li>To communicate with you, including sending updates and marketing messages.</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </Section>

            <Section id="sharing" title="4. Sharing of Information">
              <p>
                We do not sell your personal data. We may share information with:
              </p>
              <ul>
                <li>Service providers who help us operate our business.</li>
                <li>Legal authorities when required by law.</li>
                <li>In case of a merger, sale, or acquisition of our business.</li>
              </ul>
            </Section>

            <Section id="cookies" title="5. Cookies & Tracking">
              <p>
                We use cookies and similar tracking technologies to enhance user
                experience, analyze traffic, and personalize content. You can
                control cookies through your browser settings.
              </p>
            </Section>

            <Section id="security" title="6. Data Security">
              <p>
                We implement appropriate technical and organizational measures
                to protect personal data. However, no method of transmission or
                storage is completely secure, and we cannot guarantee absolute
                security.
              </p>
            </Section>

            <Section id="rights" title="7. Your Rights">
              <ul>
                <li>Access, update, or delete your personal data.</li>
                <li>Withdraw consent where processing is based on consent.</li>
                <li>Object to processing in certain cases.</li>
                <li>Request data portability.</li>
              </ul>
            </Section>

            <Section id="thirdparty" title="8. Third-Party Services">
              <p>
                Our service may link to third-party websites or integrate with
                external services. We are not responsible for their privacy
                practices, and we encourage you to review their policies.
              </p>
            </Section>

            <Section id="children" title="9. Children’s Privacy">
              <p>
                Our services are not directed to children under 13 (or relevant
                age in your jurisdiction). We do not knowingly collect personal
                data from children. If you believe a child has provided data,
                please contact us for removal.
              </p>
            </Section>

            <Section id="changes" title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy periodically. Changes will be
                posted with a revised Effective Date. Continued use of the
                Service after changes indicates acceptance of the updated
                policy.
              </p>
            </Section>

            <Section id="contact" title="11. Contact Us">
              <p>
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <address>
                <strong>{companyName}</strong>
                <br />
                Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </address>
            </Section>

            <footer className="mt-8 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong>Note:</strong> This Privacy Policy is a general template
                for informational purposes only and does not constitute legal
                advice. For compliance with local laws, consult a qualified
                professional.
              </p>
            </footer>
          </article>
        </div>
      </div></div>
    </Layout>
  );
};

export default Privacy;
