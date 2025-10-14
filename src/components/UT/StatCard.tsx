import { useState, useEffect, useRef } from "react";
import { type FC } from "react";

// To use the 'Orbitron' font, you might need to import it in your main CSS file or HTML head:
// <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">

// --- TYPE DEFINITION for StatCard Props ---
interface StatCardProps {
  target: number;
  label: string;
  category: string;
}

/**
 * StatCard Component
 * A single card with a neon glow effect that counts up to a target number
 * when it becomes visible in the viewport.
 */
export const StatCard: FC<StatCardProps> = ({ target, label, category }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Intersection Observer to trigger the animation when the card is visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // --- Count-up animation logic ---
          let startTimestamp: number | null = null;
          const duration = 2000; // Animation duration in milliseconds

          const step = (timestamp: number) => {
            if (!startTimestamp) {
              startTimestamp = timestamp;
            }
            const progress = Math.min(
              (timestamp - startTimestamp) / duration,
              1
            );
            const currentCount = Math.floor(progress * target);
            setCount(currentCount);

            if (progress < 1) {
              animationFrameId.current = requestAnimationFrame(step);
            }
          };

          animationFrameId.current = requestAnimationFrame(step);

          // Disconnect the observer once the animation has started
          observer.disconnect();
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function to cancel animation frame on component unmount
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [target]);

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-xs h-40 bg-black/5 backdrop-blur-md rounded-2xl overflow-hidden p-6 border-2 border-cyan-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.9)] hover:border-cyan-300 hover:scale-[1.03] group"
    >
      {/* Inner neon glow effect */}
      <div className="absolute inset-0 bg-transparent rounded-2xl shadow-[0_0_15px_rgba(0,255,255,0.7)_inset,_0_0_15px_rgba(0,255,255,0.7)] pointer-events-none z-0 opacity-75 transition-opacity duration-300 group-hover:opacity-100"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between h-full w-full">
        <div className="text-cyan-400 text-7xl font-black leading-none tracking-tight font-orbitron">
          <span>{count}</span>
        </div>
        <div className="text-right pl-4">
          <p className="text-white text-base font-semibold uppercase tracking-wider">
            {label}
          </p>
          <p className="text-cyan-300 text-xl font-bold">{category}</p>
        </div>
      </div>
    </div>
  );
};
