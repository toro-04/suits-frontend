// MobileMenu.tsx
interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export function MobileMenu({ isMenuOpen, setIsMenuOpen }: MobileMenuProps) {
  return (
    <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
      isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="absolute inset-0 bg-black/20" onClick={() => setIsMenuOpen(false)}></div>
      
      <div className={`absolute top-0 left-0 w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 tracking-wider">MENU</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>


      </div>
    </div>
  );
}
