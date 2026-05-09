import { useState } from 'react'
import Layout from '../components/layout/Layout'

function Home() {
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState({
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: ''
  })
  const [editId, setEditId] = useState(null)

  const resetForm = () => {
    setForm({
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: ''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.id || !form.firstName || !form.lastName || !form.email) {
      alert('Please fill all required fields')
      return
    }

    if (!editId && employees.some(emp => emp.id === form.id)) {
      alert('Employee ID already exists!')
      return
    }

    if (editId) {
      setEmployees(
        employees.map(emp =>
          emp.id === editId ? { ...form } : emp
        )
      )
      setEditId(null)
    } else {
      setEmployees([...employees, form])
    }

    resetForm()
  }

  const handleEdit = (emp) => {
    setEditId(emp.id)
    setForm(emp)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id))
    }
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ===== HEADER + FORM SECTION ===== */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 border border-gray-200">

          {/* ✅ Project Title & Description */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 tracking-wide">
              EMPLOYEE MANAGEMENT
            </h1>

            <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              This Employee Management System is a simple CRUD application built 
              using React and Tailwind CSS. It allows users to efficiently add, 
              update, and delete employee records with a clean, modern, and 
              responsive interface.
            </p>
          </div>

          {/* ✅ FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Employee ID"
                value={form.id}
                disabled={editId}
                onChange={(e) =>
                  setForm({ ...form, id: e.target.value })
                }
              />

              <Input
                label="First Name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Middle Name (Optional)"
                value={form.middleName}
                onChange={(e) =>
                  setForm({ ...form, middleName: e.target.value })
                }
                optional
              />

              <Input
                label="Last Name"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* ✅ Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 
                text-white py-3 rounded-xl font-semibold shadow-md 
                hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                {editId ? 'Update Employee' : 'Add Employee'}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null)
                    resetForm()
                  }}
                  className="flex-1 bg-gray-200 py-3 rounded-xl 
                  font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
        </div>

        {/* ===== TABLE SECTION ===== */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 border border-gray-200">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            Employee List
          </h2>

          {employees.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No employees added yet.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <th className="p-4">ID</th>
                    <th className="p-4">First Name</th>
                    <th className="p-4">Middle Name</th>
                    <th className="p-4">Last Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((emp, index) => (
                    <tr
                      key={emp.id}
                      className={`transition duration-200 hover:bg-gray-100 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="p-4 font-medium">{emp.id}</td>
                      <td className="p-4">{emp.firstName}</td>
                      <td className="p-4">{emp.middleName || '-'}</td>
                      <td className="p-4">{emp.lastName}</td>
                      <td className="p-4">{emp.email}</td>

                      <td className="p-4 text-center space-x-3">
                        <button
                          onClick={() => handleEdit(emp)}
                          className="px-4 py-1.5 bg-yellow-400 
                          hover:bg-yellow-500 text-black 
                          rounded-lg font-medium shadow-sm transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="px-4 py-1.5 bg-red-500 
                          hover:bg-red-600 text-white 
                          rounded-lg font-medium shadow-sm transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>

      </div>
    </Layout>
  )
}

function Input({ label, type = 'text', value, onChange, disabled, optional }) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        required={!optional}
        className={`w-full px-4 py-2 border rounded-xl shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 
        transition duration-200
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
      />
    </div>
  )
}

export default Home