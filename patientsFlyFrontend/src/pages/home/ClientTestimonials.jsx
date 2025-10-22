import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "../../component/context/useLanguage";
import { HeartPulse, Star } from "lucide-react";

export default function ClientTestimonials() {
  const { t } = useLanguage("en");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const testimonials = [
    {
      id: 1,
      text: t(
        "PatientFly saved my father’s life by transferring him from Dhaka to Singapore in under 6 hours. The medical escort team was incredibly professional and calm during the entire journey."
      ),
      author: "Rahman Family",
      name: "Don Lay",
      img: "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg",
      role: "CEO & Managing Director",
      rating: 5.0,
    },
    {
      id: 2,
      text: t(
        "Our experience with PatientFly was outstanding. From the first phone call to landing in Bangkok, every detail was managed with care and precision. I couldn’t have asked for better support."
      ),
      author: "Maria Khan",
      name: "Maria Khan",
      img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      role: "Patient’s Daughter",
      rating: 5.0,
    },
    {
      id: 3,
      text: t(
        "I was nervous about flying after surgery, but the air ambulance staff made me feel safe and comfortable. Their medical expertise and attention to my condition were exceptional."
      ),
      author: "David Chen",
      name: "David Chen",
      img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      role: "Recovered Patient",
      rating: 5.0,
    },
    {
      id: 4,
      text: t(
        "PatientFly coordinated everything from visa assistance to hospital admission in Bangkok. Their team’s efficiency turned a stressful situation into a smooth experience for our family."
      ),
      author: "Saha Family",
      name: "Nusrat Saha",
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      role: "Family Representative",
      rating: 5.0,
    },
    {
      id: 5,
      text: t(
        "We had an emergency cardiac case needing immediate transfer to India. PatientFly’s quick response and medical escort team ensured my brother received treatment in time."
      ),
      author: "Arif Hossain",
      name: "Arif Hossain",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      role: "Corporate Client",
      rating: 5.0,
    },
    {
      id: 6,
      text: t(
        "The professionalism, compassion, and coordination of PatientFly’s staff exceeded all expectations. They made the entire international transfer process so much easier."
      ),
      author: "Laura Peterson",
      name: "Laura Peterson",
      img: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      role: "Patient Coordinator, GlobalCare",
      rating: 5.0,
    },
    {
      id: 7,
      text: t(
        "I highly recommend PatientFly for medical transport services. They worked directly with our hospital in Malaysia to ensure the patient’s stability during the flight."
      ),
      author: "Dr. Tan Wei",
      name: "Dr. Tan Wei",
      img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      role: "Consultant Cardiologist",
      rating: 5.0,
    },
    {
      id: 8,
      text: t(
        "During my father’s repatriation from Dubai, PatientFly handled all documentation, permissions, and coordination flawlessly. Their 24/7 communication gave us peace of mind."
      ),
      author: "Kamal Uddin",
      name: "Kamal Uddin",
      img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      role: "Patient’s Son",
      rating: 5.0,
    },
    {
      id: 9,
      text: t(
        "Working with PatientFly as a hospital partner has been excellent. Their team is reliable, fast, and deeply focused on patient safety — something that’s rare in this industry."
      ),
      author: "Bangkok Hospital Network",
      name: "Dr. Supattra Wong",
      img: "https://images.pexels.com/photos/1181691/pexels-photo-1181691.jpeg",
      role: "International Case Manager",
      rating: 5.0,
    },
  ];

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section
      className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      id="testimonials"
    >
      {/* SEO-friendly heading */}
      <div className="text-center mb-12 px-4" data-aos="fade-up">
        <h2 className="text-3xl sm:text-3xl font-extrabold flex items-center justify-center gap-3 text-red-600 dark:text-red-600">
          <span className="text-[#d11d1d]">✚</span>{" "}
          {t("whatOurClientsSay")}{" "}
          <span className="text-[#114a74]">{t("aboutWorkingWith")}</span>{" "}
          <span className="text-[#d11d1d]">Patientfly</span>
          <HeartPulse className="animate-pulse text-red-600" />
        </h2>
      </div>

      {/* Slider Section */}
      <div className="container mx-auto px-4" data-aos="fade-up">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={item.id} className="px-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 flex flex-col justify-between transition-transform hover:-translate-y-1 h-full">
                <div>
                  <p className="text-4xl text-[#114a74] mb-2">“</p>
                  <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                    {item.text}
                  </p>
                  <p className="text-[#114a74] font-semibold text-sm md:text-base">
                    – {item.author}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                    />
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium text-sm md:text-base">
                        {item.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.rating} Ratings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
