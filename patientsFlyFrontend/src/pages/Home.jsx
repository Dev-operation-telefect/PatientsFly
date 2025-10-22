import { useTheme } from "../component/context/ThemeContext";
import Layout from "../component/Layout/Layout";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "./home/HeroSection";
import AboutPatientFly from "./about/section/AboutPatientFly";
import OurServicesSection from "./ourServices/section/OurServicesSection";
import HowItWorks from "./home/HowItWorks";
import WhyChooseUs from "./home/WhyChooseUs";
import PartnerHospitals from "./home/PartnerHospitals.jsx";
import ClientTestimonials from "./home/ClientTestimonials";
import ContactForm from "./home/ContactForm";
import ContactSection from "./home/ContactSection";
import FooterOffices from "./home/FooterOffices";

const Home = () => {
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
    heroTitle: "heroTitle",
    heroSubTitle: "heroSubTitle",
    heroDescription: "heroDescription",
    contactUs: "contactUs",
    image:"https://res.cloudinary.com/dtqvpdacj/image/upload/v1760607395/ChatGPT_Image_Oct_16_2025_03_00_13_PM_n1rs0d.png"
  };

  return (
    <Layout title={"Home -Patients Fly Medical Travel Assistance "} description={"Patients Fly"}>
      <div
        className={`w-full min-h-screen ${
          darkMode ? "bg-black text-white" : "bg-white"
        } pt-6`}
      >  
        {/* Hero Section */}
        <HeroSection value={homeHeroText}/>
        <AboutPatientFly/>
        <OurServicesSection/>
        <HowItWorks/>
        <WhyChooseUs/>
        <PartnerHospitals/>
        <ClientTestimonials/>
        <ContactForm/>
        <ContactSection/>
        <FooterOffices/>



      </div>
    </Layout>
  );
};

export default Home;
