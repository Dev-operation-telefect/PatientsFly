import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "../../component/context/ThemeContext";
import Lottie from "lottie-react";
import forgot from "../../lottieFiles/forgot.json";
import { useLanguage } from "../../component/context/useLanguage";
import { Link } from "react-router-dom";

const Forgot = () => {
  const { darkMode } = useTheme();
  const { t } = useLanguage("en");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 ${
        darkMode ? "bg-black" : "bg-gray-100"
      }`}
    >
      <div
        className={`flex flex-col md:flex-row w-full max-w-4xl rounded-lg shadow-lg overflow-hidden ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
        data-aos="zoom-in"
      >
        {/* Left Side - Lottie Animation */}
        <div className="hidden md:flex items-center justify-center w-full md:w-1/2 bg-transparent p-4">
          <Lottie animationData={forgot} loop={true} />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-6">
          {/* Title */}
          <h2 className="text-center text-lg font-bold text-red-600 mb-6">
            {t('adminForgotPassword')}
          </h2>

          {/* Form */}
          <form className="space-y-4">
              {[
                { label: t("email"), type: "email", name: "email" },
              ].map((field, idx) => (
                <fieldset
                  key={idx}
                  className={`border rounded px-3 pt-1 ${
                    darkMode
                      ? "border-gray-600 focus-within:border-red-500"
                      : "border-gray-300 focus-within:border-red-500"
                  }`}
                >
                  <legend
                    className={`text-xs px-1 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {field.label}
                  </legend>
                  <input
                    type={field.type}
                    name={field.name}
                    className={`w-full bg-transparent outline-none border-none focus:outline-none focus:ring-0 resize-none ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  />
                </fieldset>
              ))}
              
                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <Link to={"/login"} className="text-teal-700 hover:underline">
                    {t('backToLogin')}
                  </Link>
                </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
              >
                {t('forgotPassword')}
              </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
