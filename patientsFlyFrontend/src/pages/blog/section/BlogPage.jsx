import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Calendar, User, ArrowRight, Filter, Mail, HeartPulse } from "lucide-react";
import { Helmet } from "react-helmet";
import { useTheme } from "../../../component/context/ThemeContext";
import { useLanguage } from "../../../component/context/useLanguage";
import { blogPosts } from "../../../data/blogPosts";

export default function BlogPage() {
  const { darkMode } = useTheme();
  const { t } = useLanguage("en");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 200, once: true });
  }, []);

  const categories = ["All", ...new Set(blogPosts.map((b) => b.category))];
  const filteredBlogs =
    filter === "All"
      ? blogPosts
      : blogPosts.filter((b) => b.category === filter);

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? " text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <Helmet>
        <title>{t("blogPageTitleTop") || "Patients Fly Health Blog — Air Ambulance, Medical Visa & Global Healthcare "}</title>
        <meta
          name="description"
          content="Read expert blogs on air ambulance, medical visas, patient transport, and hospital care abroad — trusted by thousands of patients from Bangladesh."
        />
      </Helmet>

      {/* 🔹 Category Filter */}
      <div className="max-w-7xl  mx-auto px-6 flex flex-wrap items-center justify-center gap-3 mt-10" data-aos="fade-up">
        <Filter className="text-red-600" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              filter === cat
                ? "bg-red-600 text-white"
                : darkMode
                ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔹 Blog Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
          {t("latestArticles") || "Latest Articles"} <HeartPulse className="animate-pulse text-red-600" />
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBlogs.map((post, i) => (
            <article
              key={post.id}
              className={`rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3 text-sm opacity-80">
                  <span className="flex items-center gap-1">
                    <User size={16} /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} /> {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="opacity-80 mb-4 line-clamp-3">{post.excerpt}</p>
                <a
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-red-600 font-semibold hover:underline"
                >
                  {t("readMore") || "Read More"} <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 🔹 Newsletter */}
      <section
        className={`py-20 text-center ${
          darkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
        data-aos="fade-up"
      >
        <Mail className="mx-auto text-red-600 mb-4" size={48} />
        <h2 className="text-3xl sm:text-3xl font-extrabold flex items-center mb-6 gap-3 justify-center text-red-600 dark:text-red-600">
          {t("subscribeTitle") || "Subscribe to Our Newsletter"} <HeartPulse className="animate-pulse text-red-600" />
        </h2>
        <p className="text-lg opacity-80 mb-6 max-w-2xl mx-auto">
          {t("subscribeDesc") ||
            "Get updates on medical travel, hospital guides, and air ambulance news directly in your inbox."}
        </p>
        <form
          className="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="px-5 py-3 rounded-lg flex-1 focus:ring-2 focus:ring-red-600 outline-none text-gray-900"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            {t("subscribeBtn") || "Subscribe"}
          </button>
        </form>
      </section>
    </main>
  );
}
