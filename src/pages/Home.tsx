import GradientText from "../util/Gradtxt";
import GradientButton from "../util/GradBtn";
import Card from "../components/Card";
import StatsGrid from "../util/Counter";
import GlassCard from "../components/GlassCard";
import ImageCarousel from "../components/ImageCarousel";
// import VideoPlayer from "../components/VideoPlayer";

import Senior from "../assets/JSON/BOD-SENIOR.json";
import Junior from "../assets/JSON/BOD-JUNIOR.json";

interface Event {
  name: string;
  image: string;
  description: string;
  link?: string;
}

interface Member {
  name: string;
  position: string;
  instagram?: string;
  linked_in?: string;
  image_url: string;
}

const Events: Event[] = [
  {
    name: "ACE Hacks",
    image: "/Events/hacks.png",
    description:
      "a top National Level Technical Symposium, Join us for days of learning, networking, and fun!",
  },
  {
    name: "UberTech",
    image: "/Events/UT.png",
    description:
      "a top National Level Technical Symposium, Join us for days of learning, networking, and fun!",
  },
  {
    name: "NLP Odessey",
    image: "/Events/NLP.png",
    description:
      "a top National Level Technical Symposium, Join us for days of learning, networking, and fun!",
    link: "/NLP",
  },
];

const images = [
  "https://www.srmacevdp.com/assets/gallery/IMG_3449.jpeg",
  "https://raw.githubusercontent.com/srmacevdp/assets/refs/heads/main/OTHERS/TEAM-BOD.jpg",
  "https://www.srmacevdp.com/assets/gallery/IMG_3449.jpeg",
];

const seniorBod: Member[] = Senior.bod_senior;
const juniorBod: Member[] = Junior.bod_junior;

const Home = () => {
  return (
    <div className="home h-full px-2 md:px-10 mt-30 md:mt-50 flex flex-col">
      <div className="wrapper">
        <div className="hero flex pt-6 px-1">
          <div className="left md:ml-10 text-white font-orbitron flex flex-col justify-center items-baseline gap-3">
            <h1 className="text-4xl md:text-7xl font-bold">
              Welcome to <GradientText className="text-7xl">ACE</GradientText>
            </h1>
            <p className="mt-3">
              Let's explore and create your experience with ACE
            </p>
            <GradientButton className="mt-7">
              <GradientText className="text-sm md:text-2xl">
                Join the club
              </GradientText>
            </GradientButton>
          </div>
          <div className="right"></div>
        </div>

        <div className="evnts mt-20 flex flex-wrap gap-5">
          {Events.map((Evnt, i) => (
            <Card key={i} image={Evnt.image} link={Evnt.link} />
          ))}
        </div>
      </div>

      <div id="about" className="abt mt-25 md:p-5 mb-4">
        <div className="abt1 flex flex-col md:flex-row w-full">
          <div className="lft w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
            <div className="img max-w-2xl">
              <img
                src="/bod.jpg"
                alt="about image"
                className="w-full h-auto object-contain rounded-tr-[4rem] rounded-bl-[4rem] border-2 border-primary shadow-[0_0_4px_rgba(0,255,255,0.5),0_0_8px_rgba(0,255,255,0.35),0_0_12px_rgba(0,255,255,0.25)]
"
              />
            </div>
          </div>

          <div className="rgt md:ml-10 w-full md:w-1/2 text-white font-orbitron font-bold flex flex-col justify-center">
            <h1 className="p-4 text-3xl md:text-5xl text-center">
              About The{" "}
              <GradientText className="text-3xl md:text-5xl">
                Department
              </GradientText>
            </h1>
            <p className="p-3 font-light text-sm md:text-base text-center md:text-left">
              Our department boasts a distinguished faculty with expertise in
              areas such as network security, cryptography, databases, AI, and
              programming languages. Many faculty members have over a decade of
              experience. Our research focuses on key areas like network
              security, wireless sensor networks, data mining, and cloud
              computing, with faculty and students regularly presenting at
              prestigious national and international conferences.
            </p>

            <div className="flex justify-center md:justify-start">
              <GradientButton className="mt-4">
                <a href="https://srmistvdp.edu.in/faculty-of-engineering-technology/department-of-computer-science-and-engineering/">
                  <GradientText className="text-lg md:text-xl">
                    Know More
                  </GradientText>{" "}
                </a>
              </GradientButton>
            </div>
          </div>
        </div>

        <div className="abt1 mt-30 md:mt-20 flex flex-col md:flex-row w-full">
          <div className="lft w-full md:w-1/2 flex flex-col justify-center items-center mb-6 md:mb-0 text-white font-orbitron">
            <h1 className="p-4 text-3xl md:text-5xl text-center">
              What We{" "}
              <GradientText className="text-3xl md:text-5xl">Do</GradientText>
            </h1>
            <p className="p-3 font-light text-sm md:text-base text-center md:text-left md:w-170">
              ACE, founded in 2011 by CSE students, empowers peers with
              cutting-edge tech skills and collaboration opportunities. Our
              flagship event, Ubertech, is a National Level Technical Symposium,
              connecting students nationwide. We also host workshops, seminars,
              and certification drives. Join us to learn, explore, and grow
              together!
            </p>
          </div>

          <div className="rgt md:ml-10 w-full md:w-1/2 text-white font-orbitron font-bold flex flex-col justify-center">
            <StatsGrid />
          </div>
        </div>
      </div>

      <div className="hd mt-20 font-orbitron font-bold text-white text-5xl text-center">
        <h1 className="text-4xl md:text-5xl">
          Minds Behind Our{" "}
          <GradientText className="text-4xl md:text-5xl">Journey</GradientText>
        </h1>
        <p className=" text-xs md:text-sm p-2 font-light">
          "The <GradientText className="text-sm">mind</GradientText> directs the{" "}
          <GradientText className="text-sm">body</GradientText> and determines
          how we perceive our abilities and tackle challenges."
        </p>
      </div>

      <h1 className="mt-30 text-5xl text-white text-center font-orbitron">
        Senior Board of{" "}
        <GradientText className="text-5xl font-medium">Directors</GradientText>
      </h1>

      <div className="SBOD mt-15 flex flex-wrap gap-12 justify-center items-center">
        {seniorBod.map((member, index) => (
          <GlassCard
            key={index}
            image={member.image_url}
            name={member.name}
            designation={member.position}
          />
        ))}
      </div>

      <h1 className="mt-30 text-5xl text-white text-center font-orbitron">
        Junior Board of{" "}
        <GradientText className="text-5xl font-medium">Directors</GradientText>
      </h1>

      <div className="JBOD mt-15 flex flex-wrap gap-12 justify-center items-center">
        {juniorBod.map((member, index) => (
          <GlassCard
            key={index}
            image={member.image_url}
            name={member.name}
            designation={member.position}
          />
        ))}
      </div>

      <h1 className="mt-20 md:mt-30 mb-10 text-5xl text-white text-center font-orbitron">
        Our Team{" "}
        <GradientText className="text-5xl font-medium">Members</GradientText>
      </h1>
      <div id="gallery" className="caro">
        <ImageCarousel images={images} />
      </div>

      <div className="vid mt-10">{/* <VideoPlayer/> */}</div>
    </div>
  );
};

export default Home;
