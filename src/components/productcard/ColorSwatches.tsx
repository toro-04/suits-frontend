import type { ColorOption } from "../../types/strapi"; // Using the type from our main types file

interface ColorSwatchesProps {
  colors?: ColorOption[];
}

export function ColorSwatches({ colors }: ColorSwatchesProps) {
  // If no colors are provided, or the array is empty, render nothing.
  if (!colors || colors.length === 0) {
    return null;
  }

  const MAX_SWATCHES = 5;
  const swatchesToShow = colors.slice(0, MAX_SWATCHES);
  const hiddenSwatchesCount = colors.length - MAX_SWATCHES;

  return (
    <div>
      <div className="flex items-center space-x-2">
        {/* We use a ring effect to make light colors visible on a white background */}
        {swatchesToShow.map((color) => (
          <div
            key={color.label}
            className="h-5 w-5 rounded-full border border-black/10 ring-1 ring-inset ring-gray-200"
            style={{ backgroundColor: color.hex }}
            title={color.label}
          />
        ))}
        {hiddenSwatchesCount > 0 && (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500 hover:bg-gray-200">
            +{hiddenSwatchesCount}
          </div>
        )}
      </div>
    </div>
  );
}