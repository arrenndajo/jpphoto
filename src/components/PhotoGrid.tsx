import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PhotoCard from "./PhotoCard";
import PhotoModal from "./PhotoModal";
import FeaturedCarousel from "./FeaturedCarousel";
import { Photo } from "../types/Photo";

interface PhotoGridProps {
  activeCategory?: string;
  activeWorkCategory?: string;
  onWorkCategoryChange?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({
  activeCategory = "Home",
  activeWorkCategory = "All",
  onWorkCategoryChange,
  searchQuery = "",
  onSearchChange,
}) => {
  // Featured photos for home page "Recent Work" section
  const [homePhotos] = useState<Photo[]>([
    {
      id: "home-1",
      url: "/photos/travel/dubai-flight-2.jpg",
      photographer: "Jay Parmar",
      title: "Birds eye view of Dubai",
      size: "tall",
      location: "Dubai, UAE",
      category: ["Travel"],
    },
    {
      id: "home-2",
      url: "/photos/travel/nyc-skyline-2.jpg",
      photographer: "Jay Parmar",
      title: "NYC Skyline from Liberty State Park",
      size: "medium",
      location: "New York, USA",
      category: ["Travel"],
    },
    {
      id: "home-3",
      url: "/photos/nature/pescadero-point-sf.jpg",
      photographer: "Jay Parmar",
      title: "Pescadero Point",
      size: "medium",
      location: "California, USA",
      category: ["Travel"],
    },
    {
      id: "home-4",
      url: "/photos/nature/sf-sun-halo-effect.jpg",
      photographer: "Jay Parmar",
      title: "Sun Halo Effect",
      size: "medium",
      location: "San Francisco, USA",
      category: ["Travel"],
    },
    {
      id: "home-5",
      url: "/photos/travel/statue-of-liberty.jpg",
      photographer: "Jay Parmar",
      title: "Statue of Liberty",
      size: "medium",
      location: "New York, USA",
      category: ["Cars"],
    },
    {
      id: "home-6",
      url: "/photos/travel/goldengatebridge-1.JPG",
      photographer: "Jay Parmar",
      title: "Golden Gate Bridge",
      size: "tall",
      location: "San Francisco, USA",
      category: ["Travel"],
    },
    {
      id: "home-7",
      url: "/photos/travel/oculus.jpg",
      photographer: "Jay Parmar",
      title: "The Oculus",
      size: "medium",
      location: "New York, USA",
      category: ["Travel"],
    },
    {
      id: "home-8",
      url: "/photos/travel/pier-sf-yatch.jpg",
      photographer: "Jay Parmar",
      title: "Pier 39",
      size: "extra-tall",
      location: "San Francisco, USA",
      category: ["Architecture"],
    },
    {
      id: "home-9",
      url: "/photos/cars/car-sf.jpg",
      photographer: "Jay Parmar",
      title: "Blue Beauty",
      size: "medium",
      location: "San Francisco, USA",
      category: ["Cars"],
    },
    {
      id: "home-10",
      url: "/photos/travel/nj-transit.JPG",
      photographer: "Jay Parmar",
      title: "NJ Transit train",
      size: "tall",
      location: "New Jersey, USA",
      category: ["Travel"],
    },
  ]);

  // Complete photo collection for work page categories
  const [workPhotos] = useState<Photo[]>([
    // Nature Photography
    {
      id: "nature-1",
      url: "/photos/nature/nj-1.JPG",
      photographer: "Jay Parmar",
      title: "Snowy Morning",
      size: "medium",
      location: "New Jersey, USA",
      category: ["Nature"],
    },
    {
      id: "nature-2",
      url: "/photos/nature/green-leaves.jpg",
      photographer: "Jay Parmar",
      title: "Moody Green Leaves",
      size: "tall",
      location: "Mumbai, India",
      category: ["Nature"],
    },
    {
      id: "nature-3",
      url: "/photos/nature/kashigaon-2.jpg",
      photographer: "Jay Parmar",
      title: "Leaves in the forest",
      size: "medium",
      location: "Mumbai, India",
      category: ["Nature"],
    },
    {
      id: "nature-4",
      url: "/photos/nature/kashigaon-2.jpg",
      photographer: "Jay Parmar",
      title: "Forest Waterfall",
      size: "tall",
      location: "Mumbai, India",
      category: ["Nature"],
    },

    // Travel Photography
    {
      id: "travel-1",
      url: "/photos/travel/nyc-skyline-3.jpg",
      photographer: "Jay Parmar",
      title: "NYC Skyline from Liberty State Park",
      size: "medium",
      location: "New York, USA",
      category: ["Travel"],
    },
    {
      id: "travel-2",
      url: "/photos/travel/nyc-subway.jpg",
      photographer: "Jay Parmar",
      title: "NYC Subway",
      size: "medium",
      location: "New York, USA",
      category: ["Travel"],
    },
    {
      id: "travel-3",
      url: "/photos/travel/bandrafort.jpg",
      photographer: "Jay Parmar",
      title: "Bandra Fort",
      size: "medium",
      location: "Mumbai, India",
      category: ["Travel"],
    },
    {
      id: "travel-4",
      url: "/photos/travel/brooklynbridge.jpg",
      photographer: "Jay Parmar",
      title: "Glimpse of Manhattan Bridge",
      size: "short",
      location: "New York, USA",
      category: ["Travel"],
    },
    {
      id: "travel-5",
      url: "/photos/travel/dubai-flight-1.jpg",
      photographer: "Jay Parmar",
      title: "Dubai from birds-eye view",
      size: "medium",
      location: "Dubai, UAE",
      category: ["Travel"],
    },
    {
      id: "travel-6",
      url: "/photos/travel/Gateway-of-India-3.jpg",
      photographer: "Jay Parmar",
      title: "The Taj Mahal Palace Hotel",
      size: "medium",
      location: "Mumbai, India",
      category: ["Travel"],
    },
    {
      id: "travel-7",
      url: "/photos/travel/rockefeller-center.jpg",
      photographer: "Jay Parmar",
      title: "Rockefeller Center",
      size: "medium",
      location: "New York, USA",
      category: ["Travel"],
    },
    {
      id: "travel-8",
      url: "/photos/travel/marine-drive-2.jpg",
      photographer: "Jay Parmar",
      title: "Monsoon Splash",
      size: "tall",
      location: "Mumbai, India",
      category: ["Travel"],
    },
    {
      id: "travel-9",
      url: "/photos/travel/the-vessel-2.jpg",
      photographer: "Jay Parmar",
      title: "Looking above in The Vessel",
      size: "tall",
      location: "New York, USA",
      category: ["Travel"],
    },

    // Architecture Photography
    {
      id: "arch-1",
      url: "/photos/architecture/baps-nj.jpg",
      photographer: "Jay Parmar",
      title: "BAPS Akshardham Temple",
      size: "medium",
      location: "New Jersey, USA",
      category: ["Architecture", "Travel"],
    },
    {
      id: "arch-2",
      url: "/photos/architecture/Bandstand-1.jpg",
      photographer: "Jay Parmar",
      title: "Bandstand",
      size: "medium",
      location: "Mumbai, India",
      category: ["Architecture", "Travel"],
    },
    {
      id: "arch-3",
      url: "/photos/architecture/pagoda-2.jpg",
      photographer: "Jay Parmar",
      title: "Pagoda",
      size: "medium",
      location: "Mumbai, India",
      category: ["Travel", "Architecture"],
    },
    {
      id: "arch-4",
      url: "/photos/architecture/BMC-1.jpg",
      photographer: "Jay Parmar",
      title: "BMC Building Reflection",
      size: "tall",
      location: "Mumbai, India",
      category: ["Architecture", "Travel"],
    },
    {
      id: "arch-5",
      url: "/photos/architecture/baps-nj-details.jpg",
      photographer: "Jay Parmar",
      title: "BAPS Akshardham Temple Details",
      size: "tall",
      location: "New Jersey, USA",
      category: ["Architecture", "Travel"],
    },
    {
      id: "arch-6",
      url: "/photos/architecture/Gateway-of-India-1.jpg",
      photographer: "Jay Parmar",
      title: "Gateway of India",
      size: "medium",
      location: "Mumbai, India",
      category: ["Architecture", "Travel"],
    },
    {
      id: "arch-7",
      url: "/photos/street/Fort-1.jpg",
      photographer: "Jay Parmar",
      title: "Asiatic Library",
      size: "medium",
      location: "Mumbai, India",
      category: ["Architecture", "Street"],
    },
    {
      id: "arch-8",
      url: "/photos/architecture/pagoda-1.jpg",
      photographer: "Jay Parmar",
      title: "Global Vipassana Pagoda",
      size: "tall",
      location: "Mumbai, India",
      category: ["Architecture", "Travel"],
    },

    // Street Photography
    {
      id: "street-1",
      url: "/photos/street/sion-2.jpg",
      photographer: "Jay Parmar",
      title: "Mumbai Police is Yellow Power Rangers IRL",
      size: "medium",
      location: "Mumbai, India",
      category: ["Street"],
    },
    {
      id: "street-2",
      url: "/photos/street/jog 1.jpg",
      photographer: "Jay Parmar",
      title: "Western Express Highway",
      size: "tall",
      location: "Mumbai, India",
      category: ["Street"],
    },
    {
      id: "street-3",
      url: "/photos/street/nyc-street-1.jpg",
      photographer: "Jay Parmar",
      title: "NYC",
      size: "medium",
      location: "New York, USA",
      category: ["Street", "Travel"],
    },
    {
      id: "street-4",
      url: "/photos/street/nyc-street-2.jpg",
      photographer: "Jay Parmar",
      title: "Cycling with a view",
      size: "medium",
      location: "New York, USA",
      category: ["Street", "Travel"],
    },
    {
      id: "street-5",
      url: "/photos/street/sion-1.jpg",
      photographer: "Jay Parmar",
      title: "Walking in the rain",
      size: "medium",
      location: "Mumbai, India",
      category: ["Street"],
    },
    {
      id: "street-6",
      url: "/photos/street/shadow.jpg",
      photographer: "Jay Parmar",
      title: "Shadow Play",
      size: "medium",
      location: "Mumbai, India",
      category: ["Street"],
    },
    {
      id: "street-7",
      url: "/photos/street/BMC-2.jpg",
      photographer: "Jay Parmar",
      title: "Brihanmumbai Municipal Corporation",
      size: "medium",
      location: "Mumbai, India",
      category: ["Street"],
    },

    // Car Photography
    {
      id: "car-1",
      url: "/photos/cars/porsche-3.jpg",
      photographer: "Jay Parmar",
      title: "White Porsche head light",
      size: "medium",
      location: "Mumbai, India",
      category: ["Cars"],
    },
    {
      id: "car-2",
      url: "/photos/cars/marine-drive-3.jpg",
      photographer: "Jay Parmar",
      title: "Yellow Porsche 911",
      size: "medium",
      location: "Mumbai, India",
      category: ["Cars"],
    },
    {
      id: "car-3",
      url: "/photos/cars/dodge-2.jpg",
      photographer: "Jay Parmar",
      title: "Red Dodge paired with Red Shirt",
      size: "medium",
      location: "Mumbai, India",
      category: ["Cars"],
    },
    {
      id: "car-4",
      url: "/photos/cars/car-sf.jpg",
      photographer: "Jay Parmar",
      title: "Blue Beauty",
      size: "medium",
      location: "San Francisco, USA",
      category: ["Cars"],
    },
    {
      id: "car-5",
      url: "/photos/cars/porsche-2.jpg",
      photographer: "Jay Parmar",
      title: "White Porsche Panamera S tail-light",
      size: "medium",
      location: "Mumbai, India",
      category: ["Cars"],
    },
    {
      id: "car-6",
      url: "/photos/cars/dodge-3.jpg",
      photographer: "Jay Parmar",
      title: "Red Dodge front-left profile",
      size: "medium",
      location: "Mumbai, India",
      category: ["Cars"],
    },
    {
      id: "car-7",
      url: "/photos/cars/dodge-1.jpg",
      photographer: "Jay Parmar",
      title: "Red Dodge",
      size: "medium",
      location: "Mumbai, India",
      category: ["Cars"],
    },
    {
      id: "car-8",
      url: "/photos/cars/porsche-1.jpg",
      photographer: "Jay Parmar",
      title: "White Porsche Panamera S",
      size: "medium",
      location: "Mumbai, India",
      category: ["Cars"],
    },
  ]);

  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Listen for work category changes from footer links
  useEffect(() => {
    const handleWorkCategoryChange = (event: CustomEvent) => {
      if (onWorkCategoryChange) {
        onWorkCategoryChange(event.detail);
      }
    };

    window.addEventListener(
      "changeWorkCategory",
      handleWorkCategoryChange as EventListener
    );
    return () => {
      window.removeEventListener(
        "changeWorkCategory",
        handleWorkCategoryChange as EventListener
      );
    };
  }, [onWorkCategoryChange]);

  // Filter photos based on active category and search query
  useEffect(() => {
    // Choose the appropriate photo collection
    const sourcePhotos = activeCategory === "Home" ? homePhotos : workPhotos;
    let filtered = sourcePhotos;

    // For Home category, show all home photos without filtering
    if (activeCategory === "Home" && !searchQuery.trim()) {
      setFilteredPhotos(filtered);
      return;
    }

    // For Work category, filter by work subcategory
    if (activeCategory === "Work") {
      if (activeWorkCategory !== "All") {
        filtered = filtered.filter((photo) =>
          photo.category.includes(
            activeWorkCategory as
              | "Nature"
              | "Travel"
              | "Street"
              | "Architecture"
              | "Cars"
          )
        );
      }
    }

    // Then filter by search query (tags, title, or photographer)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (photo) =>
          photo.location.toLowerCase().includes(query) ||
          photo.title.toLowerCase().includes(query) ||
          photo.photographer.toLowerCase().includes(query)
      );
    }

    setFilteredPhotos(filtered);
  }, [homePhotos, workPhotos, activeCategory, activeWorkCategory, searchQuery]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8 pb-20 md:pb-8">
      {/* Featured Carousel - Only show on "Home" category and no search */}
      {activeCategory === "Home" && !searchQuery.trim() && (
        <FeaturedCarousel photos={workPhotos} onPhotoClick={handlePhotoClick} />
      )}

      {/* Recent Work Section - Only show on "Home" category and no search */}
      {activeCategory === "Home" && !searchQuery.trim() && (
        <div className="mb-8">
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Recent Work</h2>
            <p className="text-gray-600 mt-2">
              Explore my recent photography collections!
            </p>
          </div>
        </div>
      )}

      {/* Work Category Navigation */}
      {activeCategory === "Work" && (
        <div className="mb-8 mt-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {["All", "Nature", "Travel", "Street", "Architecture", "Cars"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() =>
                    onWorkCategoryChange && onWorkCategoryChange(category)
                  }
                  className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                    activeWorkCategory === category
                      ? "bg-gray-800 text-white shadow-lg"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Search/Category indicator */}
      {(searchQuery.trim() ||
        (activeCategory === "Work" && activeWorkCategory !== "All")) && (
        <div className="mb-6">
          {searchQuery.trim() ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-gray-600">
                Found {filteredPhotos.length} photos matching your search
                {activeWorkCategory !== "All" &&
                  ` in ${activeWorkCategory} category`}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {activeWorkCategory} Photography
              </h2>
              <p className="text-gray-600">
                Showing {filteredPhotos.length}{" "}
                {activeWorkCategory.toLowerCase()} photos
              </p>
            </div>
          )}
        </div>
      )}

      {/* Pinterest-style Masonry Grid */}
      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 sm:gap-3 lg:gap-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onPhotoClick={handlePhotoClick}
          />
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-16">
          {searchQuery.trim() ? (
            <div>
              <p className="text-gray-600 text-lg">
                No photos found for "{searchQuery}"
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 text-lg">
                No photos found in this category
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      )}

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        photos={filteredPhotos}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PhotoGrid;
