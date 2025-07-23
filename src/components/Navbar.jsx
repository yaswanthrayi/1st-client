import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-500">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo with Profile Image */}
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="rounded-full overflow-hidden shadow-md w-20 h-20 border-2 border-white">
              <img
                src="/459902806_372615092587312_5139707910920786418_n.jpg"
                alt="Sai"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-white leading-tight tracking-wide">
                SATYAMSAI
              </h1>
              <span className="text-sm text-gray-300 uppercase tracking-wide">
                Realestates
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, idx) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-gray-800 bg-white shadow-md scale-105"
                    : "text-white hover:text-blue-400 hover:bg-gray-700"
                }`}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-400 focus:outline-none transition-colors duration-300"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700 mt-2 animate-slide-down">
            <div className="flex flex-col space-y-2 py-2">
              {navItems.map((item, idx) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-medium rounded-md transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-gray-800 bg-white shadow-md scale-105"
                      : "text-white hover:text-blue-400 hover:bg-gray-700"
                  }`}
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.7s ease;
          }
          @keyframes slide-down {
            from { opacity: 0; transform: translateY(-20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-slide-down {
            animation: slide-down 0.4s cubic-bezier(.4,0,.2,1);
          }
        `}
      </style>
    </nav>
  );
}
