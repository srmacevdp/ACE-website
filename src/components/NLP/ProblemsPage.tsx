import React, { useState } from "react";
import ProblemModal from "./ProblemModal";
import Card from "./Card";
import GradientText from "../../util/Gradtxt";
import prb from "../../assets/JSON/problems.json";


interface Problem {
  title: string;
  description: string;
  theme?: string;
  icon?: string;
  dataset?: string;
}


const problems: Problem[] = prb.problems;


const ProblemsPage: React.FC = () => {
  
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);


  const openModal = (problem: Problem): void => {
    setSelectedProblem(problem);
    setModalOpen(true);
  };

  return (
    <div className=" w-full p-7 space-y-10">
      <h1 className="text-4xl mt-7 font-bold text-center text-white font-orbitron">
        Problem <GradientText className="text-4xl">Statements</GradientText>
      </h1>

      {/* Problem Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((p, idx) => (
          <Card
            key={idx}
            title={p.title}
            description={p.description}
            theme={p.theme}
            icon={p.icon}
            onClick={(e): void => {
              openModal(p);
            }}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedProblem && (
        <ProblemModal
          problem={selectedProblem}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      )}
    </div>
  );
};

export default ProblemsPage;
