import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingHash from "../../components/shared/LoadingHash";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TripCard from "./TripCard";

const Trips = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const email = user?.email;

  // State for sorting
  const [sortField, setSortField] = useState('createdAt'); // 'createdAt' or 'price'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  const { data: packages = [], isLoading, refetch } = useQuery({
    queryKey: ["packages", email, sortField, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packages?field=${sortField}&order=${sortOrder}`);
      return res.data;
    }
  });

  const handleFieldChange = (e) => {
    const value = e.target.value;
    setSortField(value);
    // Reset order to desc when switching to createdAt
    if (value === 'createdAt') {
      setSortOrder('desc');
    }
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (loading || isLoading) return <LoadingHash />;

  return (
    <>
      <div className="h-20 bg-text dark:bg-bg-dark" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h3 className="font-bricolage-grotesque text-3xl font-semibold text-center md:text-left mb-4 md:mb-0">
            All trips are planned for you ({packages?.length})
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Sort By Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-text-muted font-medium whitespace-nowrap">Sort by:</span>
              <select
                value={sortField}
                onChange={handleFieldChange}
                className="bg-bg-light dark:bg-gray-800 border border-border dark:border-gray-700 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
              >
                <option value="createdAt">Latest</option>
                <option value="price">Price</option>
              </select>
            </div>

            {/* Order Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-text-muted font-medium whitespace-nowrap">Order:</span>
              <select
                value={sortOrder}
                onChange={handleOrderChange}
                disabled={sortField === 'createdAt'}
                className={`bg-bg-light dark:bg-gray-800 border border-border dark:border-gray-700 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-brand/50 ${sortField === 'createdAt' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>

        {/* Empty State */}
        {packages.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-text mb-2">No trips found</h3>
            <p className="text-text-muted">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Trips;