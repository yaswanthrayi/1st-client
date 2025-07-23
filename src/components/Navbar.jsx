import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-xl' 
          : 'bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
            
            {/* Logo Section - Fixed width to prevent overflow */}
            <div className="flex items-center space-x-2 sm:space-x-3 animate-fade-in">
              <div className="rounded-full overflow-hidden shadow-lg w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 border-2 border-white/20 hover:border-blue-400/50 transition-all duration-300">
                <img
                  src="/459902806_372615092587312_5139707910920786418_n.jpg"
                  alt="Sai"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Text Container - Full name visible on mobile */}
              <div className="flex flex-col min-w-0">
                <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white leading-tight tracking-wide whitespace-nowrap">
                  SATYAMSAI
                </h1>
                <span className="text-[10px] sm:text-xs text-blue-300/80 uppercase tracking-wider whitespace-nowrap">
                  Realestates
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item, idx) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 hover:scale-105 ${
                    isActive(item.path)
                      ? "text-gray-900 bg-gradient-to-r from-white to-blue-50 shadow-lg"
                      : "text-white hover:text-blue-300 hover:bg-white/10"
                  }`}
                  style={{ 
                    transitionDelay: `${idx * 50}ms`,
                    animation: `slideIn 0.6s ease-out ${idx * 100}ms both`
                  }}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="md:hidden p-1.5 sm:p-2 rounded-lg text-white hover:text-blue-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 flex-shrink-0 ml-2"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                <Menu className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 border-t border-gray-700/50 shadow-2xl">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, idx) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-6 py-4 text-base font-medium rounded-xl transition-all duration-300 transform ${
                    isActive(item.path)
                      ? "text-gray-900 bg-gradient-to-r from-white to-blue-50 shadow-lg scale-105"
                      : "text-white hover:text-blue-300 hover:bg-white/10 hover:scale-105 hover:shadow-md"
                  }`}
                  style={{ 
                    transitionDelay: `${idx * 50}ms`,
                    animation: isMenuOpen ? `slideUp 0.4s ease-out ${idx * 80}ms both` : 'none'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive(item.path) ? 'bg-blue-500' : 'bg-transparent border border-white/30'
                    }`}></div>
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(-20px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        /* Custom scrollbar for mobile menu */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.1);
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 2px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }

        /* Add extra small breakpoint */
        @media (max-width: 375px) {
          .xs\\:text-xs { font-size: 0.75rem; }
          .xs\\:text-\\[9px\\] { font-size: 9px; }
        }

       /* Ensure proper spacing on very small screens */
       @media (max-width: 320px) {
         .space-x-2 > :not([hidden]) ~ :not([hidden]) {
           margin-left: 0.25rem;
         }
       }
      `}</style>
    </>
  );
}