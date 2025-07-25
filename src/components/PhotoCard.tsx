import React, { useState, useEffect, useRef } from 'react';
import { Photo } from '../types/Photo';

interface PhotoCardProps {
  photo: Photo;
  onPhotoClick: (photo: Photo) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onPhotoClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for smooth loading animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: '100px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handlePhotoClick = () => {
    onPhotoClick(photo);
  };

  return (
    <div
      ref={cardRef}
      className={`relative group cursor-pointer break-inside-avoid mb-2 sm:mb-3 lg:mb-4 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePhotoClick}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Skeleton loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
          </div>
        )}
        
        {/* Only load image when visible */}
        {isVisible && (
          <img
            src={photo.url}
            alt={photo.title}
            className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        )}

        {/* Overlay - Only visible on hover */}
        <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Bottom info - Enhanced with location (only visible on hover) */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-4 bg-gradient-to-t from-black/90 to-transparent">
            {/* Location */}
            <div className="text-white text-sm font-medium">
              {photo.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
