import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingHash from "../../components/shared/LoadingHash";
import Button from "../../components/ui/Button";
import StoryCard from "./StoryCard";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const fetchStories = async () => {
  const res = await axiosPublic.get('/stories/random/5');
  return res.data;
};

const TouristStories = () => {
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['randomStories'],
    queryFn: fetchStories,
  });

  if (isLoading) return <LoadingHash />;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-transparent text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 font-bricolage-grotesque">
            Tourist Stories
          </h2>
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto">
            Real journeys shared by our explorers — dive into experiences from every corner of Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <Button label="Read More Stories" to="/community" />
        </div>
      </div>
    </section>
  );
};

export default TouristStories;