import { useTheme } from "../../component/context/ThemeContext";
import Layout from "../../component/Layout/Layout";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "./../home/HeroSection";
import Services from "./section/Services";


const OurServices = () => {
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
    heroTitle: "ourServicesHeroTitle",
    heroSubTitle: "ourServicesHeroSubTitle",
    heroDescription: "ourServicesHeroDescription",
    contactUs: "contactUs",
    image:"https://res.cloudinary.com/dtqvpdacj/image/upload/v1760878086/Service_cry7k0.jpg"
  };

  return (
    <Layout title={"OurServices -Patients Fly Medical Travel Assistance "} description={"Patients Fly"}>
      <div
        className={`w-full min-h-screen ${
          darkMode ? "bg-black text-white" : "bg-white"
        }`}
      >  
        {/* Hero Section */}
        <HeroSection value={homeHeroText}/>
        <Services/>



      </div>
    </Layout>
  );
};

export default OurServices;
