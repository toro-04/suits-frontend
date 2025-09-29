import type { AvailableColorStructure, ColorOption } from "../../types/strapi";

interface ColorSwatchesProps {
  colors?: AvailableColorStructure; // Match your Product type
}

export function ColorSwatches({ colors }: ColorSwatchesProps) {
  // If no colors are provided, return nothing
  if (!colors || !colors.availableColors || colors.availableColors.length === 0) {
    return null;
  }

  const MAX_SWATCHES = 5;
  const colorArray = colors.availableColors; // Extract the array from the structure
  const swatchesToShow = colorArray.slice(0, MAX_SWATCHES);
  const hiddenSwatchesCount = colorArray.length - MAX_SWATCHES;

  return (
    <div className="mt-2">
      <div className="flex items-center space-x-2">
        {/* We use a ring effect to make light colors visible on a white background */}
        {swatchesToShow.map((color: ColorOption, index: number) => (
          <div
            key={color.code || index} // Use code as key, fallback to index
            className="h-5 w-5 rounded-full border border-black/10 ring-1 ring-inset ring-gray-200 transition-transform hover:scale-110"
            style={{ backgroundColor: color.hex }}
            title={color.label || color.code} // Show label or code in tooltip
          />
        ))}
        {hiddenSwatchesCount > 0 && (
          <div 
            className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500 hover:bg-gray-200 transition-colors cursor-help"
            title={`${hiddenSwatchesCount} more color${hiddenSwatchesCount > 1 ? 's' : ''} available`}
          >
            +{hiddenSwatchesCount}
          </div>
        )}
      </div>
    </div>
  );
}