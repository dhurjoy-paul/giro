import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import LoadingHash from "../../components/shared/LoadingHash";
import Button from "../../components/ui/Button";
import StoryCard from "./StoryCard";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const fetchStories = async () => {
  const res = await axiosPublic.get('/stories/random/4');
  return res.data;
};

const TouristStories = () => {

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['randomStories'],
    queryFn: fetchStories,
  });

  console.log(stories)
  if (isLoading) return <LoadingHash />

  return (
    <section className="w-full py-16 px-4 md:px-10 lg:px-20 bg-transparent text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 font-bricolage-grotesque">
            Tourist Stories
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Real journeys shared by our explorers — dive into experiences from every corner of Bangladesh.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {
            stories.map((story) => <StoryCard key={story._id} story={story} />)
          }
        </div>


        <div className="text-center mt-10">
          <Link to="/community">
            <Button label="Read More Stories" to="/community" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TouristStories;
