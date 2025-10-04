import React from "react";
import GradientButton from "../../util/GradBtn";

const Hero: React.FC = () => {
  return (
    <section className="relative text-white w-full min-h-[100vh] flex items-center justify-center">
      <div
        className="-mt-5 absolute w-full inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('/Events/ldy.png')",
        }}
      ></div>

      {/* Content */}
      <div className="relative -mt-4 z-10 max-w-4xl md:px-6 text-center">
        <div className="img">
          <img
            src="/Events/NLP.png"
            alt="NLP Odyssey"
            className="mx-auto w-full md:mt-20"
          />
        </div>

        <p className="mb-3 text-lg md:text-xl text-gray-200 font-orbitron">
          Build. Innovate. Compete. Join us for 24 hours of creativity, coding,
          and collaboration to solve real-world problems.
        </p>

        <div className="mt-15 flex flex-col sm:flex-row items-center justify-center gap-4">
          <GradientButton className="text-2xl font-orbitron">
            Register Now
          </GradientButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
