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
            {/* REMOVED shadow-lg to prevent conflict */}
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden group 
                        shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                {/* Image */}
                <img
                    src={image}
                    alt={name}
                    className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-4 pt-24 pb-4 bg-gradient-to-t from-black/90 to-transparent text-center">
                    <h2 className="text-white text-xl font-bold">{name}</h2>
                    <GradientText className="text-sm">{designation}</GradientText>
                </div>
            </div>
        </div>
    );
};

export default GlassCard;