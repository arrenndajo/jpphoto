import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import PhotoGrid from "./components/PhotoGrid";
import Footer from "./components/Footer";

export default function App() {
  const [activeWorkCategory, setActiveWorkCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active category from URL
  const getActiveCategory = () => {
    const path = location.pathname;
    if (path === "/work") return "Work";
    if (path === "/about") return "About";
    return "Home";
  };

  const activeCategory = getActiveCategory();

  const handleCategoryChange = (category: string) => {
    // Scroll to top when changing main categories
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Navigate to appropriate route
    if (category === "Work") {
      navigate("/work");
    } else if (category === "About") {
      navigate("/about");
    } else {
      navigate("/");
    }

    // Clear search when changing categories
    if (searchQuery) {
      setSearchQuery("");
    }
    // Reset work category when leaving work section
    if (category !== "Work") {
      setActiveWorkCategory("All");
    }
  };

  const handleWorkCategoryChange = (workCategory: string) => {
    setActiveWorkCategory(workCategory);
    // Clear search when changing work categories
    if (searchQuery) {
      setSearchQuery("");
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Switch to Home when searching to show all results
    if (query && activeCategory !== "Work") {
      navigate("/work");
      setActiveWorkCategory("All");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <main className="pt-14 md:pt-16">
        <Routes>
          <Route
            path="/"
            element={
              <PhotoGrid
                activeCategory="Home"
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
            }
          />
          <Route
            path="/work"
            element={
              <PhotoGrid
                activeCategory="Work"
                activeWorkCategory={activeWorkCategory}
                onWorkCategoryChange={handleWorkCategoryChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
            }
          />
          <Route
            path="/about"
            element={
              <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
                {/* About Section */}
                <div className="mb-16">
                  <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                    About me
                  </h1>

                  {/* Profile Photo */}
                  <div className="flex justify-center mb-8">
                    <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                      <img
                        src="public/photos/profile/jay.jpg"
                        alt="Jay Parmar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-2xl p-8 text-left">
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      Hey! I'm Jay Parmar, a photographer dedicated to capturing
                      life's most beautiful and authentic moments through my
                      iPhone.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      My journey in photography spans across various genres
                      including nature, travel, street photography,
                      architectural documentation, as well as cars. Each image
                      tells a story, and I strive to create visual narrative
                      that resonates with viewers on an emotional level.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Based in Mumbai, I travel extensively to capture the
                      essence of different cultures, landscapes, and urban
                      environments.
                    </p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Get In Touch
                  </h2>
                  <p className="text-gray-600 text-lg mb-8">
                    Ready to work together? Let's discuss your photography needs
                  </p>
                </div>

                <div className="flex justify-center">
                  {/* Contact Info */}
                  <div className="bg-gray-100 rounded-2xl p-8 max-w-md w-full">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                      Contact Information
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-lg">📧</span>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">Email</p>
                          <p className="text-gray-800">name@email.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-lg">📍</span>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">Location</p>
                          <p className="text-gray-800">Mumbai, India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
