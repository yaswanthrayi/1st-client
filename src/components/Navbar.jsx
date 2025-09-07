import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click (only mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-amber-800/95 backdrop-blur-md shadow-xl border-b border-amber-600/30"
            : "bg-gradient-to-r from-amber-700 via-amber-800 to-amber-700"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
{/* Logo */}
<div className="flex items-center space-x-3">
  <img
    src="/channels4_profile.jpg"
    alt="Logo"
    className="w-10 h-10 rounded-full object-cover border-2 border-yellow-300/40 shadow-lg"
  />
  <div className="leading-tight text-white">
    <h1 className="text-2xl font-extrabold tracking-wide truncate text-yellow-100 font-heading">
      SATYAMSAI
    </h1>
    <p className="text-sm font-bold text-yellow-300 uppercase tracking-widest truncate drop-shadow-sm font-inter">
      Realestates
    </p>
  </div>
</div>


            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-2 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-yellow-300 text-amber-900 shadow-lg font-semibold transform scale-105"
                      : "text-yellow-100 hover:bg-amber-600/50 hover:text-yellow-200 hover:shadow-md"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-yellow-100 p-2 rounded-md hover:bg-amber-600/50 hover:text-yellow-200 transition-all duration-200 shadow-sm"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-amber-800 px-4 py-4 space-y-2 shadow-xl border-t border-amber-600/50">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-yellow-300 text-amber-900 shadow-lg font-semibold"
                    : "text-yellow-100 hover:bg-amber-600/50 hover:text-yellow-200 hover:shadow-md"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Push content down so it's not hidden behind nav */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}