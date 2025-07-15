import { useQuery } from '@tanstack/react-query';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import LoadingHash from '../../../components/shared/LoadingHash';
import EmptyState from '../../../components/shared/EmptyState';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaFaceSadTear } from "react-icons/fa6";


export default function StoryCards() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;
  const navigate = useNavigate();

  const ToastFailed = ({ error, msg }) => (
    <div className="font-semibold font-albert-sans">
      <div className="flex gap-3 mb-1">
        <span className="text-lg text-red-600 font-bricolage-grotesque">{msg}</span>
      </div>
      <p>{error}</p>
    </div>
  );
  const notifyFailed = (error, msg) => toast.error(<ToastFailed error={error} msg={msg} />);

  const { data: stories = [], isLoading, refetch } = useQuery({
    queryKey: ['stories', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/stories/${id}?email=${email}`);
          if (res.data.deletedCount > 0) { refetch() }
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    } catch (error) {
      notifyFailed(error.message, 'Failed to delete story');
    }
  };

  if (isLoading) return <LoadingHash />;

  return (

    stories.length > 0
      ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="glass-card rounded-xl border border-border shadow bg-white dark:bg-[#0d0d0d] p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-text font-bricolage-grotesque px-1">{story.title}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/dashboard/edit-story/${story._id}`)}
                  className="p-2 rounded-md hover:bg-amber-100 dark:hover:bg-amber-500/10"
                  title="Edit"
                >
                  <HiPencil className="text-amber-500" />
                </button>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-500/10"
                  title="Delete"
                >
                  <HiTrash className="text-red-500" />
                </button>
              </div>
            </div>
            {/* Dates */}
            <div className="flex items-center justify-between text-sm font-semibold font-bricolage-grotesque px-1">
              <p className='text-emerald-400 bg-emerald-400/10 ring-1 ring-emerald-400/20 px-2 py-0.5 rounded-full'>Created: <span className='text-text/90'>{new Date(story.createdAt).toLocaleDateString()}</span></p>
              {story.modified_at && <p className='text-amber-400 bg-amber-400/10 ring-1 ring-amber-400/20 px-2 py-0.5 rounded-full'>Modified: <span className='text-text/90'>{new Date(story.modified_at).toLocaleDateString()}</span></p>}
            </div>

            {/* Images */}
            {story.images?.length > 0 && (
              <div className="grid grid-cols-2 gap-2 px-4">
                {story.images.slice(0, 2).map((url, idx) => (
                  <img key={idx} src={url} alt="story" className="w-full h-24 object-cover rounded" />
                ))}
              </div>
            )}

            {/* Content */}
            <p className="text-text/80 px-1">{story.content.slice(0, 500)}...</p>


          </div>
        ))}
      </div>
      : <EmptyState label="You haven't added a story yet !!! Add one." icon={FaFaceSadTear} />

  );
}
