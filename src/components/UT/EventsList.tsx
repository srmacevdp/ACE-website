import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignalZero } from "lucide-react";
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import {
  type EventData,
  type ModalState,
  type EventCategory,
} from "../../Types/types";
import allEventsData from "../../assets/JSON/eventsData.json";

const events: EventData[] = allEventsData as EventData[];

const eventCategories: EventCategory[] = [
  "Technical",
  "Non-Technical",
  "Gaming",
];
const allFilterCategories = ["All", ...eventCategories];

const EventsList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | EventCategory
  >("All");
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    event: null,
  });

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "All") {
      return events;
    }
    return events.filter((event) => event.type === selectedCategory);
  }, [selectedCategory]);

  const handleShowDetails = (event: EventData) => {
    setModalState({ isOpen: true, event });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, event: null });
  };

  // Animation variants for the grid items
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Subtle, fixed background for atmosphere */}
      <div className="fixed inset-0 z-0 opacity-50">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,255,255,0.08),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,100,255,0.08),rgba(255,255,255,0))]"></div>
      </div>

      <main id="ut-events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Event Filter Tabs with Animated Pill */}
        <div
          id="filter-tabs"
          className="flex flex-wrap gap-4 mb-16 justify-center bg-gray-900/70 p-3 rounded-xl shadow-2xl border border-blue-900/50 backdrop-blur-md"
        >
          {allFilterCategories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category as "All" | EventCategory)
              }
              className={`relative cursor-pointer font-orbitron px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 z-10
                ${
                  selectedCategory === category
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
            >
              {category}
              {selectedCategory === category && (
                <motion.div
                  className="absolute inset-0 bg-blue-800 shadow-glow-blue rounded-full -z-10"
                  layoutId="active-pill"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Animated Events Grid */}
        <motion.div
          id="events-container"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          layout
        >
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <motion.div
                key={event.name}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout="position"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <EventCard event={event} onShowDetails={handleShowDetails} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Animated "No Events" Message */}
        <AnimatePresence>
          {filteredEvents.length === 0 && (
            <motion.div
              id="no-events"
              className="col-span-full text-center p-10 bg-gray-900/70 rounded-lg shadow-xl border border-red-800/50 mt-10 font-poppins"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex flex-col items-center gap-4">
                <SignalZero className="w-12 h-12 text-red-500/50" />
                <p className="text-xl text-red-400">
                  No Events Found in this Sector
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Event Modal remains the same */}
      {modalState.isOpen && modalState.event && (
        <EventModal event={modalState.event} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default EventsList;
