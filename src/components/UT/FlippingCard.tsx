import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GradientButton from "../../util/GradBtn";
// NOTE: You'll need to define the props for these components or import their types.
// For this example, we'll assume they accept a `className`.

const GradientText = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <span className={className}>{children}</span>;

// A custom hook to detect if the user is on a mobile device
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = (): void => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind
    };

    // Initial check
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile;
};

export const FlippingCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const handleFlip = (): void => {
    setIsFlipped(!isFlipped);
  };

  // Conditionally set event handlers
  // On desktop: use hover
  // On mobile: use click
  const eventHandlers = isMobile
    ? { onClick: handleFlip }
    : {
        onHoverStart: () => setIsFlipped(true),
        onHoverEnd: () => setIsFlipped(false),
      };

  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      {/* Container to set the 3D perspective */}
      <div
        className="w-full max-w-xs lg:max-w-sm"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative w-full h-[500px] cursor-pointer" // Set a fixed height or aspect-ratio
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          {...eventHandlers}
        >
          {/* Front Side of the Card */}
          <motion.div
            className="absolute inset-0 w-full h-full rounded-xl border-2 py-1 border-cyan-500/50 bg-black/30 shadow-lg"
            style={{ backfaceVisibility: "hidden" }} // Hides this side when it's facing away
          >
            <img
              src="/Events/UT/UT-PSTR.png" // Your event poster
              alt="Ubertech 2025 Event Poster"
              className="rounded-lg w-full h-full object-contain"
            />
          </motion.div>

          {/* Back Side of the Card */}
          <motion.div
            className="absolute inset-0 w-full h-full rounded-xl border-2 border-cyan-500/50 p-6 bg-gray-900 text-white flex flex-col justify-center items-center shadow-lg"
            style={{
              backfaceVisibility: "hidden", // Hides this side when it's facing away
              transform: "rotateY(180deg)", // Pre-rotate the back side
            }}
          >
            <h3 className="text-2xl font-bold font-orbitron text-cyan-400 mb-4">
              Ubertech 2025
            </h3>
            <p className="text-center text-gray-300 mb-2">
              Join us for the biggest tech symposium of the year!
            </p>
            <ul className="list-disc list-inside text-left text-gray-400">
              <li>Date: Nov 15, 2025</li>
              <li>Venue: Grand Arena</li>
              <li>Keynote by Dr. Eva Core</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Button remains the same */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <a href="#ut-events">
          <GradientButton className="font-orbitron px-8 py-4">
            <GradientText className="text-xl">View Events</GradientText>
          </GradientButton>
        </a>
      </motion.div>
    </div>
  );
};
