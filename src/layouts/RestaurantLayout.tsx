import { Outlet } from 'react-router-dom'
    import { useAuth } from '../context/AuthContext'
    import { Navigate } from 'react-router-dom'
    import Sidebar from '../components/Sidebar'

    export default function RestaurantLayout() {
      const { currentUser } = useAuth()

      if (!currentUser || currentUser.role !== 'restaurant') {
        return <Navigate to="/" />
      }

      return (
        <div className="min-h-screen bg-gray-100 flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <Outlet />
          </main>
        </div>
      )
    }
