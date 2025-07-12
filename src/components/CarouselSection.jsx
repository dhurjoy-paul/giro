import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";

// Load images dynamically
const images = Array.from({ length: 9 }, (_, i) =>
  new URL(`../assets/bg-0${i + 1}.jpg`, import.meta.url).href
);

const CarouselSection = () => {
  return (
    <div className="relative">
      {/* Carousel */}
      <Carousel
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        interval={2600}
        transitionTime={900}
      >
        {images.map((src, i) => (
          <div key={i}>
            <img src={src} alt={`Slide ${i + 1} image`} className="object-cover h-[80vh] w-full" />
          </div>
        ))}
      </Carousel>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Center Text */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56"
          data-aos="fade-up"
        >
          <div className="hidden sm:mb-8 sm:flex sm:justify-center" data-aos="zoom-in" data-aos-delay="200">
            <div className="relative rounded-full px-3 py-1 text-sm bg-zinc-900/20 text-white ring-1 ring-white/70 hover:ring-white/60">
              New feature: Tour Guides are now accepting booking requests online!
              {' '}
              <Link to="/learn-more" className="font-semibold text-emerald-300">
                <span aria-hidden="true" className="absolute inset-0" />
                Learn more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1
              className="text-5xl font-semibold font-bricolage-grotesque tracking-tight text-balance text-white sm:text-7xl"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Explore Bangladesh like Never Before
            </h1>
            <p
              className="mt-8 text-lg font-medium text-pretty text-white/90 sm:text-xl/8"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              Your journey starts here — from Sundarbans to Sylhet,
              <br /> we guide your way.
            </p>
            <div
              className="mt-10 flex items-center justify-center gap-x-6"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <Link to="/community"
                className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs bg-brand/90 hover:bg-brand/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Start Your Journey
              </Link>
              <Link to="/trips" className="text-sm/6 font-semibold text-white hover:text-brand">
                Discover Packages<span aria-hidden="true"> →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSection;
