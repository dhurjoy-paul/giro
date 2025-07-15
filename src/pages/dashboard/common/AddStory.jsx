import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdHistoryEdu } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import LoadingHash from '../../../components/shared/LoadingHash';
import CloudinaryUploader from '../../../components/ui/CloudinaryUploader';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';

const AddStory = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();
  const { user, loading: authLoading } = useAuth();
  const { email, displayName, photoURL } = user || {}
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

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

  const handleStorySubmit = async (e) => {
    e.preventDefault();

    if (authLoading || isRoleLoading) return <LoadingHash />;

    if (!title || !content || uploadedImages.length === 0) {
      return notifyFailed('', 'Please fill in all fields');
    }

    const storyData = {
      title,
      content,
      images: uploadedImages,
      createdAt: new Date().toISOString(),
      author_name: displayName,
      author_email: email,
      author_role: role,
      author_image: photoURL
    };

    try {
      const res = await axiosSecure.post('/stories', storyData);
      console.log('Story submitted:', res.data);

      setTitle('');
      setContent('');
      setUploadedImages([]);
      notifySuccess('Story added successfully!');
      navigate('/dashboard/manage-story')
    } catch (err) {
      console.error('Error submitting story:', err);
      notifyFailed('', 'Failed to submit story.');
    }
  };

  return (
    <div className="glass-card w-full max-w-6xl mx-auto flex flex-col justify-center items-center rounded-2xl transition-all duration-300 border border-border px-6 py-16 lg:px-8 mt-8">

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold font-bricolage-grotesque tracking-tight text-balance text-text sm:text-5xl">
          Add Your Experience
        </h2>
        <p className="mt-2 text-lg/8 text-text-muted">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>

      <form onSubmit={handleStorySubmit} className="w-full mt-12 sm:mt-16 max-w-xl">
        <div className="flex flex-col gap-6 w-full">

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

          <CloudinaryUploader
            folder="storyImages"
            label="Upload Images"
            labelClass='text-text/90 font-semibold text-base font-bricolage-grotesque'
            mode="multiple"
            maxFiles={5}
            onUploadComplete={setUploadedImages}
            accentColor='#00d492'
            dragTextColor="#0d0d0d"
            dragTextColorDark="#b3b3b3"
          />
        </div>

        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 relative z-10 rounded-full shadow-md transition-colors duration-200 bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:outline-white px-5 py-1.5 text-lg font-medium"
          >
            <MdHistoryEdu size={24} />
            Add Story
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default AddStory;
