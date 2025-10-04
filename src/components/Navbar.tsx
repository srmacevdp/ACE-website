import { NavLink, useLocation } from "react-router-dom";
import { IoMenu, IoClose, IoHomeOutline } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiMicrophoneOn } from "react-icons/ci";
import { useState, useEffect } from "react";
import { type JSX } from "react";

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

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll-based active section highlighting + background toggle
  useEffect(() => {
    const handleScroll = () => {
      // navbar background effect
      setScrolled(window.scrollY > 0);

      // section highlight
      const sections = links.filter((l) => l.href.startsWith("#"));
      const scrollY = window.scrollY + 100; // adjust for navbar height

      let foundSection = "";
      for (const sec of sections) {
        const el = document.querySelector(sec.href) as HTMLElement | null;
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetBottom = offsetTop + el.offsetHeight;
          if (scrollY >= offsetTop && scrollY < offsetBottom) {
            foundSection = sec.href;
            break;
          }
        }
      }
      setActiveSection(foundSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to hash element smoothly
  const handleHashClick = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setToggle(false);
  };

  // Helper: check if link is active
  const isLinkActive = (link: Link) => {
    if (link.href.startsWith("#")) {
      return activeSection === link.href;
    }
    return location.pathname === link.href;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 p-8 text-white font-poppins transition-all duration-500 ${
        scrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center md:px-10">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="/ace.png"
            alt="Logo"
            className="w-11 h-11 md:w-14 md:h-14 hover:scale-110 transition-transform duration-500"
          />
          <h1 className="md:text-lg font-bold">ACE CLUB</h1>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 border border-white/30 py-2 px-5 rounded-3xl">
          {links.map((link, i) => {
            const isActive = isLinkActive(link);
            return (
              <li key={i}>
                <NavLink
                  to={link.href.startsWith("#") ? location.pathname : link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                      handleHashClick(link.href);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "shadow-[0_0_10px_#0ff,0_0_20px_#0ff,0_0_30px_#0ff]"
                      : "hover:scale-105"
                  }`}
                >
                  {link.icon && <span>{link.icon}</span>}
                  {link.name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <button
            className="text-3xl"
            onClick={() => setToggle(!toggle)}
            aria-label="Menu"
          >
            <IoMenu />
          </button>

          <ul
            className={`fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-md text-white flex flex-col justify-center items-center gap-6 text-2xl transition-transform duration-300 transform ${
              toggle ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              className="text-5xl absolute top-5 right-5"
              onClick={() => setToggle(false)}
              aria-label="Close menu"
            >
              <IoClose />
            </button>

            {links.map((link, i) => {
              const isActive = isLinkActive(link);
              return (
                <li key={i}>
                  <NavLink
                    to={
                      link.href.startsWith("#") ? location.pathname : link.href
                    }
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        handleHashClick(link.href);
                      } else {
                        setToggle(false);
                      }
                    }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                      isActive
                        ? "shadow-[0_0_10px_#0ff,0_0_20px_#0ff,0_0_30px_#0ff]"
                        : "hover:scale-105"
                    }`}
                  >
                    {link.icon && <span>{link.icon}</span>}
                    {link.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
