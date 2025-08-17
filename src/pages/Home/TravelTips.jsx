import { useState } from 'react';
import { FiBook, FiHeart, FiMapPin, FiShield, FiSun, FiUmbrella } from 'react-icons/fi';

const TravelTips = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tips', icon: <FiBook className="text-lg" /> },
    { id: 'seasonal', name: 'Seasonal', icon: <FiSun className="text-lg" /> },
    { id: 'cultural', name: 'Cultural', icon: <FiHeart className="text-lg" /> },
    { id: 'safety', name: 'Safety', icon: <FiShield className="text-lg" /> },
    { id: 'packing', name: 'Packing', icon: <FiUmbrella className="text-lg" /> },
  ];

  const tips = [
    {
      id: 1,
      title: "Best Time to Visit Sundarbans",
      category: 'seasonal',
      content: "October to March offers pleasant weather and optimal wildlife sightings",
      icon: <FiSun className="text-2xl text-amber-500" />
    },
    {
      id: 2,
      title: "Respect Local Customs",
      category: 'cultural',
      content: "Dress modestly when visiting religious sites and rural areas",
      icon: <FiHeart className="text-2xl text-rose-500" />
    },
    {
      id: 3,
      title: "Essential Packing List",
      category: 'packing',
      content: "Include lightweight clothing, insect repellent, and a good camera",
      icon: <FiUmbrella className="text-2xl text-blue-500" />
    },
    {
      id: 4,
      title: "Stay Hydrated",
      category: 'safety',
      content: "Drink only bottled or purified water during your travels",
      icon: <FiShield className="text-2xl text-emerald-500" />
    },
    {
      id: 5,
      title: "Explore Off-Season",
      category: 'seasonal',
      content: "Monsoon season offers lush landscapes and fewer crowds",
      icon: <FiMapPin className="text-2xl text-purple-500" />
    },
    {
      id: 6,
      title: "Learn Basic Bengali Phrases",
      category: 'cultural',
      content: "Simple greetings go a long way in connecting with locals",
      icon: <FiHeart className="text-2xl text-rose-500" />
    },
  ];

  const filteredTips = activeCategory === 'all'
    ? tips
    : tips.filter(tip => tip.category === activeCategory);

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-bricolage-grotesque">
            Travel Tips & Insights
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Essential advice to make your Bangladesh journey unforgettable
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <div
              key={tip.id}
              data-aos='fade-in'
              data-aos-delay={tip.id * 50}
              className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-zinc-100 dark:border-zinc-700"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 font-bricolage-grotesque">{tip.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-300">{tip.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelTips;