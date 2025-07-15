import ProfileInfo from './ProfileInfo';
import WelcomeBanner from './WelcomeBanner';

const Profile = () => {

  return (
    <div className="w-full mx-auto px-4 sm:px-8 py-10 text-text">
      <WelcomeBanner />
      <ProfileInfo />
    </div>
  );
};

export default Profile;
