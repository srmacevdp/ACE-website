import { useState, useEffect, type JSX } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// Icons
import { IoMenu, IoClose, IoHomeOutline } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiMicrophoneOn } from "react-icons/ci";

// --- TYPES & DATA ---
interface Link {
  name: string;
  href: string;
  icon?: JSX.Element;
}

const links: Link[] = [
  { name: "Home", href: "/", icon: <IoHomeOutline className="text-xl" /> },
  {
    name: "About Us",
    href: "#about",
    icon: <IoIosInformationCircleOutline className="text-2xl" />,
  },
  { name: "Gallery", href: "#gallery", icon: <GrGallery /> },
  { name: "Ubertech", href: "/Ubertech" },
  {
    name: "NLP Odessey",
    href: "/NLP",
    icon: <CiMicrophoneOn className="text-2xl" />,
  },
  { name: "ACE Hacks", href: "/Hacks" },
];

// --- MOBILE MENU COMPONENT (WITH LIQUID GLASS EFFECT) ---
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  renderNavLinks: () => JSX.Element[];
}

const MobileMenu = ({ isOpen, onClose, renderNavLinks }: MobileMenuProps) => {
  const menuVariants: Variants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] } },
  };

  const listVariants: Variants = {
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    hidden: {},
  };
  
  const liquidGlassStyle = {
    background: `
      radial-gradient(circle at 15% 20%, rgba(0, 255, 255, 0.12), transparent 40%),
      radial-gradient(circle at 80% 75%, rgba(192, 132, 252, 0.12), transparent 40%),
      rgba(15, 23, 42, 0.88)
    `,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        >
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm backdrop-blur-xl shadow-2xl z-50 flex flex-col border-l border-white/20"
            style={liquidGlassStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-5">
              <button
                className="text-4xl text-white/80 hover:text-white transition-colors"
                onClick={onClose}
                aria-label="Close menu"
              >
                <IoClose />
              </button>
            </div>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center h-full gap-4 text-2xl"
            >
              {renderNavLinks()}
            </motion.ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


// --- MAIN NAVBAR COMPONENT ---
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = links.filter((l) => l.href.startsWith("#"));
      const scrollY = window.scrollY + 150;

      let currentSection = "";
      for (const sec of sections) {
        const el = document.querySelector(sec.href) as HTMLElement | null;
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          currentSection = sec.href;
          break;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHashClick = (hash: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };
  
  const isLinkActive = (link: Link) => {
    if (link.href.startsWith("#")) {
      return activeSection === link.href;
    }
    return location.pathname === link.href;
  };

  const renderNavLinks = () => {
    const linkItemVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    return links.map((link, i) => {
      const isActive = isLinkActive(link);
      return (
        <motion.li key={i} variants={linkItemVariants}>
          <NavLink
            to={link.href.startsWith("#") ? location.pathname + link.href : link.href}
            onClick={(e) => {
              if (link.href.startsWith("#")) {
                handleHashClick(link.href, e);
              } else {
                setMenuOpen(false);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                isActive
                ? "bg-cyan-400/20 text-cyan-300"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            {link.icon && <span>{link.icon}</span>}
            <span className="font-medium">{link.name}</span>
          </NavLink>
        </motion.li>
      );
    });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-30 p-4 text-white font-poppins transition-all duration-300 ${
          isScrolled || isMenuOpen ? "bg-slate-900/50 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center md:px-10">
          <NavLink to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <img
              src="/ace.png"
              alt="ACE Club Logo"
              className="w-11 h-11 md:w-14 md:h-14 hover:scale-110 hover:rotate-6 transition-transform duration-500"
            />
            <h1 className="md:text-lg font-bold tracking-wider">ACE CLUB</h1>
          </NavLink>

          <ul className="hidden md:flex items-center gap-2 bg-white/5 border border-white/20 p-2 rounded-full">
            {renderNavLinks()}
          </ul>

          <div className="md:hidden">
            <button
              className="text-3xl p-2"
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Open menu"
            >
              <IoMenu />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        renderNavLinks={renderNavLinks}
      />
    </>
  );
};

export default Navbar;