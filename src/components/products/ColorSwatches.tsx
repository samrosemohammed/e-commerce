interface ColorSwatchesProps {
  colors: string[];
}

const getColorValue = (color: string): string => {
  const colorMap: Record<string, string> = {
    blue: "#3B82F6",
    black: "#000000",
    white: "#FFFFFF",
    red: "#EF4444",
    green: "#10B981",
    pink: "#EC4899",
    purple: "#8B5CF6",
    yellow: "#F59E0B",
    gray: "#6B7280",
    brown: "#92400E",
    navy: "#1E3A8A",
  };

  const colorKey = Object.keys(colorMap).find((key) =>
    color.toLowerCase().includes(key)
  );

  return colorKey ? colorMap[colorKey] : "#9CA3AF";
};
export const ColorSwatches = ({ colors }: ColorSwatchesProps) => {
  return (
    <div className="flex gap-1 mt-2">
      {colors.slice(0, 4).map((color) => (
        <div
          key={color}
          className="w-4 h-4 rounded-full border border-gray-300"
          style={{ backgroundColor: getColorValue(color) }}
          title={color}
        />
      ))}
      {colors.length > 4 && (
        <span className="text-xs text-muted-foreground">
          +{colors.length - 4}
        </span>
      )}
    </div>
  );
};
