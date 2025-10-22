// TermsAndConditions.jsx
import { useState } from "react";
import Layout from "../component/Layout/Layout";
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

const TermsAndConditions = ({
  companyName = defaultText.companyName,
  effectiveDate = defaultText.effectiveDate,
  contactEmail = defaultText.contactEmail,
}) => {
    const homeHeroFormText = {
        heroTitle: "termsAndConditions",
        heroSubTitle: "realJourneysRealPeopleRealExperiences",
        heroDescription:"ourProcessDescription",
        contactUs: "contactUs",
    };
  return (
    <Layout
      title={"Air Ambulance - Terms & Conditions"}
      description={"Air Ambulance Terms & Conditions"}
    >
    <div className="dark:bg-black">
        {/* Hero Section */}
        <HeroSection value={homeHeroFormText}/>
      <div className="container mx-auto px-4 py-12 sm:py-16 dark:bg-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* Sidebar / TOC */}
          <nav className="col-span-1 sticky top-6 self-start hidden md:block">
            <div className="p-4 rounded-lg  dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Contents
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><a href="#introduction" className="hover:underline">Introduction</a></li>
                <li><a href="#use-of-service" className="hover:underline">Use of Service</a></li>
                <li><a href="#user-obligations" className="hover:underline">User Obligations</a></li>
                <li><a href="#prohibited" className="hover:underline">Prohibited Uses</a></li>
                <li><a href="#payments" className="hover:underline">Payments & Fees</a></li>
                <li><a href="#intellectual-property" className="hover:underline">Intellectual Property</a></li>
                <li><a href="#disclaimer" className="hover:underline">Disclaimer of Warranties</a></li>
                <li><a href="#limitation" className="hover:underline">Limitation of Liability</a></li>
                <li><a href="#indemnity" className="hover:underline">Indemnification</a></li>
                <li><a href="#termination" className="hover:underline">Termination</a></li>
                <li><a href="#third-party" className="hover:underline">Third-Party Content & Links</a></li>
                <li><a href="#governing-law" className="hover:underline">Governing Law</a></li>
                <li><a href="#changes" className="hover:underline">Changes</a></li>
                <li><a href="#privacy" className="hover:underline">Privacy</a></li>
                <li><a href="#contact" className="hover:underline">Contact</a></li>
                <li><a href="#misc" className="hover:underline">Miscellaneous</a></li>
              </ul>
            </div>
          </nav>

          {/* Content */}
          <article className="col-span-2 prose max-w-none dark:prose-invert dark:text-gray-300">
            <Section id="introduction" title="1. Introduction" openByDefault>
              <p>
                Welcome to <strong>{companyName}</strong> ("we", "us", "our"). These Terms &amp;
                Conditions ("Terms") govern your access to and use of our website, products, and services
                (collectively, the "Service"). By accessing or using the Service you agree to be bound by
                these Terms. If you do not agree, do not use the Service.
              </p>
            </Section>

            <Section id="use-of-service" title="2. Use of the Service">
              <p>
                You must be at least 18 years old or of the legal age in your jurisdiction to form a binding contract
                to use our Service. You agree to use the Service only for lawful purposes and in compliance with all
                applicable laws and regulations.
              </p>
            </Section>

            <Section id="user-obligations" title="3. User Obligations">
              <ul>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You must provide accurate, current, and complete information when creating or updating your account.</li>
                <li>You are responsible for all activity that occurs under your account.</li>
              </ul>
            </Section>

            <Section id="prohibited" title="4. Prohibited Uses">
              <p>The following are examples of prohibited activities — this list is illustrative, not exhaustive:</p>
              <ul>
                <li>Illegal or fraudulent activities.</li>
                <li>Interfering with or disrupting the Service or servers or networks connected to the Service.</li>
                <li>Attempting to gain unauthorized access to other accounts, systems, or networks.</li>
                <li>Reverse engineering, decompiling, or attempting to extract source code from the Service.</li>
              </ul>
            </Section>

            <Section id="payments" title="5. Payments, Subscriptions & Refunds">
              <p>
                If the Service requires payment, you agree to pay all fees and applicable taxes. Payment methods
                and billing cycles will be described at purchase. We reserve the right to change pricing or
                subscription terms; changes will not affect already-paid subscription periods unless stated.
              </p>
              <p>
                Refund policies (if any) will be provided at checkout or in a refund policy document. For disputed
                charges, please contact us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </p>
            </Section>

            <Section id="intellectual-property" title="6. Intellectual Property">
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive
                property of {companyName} and its licensors. The Service is protected by copyright, trademark, and
                other laws. You agree not to copy, modify, or create derivative works of our content except as
                expressly permitted by {companyName}.
              </p>
            </Section>

            <Section id="disclaimer" title="7. Disclaimer of Warranties">
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, {companyName} DISCLAIMS ALL WARRANTIES,
                INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                AND NON-INFRINGEMENT.
              </p>
            </Section>

            <Section id="limitation" title="8. Limitation of Liability">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL {companyName} OR ITS OFFICERS, DIRECTORS,
                EMPLOYEES, OR AGENTS BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES,
                INCLUDING LOST PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION, ARISING OUT OF OR IN CONNECTION WITH
                YOUR USE OF THE SERVICE.
              </p>
            </Section>

            <Section id="indemnity" title="9. Indemnification">
              <p>
                You agree to indemnify, defend, and hold harmless {companyName} from and against any claims,
                liabilities, damages, losses, and expenses (including reasonable attorneys' fees and costs) arising
                from your use of the Service, violation of these Terms, or infringement of any intellectual property
                or other right of any person or entity.
              </p>
            </Section>

            <Section id="termination" title="10. Termination">
              <p>
                We may suspend or terminate your access to the Service for any reason, including breach of these
                Terms, with or without notice. Upon termination, your right to use the Service will cease immediately.
              </p>
            </Section>

            <Section id="third-party" title="11. Third-Party Content & Links">
              <p>
                The Service may contain links to third-party websites or services that are not owned or controlled by{" "}
                {companyName}. We are not responsible for the content, privacy policies, or practices of any third
                parties. Your dealings with third parties are solely between you and the third party.
              </p>
            </Section>

            <Section id="governing-law" title="12. Governing Law">
              <p>
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction where
                {companyName} is established, without regard to conflict of law provisions. Any dispute arising under
                or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in
                that jurisdiction.
              </p>
            </Section>

            <Section id="changes" title="13. Changes to Terms">
              <p>
                We may update these Terms from time to time. When we do, we will revise the "Effective Date" at the
                top of this page. Your continued use of the Service after any changes constitutes acceptance of the
                new Terms.
              </p>
            </Section>

            <Section id="privacy" title="14. Privacy">
              <p>
                Our Privacy Policy explains how we collect and use personal data. By using the Service you agree to
                the collection and use of information in accordance with that policy. Please review our Privacy Policy
                before using the Service.
              </p>
            </Section>

            <Section id="contact" title="15. Contact">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <address>
                <strong>{companyName}</strong>
                <br />
                Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </address>
            </Section>

            <Section id="misc" title="16. Miscellaneous">
              <p>
                These Terms constitute the entire agreement between you and {companyName} regarding the use of the
                Service. If any provision of these Terms is found to be unenforceable, that provision will be severed
                and the remaining terms will remain in full force and effect.
              </p>
            </Section>

            <footer className="mt-8 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong>Disclaimer:</strong> This Terms & Conditions template is provided for convenience and informational
                purposes only and does not constitute legal advice. Consult with an attorney to ensure your Terms &amp;
                Conditions are properly drafted for your business and jurisdiction.
              </p>
            </footer>
          </article>
        </div>
      </div></div>
    </Layout>
  );
};

export default TermsAndConditions;
