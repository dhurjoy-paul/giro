import { Outlet } from "react-router"
import ScrollToHashElement from "..//utils/ScrollToHashElement"
import Announcement from "../components/ui/Announcement"
import GoTopBtn from "../components/ui/GoTopBtn"
import ThemeToggle from "../components/ui/ThemeToggle"
import ThemeProvider from "../contexts/ThemeContext"

const MainLayout = () => {
  return (
    <ThemeProvider>
      <ScrollToHashElement />
      <main>
        <Announcement />
        <Outlet />

        <section className="fixed bottom-4 right-0 -translate-x-1/2 z-500 flex flex-col items-center space-y-2">
          <GoTopBtn />
          <ThemeToggle />
        </section>


      </main>
    </ThemeProvider>
  )
}
export default MainLayout