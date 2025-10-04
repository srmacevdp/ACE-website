import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
import { FaLeaf } from "react-icons/fa";

interface Problem {
  title: string;
  description: string;
  theme?: string;
  icon?: string;
  dataset?: string;
}

interface ProblemModalProps {
  problem: Problem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProblemModal: React.FC<ProblemModalProps> = ({
  problem,
  open,
  onOpenChange,
}) => {
  if (!problem) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />

        {/* Content */}
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-zinc-950 border border-white/20 text-white font-orbitron p-10 shadow-lg">
          <div className="flex justify-between items-start">
            <div className="head flex items-center gap-6">
              <div className="icon text-5xl text-primary">
                <FaLeaf />
              </div>
              <div className="title">
                <Dialog.Title className="text-2xl font-bold">
                  {problem.title}
                </Dialog.Title>
                <h3 className="text-xs border px-2 py-1 max-w-60 border-white/40 rounded-2xl text-center ml-5 mt-3">
                  {problem.theme}
                </h3>
              </div>
            </div>

            <Dialog.Close className="p-1 rounded cursor-pointer">
              <IoMdClose className="h-7 w-7 font-bold hover:text-primary" />
            </Dialog.Close>
          </div>

          <h3 className="mt-10">Challenge Description</h3>
          <Dialog.Description className="mt-2 text-sm text-gray-400">
            {problem.description}
          </Dialog.Description>
          {problem.dataset && (
            <a
              href={problem.dataset}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-block bg-primary text-black font-semibold px-4 py-2 rounded hover:bg-primary/90"
            >
              View Dataset
            </a>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProblemModal;
