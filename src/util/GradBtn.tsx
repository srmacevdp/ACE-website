import React from "react";

interface GradientButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-7 py-4 rounded-full 
        text-white font-semibold 
        border-1  shadow-[0_0_10px_#0ff,0_0_20px_#0ff,0_0_30px_#0ff] animate-pulse 
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default GradientButton;
