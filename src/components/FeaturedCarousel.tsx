import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Photo } from "../types/Photo";

interface FeaturedCarouselProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  photos,
  onPhotoClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get one featured photo from each category
  const featuredPhotos = React.useMemo(() => {
    const categories = ["Travel", "Street", "Nature", "Architecture"];
    return categories
      .map((category) => photos.find((photo) => photo.category.includes(category as 'Nature' | 'Travel' | 'Street' | 'Architecture' | 'Cars')))
      .filter(Boolean) as Photo[];
  }, [photos]);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === featuredPhotos.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredPhotos.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? featuredPhotos.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === featuredPhotos.length - 1 ? 0 : currentIndex + 1
    );
  };

  if (featuredPhotos.length === 0) return null;

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] mb-12 overflow-hidden rounded-2xl bg-gray-800">
      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {featuredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative w-full h-full flex-shrink-0 cursor-pointer group"
            onClick={() => onPhotoClick(photo)}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-end justify-between">
                  <div className="text-white">
                    <p className="text-lg text-gray-200">{photo.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
