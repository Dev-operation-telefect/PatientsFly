import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "../../component/context/ThemeContext";
import Lottie from "lottie-react";
import registration from "../../lottieFiles/registration.json";
import { useLanguage } from "../../component/context/useLanguage";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../component/context/toast";
import { useState } from "react";
import { registerUser } from "../../api/authApi";

const AdminRegistration = () => {
  const { darkMode } = useTheme();
  const { t } = useLanguage("en");
  const { show } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // validation
  const validate = () => {
    if (!formData.fullName.trim()) return t("fullNameRequired");
    if (!formData.email.includes("@")) return t("validEmailRequired");
    if (!formData.phone.trim()) return t("phoneRequired");
    if (formData.password.length < 6) return t("passwordMinLength");
    if (formData.password !== formData.confirmPassword)
      return t("passwordMismatch");
    return null;
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      show(error, "error");
      return;
    }
    setLoading(true);
    try {
      await registerUser(formData);
      show({
        title: t("checkYourEmail"),
        description: t("yourActionCompleted"),
        variant: "success",
      })
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || t("somethingWentWrong");
      show(msg, "error");
    } finally {
      setLoading(false);
    }
  };

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
          <Lottie animationData={registration} loop={true} />
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-6">
          {/* Title */}
          <h2 className="text-center text-lg font-bold text-red-600 mb-6">
            {t("adminRegistration")}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: t("fullName"), type: "text", name: "fullName" },
              { label: t("email"), type: "email", name: "email" },
              { label: t("phoneNumber"), type: "text", name: "phone" },
              { label: t("password"), type: "password", name: "password" },
              {
                label: t("confirmPassword"),
                type: "password",
                name: "confirmPassword",
              },
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
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full bg-transparent outline-none border-none focus:outline-none focus:ring-0 resize-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                />
              </fieldset>
            ))}

            {/* Back to login */}
            <div className="flex items-center justify-between text-sm">
              <Link to="/dashboard/admin" className="text-teal-700 hover:underline">
                {t("backToDashboard")}
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? t("loading") : t("registration")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistration;
