import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'All Photos', category: 'All' },
    { name: 'Nature', category: 'Nature' },
    { name: 'Travel', category: 'Travel' },
    { name: 'Street Photography', category: 'Street' },
    { name: 'Architecture', category: 'Architecture' },
    { name: 'Cars', category: 'Cars' },
  ];

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/arrenndajo.photo', 
      icon: Instagram,
      color: 'hover:text-pink-400'
    },
    { 
      name: 'Twitter', 
      href: 'https://x.com/arrenndajophoto', 
      icon: Twitter,
      color: 'hover:text-blue-300'
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/jayparmar9', 
      icon: Youtube,
      color: 'hover:text-red-400'
    },
  ];

  const handleQuickLinkClick = (category: string) => {
    // Navigate to work page with the specific category
    navigate('/work');
    // Small delay to ensure navigation completes before triggering category change
    setTimeout(() => {
      // Dispatch a custom event to change the work category
      window.dispatchEvent(new CustomEvent('changeWorkCategory', { detail: category }));
    }, 100);
  };
  return (
    <footer className="bg-gray-100 border-t border-gray-200 pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Camera className="h-8 w-8 text-gray-800" />
              <span className="text-xl font-bold text-gray-800">Jay Parmar Photography</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Capturing life's most beautiful moments through my iPhone. Professional photographer 
              specializing in travel photography.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 transition-colors">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>name@email.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 transition-colors">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-gray-800 font-semibold text-lg">Gallery</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleQuickLinkClick(link.category)}
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-6">
            <h3 className="text-gray-800 font-semibold text-lg">Connect</h3>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-600 ${social.color} transition-colors duration-200 p-3 rounded-full hover:bg-gray-200 transform hover:scale-110`}
                    aria-label={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              Follow me on social media for the latest photography updates, behind-the-scenes content, and new collections.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600">
              © {currentYear} Jay Parmar Photography. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;