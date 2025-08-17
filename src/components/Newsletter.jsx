import { HiOutlineHandRaised } from "react-icons/hi2";
import { MdHistoryEdu } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  
  const notifySuccess = () => toast.success(
    <span className='text-lg text-green-600 font-semibold font-bricolage-grotesque'>
      Email subscription successful!!
    </span>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      notifySuccess();
      setEmail("");
    }
  };

  return (
    <section className="bg-transparent py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-text-muted/30 pt-12 sm:pt-16 lg:pt-20">
          <div
            className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2"
            data-aos="fade-up"
          >
            <div className="max-w-xl lg:max-w-lg" data-aos="fade-right" data-aos-delay="100">
              <h2 className="text-3xl sm:text-4xl font-bricolage-grotesque font-semibold tracking-tight text-text">
                Subscribe to our newsletter
              </h2>
              <p className="mt-4 text-base sm:text-lg text-text-muted">
                Stay informed with curated travel stories, exclusive tour packages, and cultural insights from across Bangladesh — delivered weekly to your inbox.
              </p>
              
              <form onSubmit={handleSubmit} className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-auto rounded-md bg-bg-light px-3.5 py-2 text-base text-text placeholder:text-text-muted outline-1 -outline-offset-1 outline-text/10 focus:outline-2 focus:-outline-offset-2 focus:outline-brand"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-brand/80 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-brand/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Subscribe
                </button>
              </form>
            </div>
            
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start group" data-aos="fade-up" data-aos-delay="100">
                <div className="rounded-md bg-text/5 p-2 ring-1 ring-text/10 group-hover:bg-brand/8 group-hover:ring-brand/10">
                  <MdHistoryEdu className="size-6 text-text group-hover:text-brand" />
                </div>
                <div className="mt-4 text-base font-semibold text-text">Curated travel stories</div>
                <div className="mt-2 text-base/7 text-text-muted">
                  Discover breathtaking destinations and stories shared by real tourists and guides.
                </div>
              </div>
              <div className="flex flex-col items-start group" data-aos="fade-up" data-aos-delay="100">
                <div className="rounded-md bg-text/5 p-2 ring-1 ring-text/10 group-hover:bg-brand/8 group-hover:ring-brand/10">
                  <HiOutlineHandRaised className="size-6 text-text group-hover:text-brand" />
                </div>
                <div className="mt-4 text-base font-semibold text-text">Privacy guaranteed</div>
                <div className="mt-2 text-base/7 text-text-muted">
                  We'll never send spam or sell your data. Unsubscribe anytime with a single click.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}