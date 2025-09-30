import { useState, useEffect, useCallback, useMemo } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types/strapi";
import { ProductCard } from "../components/productcard/ProductCard";

interface FilterOptions {
  sortBy: 'name' | 'price-low' | 'price-high' | 'newest';
  category: string;
  priceRange: 'all' | 'under-5000' | '5000-10000' | '10000-20000' | 'above-20000';
}

export function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'newest',
    category: 'all',
    priceRange: 'all'
  });

  // Performance optimization: Memoize filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.Description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = product.Base_Price || 0;
        switch (filters.priceRange) {
          case 'under-5000': return price < 5000;
          case '5000-10000': return price >= 5000 && price < 10000;
          case '10000-20000': return price >= 10000 && price < 20000;
          case 'above-20000': return price >= 20000;
          default: return true;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.Name.localeCompare(b.Name);
        case 'price-low':
          return (a.Base_Price || 0) - (b.Base_Price || 0);
        case 'price-high':
          return (b.Base_Price || 0) - (a.Base_Price || 0);
        case 'newest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, filters]);

  // Update displayed products when filters change
  useEffect(() => {
    setDisplayedProducts(filteredAndSortedProducts.slice(0, visibleCount));
  }, [filteredAndSortedProducts, visibleCount]);

  // Infinite scroll implementation
  const loadMoreProducts = useCallback(() => {
    if (isLoadingMore || visibleCount >= filteredAndSortedProducts.length) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 12, filteredAndSortedProducts.length));
      setIsLoadingMore(false);
    }, 300);
  }, [isLoadingMore, visibleCount, filteredAndSortedProducts.length]);

  // Scroll event listener for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop 
          >= document.documentElement.offsetHeight - 1000) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        setError("Failed to load suits. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, filters]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Professional Loading Header */}
          <div className="text-center space-y-8 mb-16">
            <div className="h-12 bg-gray-100 animate-pulse rounded w-1/3 mx-auto"></div>
            <div className="h-6 bg-gray-100 animate-pulse rounded w-1/2 mx-auto"></div>
          </div>

          {/* Skeleton Filters */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="flex-1">
              <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-32 bg-gray-100 animate-pulse rounded"></div>
              <div className="h-12 w-32 bg-gray-100 animate-pulse rounded"></div>
            </div>
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[3/4] bg-gray-100 animate-pulse rounded-sm"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-100 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-light text-gray-900">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-black text-white px-8 py-3 font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl lg:text-3xl font-light tracking-wide text-gray-900">
            Premium Collection
          </h1>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Discover our curated selection of meticulously crafted suits, 
            designed for the modern professional who values quality and style.
          </p>
          <div className="w-24 h-px bg-gray-300 mx-auto"></div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search suits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-200 focus:border-black focus:outline-none transition-colors bg-gray-50 focus:bg-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {/* Sort Dropdown */}
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value as FilterOptions['sortBy'] })}
                className="px-4 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm uppercase tracking-wider bg-white"
              >
                <option value="newest">Newest</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* Price Range Dropdown */}
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange({ priceRange: e.target.value as FilterOptions['priceRange'] })}
                className="px-4 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm uppercase tracking-wider bg-white"
              >
                <option value="all">All Prices</option>
                <option value="under-5000">Under ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-20000">₹10,000 - ₹20,000</option>
                <option value="above-20000">Above ₹20,000</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 font-light">
              Showing {displayedProducts.length} of {filteredAndSortedProducts.length} suits
              {searchQuery && (
                <span className="ml-2">
                  for "<span className="font-medium">{searchQuery}</span>"
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="space-y-4">
              <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-light text-gray-900">No suits found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
              {(searchQuery || filters.priceRange !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({ sortBy: 'newest', category: 'all', priceRange: 'all' });
                  }}
                  className="text-black underline hover:no-underline transition-all"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12"
              style={{ 
                scrollBehavior: 'smooth',
                transform: 'translateZ(0)', // Enable hardware acceleration
                willChange: 'transform' // Optimize for animations
              }}
            >
              {displayedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    animationDelay: `${index % 12 * 50}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Loading More Indicator */}
            {isLoadingMore && (
              <div className="text-center py-8">
                <div className="inline-flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                  <span className="text-gray-600 font-light">Loading more suits...</span>
                </div>
              </div>
            )}

            {/* Load More Button (fallback for users without JS scroll) */}
            {!isLoadingMore && visibleCount < filteredAndSortedProducts.length && (
              <div className="text-center py-8">
                <button
                  onClick={loadMoreProducts}
                  className="bg-white text-black px-8 py-3 border-2 border-black font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-200"
                >
                  View More Suits ({filteredAndSortedProducts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Smooth scrolling optimization */
        html {
          scroll-behavior: smooth;
        }
        
        /* Hardware acceleration for better performance */
        .grid > div {
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </div>
  );
}
