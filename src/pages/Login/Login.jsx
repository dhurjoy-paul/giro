import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useContext, useEffect, useRef, useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineKey, HiOutlineLogin, HiOutlineMail } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import GoogleLogin from "../../components/GoogleLogin";
import Heading from "../../components/ui/Heading";
import { AuthContext } from "../../contexts/AuthProvider";
import { app } from "../../firebase/firebase.config";
import { saveUserInDb } from "../../utils/saveUserInDb";

const Login = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, [])

  const auth = getAuth(app)
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || '/';
  const emailRef = useRef();

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

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Step 1: Sign in with Firebase Auth
      await signIn(email, password);

      // Step 2. Save user to DB (giving email to set last login)
      await saveUserInDb({ email });

      // Step 3: Request JWT token from backend
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email });
      console.log(data.token, data)

      // Step 4: Save JWT token to localStorage
      if (data?.token) {
        localStorage.setItem("token", data.token);
        notifySuccess("Login successful");
        navigate(from, { replace: true });
      } else {
        throw new Error("JWT token not received from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      notifyFailed(err.message || "Login failed", "Authentication error");
    }
  };

  const handleForgotPwd = async () => {
    const email = emailRef.current?.value?.trim();

    if (!email) {
      notifyFailed("", "Please enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      notifySuccess("Password reset link sent to your email.");
    } catch (error) {
      console.error("Reset email error:", error);

      switch (error.code) {
        case "auth/user-not-found":
          notifyFailed("No account found with this email", "Try again");
          break;
        case "auth/invalid-email":
          notifyFailed("Invalid email address format", "Check and try again");
          break;
        case "auth/too-many-requests":
          notifyFailed("Too many attempts. Try again later", "Reset blocked temporarily");
          break;
        default:
          notifyFailed(error.message, "Failed to send reset email");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="relative w-full max-w-6xl bg-background shadow-2xl rounded-3xl overflow-hidden flex flex-col auth:flex-row">

        {/* Left Image Section */}
        <div data-aos="fade-right"
          className="w-full auth:w-2/5 h-64 auth:h-auto 
                 bg-bg-dark dark:bg-[#1D232A] 
                 bg-[url('/nature-01.jpg')] dark:bg-[url('/nature-01.jpg')] 
                 bg-center bg-cover bg-no-repeat 
                 z-10 rounded-t-3xl auth:rounded-l-3xl auth:rounded-tr-none auth:rounded-br-none"
        />

        {/* Right - Form Section */}
        <div className="auth:w-3/5 bg-background px-4 sm:px-8 md:px-12 xl:px-16 py-8 sm:py-12 z-0" data-aos="fade-left">

          {/* Header */}
          <div className="flex flex-col xs:flex-row justify-between xs:items-center mb-4 text-sm">
            <Heading />
            <div className="space-x-2">
              <span className="text-text text-sm sm:text-base">Don't have an account?</span>
              <Link to="/auth/sign-up" className="text-brand hover:underline hover:underline-offset-4 text-base sm:text-lg font-bold font-bricolage-grotesque">
                Register.
              </Link>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-bricolage-grotesque text-brand mb-1 mt-8 sm:mt-12">Welcome Back!</h2>
          <p className="text-text mb-6 sm:mb-8 text-base md:text-lg">
            Connect with our community.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="text-base sm:text-lg space-y-5">
            <label className="input gap-4 pr-5 validator w-full h-12 rounded-lg bg-bg-light">
              <div className="ml-3 text-[#848f95]"><HiOutlineMail size={24} /></div>
              <input ref={emailRef} type="email" name='email' className="flex-1 bg-transparent focus:outline-none text-black dark:text-[#f4fbff]" placeholder="Enter your email address ..." required />
            </label>

            <label className="input gap-4 pr-5 validator w-full h-12 rounded-lg bg-bg-light text-text">
              <div className="ml-3 text-[#848f95]"><HiOutlineKey size={24} /></div>
              <input type={showPassword ? 'text' : 'password'} name='password' minLength="6"
                className="flex-1 bg-transparent focus:outline-none text-black dark:text-[#f4fbff]" placeholder="Enter your password ..." required />
              <button type='button' className="cursor-pointer text-[#848f95] pr-3"
                onClick={() => setShowPassword(vis => !vis)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword} >
                {showPassword ? <HiOutlineEyeOff size={24} /> : <HiOutlineEye size={24} />}
              </button>
            </label>

            {/* Forgot password */}
            <div className="text-right font-bricolage-grotesque">
              <button type="button" onClick={handleForgotPwd} className="link link-hover underline-offset-4 text-sm sm:text-base">
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button className="w-full flex justify-center items-center gap-2 bg-brand hover:bg-brand/90 text-white rounded-xl py-3 text-base font-medium font-bricolage-grotesque">
              <HiOutlineLogin size={22} />
              LOG IN
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-grow h-px bg-text/30"></div>
            <span className="text-text whitespace-nowrap text-sm sm:text-base">Or Login With</span>
            <div className="flex-grow h-px bg-text/30"></div>
          </div>

          {/* Google Login */}
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
