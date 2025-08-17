import { Tab } from '@headlessui/react'
import { Fragment, useState } from 'react'

const overviewTabs = [
  {
    title: 'Explore Packages',
    description:
      'Discover handpicked travel packages designed by verified local guides to ensure you have the most authentic experience.',
    video: 'https://res.cloudinary.com/dnxdrwrom/video/upload/v1752819216/video-02_qqytyy.mp4',
  },
  {
    title: 'Real Travel Stories',
    description:
      'Read real-life travel stories shared by fellow tourists. Get inspired and start your own journey with GIRO.',
    video: 'https://res.cloudinary.com/dnxdrwrom/video/upload/v1752819226/video-03_ghbv9h.mp4',
  },
  {
    title: 'Meet Our Tour Guides',
    description:
      'Our certified guides are passionate, knowledgeable, and ready to show you hidden gems around the world.',
    video: 'https://res.cloudinary.com/dnxdrwrom/video/upload/v1752819205/video-01_iagfwa.mp4',
  },
]

const VideoSkeleton = () => {
  return (
    <div className="relative w-full aspect-video bg-gray-200 rounded-xl overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>

      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mb-3"></div>
          <span className="text-gray-600 text-sm font-medium">Loading video...</span>
        </div>
      </div>

      {/* Progress bar at the bottom */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-300">
        <div className="h-full w-1/3 bg-emerald-500 animate-progress"></div>
      </div>
    </div>
  )
}

const OverviewSection = () => {
  const [videoStates, setVideoStates] = useState(
    overviewTabs.map(() => ({ isLoading: true }))
  )

  const handleVideoLoadedData = (index) => {
    setVideoStates(prev => {
      const newStates = [...prev]
      newStates[index] = { isLoading: false }
      return newStates
    })
  }

  const handleVideoLoadStart = (index) => {
    setVideoStates(prev => {
      const newStates = [...prev]
      newStates[index] = { isLoading: true }
      return newStates
    })
  }

  return (
    <section className="relative z-0 py-16 sm:py-20 md:py-24 bg-transparent text-text overflow-hidden">
      {/* blob */}
      <div aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl opacity-20 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]"
      >
        <div className="aspect-[1155/678] w-full bg-gradient-to-tr from-amber-200 to-emerald-200"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-bricolage-grotesque">Why Choose GIRO?</h2>
          <p className="mt-3 sm:mt-4 text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Interactive, personalized and inspiring journeys — all in one place.
          </p>
        </div>

        {/* tab layout */}
        <Tab.Group>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <Tab.List className="space-y-3 sm:space-y-4">
              {overviewTabs.map((tab, idx) => (
                <Tab key={idx} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`w-full text-left px-4 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl border transition duration-200 focus:outline-none ${selected
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 shadow-md'
                        : 'border-border bg-bg-light hover:bg-bg-light/50 text-text-muted'
                        }`}
                    >
                      <h3 className="text-lg sm:text-xl font-semibold mb-1 font-bricolage-grotesque">{tab.title}</h3>
                      <p className="text-xs sm:text-sm">{tab.description}</p>
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels className="w-full">
              {overviewTabs.map((tab, idx) => (
                <Tab.Panel key={idx}>
                  <div className="w-full aspect-video overflow-hidden rounded-xl sm:rounded-2xl shadow-xl ring-1 ring-border/20">
                    {videoStates[idx].isLoading && <VideoSkeleton />}

                    <video
                      autoPlay
                      muted
                      playsInline
                      loop
                      className={`w-full h-full object-cover rounded-xl sm:rounded-2xl ${videoStates[idx].isLoading ? 'hidden' : 'block'}`}
                      onLoadedData={() => handleVideoLoadedData(idx)}
                      onLoadStart={() => handleVideoLoadStart(idx)}
                    >
                      <source src={tab.video} type="video/mp4" />
                    </video>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>


      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes progress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          .animate-shimmer {
            animation: shimmer 1.5s infinite;
            background-size: 200% 100%;
          }
          .animate-progress {
            animation: progress 2s infinite;
          }
        `}
      </style>
    </section>
  )
}

export default OverviewSection;