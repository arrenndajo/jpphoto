import React, { useState } from 'react';
import { Search, Camera, Home, Briefcase, User } from 'lucide-react';

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange 
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const categories = [
    { name: 'Home', icon: Home },
    { name: 'Work', icon: Camera },
    { name: 'About', icon: User }
  ];

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <>
      {/* Desktop Header - Top */}
      <header className="hidden md:block fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-gray-800" />
              <span className="text-xl font-bold text-gray-800">Jay Parmar Photography</span>
            </div>

            {/* Search Bar */}
            <div className="flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInput}
                  placeholder="Search by location or title"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`transition-colors duration-200 font-medium text-base px-3 py-2 rounded-full flex items-center space-x-2 ${
                      activeCategory === category.name
                        ? 'text-white bg-gray-800'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Header - Top */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Camera className="h-6 w-6 text-gray-800" />
              <span className="text-lg font-bold text-gray-800">Jay Parmar Photography</span>
            </div>
            
            {/* Search Icon */}
            <button
              onClick={toggleMobileSearch}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          {/* Mobile Search Bar - Expandable */}
          {showMobileSearch && (
            <div className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInput}
                  placeholder="Search by location..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`flex-1 py-3 px-2 transition-colors duration-200 font-medium text-sm text-center rounded-md mx-1 flex flex-col items-center space-y-1 ${
                  activeCategory === category.name
                    ? 'text-white bg-gray-800'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Header;