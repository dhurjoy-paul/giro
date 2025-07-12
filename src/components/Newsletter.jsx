import { HiOutlineHandRaised } from "react-icons/hi2";
import { MdHistoryEdu } from "react-icons/md";

export default function NewsletterSection() {
  return (
    <div className="bg-transparent py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2"
          data-aos="fade-up"
        >
          {/* Left */}
          <div className="max-w-xl lg:max-w-lg" data-aos="fade-right" data-aos-delay="200">
            <h2 className="text-4xl font-bricolage-grotesque font-semibold tracking-tight text-text">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Stay informed with curated travel stories, exclusive tour packages, and cultural insights from across Bangladesh — delivered weekly to your inbox.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-bg-light px-3.5 py-2 text-base text-text placeholder:text-text-muted outline-1 -outline-offset-1 outline-text/10 focus:outline-2 focus:-outline-offset-2 focus:outline-brand"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-brand/80 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-brand/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Right */}
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start group" data-aos="fade-up" data-aos-delay="200">
              <div className="rounded-md bg-text/5 p-2 ring-1 ring-text/10 group-hover:bg-brand/8 group-hover:ring-brand/10">
                <MdHistoryEdu className="size-6 text-text group-hover:text-brand" />
              </div>
              <dt className="mt-4 text-base font-semibold text-text">Curated travel stories</dt>
              <dd className="mt-2 text-base/7 text-text-muted">
                Discover breathtaking destinations and stories shared by real tourists and guides.
              </dd>
            </div>
            <div className="flex flex-col items-start group" data-aos="fade-up" data-aos-delay="200">
              <div className="rounded-md bg-text/5 p-2 ring-1 ring-text/10 group-hover:bg-brand/8 group-hover:ring-brand/10">
                <HiOutlineHandRaised className="size-6 text-text group-hover:text-brand" />
              </div>
              <dt className="mt-4 text-base font-semibold text-text">Privacy guaranteed</dt>
              <dd className="mt-2 text-base/7 text-text-muted">
                We’ll never send spam or sell your data. Unsubscribe anytime with a single click.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
