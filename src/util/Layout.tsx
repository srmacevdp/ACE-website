import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Layout = () => {
  return (
    <div className="relative min-h-screen w-full bg-[url('/bg.jpg')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/44"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow p-3">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
