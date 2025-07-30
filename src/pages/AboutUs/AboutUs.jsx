import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaFacebookSquare, FaGithub, FaNodeJs, FaReact } from "react-icons/fa";
import { SiCss3, SiDaisyui, SiExpress, SiFirebase, SiHeadlessui, SiHtml5, SiJavascript, SiMongodb, SiTailwindcss } from "react-icons/si";


const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const projects = [
    {
      title: "Tourism Management System (GIRO)",
      description: "A full-featured tourism booking web app built with the MERN stack and Firebase.",
      live: "https://ph-assignment-12-c3db9.web.app",
      image: "/giro.png",
      tech: ["React", "Tailwind", "Firebase", "MongoDB", "JWT", "Express"],
    },
    {
      title: "Service Sharing Platform (Servora)",
      description: "A platform to share and book custom services, with authentication.",
      live: false,
      image: "/servora.png",
      tech: ["React", "Express", "JWT", "MongoDB"],
      working: true
    },
    {
      title: "A massive recipe collection (Recipea)",
      description: "This site helps people to find recipes, add recipes also can save as bookmark favorite recipes",
      live: "https://ph-assignment-10-33664.web.app",
      image: "/recipea.png",
      tech: ["React", "Express", "JWT", "MongoDB", "Firebase"],
    },
    {
      title: "Online Payment Site (Payra)",
      description: "A platform to pay utility bills such education, electricity etc.",
      live: "https://ph-assignment-09-fedf7.web.app",
      image: "/payra.png",
      tech: ["React", "Tailwind", "Firebase"],
    },
    {
      title: "Online Doctor Appointment Booking System (Phudu)",
      description: "A platform that helps to book appointment of doctors and get information about doctors.",
      live: "https://dpn-ph-assign-08.surge.sh",
      image: "/phudu.png",
      tech: ["React", "Tailwind", "DaisyUI"],
    },
    {
      title: "Online Bid System (Auction Gallery)",
      description: "From this anyone can bid on products, can place favorite",
      live: "https://dpn-ph-assign-07.surge.sh",
      image: "/auctionGallery.png",
      tech: ["React", "Tailwind", "DaisyUI"],
    },

  ];

  return (
    <>
      <div className="h-20 bg-text dark:bg-bg-dark" />
      <div className="max-w-7xl mx-auto px-4 py-10 text-foreground pt-32">
        {/* Dev Info */}
        <div className="glass-card px-10 pl-16 py-16 w-fit mx-auto flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://res.cloudinary.com/dnxdrwrom/image/upload/v1752841595/IMG_20241214_091952709_HDR_PORTRAIT_kiimmv.jpg"
            alt="Developer"
            className="w-40 h-40 rounded-full block border-4 border-brand object-cover shadow-lg"
          />
          <div className="w-fit space-y-5 ml-4">
            <h2 className="text-3xl font-bold text-center md:text-left">Hi, I’m <span className="font-bricolage-grotesque">DHURJOY PAUL</span></h2>
            <p className="mt-2 text-muted max-w-xl text-center md:text-left">
              A developer focused on MERN and Firebase-powered web apps. I love building smooth UIs, scalable APIs, and creating rich user experiences.
            </p>

            <div className="mt-4 flex gap-4 w-fit mx-auto md:mx-0">
              <a href="https://github.com/dhurjoy-paul" target="_blank" rel="noreferrer">
                <FaGithub size={28} className="hover:text-brand" />
              </a>
              <a href="https://www.facebook.com/dhurjoy.dev" target="_blank" rel="noreferrer">
                <FaFacebookSquare size={28} className="hover:text-brand" />
              </a>
            </div>
          </div>

        </div>

        {/* Skills */}
        <div className="mt-24">
          <h3 className="text-3xl font-semibold mb-12 font-bricolage-grotesque text-center">Tech Stacks</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 text-center text-xl">
            <SiMongodb className="text-6xl text-green-600" title="MongoDB" />
            <SiExpress className="text-6xl text-text-muted/80" title="Express.js" />
            <FaNodeJs className="text-6xl text-green-500" title="Node.js" />
            <FaReact className="text-6xl text-sky-400" title="React.js" />
            <SiTailwindcss className="text-6xl text-cyan-400" title="Tailwind CSS" />
            <SiFirebase className="text-6xl text-yellow-500" title="Firebase" />
            <FaGithub className="text-6xl text-muted" title="GitHub" />
            <SiJavascript className="text-6xl text-yellow-400" title="JavaScript" />
            <SiHtml5 className="text-6xl text-orange-600" title="HTML5" />
            <SiCss3 className="text-6xl text-blue-600" title="CSS3" />
            <SiDaisyui className="text-6xl text-pink-500" title="DaisyUI" />
            <SiHeadlessui className="text-6xl text-purple-500" title="Headless UI" />
          </div>
        </div>

        {/* Projects */}
        {/* Projects */}
        <div className="mt-24">
          <h3 className="text-3xl font-semibold mb-12 font-bricolage-grotesque text-center">Featured Projects</h3>
          <div className="grid gap-10 sm:grid-cols-2">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-background/90 rounded-2xl shadow-lg glass-card border-muted hover:shadow-xl overflow-hidden"
              >
                <div className="w-full h-48 bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-4">
                  <h4 className="text-2xl font-bold text-brand">{project.title}</h4>
                  <p className="text-sm text-muted">{project.description}</p>

                  <div className="flex flex-wrap gap-2 text-sm">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-brand/10 text-brand border border-brand px-2 py-0.5 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-base bg-brand/40 text-white hover:bg-brand/80 rounded-full"
                      >
                        Live Site
                      </a>
                    )}
                    {
                      project.working && (
                        <h1 className="bg-brand/20 text-white px-4 py-2 rounded-full font-bricolage-grotesque">Working on it</h1>
                      )
                    }

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Featured Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-background border border-muted rounded-2xl p-5 shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-bold text-brand">{project.title}</h4>
                <p className="mt-2 text-sm text-muted">Tech used: {project.tech.join(", ")}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 px-4 py-1 bg-brand text-white rounded-full hover:bg-brand/80 text-sm transition"
                >
                  Visit Project
                </a>
              </motion.div>
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default AboutUs;
