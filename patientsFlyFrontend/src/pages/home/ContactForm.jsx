import React, { useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useForm } from "react-hook-form";
import { ArrowRight, HeartPulse } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // ✅ Initialize AOS once
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ✅ Form Submit Handler
  const onSubmit = async (data) => {
    console.log("✅ Form Submitted:", data);
    alert("Thank you! Your message has been submitted successfully.");
  };

  return (
    <section
      className="py-16 bg-gray-50 dark:bg-gray-900 flex justify-center px-4"
      id="contact"
    >
      <div
        className="max-w-5xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row"
        data-aos="fade-up"
      >
        {/* ===== Left Image Section ===== */}
        <div
          className="md:w-1/2 w-full"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <img
            src="https://res.cloudinary.com/dtqvpdacj/image/upload/v1760870743/successful-medical-team_ya8d1e.jpg"
            alt="Customer Support Representative"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ===== Right Form Section ===== */}
        <div
          className="md:w-1/2 w-full p-8 md:p-10"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <h2 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 text-red-600 dark:text-red-600">
            Let’s Get In Touch <HeartPulse className="animate-pulse text-red-600" />
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* ===== Name Fields ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div data-aos="fade-up" data-aos-delay="400">
                <input
                  type="text"
                  placeholder="Enter your First Name..."
                  {...register("firstName", { required: "First name is required" })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#114a74] outline-none"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div data-aos="fade-up" data-aos-delay="500">
                <input
                  type="text"
                  placeholder="Enter your Last Name..."
                  {...register("lastName", { required: "Last name is required" })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#114a74] outline-none"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* ===== Email ===== */}
            <div data-aos="fade-up" data-aos-delay="600">
              <input
                type="email"
                placeholder="Enter your Email Address..."
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#114a74] outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* ===== Phone ===== */}
            <div data-aos="fade-up" data-aos-delay="700" className="relative z-10">
              <PhoneInput
                country={"us"}
                onChange={(value) => setValue("phone", value, { shouldValidate: true })}
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                inputClass="!w-full !py-2 !rounded-lg !border !border-gray-300 dark:!border-gray-700 dark:!bg-gray-900 dark:!text-white focus:!ring-2 focus:!ring-[#114a74] outline-none"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* ===== Message ===== */}
            <div data-aos="fade-up" data-aos-delay="800">
              <textarea
                rows="4"
                placeholder="Enter your Message..."
                {...register("message", { required: "Message is required" })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#114a74] outline-none resize-none"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* ===== Submit Button ===== */}
            <div data-aos="zoom-in" data-aos-delay="900">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#114a74] hover:bg-[#0d3a5a] text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? "Submitting..." : "Submit Form"}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
