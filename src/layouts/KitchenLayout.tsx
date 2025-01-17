import { Outlet } from 'react-router-dom'
    import { useAuth } from '../context/AuthContext'
    import { Navigate } from 'react-router-dom'

    export default function KitchenLayout() {
      const { currentUser } = useAuth()

      if (!currentUser || currentUser.role !== 'kitchen') {
        return <Navigate to="/" />
      }

      return (
        <div className="min-h-screen">
          <Outlet />
        </div>
      )
    }
