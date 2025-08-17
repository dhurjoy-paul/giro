import { motion } from "framer-motion";
import { useState } from "react";
import Marquee from "react-fast-marquee";

// Mock data with categories
const cards = [
  {
    url: "https://res.cloudinary.com/dnxdrwrom/image/upload/v1752848854/boishakh_gd99ss.jpg",
    title: "Boishakhi Utshob",
    category: "Festival",
    id: 1,
  },
  {
    url: "https://res.cloudinary.com/dnxdrwrom/image/upload/v1752848854/durga_z7lkw7.jpg",
    title: "Durga Puja",
    category: "festival",
    id: 2,
  },
  {
    url: "https://res.cloudinary.com/dnxdrwrom/image/upload/v1752848855/colors_tqbnst.jpg",
    title: "Festival Colors",
    category: "Festival",
    id: 3,
  },
  {
    url: "https://res.cloudinary.com/dnxdrwrom/image/upload/v1752848854/pottery_iryzik.jpg",
    title: "Pottery",
    category: "Art",
    id: 4,
  },
  {
    url: "https://res.cloudinary.com/dnxdrwrom/image/upload/v1752848853/joy_yryew2.jpg",
    title: "Joy",
    category: "Happiness",
    id: 5,
  },
  {
    url: "https://res.cloudinary.com/dnxdrwrom/image/upload/v1752848854/lalbagh_aibvcc.jpg",
    title: "Lalbagh",
    category: "Historical",
    id: 6,
  },
  {
    url: "https://res.cloudinary.com/dnxdrwrom/image/upload/v1752848853/pitha_xfxt9t.jpg ",
    title: "Pitha Utshob",
    category: "Cultural",
    id: 7,
  },
];

// Filter options
const categories = ["All", "Festival", "Food", "Art", "Tradition", "Craft"];

const CulturalSnapshots = () => {
  const [selected, setSelected] = useState("All");

  const filteredCards =
    selected === "All"
      ? cards
      : cards.filter((card) => card.category === selected);

  return (
    <section
      id="cultural-snapshots"
      className="w-full bg-transparent py-24 md:py-28"
    >
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold font-bricolage-grotesque mb-2">
          Discover Bangladesh: Nature & Culture Alive
        </h2>
        <p className="text-lg text-muted max-w-5xl mx-auto">
          Explore lush landscapes and vibrant traditions. From rivers to festivals, experience the true heart of Bangladesh in every moment.
        </p>
      </div>

      {/* Filter Buttons */}
      {/* <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-1 rounded-full text-sm font-medium border transition ${
              selected === cat
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-muted border-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div> */}

      {/* Marquee Section */}
      <Marquee
        direction="left"
        speed={80}
        pauseOnHover
        gradient={false}
        className="w-full"
      >
        {filteredCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative mx-4 flex-shrink-0 h-64 w-80 overflow-hidden rounded-2xl shadow-xl group"
          >
            {/* Image with hover brightness */}
            <img
              src={card.url}
              alt={card.title}
              className="h-full w-full object-cover transition duration-500 group-hover:brightness-110"
            />

            {/* Title Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold text-center drop-shadow-md px-2">
                {card.title}
              </h3>
            </div>

            {/* Category Tag */}
            <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              #{card.category}
            </div>
          </motion.div>
        ))}
      </Marquee>
    </section>
  );
};

export default CulturalSnapshots;
