import { Listbox, Transition } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { GiCheckMark } from "react-icons/gi";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import LoadingHash from '../../../components/shared/LoadingHash';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ITEMS_PER_PAGE = 10;

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const email = user?.email;

  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
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
    queryKey: ['users', search, role, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?search=${search}&role=${role}&page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      return res.data;
    },
    enabled: !!email,
    keepPreviousData: true,
  });

  const visiblePageNumbers = () => {
    const totalPages = Math.ceil(data.total / ITEMS_PER_PAGE);
    if (totalPages <= 5) return [...Array(totalPages).keys()].map(i => i + 1);
    if (page <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (page >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  };

  if (isLoading) return <LoadingHash />;
  refetch()

  return (
    <div className="glass-card w-full max-w-screen-xl mx-auto flex flex-col justify-between items-stretch rounded-2xl border border-border px-2 sm:px-4 py-6 font-bricolage-grotesque mt-6">

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

        <div className="relative w-full max-w-[200px]">
          <Listbox value={role} onChange={(value) => { setRole(value); setPage(1); }}>
            <div className="relative w-full font-bricolage-grotesque">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-background outline-2 -outline-offset-2 outline-gray-400 py-3 pl-10 text-left shadow-sm focus:outline-2 focus:ring-2 focus:ring-text">
                <p className="block truncate capitalize text-lg font-bold">{role || 'All Roles'}</p>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-neutral-800 py-2 px-4 text-base shadow-lg ring-1 ring-text-muted/30 focus:outline-none sm:text-base">
                  {[
                    { label: 'All Roles', value: '' },
                    { label: 'Tourist', value: 'tourist' },
                    { label: 'Tour Guide', value: 'tourGuide' },
                    { label: 'Admin', value: 'admin' },
                  ].map((item) => (
                    <Listbox.Option
                      key={item.value}
                      className={({ active, selected }) =>
                        `relative cursor-pointer select-none px-4 py-2 mt-2 rounded-md ${active ? 'bg-brand/10 text-brand' : 'text-foreground '
                        } ${selected ? 'font-semibold bg-brand/5 text-lg' : ''}`
                      }
                      value={item.value}
                    >
                      {({ selected }) => (
                        <span className="flex items-center justify-between text-lg">
                          {item.label}
                          {selected && (
                            <span className="text-brand font-black">
                              <GiCheckMark />
                            </span>
                          )}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto border border-text-muted/50 rounded-md shadow-sm">
        <table className="min-w-[720px] w-full text-left text-sm sm:text-base">
          <thead className="bg-emerald-100 dark:bg-emerald-900 text-text font-semibold text-lg">
            <tr>
              <th className="py-3 pl-4 text-center">#</th>
              <th className="px-4 py-3 text-center">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Role</th>
              <th className="px-4 py-3 text-center">Last Login</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((user, idx) => (
              <tr key={user._id} className="border-t text-text hover:bg-bg-dark group">
                <td className="py-3 pl-4 text-center">{(page - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                <td className="px-4 py-3 flex justify-center items-center">
                  <img className='group-hover:border-brand group-hover:border-3 size-13 border-2 rounded-full object-cover' src={user.image} alt="user image" />
                </td>
                <td className="px-4 py-3 font-semibold text-nowrap">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize text-center">{user.role}</td>
                <td className="px-4 py-3 text-center">{user.last_loggedIn ? new Date(user.last_loggedIn).toLocaleDateString() : 'Never'}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
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
                  : 'border-border hover:bg-muted'
                  }`}
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
    </div>
  );
};

export default ManageUsers;
