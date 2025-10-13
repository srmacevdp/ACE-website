import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react";
import { type EventData, type EventCategory } from "../../Types/types";

interface EventCardProps {
  event: EventData;
  onShowDetails: (event: EventData) => void;
}

const getCategoryStyles = (type: EventCategory) => {
  switch (type) {
    case "Technical":
      return {
        tag: "bg-green-600/70 text-green-200 border-green-500",
        shadow: "shadow-green-500/50",
      };
    case "Non-Technical":
      return {
        tag: "bg-indigo-600/70 text-indigo-200 border-indigo-500",
        shadow: "shadow-indigo-500/50",
      };
    case "Gaming":
      return {
        tag: "bg-red-600/70 text-red-200 border-red-500",
        shadow: "shadow-red-500/50",
      };
    default:
      return {
        tag: "bg-gray-600/70 text-gray-200 border-gray-500",
        shadow: "shadow-gray-500/50",
      };
  }
};

const EventCard: React.FC<EventCardProps> = ({ event, onShowDetails }) => {
  const styles = getCategoryStyles(event.type);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full aspect-[2/3] group"
      data-category={event.type.toLowerCase().replace(" ", "-")}
    >
      {/* The blurred gradient div has been removed from here. */}

      <div
        className="relative rounded-xl overflow-hidden 
                   h-full w-full flex flex-col justify-end
                   shadow-2xl shadow-cyan-500/20 z-10 
                   bg-cover bg-center transition-all duration-500 ease-in-out 
                   group-hover:scale-105 group-hover:border group-hover:border-blue-500"
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className="relative p-6 pt-28 bg-gradient-to-t from-black/95 from-30% to-transparent">
          <span
            className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-current font-orbitron shadow-md mb-3 ${styles.tag} ${styles.shadow}`}
          >
            {event.type}
          </span>

          <h2 className="text-2xl font-bold text-white mb-3 font-orbitron">
            {event.name}
          </h2>

          <div className="space-y-2 mb-4 text-sm font-poppins">
            <p className="flex items-center text-blue-300">
              <CalendarDays className="h-4 w-4 mr-2 text-cyan-400 flex-shrink-0" />
              <strong>Date:</strong>
              <span className="ml-2 text-white">{event.date}</span>
            </p>
            <p className="flex items-center text-blue-300">
              <Clock className="h-4 w-4 mr-2 text-cyan-400 flex-shrink-0" />
              <strong>Time:</strong>
              <span className="ml-2 text-white">{event.time}</span>
            </p>
          </div>

          <div className="flex space-x-4 pt-4">
            <motion.a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-cyan-600/20 font-orbitron"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(10, 200, 255, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              Register
            </motion.a>
            <button
              onClick={() => onShowDetails(event)}
              className="flex-1 text-center bg-transparent hover:bg-blue-500/20 text-blue-300 font-medium py-2 px-4 rounded-lg 
                         transition-colors duration-300 border border-blue-600/50 hover:border-blue-500 hover:text-white"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
