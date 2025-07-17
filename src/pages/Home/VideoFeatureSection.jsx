import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
} from 'react-icons/ri';

const features = [
  {
    name: 'Handpicked Packages',
    description: 'Every tour is reviewed and approved to ensure quality and safety.',
    icon: RiNumber1,
  },
  {
    name: 'Trusted Tour Guides',
    description: 'All our guides are verified and experienced locals.',
    icon: RiNumber2,
  },
  {
    name: 'Real Stories',
    description: 'Read true travel stories to get inspired before your next adventure.',
    icon: RiNumber3,
  },
];

export default function VideoFeatureSection() {
  return (
    <div className="overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold text-emerald-400">
                Why Travel with GIRO?
              </h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                A Smarter Way to Explore
              </p>
              <p className="mt-6 text-lg text-gray-300">
                Discover authentic local experiences, handpicked by real guides. GIRO helps you connect, travel, and grow with ease.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base text-gray-400 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 h-5 w-5 text-emerald-400"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Responsive Video */}
          <div className="w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10">
            <div className="relative w-full pt-[56.25%]"> {/* 16:9 ratio */}
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
                src="https://www.youtube.com/embed/1ZYbU82GVz4?si=_novE3Icg1guvcmF&start=5056&autoplay=1&mute=1&controls=1&rel=0"
                title="GIRO Travel Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
