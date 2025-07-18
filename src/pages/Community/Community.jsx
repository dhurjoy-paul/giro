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
      <div className="max-w-7xl mx-auto px-6 py-12 text-text">

        <div>
          <h3 className="font-bricolage-grotesque text-2xl font-semibold mb-6 text-center">Shared all travel stories from GIRO community ({stories?.length})</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {
              stories.map((story) => <StoryCard key={story._id} story={story} />)
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default Community