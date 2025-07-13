import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import GoogleLogin from "../../components/GoogleLogin";
import AutoEmail from "../../components/ui/AutoEmail";
import AutoName from "../../components/ui/AutoName";
import AutoPwd from "../../components/ui/AutoPwd";
import CloudinaryUploader from "../../components/ui/CloudinaryUploader";
import Heading from "../../components/ui/Heading";
import { AuthContext } from "../../contexts/AuthProvider";
import { saveUserInDb } from "../../utils/saveUserInDb";
import { validateEmail, validateName, validatePassword } from "../../utils/validate";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [form, setForm] = useState({ name: "", email: "", pwd: "" });
  const [photoURL, setPhotoURL] = useState(null);
  const [nameErrors, setNameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [pwdErrors, setPwdErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  // Toast Components
  const notifySuccess = (msg) => toast.success(<ToastSuccess msg={msg} />);
  const notifyFailed = (error, msg) =>
    toast.error(<ToastFailed error={error} msg={msg} />);
  const ToastSuccess = ({ msg }) => (
    <span className="text-lg text-green-600 font-semibold font-bricolage-grotesque leading-6">
      {msg}
    </span>
  );
  const ToastFailed = ({ error, msg }) => (
    <div className="font-semibold font-albert-sans">
      <div className="flex gap-3 mb-1">
        <span className="text-lg text-red-600 font-semibold font-bricolage-grotesque leading-6">
          {msg}
        </span>
      </div>
      <p>{error}</p>
    </div>
  );

  // Field Change Handlers
  const handleNameChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, name: value }));
    setNameErrors(validateName(value));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, email: value }));
    setEmailErrors(validateEmail(value));
  };

  const handlePwdChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, pwd: value }));
    setPwdErrors(validatePassword(value));
  };

  // Submit Handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentNameErrors = validateName(form.name);
    const currentEmailErrors = validateEmail(form.email);
    const currentPwdErrors = validatePassword(form.pwd);

    setNameErrors(currentNameErrors);
    setEmailErrors(currentEmailErrors);
    setPwdErrors(currentPwdErrors);

    if (
      currentNameErrors.length > 0 ||
      currentEmailErrors.length > 0 ||
      currentPwdErrors.length > 0 ||
      !photoURL
    ) {
      notifyFailed("Please fix the validation errors before submitting.", "Validation Failed");
      setIsSubmitting(false);
      return;
    }

    try {
      const { user } = await createUser(form.email, form.pwd);
      await updateUserProfile(form.name, photoURL);

      const userData = {
        name: form.name,
        email: form.email,
        image: photoURL,
        uid: user.uid,
      };

      await saveUserInDb(userData);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: form.email }
      );

      if (data?.token) {
        localStorage.setItem("token", data.token);
        notifySuccess("Account created successfully!");
        navigate(from, { replace: true });
      } else {
        throw new Error("JWT token not received");
      }
    } catch (err) {
      console.error("Sign-up error:", err);
      notifyFailed(err?.message || "Something went wrong", "Registration Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    isSubmitting ||
    !photoURL ||
    nameErrors.length > 0 ||
    emailErrors.length > 0 ||
    pwdErrors.length > 0

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="relative w-full max-w-6xl bg-background shadow-2xl rounded-3xl overflow-hidden flex flex-col auth:flex-row">

        {/* Left: Form */}
        <div
          className="auth:w-3/5 bg-background px-4 sm:px-8 md:px-12 xl:px-16 py-8 sm:py-12 z-0"
          data-aos="fade-right"
        >
          {/* Header */}
          <div className="flex flex-col xs:flex-row justify-between xs:items-center mb-4 text-sm">
            <Heading />
            <div className="space-x-2">
              <span className="text-text text-sm sm:text-base">
                Already have an account?
              </span>
              <Link
                to="/auth/login"
                className="text-brand hover:underline hover:underline-offset-4 text-base sm:text-lg font-bold font-bricolage-grotesque"
              >
                Log In.
              </Link>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-bricolage-grotesque text-brand mb-1 mt-8 sm:mt-12">
            Create an Account
          </h2>
          <p className="text-text mb-6 sm:mb-8 text-lg md:text-xl">
            Join our community and explore.
          </p>

          {/* Form */}
          <form onSubmit={handleRegister} className="text-base sm:text-lg">
            {/* Profile Image */}
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
                notifySuccess("Image uploaded");
              }}
            />

            {/* Name */}
            <AutoName
              onChange={handleNameChange}
              value={form.name}
              errors={nameErrors}
              name={form.name}
            />

            {/* Email */}
            <AutoEmail
              onChange={handleEmailChange}
              value={form.email}
              errors={emailErrors}
              email={form.email}
            />

            {/* Password */}
            <AutoPwd
              onChange={handlePwdChange}
              value={form.pwd}
              errors={pwdErrors}
              pwd={form.pwd}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`w-full flex justify-center mt-7 items-center gap-2 rounded-xl py-3 text-base font-medium font-bricolage-grotesque ${isSubmitDisabled
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-brand hover:bg-brand/90 text-white"
                }`}
            >
              <HiOutlineUserAdd size={22} />
              {isSubmitting ? "Processing..." : "SIGN UP"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-grow h-px bg-text/30" />
            <span className="text-text whitespace-nowrap text-sm sm:text-base">
              Or Register With
            </span>
            <div className="flex-grow h-px bg-text/30" />
          </div>

          {/* Google Signup */}
          <GoogleLogin />
        </div>

        {/* Right: Image */}
        <div
          data-aos="fade-left"
          className="w-full auth:w-2/5 h-64 auth:h-auto bg-bg-dark dark:bg-[#1D232A] bg-[url('/nature-02.jpg')] dark:bg-[url('/nature-02.jpg')] bg-center bg-cover bg-no-repeat z-10 rounded-t-3xl auth:rounded-l-3xl auth:rounded-tr-none auth:rounded-br-none"
        />
      </div>
    </div>
  );
};

export default SignUp;
