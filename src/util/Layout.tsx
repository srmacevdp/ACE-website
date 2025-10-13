import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThreeBg from "../components/Three";
import FloatingParticlesScroll from "../components/ThreeUT";

const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#0d1117] overflow-hidden text-gray-100">
      {/* === Three.js Background (behind everything) === */}
      {/* <ThreeBg /> */}
      <FloatingParticlesScroll/>
      {/* === Foreground content === */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Main routed content */}
        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
