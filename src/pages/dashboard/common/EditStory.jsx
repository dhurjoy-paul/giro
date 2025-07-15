import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { MdHistoryEdu } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import CloudinaryUploader from "../../../components/ui/CloudinaryUploader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditStory = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [existingImages, setExistingImages] = useState([]);

  const notifySuccess = (msg) => toast.success(<ToastSuccess msg={msg} />);
  const notifyFailed = (error, msg) => toast.error(<ToastFailed error={error} msg={msg} />);
  const ToastSuccess = ({ msg }) => (
    <span className="text-lg text-green-600 font-semibold font-bricolage-grotesque leading-6">{msg}</span>
  );
  const ToastFailed = ({ error, msg }) => (
    <div className="font-semibold font-albert-sans">
      <div className="flex gap-3 mb-1">
        <span className="text-lg text-red-600 font-semibold font-bricolage-grotesque leading-6">{msg}</span>
      </div>
      <p>{error}</p>
    </div>
  );

  const { data: story = {}, isLoading, refetch } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (story) {
      setTitle(story.title || "");
      setContent(story.content || "");
      setExistingImages(story.images || []);
    }
  }, [story]);

  const handleStorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/stories/${id}?email=${email}`, {
        $set: { title, content },
      });
      notifySuccess("Story updated successfully");
      refetch();
      navigate("/dashboard/manage-story");
    } catch (err) {
      notifyFailed(err.message, "Failed to update story");
    }
  };

  const handleRemoveImage = async (imageUrl) => {
    try {
      await axiosSecure.patch(`/stories/${id}?email=${email}`, {
        $pull: { images: imageUrl },
      });
      notifySuccess("Image removed");
      setExistingImages((prev) => prev.filter((url) => url !== imageUrl));
    } catch (err) {
      notifyFailed(err.message, "Failed to remove image");
    }
  };

  const handleUploadComplete = async (urls) => {
    if (!urls || urls.length === 0) return;
    try {
      await axiosSecure.patch(`/stories/${id}?email=${email}`, {
        $push: { images: { $each: urls } },
      });
      notifySuccess("Images added");
      setExistingImages((prev) => [...prev, ...urls]);
    } catch (err) {
      notifyFailed(err.message, "Failed to add images");
    }
  };

  return (
    <div className="glass-card w-full max-w-6xl mx-auto flex flex-col justify-center items-center rounded-2xl transition-all duration-300 border border-border px-6 py-16 lg:px-8 mt-2">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold font-bricolage-grotesque tracking-tight text-balance text-text sm:text-5xl">
          Edit Your Experience
        </h2>
        <p className="mt-2 text-lg/8 text-text-muted">
          Update your story content and manage images.
        </p>
      </div>

      <form onSubmit={handleStorySubmit} className="w-full mt-12 sm:mt-16 max-w-xl">
        <div className="flex flex-col gap-6 w-full">

          {/* title */}
          <div className="w-full">
            <label htmlFor="title" className="block text-base font-bricolage-grotesque font-semibold text-text/90">
              Story Title
            </label>
            <div className="mt-2.5">
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete="off"
                className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 -outline-offset-2 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-text"
              />
            </div>
          </div>

          {/* content */}
          <div className="w-full">
            <label htmlFor="content" className="block text-base font-bricolage-grotesque font-semibold text-text/90">
              Story Content
            </label>
            <div className="mt-2.5">
              <textarea
                id="content"
                name="content"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 -outline-offset-2 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-text"
              />
            </div>
          </div>

          {/* images */}
          {existingImages.length > 0 && (
            <div>
              <label className="block text-base font-bricolage-grotesque font-semibold text-text/90 mb-2">
                Existing Images
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {existingImages.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={url}
                      alt={`existing-${idx}`}
                      className="rounded-md w-full h-24 object-cover border"
                    />
                    <button
                      onClick={() => handleRemoveImage(url)}
                      type="button"
                      className="absolute top-1 right-1 bg-white border border-gray-300 rounded-full p-1 text-gray-700 hover:text-red-600 hover:border-red-600 transition"
                    >
                      <FaXmark />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <CloudinaryUploader
            folder="storyImages"
            label="Upload New Images"
            labelClass="text-text/90 font-semibold text-base font-bricolage-grotesque"
            mode="multiple"
            maxFiles={5}
            onUploadComplete={handleUploadComplete}
            accentColor="#00d492"
            dragTextColor="#0d0d0d"
            dragTextColorDark="#b3b3b3"
          />
        </div>

        {/* submit */}
        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 relative z-10 rounded-full shadow-md transition-colors duration-200 bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:outline-white px-5 py-1.5 text-lg font-medium"
          >
            <MdHistoryEdu size={24} />
            Update Story
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default EditStory;
