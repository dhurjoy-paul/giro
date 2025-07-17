import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { MdTravelExplore } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoadingHash from "../../components/shared/LoadingHash";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";

const TripDetails = () => {
  const [role, isRoleLoading] = useRole();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGuideId, setSelectedGuideId] = useState("");
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

  const {
    data: pkg,
    isLoading: loadingPkg,
  } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packages/${id}`);
      return res.data;
    },
  });

  const {
    data: guides = [],
    isLoading: loadingGuides,
  } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/guides");
      return res.data;
    },
  });

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user || !role) return navigate("/auth/login");
    if (role === "tourGuide") return notifyFailed("You are Tour-Guide you can't book", "You can't book tours");
    if (role === "admin") return notifyFailed("You are Admin you can't book", "You can't book tours");

    const selectedGuide = guides.find((g) => g._id === selectedGuideId);

    const booking = {
      packageId: id,
      packageName: pkg.title,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      price: pkg.price,
      date: selectedDate,
      guideName: selectedGuide?.name || "",
      guideEmail: selectedGuide?.email || "",
      status: "pending",
    };

    try {
      await axiosSecure.post("/bookings", booking);
      Swal.fire({
        icon: "success",
        title: "Confirm your Booking",
        html: '<a class="text-emerald-600 font-medium underline" href="/dashboard/my-bookings">Go to My Bookings</a>',
        confirmButtonText: "Okay",
      });
    } catch (err) {
      toast.error("Failed to book package");
    }
  };


  if (isRoleLoading || loadingPkg || loadingGuides || !pkg) return <LoadingHash />;

  return (
    <>
      <div className="h-20 bg-text dark:bg-bg-dark" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pt-27 font-bricolage-grotesque">

        {/* gallery */}
        <section>
          <div className="grid grid-cols-8 grid-rows-2 gap-3">
            {pkg.images.slice(0, 6).map((img, index) => {
              const gridStyles = [
                "col-span-3 row-span-2",
                "col-span-3 row-span-1",
                "col-span-3 row-span-1",
                "col-span-2 row-span-2",
                "col-span-2 row-span-1",
                "col-span-2 row-span-1",
              ];

              return (
                <img
                  key={index}
                  src={img}
                  alt={`Trip ${index}`}
                  className={`object-cover w-full h-full rounded-xl ${gridStyles[index % gridStyles.length]}`}
                />
              );
            })}
          </div>
        </section>

        {/* section */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-text">{pkg.title}</h2>
          <p className="text-lg text-text-muted leading-relaxed">{pkg.description}</p>
        </section>

        {/* Tour Plan */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text">Tour Plan</h2>
          <div className="space-y-2">
            {pkg.tourPlan.map((plan, idx) => (
              <div
                key={idx}
                className="collapse collapse-plus bg-bg-light border border-background"
              >
                <input
                  type="radio"
                  name="tour-plan-accordion"
                  defaultChecked={idx === 0}
                />
                <div className="collapse-title font-semibold text-text">
                  Day {plan.day}: {plan.title}
                </div>
                <div className="collapse-content text-sm text-text-muted">
                  <p>{plan.activities}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tour Guides */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text">Tour Guides</h2>
          <div className="flex flex-wrap gap-4">
            {guides.map((guide) => (
              <div key={guide._id}
                onClick={() => navigate(`/tour-guide/${guide.email}`)}
                className="cursor-pointer flex flex-col items-center justify-center bg-bg-light border border-border p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="size-16 rounded-full object-cover"
                />
                <p className="mt-2 font-medium text-text">{guide.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form */}
        <section className="glass-card p-8 space-y-6 mb-2 mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-text text-center mb-16 font-bricolage-grotesque">
            Book "{pkg.title}"
          </h2>

          <form onSubmit={handleBooking} className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 font-bricolage-grotesque">

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-base font-semibold text-text/90 mb-1">Package Title</label>
              <input
                type="text"
                value={pkg.title}
                readOnly
                className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 outline-gray-300 focus:outline-2 focus:outline-text"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-text/90 mb-1">Your Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 outline-gray-300 focus:outline-2 focus:outline-text"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-text/90 mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 outline-gray-300 focus:outline-2 focus:outline-text"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-text/90 mb-1">Profile Photo URL</label>
              <input
                type="text"
                value={user?.photoURL || ""}
                readOnly
                className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 outline-gray-300 focus:outline-2 focus:outline-text"
              />
            </div>


            <div>
              <label className="block text-base font-semibold text-text/90 mb-1">Price (৳)</label>
              <input
                type="text"
                value={pkg.price}
                readOnly
                className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 outline-gray-300 focus:outline-2 focus:outline-text"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-text/90 mb-1">Tour Date</label>
              <input
                type="date"
                value={selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 outline-gray-300 focus:outline-2 focus:outline-text"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-text/90 mb-1">Select Guide</label>
              <select
                value={selectedGuideId}
                onChange={(e) => setSelectedGuideId(e.target.value)}
                required
                className="w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 outline-gray-300 focus:outline-2 focus:outline-text"
              >
                <option value="">Choose a guide</option>
                {guides.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.name}
                  </option>
                ))}
              </select>

            </div>

            <div className="col-span-1 sm:col-span-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 relative z-10 rounded-full shadow-md transition-colors duration-200 bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:outline-white px-5 py-2 text-lg font-medium"
              >
                <MdTravelExplore size={24} />
                Book Now
              </motion.button>
            </div>
          </form>
        </section>

      </div>
    </>
  );
};

export default TripDetails;
