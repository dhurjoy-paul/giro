import { Tab } from '@headlessui/react'
import { Fragment } from 'react'

const overviewTabs = [
  {
    title: 'Explore Packages',
    description:
      'Discover handpicked travel packages designed by verified local guides to ensure you have the most authentic experience.',
    video: 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1&rel=0',
  },
  {
    title: 'Real Travel Stories',
    description:
      'Read real-life travel stories shared by fellow tourists. Get inspired and start your own journey with GIRO.',
    video: 'https://www.youtube.com/embed/eKFTSSKCzWA?autoplay=1&mute=1&rel=0',
  },
  {
    title: 'Meet Our Tour Guides',
    description:
      'Our certified guides are passionate, knowledgeable, and ready to show you hidden gems around the world.',
    video: 'https://www.youtube.com/embed/3x0aF54zFvY?autoplay=1&mute=1&rel=0',
  },
]

export default function OverviewSection() {
  return (
    <section className="relative z-0 py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-bg-light dark:bg-bg-dark text-text overflow-hidden">
      {/* Decorative background blob */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl opacity-20"
      >
        <div
          className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-amber-200 to-emerald-200"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Section Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold">Why Choose GIRO?</h2>
        <p className="mt-4 text-text-muted text-lg">
          Interactive, personalized and inspiring journeys — all in one place.
        </p>
      </div>

      {/* Tab-based layout */}
      <Tab.Group>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Tab List */}
          <Tab.List className="space-y-4">
            {overviewTabs.map((tab, idx) => (
              <Tab key={idx} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`w-full text-left px-6 py-5 rounded-2xl border transition duration-200 focus:outline-none ${
                      selected
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 shadow-md'
                        : 'border-border bg-bg-light hover:bg-bg-light/50 text-text-muted'
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-1">{tab.title}</h3>
                    <p className="text-sm">{tab.description}</p>
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>

          {/* Tab Panels */}
          <Tab.Panels className="w-full">
            {overviewTabs.map((tab, idx) => (
              <Tab.Panel key={idx}>
                <div className="w-full aspect-video overflow-hidden rounded-2xl shadow-xl ring-1 ring-border/20">
                  <iframe
                    className="w-full h-full rounded-2xl"
                    src={tab.video}
                    title={tab.title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                  />
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </section>
  )
}
