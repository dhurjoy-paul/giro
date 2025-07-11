import { Outlet } from "react-router"
import ScrollToHashElement from "..//utils/ScrollToHashElement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
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
        {/* <div className="min-h-[800vh] bg-text-muted flex justify-center items-center text-text font-bold">
          banner
        </div> */}

        <section className="fixed bottom-4 right-0 -translate-x-1/2 z-500 flex flex-col items-center space-y-2">
          <GoTopBtn />
          <ThemeToggle />
        </section>

        <section className="relative bg-background isolate overflow-hidden">
          <Newsletter />
          <Footer />
          <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
            <div style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }} className="aspect-1155/678 w-288.75 bg-linear-to-tr from-amber-200 to-emerald-200 opacity-30" />
          </div>
        </section>
      </main>
    </ThemeProvider>
  )
}
export default MainLayout