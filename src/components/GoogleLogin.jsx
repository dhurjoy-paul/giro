import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { saveUserInDb } from "../utils/saveUserInDb";

const GoogleLogin = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const notifySuccess = () => toast.success(<ToastSuccess />);
  const notifyFailed = (error, msg) => toast.error(<ToastFailed error={error} msg={msg} />);
  const ToastSuccess = () => (
    <span className='text-lg text-green-600 font-semibold font-poppins'>Login successful</span>
  );
  const ToastFailed = ({ error, msg }) => (
    <div className='font-semibold font-albert-sans'>
      <div className='flex gap-3 mb-1'>
        <span className='text-lg text-red-600 font-semibold font-bricolage-grotesque leading-6'>{msg}</span>
      </div>
      <p>{error}</p>
    </div>
  )

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
        uid: result?.user?.uid
      };

      // 1. Save user to DB
      await saveUserInDb(userData);

      // 2. Get JWT token from your backend
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email: result?.user?.email,
      });

      // 3. Save token to localStorage
      if (data?.token) {
        localStorage.setItem("token", data.token);
        notifySuccess("Google signup successful");
        navigate(from, { replace: true });
      } else {
        throw new Error("JWT token not received from server");
      }

    } catch (err) {
      console.error("Google Sign-In Error:", err);
      notifyFailed(err.message, "Google Signup failed");
    }
  };

  return (
    <button onClick={handleGoogleSignIn} className="w-full flex justify-center items-center-safe gap-2 bg-zinc-100 dark:bg-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-100 border border-gray-500 rounded-xl py-3 text-black font-medium font-funnel-display">
      <FcGoogle size={22} /> Login with Google
    </button>
  )
}
export default GoogleLogin