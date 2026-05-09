function Navbar() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Employee Management
        </h1>
        <span className="text-white text-sm opacity-90">
          CRUD System
        </span>
      </div>
    </header>
  )
}

export default Navbar