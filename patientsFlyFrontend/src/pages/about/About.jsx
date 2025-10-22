import { useTheme } from "../../component/context/ThemeContext";
import Layout from "../../component/Layout/Layout";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "./../home/HeroSection";
import AboutUs from "./section/AboutPage";
import { Helmet } from "react-helmet";
import PartnerHospitals from "../home/PartnerHospitals";
import OurServicesSection from "../ourServices/section/OurServicesSection";
import ClientTestimonials from "../home/ClientTestimonials";
import ContactSection from "../home/ContactSection";
import FooterOffices from "../home/FooterOffices";


const About = () => {
  const { darkMode } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 1200, // animation duration in ms
      once: false, // run only once
      easing: "ease-in-out", // smooth easing
      mirror: true,
    });
  }, []);
  
  const homeHeroText = {
    heroTitle: "aboutUsTitle",
    heroDescription: "aboutUsDescription",
    contactUs: "contactUs",
    image:"https://res.cloudinary.com/dtqvpdacj/image/upload/v1760877751/about-us_t73lgx.jpg"
  };

  return (
    <Layout title={"About Us -Patients Fly Medical Travel Assistance "} description={"Patients Fly"}>
      <Helmet>
        <title>About Us — Patients Fly</title>
        <meta
          name="description"
          content="Patients Fly is a patient travel & care coordination service offering international medical travel, hospital partnerships, visa support and full end-to-end patient assistance."
        />
      </Helmet>
      <div
        className={`w-full min-h-screen ${
          darkMode ? "bg-black text-white" : "bg-white"
        }`}
      >  
        {/* Hero Section */}
        <HeroSection value={homeHeroText}/> 
        <AboutUs/>
        <OurServicesSection/>
        <PartnerHospitals/>
        <ClientTestimonials/>
        <ContactSection/>
        <FooterOffices/>
      </div>
    </Layout>
  );
};

export default About;
