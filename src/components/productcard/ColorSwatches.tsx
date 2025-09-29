import type { AvailableColorStructure, ColorOption } from "../../types/strapi";

interface ColorSwatchesProps {
  colors?: AvailableColorStructure;
}

export function ColorSwatches({ colors }: ColorSwatchesProps) {
  if (!colors || !colors.availableColors || colors.availableColors.length === 0) {
    return null;
  }

  const MAX_SWATCHES = 5;
  const colorArray = colors.availableColors;
  const swatchesToShow = colorArray.slice(0, MAX_SWATCHES);
  const hiddenSwatchesCount = colorArray.length - MAX_SWATCHES;

  return (
    <div className="flex items-center space-x-2">
      {swatchesToShow.map((color: ColorOption, index: number) => (
        <div
          key={color.code || index}
          className="h-5 w-5 rounded-full border border-black/10 ring-1 ring-inset ring-gray-200 transition-transform hover:scale-110"
          style={{ backgroundColor: color.hex }}
          title={color.label || color.code}
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
  );
}
