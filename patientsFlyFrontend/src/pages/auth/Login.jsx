import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "../../component/context/ThemeContext";
import Lottie from "lottie-react";
import login from "../../lottieFiles/login.json";
import { useLanguage } from "../../component/context/useLanguage";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../component/context/toast";
import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../component/context/auth";
import Cookies from "js-cookie";

const Login = () => {
  const { darkMode } = useTheme();
  const { t } = useLanguage("en");
  const { show } = useToast(); 
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // ✅ handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ form validation
  const validate = () => {
    if (!formData.email) {
      show("error", t("emailRequired") || "Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      show("error", t("invalidEmail") || "Invalid email address");
      return false;
    }
    if (!formData.password) {
      show("error", t("passwordRequired") || "Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      show("error", t("passwordTooShort") || "Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await loginUser(formData);
      if (res.data.success) {
        //  Save in cookies
        const cookieOptions = {
          expires: rememberMe ? 7 : null, // 7 days if rememberMe else session cookie
          secure: true,
          sameSite: "strict",
        };
        const authData = {
          user: res.data.user,
          token: res.data.token,
        };
        Cookies.set("auth", JSON.stringify(authData), cookieOptions);
        //  Save in localStorage if rememberMe, otherwise use sessionStorage
        if (rememberMe) {
          sessionStorage.setItem("auth", JSON.stringify(authData));
          localStorage.setItem("auth", JSON.stringify(authData));
        } else {
          localStorage.setItem("auth", JSON.stringify(authData));
        }
        //  Update auth state
        setAuth(authData);
        show({
          title: t("loginSuccess"),
          description: t("yourActionCompleted"),
          variant: "success",
        })
        setTimeout(() => navigate("/dashboard/admin"), 1500);
      } else {
        show("error", res.error?.data?.message || t("loginFailed"));
        show({
          title: t("loginFailed"),
          description: t("yourActionFailed"),
          variant: "error",
        })
      }
    } catch (err) {
      show({
        title: t("loginFailed"),
        description: t("yourActionFailed"),
        variant: "error",
      });
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
          <Lottie animationData={login} loop={true} />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-6">
          {/* Title */}
          <h2 className="text-center text-lg font-bold text-red-600 mb-6">
            {t("adminLogin")}
          </h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {[
              { label: t("email"), type: "email", name: "email" },
              { label: t("password"), type: "password", name: "password" },
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-teal-700" onChange={() => setRememberMe(!rememberMe)}/>
                {t("rememberMe")}
              </label>
              <Link to={"/forgot"} className="text-teal-700 hover:underline">
                {t("forgotPassword")}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 ${
                loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
              } text-white font-semibold rounded transition`}
            >
              {loading ? t("loading") || "Loading..." : t("login")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
