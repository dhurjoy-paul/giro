import { FiCalendar, FiMapPin, FiStar } from "react-icons/fi";
import { Link } from "react-router";

const mockDestinations = [
  {
    id: 1,
    name: "Sundarbans",
    slug: "sundarbans",
    image: "https://images.unsplash.com/photo-1589519160732-546c6b5b6f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    region: "Khulna Division",
    description: "The world's largest mangrove forest and home to the Royal Bengal Tiger, a UNESCO World Heritage Site.",
    highlights: ["Wildlife Safari", "Boat Tours", "Bird Watching"],
    bestTime: "Oct-Mar",
    rating: "4.8",
    packageCount: 12
  },
  {
    id: 2,
    name: "Cox's Bazar",
    slug: "coxs-bazar",
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    region: "Chittagong Division",
    description: "World's longest natural sea beach with golden sands and stunning sunsets over the Bay of Bengal.",
    highlights: ["Beach Activities", "Water Sports", "Himchari"],
    bestTime: "Nov-Feb",
    rating: "4.7",
    packageCount: 15
  },
  {
    id: 3,
    name: "Sylhet",
    slug: "sylhet",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    region: "Sylhet Division",
    description: "Land of tea gardens, rolling hills, and spiritual sites with breathtaking natural beauty.",
    highlights: ["Tea Gardens", "Ratargul Swamp", "Jaflong"],
    bestTime: "Year Round",
    rating: "4.6",
    packageCount: 10
  },
  {
    id: 4,
    name: "Bandarban",
    slug: "bandarban",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    region: "Chittagong Hill Tracts",
    description: "Mystical hills, tribal cultures, and panoramic views from Bangladesh's highest peaks.",
    highlights: ["Trekking", "Tribal Villages", "Boga Lake"],
    bestTime: "Oct-Mar",
    rating: "4.9",
    packageCount: 8
  },
  {
    id: 5,
    name: "Dhaka",
    slug: "dhaka",
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    region: "Central Bangladesh",
    description: "Vibrant capital city blending rich history with modern urban life and bustling markets.",
    highlights: ["Historic Sites", "Food Tours", "River Cruises"],
    bestTime: "Oct-Mar",
    rating: "4.4",
    packageCount: 14
  },
  {
    id: 6,
    name: "Rangamati",
    slug: "rangamati",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    region: "Chittagong Hill Tracts",
    description: "Serene lake district with indigenous cultures, hanging bridge, and lush green landscapes.",
    highlights: ["Kaptai Lake", "Hanging Bridge", "Tribal Crafts"],
    bestTime: "Year Round",
    rating: "4.7",
    packageCount: 9
  }
];

const PopularDestinations = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-bricolage-grotesque">
            Popular Destinations
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Discover the most breathtaking locations Bangladesh has to offer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >

              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-sm" />
                    <span className="text-sm font-medium">{destination.region}</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-text font-bricolage-grotesque">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                    <FiStar className="text-amber-500 text-sm" />
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-text-muted mb-4 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights?.slice(0, 3).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                  <div className="flex items-center gap-1">
                    <FiCalendar className="text-sm" />
                    <span>Best: {destination.bestTime}</span>
                  </div>
                  <span>{destination.packageCount}+ packages</span>
                </div>

                <Link
                  to={`/destinations/${destination.slug}`}
                  className="block w-full text-center bg-brand/80 hover:bg-brand text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
                >
                  Explore {destination.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-brand dark:text-emerald-400 font-medium rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-brand/20 dark:border-gray-700"
          >
            View All Destinations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;