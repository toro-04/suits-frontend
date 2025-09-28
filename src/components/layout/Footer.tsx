// Footer.tsx (Clean and logical)
import { CompanySection } from "./CompanyInfo";
import { LinksSection } from "./QuickLinks";
import { ContactSection } from "./ContactInfo";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <CompanySection />
          <LinksSection />
          <ContactSection />
        </div>
      </div>
    </footer>
  );
}
