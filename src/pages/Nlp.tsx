import Hero from "../components/NLP/Hero";
import GradientText from "../util/Gradtxt";
import ProblemsPage from "../components/NLP/ProblemsPage";

const Nlp = () => {
  return (
    <div>
      <Hero />

      <div className="timeline">
        <div className="txt text-white font-orbitron text-center p-4 mt-20">
          <h1 className="text-4xl md:text-5xl">
            Event <GradientText className="text-4xl font-medium md:text-5xl">Timeline</GradientText>
          </h1>{" "}
        </div>
        <div className="img w-full md:w-1/2 mx-auto">
            <img src="/Events/plt.png" alt="info" className="w-full" />
        </div>
        
        <ProblemsPage/>
      </div>
    </div>
  );
};

export default Nlp;
