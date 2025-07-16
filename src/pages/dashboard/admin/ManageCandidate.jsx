import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaFileCircleCheck } from "react-icons/fa6";
import { HiTrash } from "react-icons/hi";
import { TbMoodSpark } from "react-icons/tb";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import EmptyState from '../../../components/shared/EmptyState';
import LoadingHash from '../../../components/shared/LoadingHash';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ITEMS_PER_PAGE = 10;

const ManageCandidate = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const email = user?.email;

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const notifySuccess = (msg) => toast.success(<ToastSuccess msg={msg} />);
  const notifyFailed = (error, msg) => toast.error(<ToastFailed error={error} msg={msg} />);

  const ToastSuccess = ({ msg }) => (
    <span className="text-lg text-green-600 font-semibold font-bricolage-grotesque leading-6">{msg}</span>
  );
  const ToastFailed = ({ error, msg }) => (
    <div className="font-semibold font-albert-sans">
      <div className="flex gap-3 mb-1">
        <span className="text-lg text-red-600 font-semibold font-bricolage-grotesque leading-6">{msg}</span>
      </div>
      <p>{error}</p>
    </div>
  );

  const { data = { data: [], total: 0 }, isLoading, refetch } = useQuery({
    queryKey: ['guideApplications', search, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?search=${search}&status=pending&page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      return res.data;
    },
    enabled: !!email,
    keepPreviousData: true,
  });

  const handleAccept = async (applicationId) => {
    try {
      await axiosSecure.patch(`/applications/${applicationId}`, { status: 'accepted' });
      notifySuccess('User accepted as tour guide');
      refetch();
    } catch (err) {
      notifyFailed(err?.message, 'Failed to accept');
    }
  };

  const handleReject = async (applicationId) => {
    try {
      // await axiosSecure.patch(`/applications/${applicationId}`, { status: 'rejected' });
      await axiosSecure.delete(`/applications/${applicationId}`);
      notifySuccess('Application rejected');
      refetch();
    } catch (err) {
      notifyFailed(err?.message, 'Failed to reject');
    }
  };

  const visiblePageNumbers = () => {
    const totalPages = Math.ceil(data.total / ITEMS_PER_PAGE);
    if (totalPages <= 5) return [...Array(totalPages).keys()].map(i => i + 1);
    if (page <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (page >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  };

  if (isLoading) return <LoadingHash />;
  console.log(data.data.length)

  return (

    (data.data.length > 0)
      ? (<div className="glass-card w-full max-w-screen-xl mx-auto flex flex-col justify-between items-stretch rounded-2xl border border-border px-2 sm:px-4 py-6 font-bricolage-grotesque mt-6">

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 px-1">
          <input
            autoFocus
            type="text"
            placeholder="Search by name or email"
            className="bg-background pl-6 pr-2 py-3 rounded-lg border-2 border-text-muted/50 outline-2 -outline-offset-2 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-text w-full max-w-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="overflow-x-auto border border-text-muted/50 rounded-md shadow-sm">
          <table className="min-w-[720px] w-full text-left text-sm sm:text-base">
            <thead className="bg-emerald-100 dark:bg-emerald-900 text-text font-semibold text-lg">
              <tr>
                <th className="py-3 pl-4 text-center">#</th>
                <th className="px-4 py-3 text-center">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 text-center">Role</th>
                <th className="px-4 py-3 text-center">Applied On</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((application, idx) => (
                <tr key={application._id} className="border-t text-text hover:bg-bg-dark ">
                  <td className="py-3 pl-4 text-center">{(page - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                  <td className="px-4 py-3 flex justify-center items-center">
                    <img className='size-13 border-2 rounded-full object-cover' src={application.applicant_image} alt="Applicant image" />
                  </td>
                  <td className="px-4 py-3 font-semibold text-nowrap">{application.applicant_name}</td>
                  <td className="px-4 py-3">{application.applicant_email}</td>
                  <td className="px-4 py-3 capitalize text-center">Tourist</td>
                  <td className="px-4 py-3 text-center">{application.applied_at ? new Date(application.applied_at).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-8 py-2 align-middle">
                    <div className="flex gap-2 justify-center items-center">
                      {/* <button onClick={() => navigate('/dashboard')} className="group">
                        <div className="flex items-center justify-center gap-2 rounded-md bg-text/5 p-2 ring-1 ring-text/10 group-hover:bg-amber-400/8 group-hover:ring-amber-400/20">
                          <HiEye className="size-5 text-text group-hover:text-amber-400" />
                          <p className='text-text capitalize font-bricolage-grotesque font-semibold group-hover:text-amber-400'>view</p>
                        </div>
                      </button> */}
                      <button onClick={() => handleAccept(application._id)} className="group">
                        <div className="flex items-center justify-center gap-2 rounded-md bg-text/5 p-2 ring-1 ring-text/20 group-hover:bg-brand/8 group-hover:ring-brand/20">
                          <FaFileCircleCheck className="size-4 text-text group-hover:text-brand" />
                          <p className='text-text capitalize font-bricolage-grotesque font-semibold group-hover:text-brand'>Accept</p>
                        </div>
                      </button>
                      <button onClick={() => handleReject(application._id)} className="group">
                        <div className="flex items-center justify-center gap-2 rounded-md bg-text/5 p-2 ring-1 ring-text/20 group-hover:bg-red-500/8 group-hover:ring-red-500/20">
                          <HiTrash className="size-5 text-text group-hover:text-red-500" />
                          <p className='text-text capitalize font-bricolage-grotesque font-semibold group-hover:text-red-500'>Reject</p>
                        </div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-muted font-semibold text-foreground">
              {`Page ${page} • Showing ${(page - 1) * ITEMS_PER_PAGE + 1}-${Math.min(
                page * ITEMS_PER_PAGE,
                data.total
              )} of ${data.total} users`}
            </span>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-md border border-border bg-background text-sm hover:bg-accent disabled:opacity-40 transition"
            >
              Previous
            </button>
            {visiblePageNumbers().map((p, i) =>
              p === '...' ? (
                <span key={i} className="px-2 py-1.5 text-sm text-muted">...</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 rounded-md border text-sm transition font-medium ${page === p
                    ? 'bg-brand text-white border-brand'
                    : 'border-border hover:bg-muted'}`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, Math.ceil(data.total / ITEMS_PER_PAGE)))}
              disabled={page === Math.ceil(data.total / ITEMS_PER_PAGE)}
              className="px-3 py-1.5 rounded-md border border-border bg-background text-sm hover:bg-accent disabled:opacity-40 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>)
      : (<EmptyState label="No application for check. Chill !!!" icon={TbMoodSpark} />)
  );
};

export default ManageCandidate;