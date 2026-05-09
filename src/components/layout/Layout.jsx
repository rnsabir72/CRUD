import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-200">
      <Navbar />
      <main className="flex-1 py-10 px-4">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout