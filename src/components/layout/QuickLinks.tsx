// LinksSection.tsx (Quick links + Social links combined)
import { Link } from "react-router-dom";

const QUICK_LINKS = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Size Guide", href: "/sizing" }
];

const SOCIAL_LINKS = [
  { 
    name: "Instagram", 
    href: "#", 
    icon: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.624 5.367 11.99 11.988 11.99s11.99-5.366 11.99-11.99C24.007 5.367 18.641.001 12.017.001zM12 18.42c-3.551 0-6.42-2.869-6.42-6.42S8.449 5.58 12 5.58s6.42 2.869 6.42 6.42-2.869 6.42-6.42 6.42zm4.58-6.42c0 2.528-2.052 4.58-4.58 4.58s-4.58-2.052-4.58-4.58 2.052-4.58 4.58-4.58 4.58 2.052 4.58 4.58z" 
  },
  { 
    name: "Facebook", 
    href: "#", 
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" 
  },
  { 
    name: "YouTube", 
    href: "https://www.youtube.com/@NavrajvirSingh-ew9zz", 
    icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" 
  }
];

export function LinksSection() {
  return (
    <div className="space-y-8">
      {/* Quick Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 uppercase tracking-wider">
          Quick Links
        </h3>
        <ul className="space-y-3">
          {QUICK_LINKS.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.href} 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 uppercase tracking-wider">
          Follow Us
        </h3>
        <div className="flex space-x-4">
          {SOCIAL_LINKS.map((social) => (
            <a 
              key={social.name}
              href={social.href} 
              className="text-gray-400 hover:text-gray-900 transition-colors"
              title={social.name}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

