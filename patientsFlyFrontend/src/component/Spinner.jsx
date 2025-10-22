import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

const Spinner = ({ path = "login" }) => {
  const { darkMode } = useTheme();
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, { state: location.pathname });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  // Dynamic theme styles
  const cardBg = darkMode
    ? "bg-gray-900/70 backdrop-blur-md border border-gray-700"
    : "bg-white/70 backdrop-blur-md border border-gray-200";
  const textColor = darkMode ? "text-white" : "text-gray-900";
  const subTextColor = darkMode ? "text-gray-300" : "text-gray-600";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div
        className={`p-8 rounded-3xl shadow-2xl text-center w-80 transform transition-all duration-500 animate-fade-in scale-95 ${cardBg}`}
      >
        {/* Heading */}
        <h2 className={`text-2xl font-bold mb-3 tracking-wide ${textColor}`}>
          Redirecting
        </h2>
        <p className={`mb-6 text-sm ${subTextColor}`}>
          You’ll be redirected in{" "}
          <span className="font-bold text-blue-500">{count}</span>{" "}
          second{count !== 1 && "s"}.
        </p>

        {/* Spinner */}
        <div className="relative flex justify-center">
          <div className="w-14 h-14 border-4 border-transparent border-t-blue-500 border-r-blue-400 rounded-full animate-spin" />
          <div className="absolute inset-0 w-14 h-14 border-4 border-transparent border-b-purple-500 border-l-pink-400 rounded-full animate-spin-slow" />
        </div>
      </div>
    </div>
  );
};

export default Spinner;

// @keyframes spin-slow {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }
// .animate-spin-slow {
//   animation: spin-slow 3s linear infinite;
// }
// @keyframes fade-in {
//   from { opacity: 0; transform: scale(0.9); }
//   to { opacity: 1; transform: scale(1); }
// }
// .animate-fade-in {
//   animation: fade-in 0.4s ease-in-out;
// }

