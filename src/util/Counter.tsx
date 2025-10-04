import { useEffect, useState, useRef } from "react";
import GradientText from "./Gradtxt";

interface CounterProps {
  end: number;
  duration?: number;
  trigger: boolean;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2000, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (trigger) {
      setCount(0); // reset when triggered
      let start = 0;
      const increment = end / (duration / 16); // ~60fps
      timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
    }

    return () => clearInterval(timer);
  }, [end, duration, trigger]);

  return <GradientText>{count}</GradientText>;
};

const StatsSquare: React.FC = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting); // true when in view, false when out
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="max-w-xl mx-auto p-8 rounded-2xl bg-primary/10 backdrop-blur-xl border border-tertiary/30 shadow-lg"
    >
      <div className="grid grid-cols-2 grid-rows-2 gap-6 px-6 text-center text-white font-bold font-orbitron text-3xl">
        <div className="p-4">
          <Counter end={480} trigger={inView} />
          <p className="text-sm text-gray-300 mt-2">Club Members</p>
        </div>
        <div className="p-4">
          <Counter end={48} trigger={inView} />
          <p className="text-sm text-gray-300 mt-2">Working Committee</p>
        </div>
        <div className="p-4">
          <Counter end={18} trigger={inView} />
          <p className="text-sm text-gray-300 mt-2">Events</p>
        </div>
        <div className="p-4">
          <Counter end={7} trigger={inView} />
          <p className="text-sm text-gray-300 mt-2">Sponsors</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSquare;
