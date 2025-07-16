import { Dialog } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FaCheck, FaTimes } from "react-icons/fa"
import { TbMoodSad } from 'react-icons/tb'
import { toast } from 'react-toastify'
import EmptyState from '../../../components/shared/EmptyState'
import LoadingHash from '../../../components/shared/LoadingHash'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { HiTrash } from 'react-icons/hi';

const ITEMS_PER_PAGE = 10

const AssignedTour = () => {
  const { user } = useAuth()
  const email = user?.email
  const axiosSecure = useAxiosSecure()
  const [page, setPage] = useState(1)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [targetBook, setTargetBook] = useState(null)

  const { data = { data: [], total: 0 }, isLoading, refetch } = useQuery({
    queryKey: ['assignedTours', email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assigned-tours?email=${email}&page=${page}&limit=${ITEMS_PER_PAGE}`)
      return res.data
    },
    enabled: !!email,
    keepPreviousData: true,
  })

  const handleStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/assigned-tours/${id}`, { status })
      toast.success(`Booking ${status}`)
      refetch()
      setConfirmOpen(false)
    } catch (err) {
      toast.error('Update failed')
    }
  }

  const openConfirm = (booking) => {
    setTargetBook(booking)
    setConfirmOpen(true)
  }

  if (isLoading) return <LoadingHash />

  const tours = data.data
  const totalPages = Math.ceil(data.total / ITEMS_PER_PAGE)

  return tours.length > 0 ? (
    <div className="glass-card w-full max-w-screen-xl mx-auto rounded-2xl border border-border p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">My Assigned Tours</h2>

      <div className="overflow-x-auto border border-muted rounded-md shadow-sm">
        <table className="min-w-[720px] w-full text-left text-sm sm:text-base">
          <thead className="bg-emerald-100 dark:bg-emerald-900 text-text font-semibold text-lg">
            <tr>
              <th className="py-3 pl-4 text-center">#</th>
              <th className="px-4 py-3">Package</th>
              <th className="px-4 py-3">Tourist</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center text-nowrap">Price (৳)</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((b, idx) => (
              <tr key={b._id} className="border-t hover:bg-bg-dark">
                <td className="text-center py-3 pl-4">{(page - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                <td className="px-4 py-3 font-semibold text-nowrap">{b.packageName}</td>
                <td className="px-4 py-3 text-nowrap">{b.touristName}</td>
                <td className="px-4 py-3 text-center">{new Date(b.date).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-center">৳ {b.price}</td>
                <td className="px-4 py-3 text-center capitalize text-nowrap">{b.status}</td>
                <td className="px-4 py-3 text-center">
                  {b.status === 'in-review' ? (
                      <div className="flex gap-2 justify-center items-center">
                        <button onClick={() => handleStatus(b._id, 'accepted')} className="group">
                          <div className="flex items-center justify-center gap-2 rounded-md bg-text/5 p-2 ring-1 ring-text/20 group-hover:bg-brand/8 group-hover:ring-brand/20">
                            <FaCheck className="size-4 text-text group-hover:text-brand" />
                            <p className='text-text capitalize font-bricolage-grotesque font-semibold group-hover:text-brand'>Accept</p>
                          </div>
                        </button>
                        <button onClick={() => openConfirm(b)} className="group">
                          <div className="flex items-center justify-center gap-2 rounded-md bg-text/5 p-2 ring-1 ring-text/20 group-hover:bg-red-500/8 group-hover:ring-red-500/20">
                            <HiTrash className="size-5 text-text group-hover:text-red-500" />
                            <p className='text-text capitalize font-bricolage-grotesque font-semibold group-hover:text-red-500'>Reject</p>
                          </div>
                        </button>
                      </div>                 
                  ) : (
                    <span className="italic text-muted-foreground">No actions</span>
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

      {/* Rejection Confirmation Modal */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <Dialog.Title className="text-xl font-semibold mb-4">Confirm Rejection</Dialog.Title>
            <p className="mb-6">Are you sure you want to reject this tour for <strong>{targetBook?.touristName}</strong>?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmOpen(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button
                onClick={() => handleStatus(targetBook._id, 'rejected')}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Confirm Reject
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  ) : (
    <EmptyState label="No assigned tours." icon={TbMoodSad} />
  )
}

export default AssignedTour
