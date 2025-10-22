import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function FooterOffices() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const offices = [
    {
      title: "Uttara Office",
      address:
        "2nd Floor, House 06, Road 11, UttAra Sector 01, Dhaka 1230",
    },
    {
      title: "Banani Office",
      address:
        "Flat 2B, House 88, Road 17A, Block E, Banani, Dhaka 1213",
    },
    {
      title: "Thailand Office",
      address:
        "348 Soi Srikhiwan Rama 5, Soi 41 Suan Luang, Bangkok, 10250",
    },
  ];

  return (
    <footer className="bg-main-color text-white py-12 px-4 dark:bg-[#a5a3a3]">
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        data-aos="fade-up"
      >
        {offices.map((office, idx) => (
          <div
            key={idx}
            className="bg-[#17669e] dark:bg-[#17669e]rounded-lg p-4 text-sm shadow-md hover:-translate-y-1 transition-all"
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
          >
            <h4 className="font-semibold mb-1">{office.title}</h4>
            <p className="opacity-90 leading-relaxed">{office.address}</p>
          </div>
        ))}
      </div>
    </footer>
  );
}
