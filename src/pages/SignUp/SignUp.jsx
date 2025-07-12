import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { HiOutlineMail, HiOutlineUser, HiOutlineUserAdd } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import GoogleLogin from "../../components/GoogleLogin";
import AutoPwd from "../../components/ui/AutoPwd";
import CloudinaryUploader from "../../components/ui/CloudinaryUploader";
import Heading from "../../components/ui/Heading";
import { AuthContext } from "../../contexts/AuthProvider";
import { saveUserInDb } from "../../utils/saveUserInDb";
import validate from "../../utils/validate";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // State
  const [photoURL, setPhotoURL] = useState(null);
  const [pwd, setPwd] = useState('');
  const [errors, setErrors] = useState([]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  // Toast components
  const notifySuccess = (msg) => toast.success(<ToastSuccess msg={msg} />);
  const notifyFailed = (error, msg) => toast.error(<ToastFailed error={error} msg={msg} />);
  const ToastSuccess = ({ msg }) => (
    <span className='text-lg text-green-600 font-semibold font-bricolage-grotesque leading-6'>{msg}</span>
  );
  const ToastFailed = ({ error, msg }) => (
    <div className='font-semibold font-albert-sans'>
      <div className='flex gap-3 mb-1'>
        <span className='text-lg text-red-600 font-semibold font-bricolage-grotesque leading-6'>{msg}</span>
      </div>
      <p>{error}</p>
    </div>
  );

  const handlePassChange = (e) => {
    const value = e.target.value;
    setPwd(value);
    setErrors(validate(value));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // Step 1: Create Firebase user
      const { user } = await createUser(email, password);

      // Step 2: Update Firebase user profile
      await updateUserProfile(name, photoURL);

      // Step 3: Save user to database
      const userData = {
        name,
        email,
        image: photoURL,
        uid: user.uid
      };
      await saveUserInDb(userData);

      // Step 4: Get JWT token from backend
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email });

      // Step 5: Save token to localStorage
      if (data?.token) {
        localStorage.setItem("token", data.token);
        notifySuccess("Account created successfully!");
        navigate(from, { replace: true });
      } else {
        throw new Error("JWT token not received");
      }

    } catch (err) {
      console.error("Sign-up error:", err);
      if (err?.response?.data?.message === "Email already in use") {
        notifyFailed(err.message, "Email already registered");
      } else {
        notifyFailed(err.message || "Something went wrong", "Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="relative w-full max-w-6xl bg-background shadow-2xl rounded-3xl overflow-hidden flex flex-col auth:flex-row">

        {/* Left - Form */}
        <div className="auth:w-3/5 bg-background px-4 sm:px-8 md:px-12 xl:px-16 py-8 sm:py-12 z-0" data-aos="fade-right">

          {/* Header */}
          <div className="flex flex-col xs:flex-row justify-between xs:items-center mb-4 text-sm">
            <Heading />
            <div className="space-x-2">
              <span className="text-text text-sm sm:text-base">Already have an account?</span>
              <Link to="/auth/login" className="text-brand hover:underline hover:underline-offset-4 text-base sm:text-lg font-bold font-bricolage-grotesque">
                Log In.
              </Link>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-bricolage-grotesque text-brand mb-1 mt-8 sm:mt-12">Create an Account</h2>
          <p className="text-text mb-6 sm:mb-8 text-lg md:text-xl">Join our community and explore.</p>

          {/* Form */}
          <form onSubmit={handleRegister} className="text-base sm:text-lg">

            {/* Cloudinary Image Upload */}
            <CloudinaryUploader
              folder="tripUsers"
              label="Upload Profile Picture"
              mode="single"
              accentColor="oklch(69.6% 0.17 162.48)"
              bgColor="bg-white"
              bgColorDark="dark:bg-[#1a1a1a]"
              dragTextColor="#0d0d0d"
              dragTextColorDark="#b3b3b3"
              onUploadComplete={(url) => {
                setPhotoURL(url);
                notifySuccess('image Uploaded')
              }}
            />

            {/* Name */}
            <>
              <label className="input gap-4 pr-5 validator w-full h-12 rounded-lg bg-bg-light mt-4">
                <div className="ml-3 text-[#848f95]"><HiOutlineUser size={24} /></div>
                <input type="text" name='name' className="flex-1 bg-transparent focus:outline-none text-black dark:text-[#f4fbff]" placeholder="Enter your name ..." required />
              </label>
              <p className="validator-hint hidden text-red-500 text-sm">❌ Enter your name</p>
            </>

            {/* Email */}
            <>
              <label className="input gap-4 pr-5 validator w-full h-12 rounded-lg bg-bg-light mt-4">
                <div className="ml-3 text-[#848f95]"><HiOutlineMail size={24} /></div>
                <input type="email" name='email' className="flex-1 bg-transparent focus:outline-none text-black dark:text-[#f4fbff]" placeholder="Enter your email address ..." required />
              </label>
              <p className="validator-hint hidden text-red-500 text-sm">❌ Enter valid email address</p>
            </>

            {/* Password */}
            <AutoPwd onChange={handlePassChange} value={pwd} errors={errors} pwd={pwd} />

            {/* Submit Button */}
            <button disabled={!photoURL}
              className={`w-full flex justify-center items-center gap-2 rounded-xl py-3 text-base font-medium font-bricolage-grotesque ${photoURL ? "bg-brand hover:bg-brand/90 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}>
              <HiOutlineUserAdd size={22} />
              SIGN UP
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-grow h-px bg-text/30"></div>
            <span className="text-text whitespace-nowrap text-sm sm:text-base">Or Register With</span>
            <div className="flex-grow h-px bg-text/30"></div>
          </div>

          {/* Google Signup */}
          <GoogleLogin />
        </div>

        {/* Right - Image */}
        <div data-aos="fade-left"
          className="w-full auth:w-2/5 h-64 auth:h-auto 
             bg-bg-dark dark:bg-[#1D232A] 
             bg-[url('/nature-02.jpg')] dark:bg-[url('/nature-02.jpg')] 
             bg-center bg-cover bg-no-repeat 
             z-10 rounded-t-3xl auth:rounded-l-3xl auth:rounded-tr-none auth:rounded-br-none"
        />
      </div>
    </div>
  );
};

export default SignUp;
