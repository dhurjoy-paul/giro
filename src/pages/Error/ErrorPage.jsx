import Lottie from "lottie-react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import notFoundAnimation from "../../assets/lottieflow-404-servora.json";
import Navbar from '../../components/Navbar';
import GoTopBtn from "../../components/ui/GoTopBtn";
import ThemeToggle from "../../components/ui/ThemeToggle";
import ThemeProvider from "../../contexts/ThemeContext";

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.error(`Route Error: ${error.status} - ${error.statusText}`);
  } else if (error instanceof Error) {
    console.error(`Unhandled Error: ${error.message}`);
  } else {
    console.error("Unknown error:", error);
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-menu/0 dark:bg-[#07142F] text-text text-center p-4">
        <Navbar />
        <div className="w-full max-w-md">
          <Lottie animationData={notFoundAnimation} loop={true} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-brand hover:bg-brand rounded-lg shadow-md transition"
        >
          Back to Home
        </Link>
        <section className="fixed bottom-4 right-0 -translate-x-1/2 z-500 flex flex-col items-center space-y-2">
          <GoTopBtn />
          <ThemeToggle />
        </section>
      </div>
    </ThemeProvider >
  );
};

export default ErrorPage;
