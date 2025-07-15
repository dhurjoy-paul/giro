import { motion } from "framer-motion";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { MdTravelExplore } from "react-icons/md";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CloudinaryUploader from "../../../components/ui/CloudinaryUploader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddPackages = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [tourType, setTourType] = useState("Adventure");
  const [price, setPrice] = useState("");
  const [tourPlan, setTourPlan] = useState([{ day: 1, title: "", activities: "" }]);
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");

  const notifySuccess = (msg) =>
    toast.success(<span className="text-lg text-green-600 font-semibold">{msg}</span>);
  const notifyFailed = (err, msg) =>
    toast.error(
      <div>
        <p className="font-semibold text-red-600">{msg}</p>
        <p>{err}</p>
      </div>
    );

  const handleUploadComplete = (urls) => {
    setImages((prev) => [...prev, ...urls]);
  };

  const handleRemoveImage = (url) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  const addTourDay = () => {
    setTourPlan((prev) => [...prev, { day: prev.length + 1, title: "", activities: "" }]);
  };

  const updateTourDay = (idx, field, value) => {
    setTourPlan((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const handlePackageSubmit = async (e) => {
    e.preventDefault();

    const newPackage = {
      title,
      description,
      images,
      tourType,
      price: parseInt(price),
      tourPlan,
      location,
      duration: parseInt(duration),
      creator_email: user?.email,
      createdAt: new Date().toISOString(),

    };

    try {
      await axiosSecure.post("/packages", newPackage);
      notifySuccess("Package added successfully");
      navigate("/dashboard/manage-packages");
    } catch (err) {
      notifyFailed(err.message, "Failed to add package");
    }
  };

  return (
    <div className="glass-card w-full max-w-6xl mx-auto flex flex-col justify-center items-center rounded-2xl transition-all duration-300 border border-border px-6 py-16 lg:px-8 mt-2">

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold font-bricolage-grotesque tracking-tight text-balance text-text sm:text-5xl">
          Create Tour Package
        </h2>
        <p className="mt-2 text-lg/8 text-text-muted">
          Share the details of your exciting tour experience.
        </p>
      </div>

      <form onSubmit={handlePackageSubmit} className="w-full mt-12 sm:mt-16 max-w-3xl space-y-6">
        {/* Title */}
        <div>
          <label className="block text-base font-bricolage-grotesque font-semibold text-text/90 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 -outline-offset-2 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-text"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-base font-bricolage-grotesque font-semibold text-text/90 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 -outline-offset-2 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-text"
            required
          />
        </div>

        {/* Tour Type */}
        <div>
          <label className="block text-base font-bricolage-grotesque font-semibold text-text/90 mb-1">
            Tour Type
          </label>
          <select
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
            className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 -outline-offset-2 outline-gray-300 focus:outline-2 focus:outline-offset-2 focus:outline-text"
          >
            <option>Adventure</option>
            <option>Cultural</option>
            <option>Relaxation</option>
            <option>Historical</option>
            <option>Others</option>
          </select>
        </div>

        {/* Price & Duration */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-base font-bricolage-grotesque font-semibold text-text/90 mb-1">
              Price (৳)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 -outline-offset-2 outline-gray-300 focus:outline-2 focus:outline-offset-2 focus:outline-text"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-base font-bricolage-grotesque font-semibold text-text/90 mb-1">
              Duration (days)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 -outline-offset-2 outline-gray-300 focus:outline-2 focus:outline-offset-2 focus:outline-text"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-base font-bricolage-grotesque font-semibold text-text/90 mb-1">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 -outline-offset-2 outline-gray-300 focus:outline-2 focus:outline-offset-2 focus:outline-text"
            required
          />
        </div>

        {/* Tour Plan */}
        <div>
          <label className="block text-base font-bricolage-grotesque font-semibold text-text/90 mb-2">
            Tour Plan
          </label>
          <div className="space-y-4 border-2 p-3 rounded-xl border-text-muted">
            {tourPlan.map((plan, idx) => (
              <div key={idx} className="flex flex-col justify-between gap-4">
                <div className="flex items-center gap-6 pr-0.5">
                  <span className="text-nowrap w-fit bg-emerald-400/10 border border-emerald-400/20 px-4 py-2 rounded-xl font-bold text-emerald-400">
                    Day {idx + 1}
                  </span>
                  <input
                    type="text"
                    placeholder="Title"
                    value={plan.title}
                    onChange={(e) => updateTourDay(idx, "title", e.target.value)}
                    className="w-[100%] rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 -outline-offset-2 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-text"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Activities"
                  value={plan.activities}
                  onChange={(e) => updateTourDay(idx, "activities", e.target.value)}
                  className="w-full min-h-[8vh] rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 -outline-offset-2 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-text"
                  required
                />
                <hr className="my-4 border-emerald-500/50 border-dashed border-2" />

              </div>
            ))}
            <button type="button" onClick={addTourDay} className="text-brand font-semibold text-sm">
              + Add Day
            </button>
          </div>
        </div>

        {/* Images */}
        <div>
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-4">
              {images.map((url, i) => (
                <div key={i} className="relative group">
                  <img
                    src={url}
                    alt={`img-${i}`}
                    className="w-full h-24 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(url)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 border hover:text-red-600"
                  >
                    <FaXmark />
                  </button>
                </div>
              ))}
            </div>
          )}
          <CloudinaryUploader
            folder="tourPackages"
            label="Upload Images"
            mode="multiple"
            maxFiles={5}
            onUploadComplete={handleUploadComplete}
            labelClass="text-text/90 font-semibold text-base font-bricolage-grotesque"
            accentColor="#00d492"
            dragTextColor="#0d0d0d"
            dragTextColorDark="#b3b3b3"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full flex items-center justify-center gap-2 relative z-10 rounded-full shadow-md transition-colors duration-200 bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:outline-white px-5 py-1.5 text-lg font-medium"
        >
          <MdTravelExplore size={24} />
          Submit Package
        </motion.button>
      </form>
    </div>
  );
};

export default AddPackages;
