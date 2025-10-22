import { HeartPulse } from 'lucide-react';
import React from 'react';
import { useLanguage } from '../../../component/context/useLanguage';

const GlobalReach = () => {
      const { t, currentLang } = useLanguage();
    return (
        <div>
            {/* Global Reach */}
            <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-700 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://res.cloudinary.com/demo/image/upload/v1725000001/world-map-bg.png')] bg-cover bg-center"></div>
            
              <div className="relative z-10 max-w-6xl mx-auto px-6">
                <h3
                  className="text-3xl sm:text-3xl font-extrabold flex items-center justify-center gap-3 text-red-600 dark:text-red-600"
                  data-aos="fade-up"
                >
                  {t("globalReach")} <HeartPulse className="animate-pulse text-red-600" />
                </h3>
            
                <p
                  className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto mb-10"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  {t("globalText")}
                </p>
            
                {/* Country Stats */}
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  {[
                    { country: "Singapore", flag: "🇸🇬", patients: "2K+" },
                    { country: "India", flag: "🇮🇳", patients: "5K+" },
                    { country: "Thailand", flag: "🇹🇭", patients: "3.2K+" },
                    { country: "Turkey", flag: "🇹🇷", patients: "1.8K+" },
                    { country: "UAE", flag: "🇦🇪", patients: "2.5K+" },
                    { country: "Malaysia", flag: "🇲🇾", patients: "1.2K+" },
                  ].map((c, i) => (
                    <div
                      key={c.country}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-6 transition transform hover:scale-105"
                    >
                      <div className="text-4xl mb-2">{c.flag}</div>
                      <h4 className="font-semibold text-lg">{c.country}</h4>
                      <p className="text-sm opacity-80">{t("patientsServed")}: {c.patients}</p>
                    </div>
                  ))}
                </div>
            
                {/* Additional Info */}
                <div
                  className="mt-16 max-w-3xl mx-auto space-y-5 text-base sm:text-lg opacity-95"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <p>
                    {t("globalExtra1")}
                  </p>
                  <p>
                    {t("globalExtra2")}
                  </p>
                </div>
              </div>
            </section>
        </div>
    );
};

export default GlobalReach;