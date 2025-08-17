import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingHash from "../../components/shared/LoadingHash";
import StoryCard from "../Home/StoryCard";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const fetchGuides = async () => {
  const res = await axiosPublic.get('/all-stories');
  return res.data;
};

const Community = () => {
  const { data: stories = [], isLoading: loadingStories } = useQuery({
    queryKey: ['randomPackages'],
    queryFn: fetchGuides,
  });

  if (loadingStories) return <LoadingHash />

  return (
    <>
      <div className="h-20 bg-text dark:bg-bg-dark" />
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bricolage-grotesque font-semibold mb-4">
              Shared all travel stories from GIRO community ({stories?.length})
            </h2>
            <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
              Discover authentic travel experiences shared by our community members from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>

          {/* Empty State */}
          {stories.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-text mb-2">No stories found</h3>
              <p className="text-text-muted">Be the first to share your travel experience!</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Community