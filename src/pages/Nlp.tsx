import Hero from "../components/NLP/Hero";
import GradientText from "../util/Gradtxt";
import ProblemsPage from "../components/NLP/ProblemsPage";

const Nlp = () => {
  return (
    // Removed the background class from this div
    <div>
      <Hero />

      {/* Main content wrapper with vertical padding */}
      <main className="py-20 px-4">
        <div className="container mx-auto font-orbitron">
          
          {/* --- Timeline Section --- */}
          <section className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Left Column: Text Content */}
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Event{" "}
                <GradientText className="text-4xl font-medium md:text-5xl">
                  Timeline
                </GradientText>
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                Follow our journey through the key phases of the event, from the initial kickoff to the final presentations.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="md:w-1/2">
              <img 
                src="/Events/plt.png" 
                alt="Event Timeline Graphic" 
                className="w-full rounded-lg" 
              />
            </div>
          </section>

          {/* --- Problems Section --- */}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold">
                Problem <GradientText className="text-4xl font-medium md:text-5xl">Statements</GradientText>
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Choose your challenge. Tackle real-world problems with NLP.
              </p>
            </div>
            <ProblemsPage />
          </section>

        </div>
      </main>
    </div>
  );
};

export default Nlp;