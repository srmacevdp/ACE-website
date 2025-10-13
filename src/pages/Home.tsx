import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// UTILITY & COMPONENT IMPORTS
import GradientText from "../util/Gradtxt";
import GradientButton from "../util/GradBtn";
import Card from "../components/Card";
import StatsGrid from "../util/Counter";
import GlassCard from "../components/GlassCard";
import ImageCarousel from "../components/ImageCarousel";
// import VideoPlayer from "../components/VideoPlayer";

// DATA IMPORTS
import Senior from "../assets/JSON/BOD-SENIOR.json";
import Junior from "../assets/JSON/BOD-JUNIOR.json";

// TYPE DEFINITIONS
interface Event {
  name: string;
  image: string;
  description: string;
  link?: string;
}

interface Member {
  name: string;
  position: string;
  instagram?: string;
  linked_in?: string;
  image_url: string;
}

// DATA INITIALIZATION
const Events: Event[] = [
  {
    name: "ACE Hacks",
    image: "/Events/hacks.png",
    description: "A premier National Level Hackathon.",
    link: "/Hacks",
  },
  {
    name: "UberTech",
    image: "/Events/UT.png",
    description: "Our flagship Technical Symposium.",
    link: "/Ubertech",
  },
  {
    name: "NLP Odessey",
    image: "/Events/NLP.png",
    description: "An immersive Natural Language Processing workshop.",
    link: "/NLP",
  },
];

const galleryImages = [
  "https://raw.githubusercontent.com/srmacevdp/assets/refs/heads/main/OTHERS/TEAM-BOD.jpg",
  "https://raw.githubusercontent.com/srmacevdp/assets/refs/heads/main/BOD%20IMG/IMG_3339.JPG",
];

const seniorBod: Member[] = Senior.bod_senior;
const juniorBod: Member[] = Junior.bod_junior;

// REUSABLE ANIMATION VARIANTS
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

// REUSABLE SECTION HEADER
const SectionHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.h2
    className="text-4xl md:text-5xl font-bold font-orbitron text-center text-white mb-16"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.h2>
);

// MAIN HOME COMPONENT
const Home = () => {
  const [activeTab, setActiveTab] = useState<"senior" | "junior">("senior");

  return (
    <div className="home-container overflow-x-hidden -mt-25 md:mt-10">
      {/* HERO SECTION */}
      {/* CHANGE: Increased desktop gap between left/right sections to lg:gap-32 */}
      <section className="hero min-h-screen flex flex-col-reverse lg:flex-row gap-10 lg:gap-32 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="left text-white font-orbitron flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            variants={itemVariants}
          >
            Welcome to{" "}
            <GradientText className="text-5xl md:text-7xl">ACE</GradientText>
          </motion.h1>
          <motion.p
            className="mt-0 text-sm md:text-lg text-gray-300 max-w-md font-poppins"
            variants={itemVariants}
          >
            Innovate, Collaborate, and Elevate. Your journey into the future of
            technology starts here.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-2 md:mt-5">
            <GradientButton>
              <GradientText className="text-lg px-4 py-2">
                Join The Club
              </GradientText>
            </GradientButton>
          </motion.div>
        </motion.div>
        <div className="right flex items-center justify-center p-8">
          <motion.div
            className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              className="absolute w-full h-full rounded-full border-2 border-cyan-500/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-2/3 h-2/3 rounded-full border-2 border-blue-500/50"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <GradientText className="text-8xl font-bold">A</GradientText>
          </motion.div>
        </div>
      </section>

      {/* EVENTS PREVIEW SECTION */}
      <section className="events-preview max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <SectionHeader>
          Our Flagship{" "}
          <GradientText className="text-4xl md:text-5xl">Events</GradientText>
        </SectionHeader>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {Events.map((Evnt, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card image={Evnt.image} link={Evnt.link} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ABOUT THE DEPARTMENT SECTION */}
      <section
        id="about"
        className="about-department max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/bod.jpg"
              alt="About Department"
              className="w-full h-auto object-cover rounded-tr-[4rem] rounded-bl-[4rem] border-2 border-cyan-500/50 shadow-xl shadow-cyan-500/20"
            />
          </motion.div>
          <motion.div
            className="text-white font-orbitron"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About The{" "}
              <GradientText className="text-3xl md:text-5xl">
                Department
              </GradientText>
            </h2>
            <p className="font-poppins font-light text-gray-300 mb-8 leading-relaxed">
              Our department boasts a distinguished faculty with expertise in
              areas such as network security, cryptography, databases, AI, and
              programming languages. Many faculty members have over a decade of
              experience.
            </p>
            <GradientButton>
              <a href="https://srmistvdp.edu.in/faculty-of-engineering-technology/department-of-computer-science-and-engineering/">
                <GradientText className="text-lg">Know More</GradientText>
              </a>
            </GradientButton>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="what-we-do max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="text-white font-orbitron lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What We{" "}
              <GradientText className="text-3xl md:text-5xl">Do</GradientText>
            </h2>
            <p className="font-poppins font-light text-gray-300 mb-8 leading-relaxed">
              ACE, founded in 2011 by CSE students, empowers peers with
              cutting-edge tech skills and collaboration opportunities. Our
              flagship event, Ubertech, is a National Level Technical Symposium,
              connecting students nationwide. We also host workshops, seminars,
              and certification drives.
            </p>
          </motion.div>
          <motion.div
            className="lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <StatsGrid />
          </motion.div>
        </div>
      </section>

      {/* BOARD OF DIRECTORS SECTION */}
      <section className="bod-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <SectionHeader>
          Minds Behind Our{" "}
          <GradientText className="text-4xl md:text-5xl">Journey</GradientText>
        </SectionHeader>
        {/* Tab Controls */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("senior")}
            className={`font-orbitron font-bold cursor-pointer px-7 py-3 rounded-full transition-colors ${
              activeTab === "senior"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            Senior Board
          </button>
          <button
            onClick={() => setActiveTab("junior")}
            className={`font-orbitron font-bold cursor-pointer px-7 py-3 rounded-full transition-colors ${
              activeTab === "junior"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            Junior Board
          </button>
        </div>
        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            // CHANGE: Removed `lg:grid-cols-4` and added `place-items-center`
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {(activeTab === "senior" ? seniorBod : juniorBod).map((member) => (
              <GlassCard
                key={member.name}
                image={member.image_url}
                name={member.name}
                designation={member.position}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* GALLERY SECTION */}
      <section
        id="gallery"
        className="gallery-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        <SectionHeader>
          Our Team{" "}
          <GradientText className="text-4xl md:text-5xl">Moments</GradientText>
        </SectionHeader>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <ImageCarousel images={galleryImages} />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
