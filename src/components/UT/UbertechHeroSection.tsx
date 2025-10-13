import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CalendarDays } from "lucide-react";
import GradientText from "../../util/Gradtxt";

import { FlippingCard } from "../UT/FlippingCard";

// Utility function to format numbers to two digits
const formatTime = (num: number): string => num.toString().padStart(2, "0");

// Calculate time remaining until the event date
const calculateTimeRemaining = (targetDate: Date) => {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
  const hours = Math.max(
    0,
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const minutes = Math.max(
    0,
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  );
  const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

  return { days, hours, minutes, seconds, isExpired: distance < 0 };
};

// Sub-component for each timer segment with animation
const TimerSegment: React.FC<{
  value: number;
  label: string;
  className?: string;
}> = ({ value, label, className }) => (
  <motion.div
    className={`timer-segment flex flex-col items-center w-[100px] sm:w-[120px] p-4 bg-gray-800/70 rounded-lg border border-cyan-500/50 shadow-lg shadow-cyan-500/10 ${className}`}
    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(37, 99, 235, 0.8)" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="relative h-12 sm:h-14 w-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl font-bold"
        >
          {formatTime(value)}
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="text-xs uppercase text-cyan-300 mt-1 tracking-widest">
      {label}
    </div>
  </motion.div>
);

const UbertechHeroSection: React.FC = () => {
  const eventDate = new Date("2025-10-23T00:00:00");
  const [time, setTime] = useState(calculateTimeRemaining(eventDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeRemaining(eventDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timerData = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  return (
    <>
      {/* Fixed atmospheric background */}
      <div className="fixed inset-0 z-0 opacity-50">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,255,255,0.08),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,100,255,0.08),rgba(255,255,255,0))]"></div>
      </div>

      <section
        id="hero"
        className="min-h-screen flex items-center relative z-10 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Details */}
            <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6">
              <p className="text-lg uppercase tracking-[0.3em] text-cyan-400 font-orbitron font-medium text-shadow-custom">
                ACE CLUB PRESENTS
              </p>

              <motion.img
                src="/Events/UT.png"
                alt="Ubertech '25 AI Helix Logo"
                className="h-36 w-auto sm:h-48 object-contain filter drop-shadow-xl"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <p className="text-xl text-gray-300 font-orbitron max-w-xl mx-auto lg:mx-0">
                <GradientText className="text-2xl">Code</GradientText> the
                future, Build the{" "}
                <GradientText className="text-2xl">impossible!</GradientText>
              </p>

              {/* Countdown Timer */}
              <div
                id="countdown-timer"
                className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 text-white font-orbitron"
              >
                {timerData.map((item) => (
                  <TimerSegment
                    key={item.label}
                    value={item.value}
                    label={item.label}
                    className={item.label === "Seconds" ? "hidden sm:flex" : ""}
                  />
                ))}
              </div>

              {/* Event Details Box */}
              <div className="flex flex-col sm:flex-row items-start lg:items-center gap-4 sm:gap-6 p-4 bg-gray-900/80 rounded-xl border border-blue-500/50 shadow-lg">
                <div className="flex items-center text-base text-cyan-300 font-poppins">
                  <MapPin className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                  <span className="font-semibold">Venue:</span>
                  <span className="ml-2 text-white text-sm">
                    C Block, SRM IST VDP
                  </span>
                </div>
                <div className="h-5 w-px bg-blue-500/50 hidden sm:block"></div>
                <div className="flex items-center text-base text-cyan-300 font-poppins">
                  <CalendarDays className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                  <span className="font-semibold">Date:</span>
                  <span className="ml-2 text-white text-sm">
                    23rd - 24th Oct 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Poster and CTA */}
            <FlippingCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default UbertechHeroSection;
