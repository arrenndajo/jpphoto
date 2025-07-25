import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '../types/Photo';

interface PhotoModalProps {
  photo: Photo | null;
  photos: Photo[];
  isOpen: boolean;
  onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, photos, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Update current index when photo changes
  useEffect(() => {
    if (photo && photos.length > 0) {
      const index = photos.findIndex(p => p.id === photo.id);
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [photo, photos]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Navigation functions
  const goToPrevious = () => {
    if (photos.length > 0) {
      const newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    }
  };

  const goToNext = () => {
    if (photos.length > 0) {
      const newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length]);

  if (!isOpen || !photo || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation buttons */}
      {photos.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      {/* Modal content */}
      <div className="max-w-7xl w-full max-h-full flex flex-col lg:flex-row gap-6">
        {/* Image container - Full size */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className="max-w-full max-h-[90vh] lg:max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Photo details sidebar */}
        <div className="lg:w-80 bg-gray-900/90 backdrop-blur-sm rounded-lg p-6 overflow-y-auto">
          {/* Photo title */}
          <h2 className="text-white text-xl font-bold mb-6">{currentPhoto.title}</h2>

          {/* Location */}
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3">Location</h4>
            <p className="text-gray-300 text-lg">{currentPhoto.location}</p>
          </div>

          {/* Photo counter */}
          {photos.length > 1 && (
            <div className="mb-6">
              <h4 className="text-white font-medium mb-3">Photo</h4>
              <p className="text-gray-300">{currentIndex + 1} of {photos.length}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;