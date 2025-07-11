import { Outlet } from "react-router"
import ScrollToHashElement from "..//utils/ScrollToHashElement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import GoTopBtn from "../components/ui/GoTopBtn"
import ThemeToggle from "../components/ui/ThemeToggle"
import ThemeProvider from "../contexts/ThemeContext"

const MainLayout = () => {
  return (
    <ThemeProvider>
      <ScrollToHashElement />
      <main className="bg-bg-dark">
        <Navbar />
        <Outlet />
        <div className="min-h-[800vh] bg-text-muted flex justify-center items-center text-text font-bold">
          banner
        </div>

        <section className="fixed bottom-4 right-0 -translate-x-1/2 z-500 flex flex-col items-center space-y-2">
          <GoTopBtn />
          <ThemeToggle />
        </section>

        <Footer />
      </main>
    </ThemeProvider>
  )
}
export default MainLayout