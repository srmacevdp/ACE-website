import React from "react";
import GradientText from "../util/Gradtxt";

interface GlassCardProps {
  image: string;
  name: string;
  designation: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ image, name, designation }) => {
  return (
    <div className="w-xs font-orbitron">
      <div className="bg-white/10 backdrop-blur-md border-3 border-white/30 rounded-tr-[4rem] rounded-bl-[4rem] shadow-lg overflow-hidden">
        {/* Image */}
        <img src={image} alt={name} className="w-full h-80 object-cover px-4 pt-4 rounded-tr-[4rem] rounded-bl-[4rem]" />

        {/* Text */}
        <div className="p-4 text-center">
          <h2 className="text-white text-xl font-bold">{name}</h2>
          <GradientText className="text-sm">{designation}</GradientText>
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
