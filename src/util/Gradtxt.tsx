import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  size?: string; // Tailwind text size, e.g., "text-4xl"
  gradient?: string; // Tailwind gradient classes
  className?: string; // Additional classes if needed
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  size = "text-3xl",
  gradient = "bg-gradient-to-r from-primary via-tertiary to-secondary",
  className = "",
}) => {
  return (
    <span
      className={`${size} font-bold ${gradient} bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
};

export default GradientText;
