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
    
    console.log('ColorSelector received colors:', colors);
    
    if (colors?.availableColors) {
      availableColors = colors.availableColors;
    } else {
      // Fallback colors if none provided
      availableColors = [
        { hex: '#000000', code: 'black', label: 'Black' },
        { hex: '#1a365d', code: 'navy', label: 'Navy' },
        { hex: '#374151', code: 'charcoal', label: 'Charcoal' }
      ];
    }
    
    setColorArray(availableColors);
    
    // Auto-select first color if none selected
    if (availableColors.length > 0 && !selectedColor) {
      onColorChange(availableColors[0].label);
    }
  }, [colors, selectedColor, onColorChange]);

  // Always render the color selector, even if no colors
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 uppercase tracking-wider">
        Color
      </h3>
      
      {colorArray.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className="text-sm text-gray-500">
          No color options available for this product.
        </div>
      )}
    </div>
  );
}
