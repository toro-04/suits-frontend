// CompanySection.tsx (Company info + copyright)
import { Link } from "react-router-dom";

export function CompanySection() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-light text-gray-900 tracking-wider">
        NAVKIRAN SUITS
      </h3>
      <p className="text-base text-gray-600 leading-relaxed">
        Premium custom tailored suits crafted with precision and attention to detail. 
        Elevating professional wardrobes with timeless style and exceptional quality.
      </p>
      
      {/* Copyright and legal - combined here since it's company info */}
      <div className="pt-4 border-t border-gray-200 space-y-3">
        <p className="text-sm text-gray-500">
          © 2025 NAVKIRAN Suits. Crafted with care.
        </p>
        <div className="flex space-x-4">
          <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
}
