// LoadingSkeleton.tsx
export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Image Gallery Skeleton */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-[4/5] bg-gray-100 animate-pulse rounded-sm"></div>
            
            {/* Thumbnails */}
            <div className="flex space-x-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-16 h-20 bg-gray-100 animate-pulse rounded-sm"></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-8 pt-8">
            {/* Title & Price */}
            <div className="space-y-4">
              <div className="h-10 bg-gray-100 animate-pulse rounded w-3/4"></div>
              <div className="h-8 bg-gray-100 animate-pulse rounded w-1/3"></div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <div className="h-6 bg-gray-100 animate-pulse rounded w-1/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-100 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3"></div>
                <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4"></div>
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-4">
              <div className="h-6 bg-gray-100 animate-pulse rounded w-1/6"></div>
              <div className="flex space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-12 h-12 bg-gray-100 animate-pulse rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-4">
              <div className="h-6 bg-gray-100 animate-pulse rounded w-1/8"></div>
              <div className="grid grid-cols-6 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-100 animate-pulse rounded"></div>
                ))}
              </div>
            </div>

            {/* Tailoring Options */}
            <div className="space-y-4">
              <div className="h-6 bg-gray-100 animate-pulse rounded w-1/4"></div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gray-100 animate-pulse rounded-full"></div>
                  <div className="h-4 bg-gray-100 animate-pulse rounded w-1/3"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gray-100 animate-pulse rounded-full"></div>
                  <div className="h-4 bg-gray-100 animate-pulse rounded w-1/4"></div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-8">
              <div className="h-14 bg-gray-100 animate-pulse rounded"></div>
              <div className="h-14 bg-gray-100 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
