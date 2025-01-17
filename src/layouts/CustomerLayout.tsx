import { Outlet } from 'react-router-dom'

    export default function CustomerLayout() {
      return (
        <div className="min-h-screen">
          <Outlet />
        </div>
      )
    }
