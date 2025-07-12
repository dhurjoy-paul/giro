import { Outlet } from "react-router";
import GoTopBtn from "../components/ui/GoTopBtn";
import ThemeToggle from "../components/ui/ThemeToggle";
import ThemeProvider from "../contexts/ThemeContext";

const AuthLayout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg-dark dark:bg-[#1D232A] bg-[url('/pattern.png')] dark:bg-[url('/pattern.png')]">
        <Outlet />
        <section className="fixed bottom-4 right-0 -translate-x-1/2 z-[500] flex flex-col items-center space-y-2">
          <GoTopBtn />
          <ThemeToggle />
        </section>
      </div>
    </ThemeProvider>
  );
};

export default AuthLayout;
