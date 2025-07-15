import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { HiIdentification, HiOutlineMail } from 'react-icons/hi';
import { HiOutlineClipboard, HiPencil } from 'react-icons/hi2';
import { LuBadgePlus } from "react-icons/lu";
import LoadingHash from '../../../../components/shared/LoadingHash';
import Button from '../../../../components/ui/Button';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import EditProfileModal from './EditProfileModal';


const ProfileInfo = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState('');

  const { data: userData = {}, isLoading, refetch } = useQuery({
    queryKey: ['userData', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  const { name, email, role, image, uid } = userData || {};

  if (isLoading) return <LoadingHash />;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const actionBtnClass =
    "inline-flex items-center gap-2 text-sm font-medium text-white bg-brand px-4 py-2 rounded-md shadow-md hover:scale-105 hover:brightness-110 transition-all duration-200";

  return (
    <section className="w-fit mx-auto px-4 sm:px-8 py-8 flex justify-center">
      <div className="glass-card w-full max-w-6xl rounded-2xl p-6 sm:p-12 md:p-18 lg:p-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all duration-300 border border-border relative overflow-hidden">


        {/* Left Column */}
        <div className="flex flex-col items-center text-center md:text-left relative">
          <div className="relative group">
            <img
              src={image || '/default-avatar.png'}
              alt="Profile"
              className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-transparent group-hover:border-green-400 transition duration-300 shadow-md"
            />
            {/* Green Ping Dot */}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-bg-dark rounded-full animate-ping" />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-bg-dark rounded-full" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-text font-bricolage-grotesque">{name}</h2>
          <p className="uppercase text-text-muted font-medium">{role}</p>
        </div>

        {/* Right Column */}
        <div className="flex-1 w-full space-y-6">
          {/* UID */}
          <div className="relative">
            <div className="flex items-center justify-between bg-input px-4 py-3 rounded-md border border-dashed border-text-muted/50">
              <div className="flex items-center gap-2 text-text">
                <HiIdentification size={18} />
                <span className="text-base tracking-wider break-all">UID: {uid}</span>
              </div>
              <button onClick={() => handleCopy(uid, 'uid')}>
                <HiOutlineClipboard className="ml-1.5 text-text-muted hover:text-text transition" />
              </button>
            </div>
            {copied === 'uid' && (
              <span className="absolute -bottom-5 right-0 text-xs text-green-500 font-medium">Copied!</span>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <div className="flex items-center justify-between bg-input px-4 py-3 rounded-md border border-dashed border-text-muted/50">
              <div className="flex items-center gap-2 text-text">
                <HiOutlineMail size={18} />
                <span className="text-base tracking-wider break-all">Email: {email}</span>
              </div>
              <button onClick={() => handleCopy(email, 'email')}>
                <HiOutlineClipboard className="text-text-muted hover:text-text transition" />
              </button>
            </div>
            {copied === 'email' && (
              <span className="absolute -bottom-5 right-0 text-xs text-green-500 font-medium">Copied!</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <Button label="Edit Profile" onClick={() => setIsModalOpen(true)} icon={<HiPencil size={24} />} />

            {
              role === 'tourist'
              && <Button to='/dashboard/apply-guide' invert={true} label="Become a Tour Guide" icon={<LuBadgePlus size={24} />} />
            }

          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditProfileModal
          refetch={refetch}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default ProfileInfo;
