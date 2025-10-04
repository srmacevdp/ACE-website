import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import GradientText from "../util/Gradtxt";

const Footer = () => {
  return (
    <footer className="backdrop-blur-md bg-primary/5 text-gray-300  py-8 font-orbitron mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          
          {/* Brand / Logo */}
          <div className="text-center md:text-left">
            <GradientText>ACE</GradientText>
            <p className="mt-2 text-sm text-gray-400">
              © {new Date().getFullYear()} SRMACE. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row gap-4 text-sm">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/Ubertech" className="hover:text-white transition">UberTech</a>
            <a href="/NLP" className="hover:text-white transition">NLP Odessey</a>
            <a href="/Hacks" className="hover:text-white transition">ACE Hacks</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 text-xl">
            <a href="https://www.instagram.com/ace_srm_vdp?igsh=cGF4Zmg3eHI4emN5" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/association-of-computer-science-engineers/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
