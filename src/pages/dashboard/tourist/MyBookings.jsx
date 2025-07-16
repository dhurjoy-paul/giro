import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import { TbCreditCardPay, TbMoodSad } from 'react-icons/tb';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import EmptyState from '../../../components/shared/EmptyState';
import LoadingHash from '../../../components/shared/LoadingHash';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ITEMS_PER_PAGE = 10;

const MyBookings = () => {
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const { data = { data: [], total: 0 }, isLoading, refetch } = useQuery({
    queryKey: ['myBookings', email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${email}&page=${page}&limit=${ITEMS_PER_PAGE}`);
      return res.data;
    },
    enabled: !!email,
    keepPreviousData: true,
  });

  const handleCancel = async (id) => {
    try {
      await axiosSecure.delete(`/bookings/${id}`);
      notify('Booking cancelled');
      refetch();
    } catch (err) {
      notifyError('Failed to cancel booking');
    }
  };

  const handlePay = (booking) => {
    navigate(`/dashboard/payments/${booking._id}`);
  };

  const visibleBookings = data.data;
  const totalPages = Math.ceil(data.total / ITEMS_PER_PAGE);

  if (isLoading) return <LoadingHash />;

  return visibleBookings.length > 0 ? (
    <div className="glass-card w-full max-w-screen-xl mx-auto rounded-2xl border border-border p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      <div className="overflow-x-auto border border-muted rounded-md shadow-sm">
        <table className="min-w-[720px] w-full text-left text-sm sm:text-base">
          <thead className="bg-emerald-100 dark:bg-emerald-900 text-text font-semibold text-lg">
            <tr>
              <th className="py-3 pl-4 text-center">#</th>
              <th className="px-4 py-3">Package</th>
              <th className="px-4 py-3">Guide</th>
              <th className="px-4 py-3 text-center">Tour Date</th>
              <th className="px-4 py-3 text-center">Price (৳)</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleBookings.map((b, idx) => (
              <tr key={b._id} className="border-t hover:bg-bg-dark">
                <td className="text-center py-3 pl-4">{(page - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                <td className="px-4 py-3 font-semibold text-nowrap">{b.packageName}</td>
                <td className="px-4 py-3 text-nowrap">{b.guideName}</td>
                <td className="px-4 py-3 text-center">{new Date(b.date).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-center">৳ {b.price}</td>
                <td className="px-4 py-3 text-center capitalize">{b.status}</td>
                <td className="px-4 py-3 text-center align-middle">
                  {b.status === 'pending' ? (
                    <div className="flex gap-2 justify-center items-center">
                      <button onClick={() => handlePay(b)} className="group">
                        <div className="flex items-center justify-center gap-2 rounded-md bg-text/5 p-2 ring-1 ring-text/20 group-hover:bg-brand/8 group-hover:ring-brand/20">
                          <TbCreditCardPay className="size-4 text-text group-hover:text-brand" />
                          <p className='text-text capitalize font-bricolage-grotesque font-semibold group-hover:text-brand'>Pay</p>
                        </div>
                      </button>
                      <button onClick={() => handleCancel(b._id)} className="group">
                        <div className="flex items-center justify-center gap-2 rounded-md bg-text/5 p-2 ring-1 ring-text/20 group-hover:bg-red-500/8 group-hover:ring-red-500/20">
                          <HiTrash className="size-5 text-text group-hover:text-red-500" />
                          <p className='text-text capitalize font-bricolage-grotesque font-semibold group-hover:text-red-500'>Cancel</p>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <span className="text-muted-foreground italic">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-muted font-semibold text-foreground">
            {`Page ${page} • Showing ${(page - 1) * ITEMS_PER_PAGE + 1}-${Math.min(
              page * ITEMS_PER_PAGE,
              data.total
            )} of ${data.total} bookings`}
          </span>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end gap-2">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-md border border-border bg-background hover:bg-accent disabled:opacity-40"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1.5 rounded-md border text-sm font-medium ${page === i + 1
                ? 'bg-brand text-white border-brand'
                : 'border-border hover:bg-muted'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-md border border-border bg-background hover:bg-accent disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  ) : (
    <EmptyState label="No bookings found." icon={TbMoodSad} />
  );
};

export default MyBookings;
