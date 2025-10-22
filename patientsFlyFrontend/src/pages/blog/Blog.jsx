import { useTheme } from "../../component/context/ThemeContext";
import Layout from "../../component/Layout/Layout";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "./../home/HeroSection";
import BlogPage from "./section/BlogPage";
import GlobalReach from "../about/section/GlobalReach";
import WhyChooseUs from "../home/WhyChooseUs";
import ContactSection from "../home/ContactSection";
import FooterOffices from "../home/FooterOffices";


const Blog = () => {
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
    heroTitle: "blogPageTitle",
    heroSubTitle: "heroSubTitle",
    heroDescription: "blogPageDesc",
    contactUs: "contactUs",
    image:"https://res.cloudinary.com/dtqvpdacj/image/upload/v1760877757/Blog_ydqrhj.jpg"
  };

  return (
    <Layout title={"Blog -Patients Fly Medical Travel Assistance "} description={"Patients Fly"}>
      <div
        className={`w-full min-h-screen ${
          darkMode ? "bg-black text-white" : "bg-white"
        }`}
      >  
        {/* Hero Section */}
        <HeroSection value={homeHeroText}/>
        <BlogPage/>
        <GlobalReach/>
        <WhyChooseUs/>
        <ContactSection/>
        <FooterOffices/>
      </div>
    </Layout>
  );
};

export default Blog;
