import { Outlet } from 'react-router-dom'
    import { useAuth } from '../context/AuthContext'
    import { Navigate } from 'react-router-dom'

    export default function AdminLayout() {
      const { currentUser } = useAuth()

      if (!currentUser || currentUser.role !== 'admin') {
        return <Navigate to="/" />
      }

      return (
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold">Admin Dashboard</h1>
                </div>
              </div>
            </div>
          </nav>
          <main className="p-8">
            <Outlet />
          </main>
        </div>
      )
    }
