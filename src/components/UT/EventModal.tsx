import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { X, Phone, Calendar, Clock, MapPin, DollarSign } from "lucide-react";
import { type EventData, type ContactPerson } from "../../Types/types";

interface EventModalProps {
  event: EventData;
  onClose: () => void;
}

// Helper components (getCategoryStyles, ContactInfo) remain the same
const getCategoryStyles = (type: string) => {
  const category = type.toLowerCase().replace(" ", "-");
  switch (category) {
    case "technical":
      return {
        textColor: "text-green-400",
        borderColor: "border-green-500/50",
      };
    case "non-technical":
      return {
        textColor: "text-indigo-400",
        borderColor: "border-indigo-500/50",
      };
    case "gaming":
      return {
        textColor: "text-red-400",
        borderColor: "border-red-500/50",
      };
    default:
      return {
        textColor: "text-gray-400",
        borderColor: "border-gray-500/50",
      };
  }
};

const ContactInfo: React.FC<{ person: ContactPerson }> = ({ person }) => (
  <div className="flex items-center p-3 bg-gray-700/50 rounded-lg border border-cyan-800/50 font-poppins hover:shadow-md hover:shadow-cyan-500/50 transition-shadow duration-300 group">
    <Phone className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
    <div className="flex flex-col min-w-0">
      <span className="font-semibold text-cyan-300 truncate">
        {person.name}
      </span>
      <a
        href={`tel:${person.phone}`}
        className="text-blue-400 hover:text-blue-300 text-xs tracking-wider truncate"
      >
        {person.phone}
      </a>
    </div>
  </div>
);

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const { textColor, borderColor } = getCategoryStyles(event.type);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <motion.div
      id="eventModal"
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pb-4 pt-[50px]"
      onClick={handleClose}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      exit="hidden"
      variants={backdropVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-md">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,255,255,0.08),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,100,255,0.08),rgba(255,255,255,0))]"></div>
      </div>

      {/* 1. This is the main frame. Note it has NO overflow property. */}
      <motion.div
        className={`relative bg-gray-900/80 backdrop-blur-xl rounded-lg shadow-2xl w-full max-w-4xl max-h-[calc(100vh-70px)] flex flex-col border ${borderColor}`}
        onClick={handleModalClick}
        variants={modalVariants}
      >
        {/* 3. The button is a direct child of the non-scrolling frame. */}
        <motion.button
          onClick={handleClose}
          className="cursor-pointer absolute top-4 right-4 z-20 text-white bg-gray-800/60 rounded-full p-2 transition-all duration-300 border border-red-900/50 hover:shadow-lg hover:shadow-red-500/50"
          whileHover={{ scale: 1.1, rotate: 360, color: "#f87171" }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-6 w-6" />
        </motion.button>

        {/* 2. This new div now handles all the scrolling. */}
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-700/50 scrollbar-track-gray-800/50">
          {/* Header with image */}
          <div className="relative">
            <div className="w-full h-48 rounded-t-lg opacity-30 overflow-hidden">
              <img
                src={event.image}
                alt={`Poster for ${event.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span
                className={`text-sm font-semibold uppercase tracking-widest mb-1 font-poppins ${textColor}`}
              >
                {event.type} EVENT
              </span>
              <h3 className="text-4xl font-extrabold text-white font-orbitron">
                {event.name}
              </h3>
            </div>
          </div>

          {/* Modal content is inside the scrollable div */}
          <div className="p-8">
            <p className="text-gray-300 mt-4 text-lg leading-relaxed border-l-4 border-cyan-500 pl-4 font-poppins">
              {event.description}
            </p>

            {/* Details Grid with Icons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 p-6 bg-gray-800/50 rounded-lg border border-blue-800/50 font-poppins">
              <div className="flex items-start space-x-3">
                <Calendar size={20} className="mt-1 text-cyan-400" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                    Date Span
                  </span>
                  <span className="font-bold text-white mt-1">
                    {event.date}
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={20} className="mt-1 text-cyan-400" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                    Time Frame
                  </span>
                  <span className="font-bold text-white mt-1">
                    {event.time}
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 text-cyan-400" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                    Designated Zone
                  </span>
                  <span className="font-bold text-white mt-1">
                    {event.venue || "TBA"}
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <DollarSign size={20} className="mt-1 text-cyan-400" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                    Entry Fee
                  </span>
                  <span className="font-bold text-white whitespace-pre-line mt-1">
                    {event.fee}
                  </span>
                </div>
              </div>
            </div>

            {/* Rules, Rounds, Themes, etc. */}
            <div className="mt-10 border-t border-gray-700 pt-6">
              {/* Conditionally render the Rules section */}
              {event.rules && event.rules.length > 0 && (
                <>
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 font-orbitron">
                    Event Rules
                  </h3>
                  <ul className="list-none space-y-3 ml-0">
                    {event.rules.map((rule, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-400 border-l-4 border-blue-600 pl-3 font-poppins"
                      >
                        {rule}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Conditionally render the Rounds section */}
              {event.rounds && event.rounds.length > 0 && (
                <>
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 mt-6 font-orbitron">
                    Event Rounds
                  </h3>
                  <ul className="list-none space-y-3 ml-0">
                    {event.rounds.map((round, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-400 border-l-4 border-blue-600 pl-3 font-poppins"
                      >
                        {round}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* ... other sections ... */}
            </div>

            {/* Coordinators */}
            <div className="mt-10 border-t border-gray-700 pt-6">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 font-orbitron">
                Event Coordinators
              </h3>
              <div className="flex flex-wrap gap-6">
                {event.contactPerson.map((person, index) => (
                  <ContactInfo key={index} person={person} />
                ))}
              </div>
            </div>

            {/* Animated Register Button */}
            <motion.a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 block w-full text-center bg-cyan-600 text-white font-bold py-4 px-4 rounded-lg text-xl font-orbitron shadow-lg shadow-cyan-600/20"
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 0px 20px rgba(10, 200, 255, 0.6)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Register Now!!
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;
