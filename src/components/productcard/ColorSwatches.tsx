// ColorSwatches.tsx
import type { AvailableColorStructure } from "../../types/strapi";

interface Color {
  name: string;
  value: string; // hex code
}

interface ColorSwatchesProps {
  colors?: Color[] | string | AvailableColorStructure; // Support your Strapi structure
}

export function ColorSwatches({ colors }: ColorSwatchesProps) {
  // Parse colors if it's a JSON string or convert from AvailableColorStructure
  let colorArray: Color[] = [];
  
  if (colors) {
    try {
      if (typeof colors === 'string') {
        colorArray = JSON.parse(colors);
      } else if (Array.isArray(colors)) {
        colorArray = colors;
      } else if (colors && 'availableColors' in colors) {
        // Handle AvailableColorStructure from your Strapi API
        colorArray = colors.availableColors.map(colorOption => ({
          name: colorOption.label,
          value: colorOption.hex
        }));
      }
    } catch (error) {
      console.warn('Failed to parse colors:', error);
    }
  }

  // Only show if we have actual colors
  if (!colorArray || colorArray.length === 0) {
    return null;
  }

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500 font-light">Colors:</span>
        <div className="flex space-x-1">
          {colorArray.slice(0, 4).map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full border border-gray-200"
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
          {colorArray.length > 4 && (
            <span className="text-xs text-gray-400 ml-1">
              +{colorArray.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
