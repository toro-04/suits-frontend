// ColorSelector.tsx
import { useState, useEffect } from "react";
import type { AvailableColorStructure, ColorOption } from "../../types/strapi";

interface ColorSelectorProps {
  colors?: AvailableColorStructure;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export function ColorSelector({ colors, selectedColor, onColorChange }: ColorSelectorProps) {
  const [colorArray, setColorArray] = useState<ColorOption[]>([]);

  useEffect(() => {
    let availableColors: ColorOption[] = [];
    
    if (colors?.availableColors) {
      availableColors = colors.availableColors;
    }
    
    setColorArray(availableColors);
    
    // Auto-select first color if none selected
    if (availableColors.length > 0 && !selectedColor) {
      onColorChange(availableColors[0].label);
    }
  }, [colors, selectedColor, onColorChange]);

  if (colorArray.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 uppercase tracking-wider">
        Color
      </h3>
      <div className="flex flex-wrap gap-3">
        {colorArray.map((color) => (
          <button
            key={color.code}
            onClick={() => onColorChange(color.label)}
            className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 ${
              selectedColor === color.label
                ? 'border-black scale-110'
                : 'border-gray-300 hover:border-gray-500'
            }`}
            title={color.label}
          >
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: color.hex }}
            />
            {selectedColor === color.label && (
              <div className="absolute inset-0 rounded-full border-2 border-white" />
            )}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600">
        Selected: <span className="font-medium">{selectedColor}</span>
      </p>
    </div>
  );
}
