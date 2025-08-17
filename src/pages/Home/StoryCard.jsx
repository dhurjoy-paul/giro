import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaFacebookF, FaShareSquare } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import { FacebookShareButton } from "react-share";
import useAuth from "../../hooks/useAuth";
import LoadingHash from "../../components/shared/LoadingHash";

const StoryCard = ({ story }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (authLoading) return <LoadingHash />;

  const handleShare = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/auth/login", { state: { from: location }, replace: true });
    }
  };

  function formatStoryDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <>
      <div className="bg-transparent rounded-2xl p-4 flex flex-col justify-between group shadow-md hover:shadow-2xl transition-all duration-300">
        <img
          src={story.images?.[0]}
          alt={story.title}
          className="rounded-2xl relative h-44 object-cover w-full mb-3"
        />

        <p className="absolute text-xs text-text border border-text-muted/30 bg-background/70 px-3 py-1 w-fit rounded-full mt-3 ml-2">
          {formatStoryDate(story.createdAt)}
        </p>

        <h3 className="text-lg font-semibold text-foreground group-hover:text-brand">
          {story.title}
        </h3>
        <p className="text-muted text-sm mt-1 line-clamp-3">{story.content}</p>

        <button
          className="text-brand hover:underline mt-2 text-sm font-semibold"
          onClick={() => setIsOpen(true)}
        >
          Read More
        </button>

        <div className="mt-3 flex justify-between items-center">
          <div className="text-sm text-text-muted flex gap-2 items-center font-bricolage-grotesque">
            <img
              src={story.author_image}
              alt={story.author_name}
              className="size-7 border-2 border-text/70 rounded-full group-hover:border-brand object-cover"
            />
            <p className="text-base font-medium">{story.author_name}</p>
          </div>

          {user ? (
            <FacebookShareButton
              url={`https://ph-assignment-12-c3db9.web.app/community`}
              quote={story.title}
              hashtag="#GiroTravel"
              className="flex items-center gap-2"
            >
              <FaShareSquare size={24} title="Share on Facebook" className="group-hover:fill-brand" />
              <p className="p-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
                <FaFacebookF size={26} className="group-hover:scale-90" />
              </p>
            </FacebookShareButton>
          ) : (
            <button
              onClick={() => navigate("/auth/login", { state: { from: { pathname: "/community" } }, replace: true })}
              className="flex items-center gap-2"
            >
              <FaShareSquare size={24} title="Share on Facebook" className="group-hover:fill-brand" />
              <p className="p-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
                <FaFacebookF size={26} className="group-hover:scale-90" />
              </p>
            </button>
          )}

        </div>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-xl font-bold mb-4 text-foreground">
                  {story.title}
                </Dialog.Title>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {story.images?.map((img, idx) => (
                    <img key={idx} src={img} alt={`story-img-${idx}`} className="rounded-lg object-cover" />
                  ))}
                </div>

                <p className="text-muted text-base whitespace-pre-line">{story.content}</p>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default StoryCard;
