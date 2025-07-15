import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { FaFaceSadTear } from "react-icons/fa6";
import { MdPendingActions } from "react-icons/md";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApplyGuide = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [cvLink, setCvLink] = useState("");

  const notifySuccess = (msg) => toast.success(<span className="text-green-600 font-semibold">{msg}</span>);
  const notifyFailed = (error, msg) => toast.error(
    <div className="text-red-600 font-semibold">
      {msg}<br />
      <span className="text-sm font-normal">{error}</span>
    </div>
  );

  const { data: existingApplication, refetch } = useQuery({
    queryKey: ["guide-application", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // const existingApplication = { status: "rejected" }
  // const existingApplication = true
  // const existingApplication = false

  const handleApply = async (e) => {
    e.preventDefault();
    if (!title || !reason || !cvLink) {
      return notifyFailed('', "All fields are required.");
    }

    try {
      const res = await axiosSecure.post("/applications", {
        title,
        reason,
        cv_link: cvLink,
        applicant_email: email,
        applicant_name: user?.displayName,
        applicant_image: user?.photoURL,
      });

      if (res.data?.insertedId) {
        notifySuccess("Application submitted successfully!");
        refetch();
      } else if (res.data?.updated) {
        notifySuccess("Re-application submitted successfully!");
        refetch();
      }
    } catch (err) {
      if (err?.response?.status === 409) {
        notifyFailed('', "You have already applied. Please wait for admin review.");
      } else {
        notifyFailed(err.message, "Failed to submit application.");
      }
    }
  };


  const showForm = !existingApplication || existingApplication?.status === 'rejected';

  return (
    <div>
      {/* rejected */}
      {existingApplication?.status === 'rejected' && (
        <div className="bg-red-50/80 dark:bg-red-50/85 border border-red-300 text-red-700 py-3 mb-8 mx-2 rounded-2xl">
          <p className="font-semibold text-lg font-bricolage-grotesque flex items-center justify-center gap-4 px-8">
            <span className="block"><FaFaceSadTear size={24} /></span>
            <span>Your previous application was rejected. You may reapply.</span>
          </p>
        </div>
      )}

      {/* application exists and !rejected */}
      {!showForm && (
        <div className="flex justify-center items-center min-h-[80vh] pb-20">
          <div className="flex w-[80%] flex-col items-center justify-center bg-emerald-50/80 dark:bg-emerald-50/85 border border-emerald-300 text-emerald-700 py-3 mb-8 mx-2 rounded-2xl">
            <p className="font-semibold text-2xl font-bricolage-grotesque flex items-center justify-center gap-4 px-8">
              <span className="block"><MdPendingActions size={24} /></span>
              <span className="text-center">Your application is under review.</span>
            </p>
            <p className="flex items-center justify-around gap-12 text-lg font-medium mt-1">
              <p><span>Application ID:</span> <span className="font-semibold">{existingApplication._id}</span></p>
              <p><span>Status:</span> <span className="capitalize font-semibold">{existingApplication.status}</span></p>
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      {
        showForm && (
          <div className="glass-card max-w-3xl mx-auto px-6 py-16 rounded-2xl border border-border mt-8">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold">Join as Tour Guide</h2>
              <p className="text-text-muted mt-2">Fill out the form to apply as a certified tour guide.</p>
            </div>

            {showForm && (
              <div className="flex flex-col justify-center items-center">
                <form
                  onSubmit={handleApply}
                  className="w-full max-w-xl"
                >
                  <div className="flex flex-col gap-6 w-full">
                    <div className="w-full">
                      <label className="block text-base font-bricolage-grotesque font-semibold text-text/90">
                        Application Title
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-2.5 w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 placeholder:text-gray-400 focus:outline-2 focus:outline-text"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-base font-bricolage-grotesque font-semibold text-text/90">
                        Why do you want to become a tour guide?
                      </label>
                      <textarea
                        rows={6}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-2.5 w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 placeholder:text-gray-400 focus:outline-2 focus:outline-text"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-base font-bricolage-grotesque font-semibold text-text/90">
                        CV / Resume Link
                      </label>
                      <input
                        type="url"
                        value={cvLink}
                        onChange={(e) => setCvLink(e.target.value)}
                        className="mt-2.5 w-full rounded-md bg-input/50 px-3.5 py-2 text-base text-text outline-1 placeholder:text-gray-400 focus:outline-2 focus:outline-text"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-full shadow-md transition-colors duration-200 bg-text text-bg-dark hover:bg-text/90 px-5 py-1.5 text-lg font-medium"
                    >
                      <FaPaperPlane size={20} />
                      Submit Application
                    </motion.button>
                  </div>
                </form>

              </div>
            )}
          </div>
        )
      }
    </div>
  );
};

export default ApplyGuide;