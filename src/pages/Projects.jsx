import { Link } from "react-router-dom";
import { projects } from "../constants";
import { arrow } from "../assets/icons";
import CTA from "../Components/CTA";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

const Projects = () => {
  const [init, setInit] = useState(false);

  // Initialize the particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const particlesOptions = {
    background: {
      color: {
        value: "#f0f4f8", // Light background color for contrast
      },
    },
    particles: {
      number: {
        value: 200, // Increased particle count
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: "#4a90e2", // Professional blue color for particles
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.6, // Slightly less opaque for subtlety
      },
      size: {
        value: { min: 3, max: 7 }, // Randomized size for variety
        random: true,
      },
      move: {
        enable: true,
        speed: 3, // Adjust speed for smooth movement
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "bounce", // Changed to bounce to keep particles in view
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        attract: {
          distance: 100, // Increased distance for attraction
          duration: 2,
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
  };
  

  return (
    <section className="relative max-container py-10">
      {/* Particle Background */}
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={particlesOptions}
          className="absolute inset-0 -z-10"
        />
      )}

      {/* Project Section Content */}
      <h1 className="text-4xl font-bold text-center mb-5">
        My{" "}
        <span className="text-blue-600 font-semibold drop-shadow-lg">
          Projects
        </span>
      </h1>
      <div className="mt-5 max-w-3xl mx-auto flex flex-col gap-3 text-gray-600 text-lg">
        <p className="text-center">
          I've embarked on numerous projects throughout the years, but these are
          the ones I hold closest to my heart. Many of them are open-source, so
          if you come across something that piques your interest, feel free to
          explore the codebase and contribute your ideas for further
          enhancements. Your collaboration is highly valued!
        </p>
      </div>
      <div className="mt-5 flex flex-col my-20 gap-16">
        {projects.map((project) => (
          <div className="lg:w-[400px] w-full mx-auto" key={project.name}>
            <div className="block-container w-12 h-12">
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img
                  src={project.iconUrl}
                  alt="Project Icon"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
            <div className="mt-3">
              <h4 className="text-2xl font-poppins font-semibold text-gray-800">
                {project.name}
              </h4>
              <p className="mt-2 text-gray-500">{project.description}</p>
              <div className="mt-5 flex items-center gap-2 font-poppins">
                <Link
                  to={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Live Link
                </Link>
                <img
                  src={arrow}
                  alt="arrow"
                  className="w-4 h-4 object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="border-slate-200 my-10" />
      <CTA />
    </section>
  );
};

export default Projects;
