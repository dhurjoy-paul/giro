import { useQuery } from "@tanstack/react-query";
import LoadingHash from "../../components/shared/LoadingHash";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TripCard from "./TripCard";

const Trips = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const email = user?.email;

  const { data: packages = [], isLoading, refetch } = useQuery({
    queryKey: ["stories", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packages`);
      return res.data;
    },
    enabled: !!email,
  });

  if (loading || isLoading) return <LoadingHash />;
  refetch();


  return (
    <div className="max-w-[1400px] mx-auto px-8 xs:px-16 sm:px-10 xl:px-12 py-12">
      <div className={`flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:justify-center md:grid md:grid-cols-2 lg:grid-cols-3`}>
        {packages.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>

    </div>
  );
};

export default Trips;
