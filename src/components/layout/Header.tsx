// Header.tsx (With Zara-style typography)
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2 px-4 text-sm font-light tracking-wider">
        FREE SHIPPING ON ORDERS OVER ₹2,999 | CUSTOM TAILORING AVAILABLE
      </div>

      {/* Zara-style Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16 lg:h-20">
            <Link 
              to="/" 
              className="zara-logo-style text-black hover:text-gray-800 transition-colors"
              style={{
                fontFamily: "'Playfair Display', 'Didot', 'Times New Roman', serif",
                fontWeight: 800,
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                letterSpacing: '-0.05em',
                transform: 'scaleX(0.75)',
                transformOrigin: 'center',
                lineHeight: 0.9,
                textDecoration: 'none'
              }}
            >
              NAVKIRAN
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
