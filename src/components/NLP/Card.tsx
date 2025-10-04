import React from "react";
import { FaArrowRight, FaLeaf } from "react-icons/fa";
import { MdOutlineSecurity, MdOutlineSportsCricket } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { RiEarthquakeFill } from "react-icons/ri";

const icons: React.ReactNode[] = [
  <MdOutlineSecurity />,
  <MdOutlineSportsCricket />,
  <GoLaw />,
  <AiOutlineDollarCircle />,
  <FaLeaf />,
  <RiEarthquakeFill />,
];

interface CardProps {
  title: string;
  description: string;
  theme?: string;
  icon?: string;
  onClick: (e:any) => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick, theme,icon }) => {
    const ic:any = icon;

  return (
    <>
      <div
        onClick={onClick}
        className="cursor-pointer text-white hover:text-primary font-orbitron bg-zinc-950 hover:shadow-[0_0_2px_#0ff,0_0_4px_#0ff,0_0_6px_#0ff]
 border border-primary/20 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300"
      >
        <div className="title flex items-start gap-5">
          <div className="icon text-primary text-4xl">
            {icons[ic]}
          </div>
          <div className="heading">
            <h2 className="text-xl text-inherit font-semibold mb-2 ">
              {title}
            </h2>
            <h3 className="mb-4 text-xs border max-w-60 px-2 py-1 border-white/40 rounded-2xl text-center text-white">
              {theme}
            </h3>
          </div>
        </div>

        <p className="text-gray-300 line-clamp-3">
          {description.slice(0, 200)}
        </p>
        <p className="mt-5 text-primary flex items-center gap-2">
          Click to view details
          <FaArrowRight />
        </p>
      </div>
    </>
  );
};

export default Card;
