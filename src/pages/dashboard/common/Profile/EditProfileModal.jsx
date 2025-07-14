import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import LoadingHash from '../../../../components/shared/LoadingHash';
import CloudinaryUploader from '../../../../components/ui/CloudinaryUploader';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const EditProfileModal = ({ onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading, updateUserProfile } = useAuth();
  const [form, setForm] = useState({ name: user?.displayName || '' });
  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.displayName) {
      setForm({ name: user.displayName });
    }
  }, [user]);

  const notifySuccess = (msg) => {
    toast.success(<ToastSuccess msg={msg} />);
  };
  const notifyFailed = (error, msg) => {
    toast.error(<ToastFailed error={error} msg={msg} />);
  };
  const ToastSuccess = ({ msg }) => (
    <span className="text-lg text-green-600 font-semibold font-bricolage-grotesque leading-6">
      {msg}
    </span>
  );
  const ToastFailed = ({ error, msg }) => (
    <div className="font-semibold font-albert-sans">
      <div className="flex gap-3 mb-1">
        <span className="text-lg text-red-600 font-semibold font-bricolage-grotesque leading-6">
          {msg}
        </span>
      </div>
      <p>{error}</p>
    </div>
  );

  if (authLoading) return <LoadingHash />;

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      notifyFailed('', 'Name cannot be empty');
      return;
    }

    if (!user?.email) {
      notifyFailed('', 'User email not found');
      return;
    }

    const updateData = { name: form.name };
    if (photoURL) updateData.image = photoURL;

    setLoading(true);
    try {
      await updateUserProfile(form.name, photoURL);
      await axiosSecure.patch(`/users/${user.email}`, updateData);
      notifySuccess('Profile updated successfully');
      refetch();
      onClose();
    } catch {
      notifyFailed('', 'Failed to update profile');
    } finally {
      setLoading(false);
      refetch();
    }
  };

  return (
    <Transition appear show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-bg-light dark:bg-bg-dark p-6 text-left align-middle shadow-xl transition-all text-text">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-xl font-bold font-bricolage-grotesque">
                    Edit Profile
                  </Dialog.Title>
                  <button onClick={onClose} className="text-xl">
                    <HiXMark />
                  </button>
                </div>

                <form className="space-y-4" onSubmit={handleUpdate}>
                  <div>
                    <label className="block mb-1 text-sm">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 rounded-md bg-input text-black dark:text-white"
                      required
                    />
                  </div>

                  <CloudinaryUploader
                    folder="tripUsers"
                    label="Upload Profile Picture"
                    mode="single"
                    accentColor="oklch(69.6% 0.17 162.48)"
                    bgColor="bg-white"
                    bgColorDark="dark:bg-[#1a1a1a]"
                    dragTextColor="#0d0d0d"
                    dragTextColorDark="#b3b3b3"
                    onUploadComplete={setPhotoURL}
                  />

                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading || !form.name.trim()}
                      className="bg-brand text-white px-5 py-2 rounded-lg hover:bg-brand-dark font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Updating...' : 'Update'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProfileModal;
