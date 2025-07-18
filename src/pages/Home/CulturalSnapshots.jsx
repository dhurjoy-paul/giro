import { motion } from "framer-motion";
import { useState } from "react";
import Marquee from "react-fast-marquee";

// Mock data with categories
const cards = [
  {
    url: "https://i.ibb.co/XZCw1CWF/img01.jpg",
    title: "Traditional Dance",
    category: "Festival",
    id: 1,
  },
  {
    url: "https://i.ibb.co/ycqGz9BT/img02.jpg",
    title: "Local Cuisine",
    category: "Food",
    id: 2,
  },
  {
    url: "https://i.ibb.co/rKyy2GSS/img03.jpg",
    title: "Festival Colors",
    category: "Festival",
    id: 3,
  },
  {
    url: "https://i.ibb.co/whHYynqT/img04.jpg",
    title: "Historical Art",
    category: "Art",
    id: 4,
  },
  {
    url: "https://i.ibb.co/C3897NN7/img05.jpg",
    title: "Street Performers",
    category: "Tradition",
    id: 5,
  },
  {
    url: "https://i.ibb.co/mrN6vMxr/img06.jpg",
    title: "Handicrafts",
    category: "Craft",
    id: 6,
  },
  {
    url: "https://i.ibb.co/wNWPd1Ck/img07.jpg",
    title: "Cultural Parade",
    category: "Festival",
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
      className="w-full bg-transparent py-24 md:py-28 px-4 md:px-10 lg:px-20"
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
