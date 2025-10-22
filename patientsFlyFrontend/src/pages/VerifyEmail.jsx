import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useLanguage } from "../component/context/useLanguage";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage("en");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (!token) {
          setError("Token not found or invalid. Please try again.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          `${baseUrl}/api/air-ambulance/v1/auth/verify-email`,
          { token }
        );

        if (response.data.ok) {
          setMessage(response.data.message);
        } else {
          setError(response.data.message || "Verification failed.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    verifyEmail();
  }, [baseUrl]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dtqvpdacj/image/upload/v1754897850/air_ambulance_ifn8uz.png"
              alt="telerism"
              className="w-40"
            />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-10 h-10 text-main-color animate-spin" />
            <p className="text-gray-600 text-base">{t("verifyingYourEmail")}...</p>
          </div>
        )}

        {/* Success Message */}
        {!loading && message && (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <p className="text-green-600 text-lg font-medium">{message}</p>
            <Link
              to="/login"
              className="mt-4 inline-block bg-main-color hover:bg-main-hover text-white text-base font-medium rounded-lg px-5 py-2 transition"
            >
              {t("goToLogin")}
            </Link>
          </div>
        )}

        {/* Error Message */}
        {!loading && error && (
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="w-12 h-12 text-red-500" />
            <p className="text-red-600 text-lg font-medium">{error}</p>
            <Link
              to="/"
              className="mt-4 inline-block bg-gray-600 hover:bg-gray-700 text-white text-base font-medium rounded-lg px-5 py-2 transition"
            >
              {t("backToHome")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
