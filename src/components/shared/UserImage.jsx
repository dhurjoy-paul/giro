import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingHash from './LoadingHash';

const UserImage = ({ isAtTop = false, size = "sm", dashboard = false }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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

  const hasPhoto = image;

  const initials = name
    ? name.split(" ").map(part => part[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  const avatarSizeClass = size === "lg" ? "size-11 text-xl" : "size-9 text-sm";
  const imageSizeClass = size === "lg" ? "w-11 h-11" : "w-full h-full";
  const roundClass = dashboard ? "rounded-xl border-2 border-text-muted" : "rounded-full";

  const initialsClass = clsx({
    'bg-[#0d0d0d] text-white dark:bg-white dark:text-black': dashboard,
    'bg-black text-white': !dashboard && isAtTop,
    'bg-white text-black dark:bg-[#0d0d0d] dark:text-white': !dashboard && !isAtTop,
  });

  const avatarWrapperClass = clsx(
    'flex items-center justify-center font-semibold overflow-hidden',
    avatarSizeClass,
    roundClass,
    !hasPhoto && initialsClass
  );

  return (
    <span className={avatarWrapperClass}>
      {user ? (
        hasPhoto ? (
          <img
            src={image}
            alt={name || 'User'}
            className={clsx(imageSizeClass, 'object-cover', roundClass, 'animate-fade-in')}
          />
        ) : (
          <p className="w-full h-full flex items-center justify-center">{initials}</p>
        )
      ) : (
        <img
          src="/default-avatar.png"
          alt="Default Avatar"
          className={clsx(imageSizeClass, 'object-cover', roundClass, 'animate-fade-in')}
        />
      )}
    </span>
  );
};

export default UserImage;
