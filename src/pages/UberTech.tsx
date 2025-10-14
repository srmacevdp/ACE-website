import UbertechHeroSection from "../components/UT/UbertechHeroSection";
import EventsList from "../components/UT/EventsList";
import { StatCard } from "../components/UT/StatCard";

const UberTech = () => {
  return (
    <div className="mt-20 md:mt-5">
      <UbertechHeroSection />
      <section className="flex flex-col lg:flex-row items-center justify-center w-full bg-transparent py-12 px-4 md:px-12 lg:px-24 space-y-10 lg:space-y-0 lg:space-x-8">
        {/* Card 1: Technical Events */}
        <StatCard target={4} label="Technical" category="Events" />

        {/* Card 2: Non-Technical Events */}
        <StatCard target={4} label="Non-Technical" category="Events" />

        {/* Card 3: Gaming Events */}
        <StatCard target={3} label="Gaming" category="Events" />
      </section>
      <EventsList />
    </div>
  );
};

export default UberTech;
