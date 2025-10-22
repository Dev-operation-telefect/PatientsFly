import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Questioning from "../lottieFiles/Questioning.json";
const NotFoundPage = () => {
    const [dark, setDark] = useState(false);
    useEffect(() => {
      AOS.init({ duration: 800, once: true });
    }, []);

    return (
      <div className={`${dark ? "dark" : ""}`}>
        <div className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center px-4">
          <div className="bg-white dark:bg-darkBG rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 max-w-4xl w-full" data-aos="fade-up">
            {/* Left side text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-6xl font-extrabold text-red-500">404</h1>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Page Not Found
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Oops! Something went wrong. The page you’re looking for isn’t available or an unexpected error occurred.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                <Link to={"/"} className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">Go Back</Link>
                <Link to={"/"} className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">Home</Link>
                <Link to={"/contact"} className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">Contact us</Link>
              </div>
            </div>
  
            {/* Right side image */}
            <div className="flex-1" data-aos="zoom-in" data-aos-delay="200">
                <Lottie
                  animationData={Questioning}
                  loop={true}
                  className="w-100 h-100 mt-4"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                />
            </div>
          </div>
        </div>
      </div>
    );
};

export default NotFoundPage;