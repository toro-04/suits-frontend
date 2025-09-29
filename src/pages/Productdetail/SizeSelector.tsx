// SizeSelector.tsx
import type { AvailableSizesStructure } from "../../types/strapi";

interface SizeSelectorProps {
  sizes?: AvailableSizesStructure;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  customizable?: boolean;
}

const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export function SizeSelector({ sizes, selectedSize, onSizeChange, customizable }: SizeSelectorProps) {
  let sizeArray: string[] = [];

  console.log('SizeSelector received sizes:', sizes);
  console.log('SizeSelector customizable:', customizable);

  // Parse sizes from AvailableSizesStructure
  if (sizes) {
    // Combine both size arrays and map to labels
    const allSizes = [
      ...(sizes.availableSizes?.map(size => size.label) || []),
      ...(sizes.altSuitSizing?.map(size => size.label) || [])
    ];
    sizeArray = [...new Set(allSizes)]; // Remove duplicates
  }

  // Use default sizes if none provided
  if (sizeArray.length === 0) {
    sizeArray = DEFAULT_SIZES;
  }

  // Filter out any existing custom sizes from the array since we'll add it conditionally
  const regularSizes = sizeArray.filter(size => {
    const lowerSize = size.toLowerCase();
    return !lowerSize.includes('custom') && 
           !lowerSize.includes('mtm') &&
           !lowerSize.includes('made to measure');
  });

  return (
    <div className="space-y-4">
      <h3 className="text-base lg:text-lg font-medium text-gray-900 uppercase tracking-wider">
        Size
      </h3>
      
      {/* Regular Sizes Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3">
        {regularSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`py-2 lg:py-3 px-2 border-2 text-sm font-medium uppercase tracking-wider transition-all duration-200 ${
              selectedSize === size
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-black'
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Custom Option - Only show if customizable is true */}
      {customizable && (
        <div className="space-y-2">
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 mb-2">Custom Options:</p>
          </div>
          <button
            onClick={() => onSizeChange("CUSTOM (MTM)")}
            className={`w-full py-3 px-4 border-2 text-sm font-medium uppercase tracking-wider transition-all duration-200 text-left ${
              selectedSize === "CUSTOM (MTM)"
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-black'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>Custom (MTM)</span>
              <span className="text-xs opacity-70">Made to Measure</span>
            </div>
          </button>
        </div>
      )}

      {selectedSize && (
        <p className="text-sm text-gray-600">
          Selected: <span className="font-medium">{selectedSize}</span>
        </p>
      )}
      
      {/* Debug info - remove after fixing */}
      <div className="text-xs text-gray-400">
        Debug: Regular sizes: {regularSizes.join(', ')} | Customizable: {customizable ? 'Yes' : 'No'}
      </div>
    </div>
  );
}
