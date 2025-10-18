import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Type definition for each FAQ item ---
interface FaqItemProps {
  id: number;
  question: string;
  answer: string;
}

// --- Sample Data for the FAQ section ---
// You can easily replace this with data fetched from an API.
const faqData: FaqItemProps[] = [
  {
    id: 1,
    question: "Will i get a refund if I lose?",
    answer: "No refunds are available at this time. Losing is a skill issue",
  },
  {
    id: 2,
    question: "How many events can you register for?",
    answer:
      "You can register for literally everything on the list—as long as you figured out how to clone yourself",
  },
  {
    id: 3,
    question: "Will OD be provided if I do not attend?",
    answer: "No , OD will not be provided if you do not attend the event 😏",
  },
  {
    id: 4,
    question: "Will refreshments be provided during the events?",
    answer:
      "We want you to bring everything you've got to our events ( including your own snacks 😊 )",
  },
];

// --- Chevron Icon Component ---
// A small component for the animated arrow icon
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg
    key="chevron"
    initial={false}
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="h-6 w-6 text-cyan-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </motion.svg>
);

// --- Main FAQ Component ---
const FaqAccordion = () => {
  // State to keep track of the currently open FAQ item
  const [openFaqId, setOpenFaqId] = useState<number | null>(
    faqData[0]?.id ?? null
  );

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqData.map((item) => {
        const isOpen = openFaqId === item.id;
        return (
          <motion.div
            key={item.id}
            className="border border-cyan-700/50 rounded-lg overflow-hidden transition-all duration-300 bg-gray-800/70 backdrop-blur-sm"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 25px rgba(0, 255, 255, 0.2)",
              borderColor: "rgba(0, 255, 255, 0.4)",
            }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setOpenFaqId(isOpen ? null : item.id)}
              className="w-full flex justify-between items-center p-5 text-left font-bold text-lg focus:outline-none bg-gray-800 transition-colors duration-300 hover:bg-gray-700/80"
              aria-expanded={isOpen}
              aria-controls={`faq-content-${item.id}`}
            >
              <span className="text-cyan-300 tracking-wide">
                {item.question}
              </span>
              <ChevronIcon isOpen={isOpen} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-content-${item.id}`}
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto", y: 0 },
                    collapsed: { opacity: 0, height: 0, y: -10 },
                  }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden border-t border-cyan-800/50"
                >
                  <div className="p-5">
                    <p className="pl-4 border-l-2 border-cyan-400/80 py-2 text-gray-300">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
