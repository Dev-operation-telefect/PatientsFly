import { useTheme } from "../../component/context/ThemeContext";
import Layout from "../../component/Layout/Layout";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "./../home/HeroSection";
import ContactUsPage from "./section/ContactUsPage";
import AirAmbulance from "../airAmbulancePage/section/AirAmbulance";
import ContactSection from "../home/ContactSection";
import FooterOffices from "../home/FooterOffices";


const Contact = () => {
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
    heroTitle: "contactPageTitle",
    heroSubTitle: "heroSubTitle",
    heroDescription: "contactPageDesc",
    contactUs: "contactUs",
    image:"https://res.cloudinary.com/dtqvpdacj/image/upload/v1760877930/contac_cjthzg.png"
  };

  return (
    <Layout title={"Contact -Patients Fly Medical Travel Assistance "} description={"Patients Fly"}>
      <div
        className={`w-full min-h-screen ${
          darkMode ? "bg-black text-white" : "bg-white"
        }`}
      >  
        {/* Hero Section */}
        <HeroSection value={homeHeroText}/>
        <ContactUsPage/>
        <ContactSection/>
        <FooterOffices/>
      </div>
    </Layout>
  );
};

export default Contact;
