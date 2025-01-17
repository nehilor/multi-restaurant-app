import { Link } from 'react-router-dom'
    import { Button } from '@material-tailwind/react'

    export default function Sidebar() {
      return (
        <nav className="w-64 bg-white shadow p-4">
          <div className="space-y-2">
            <Button variant="text" fullWidth className="justify-start">
              <Link to="/restaurant/menu">Menu Management</Link>
            </Button>
            <Button variant="text" fullWidth className="justify-start">
              <Link to="/restaurant/orders">Order Management</Link>
            </Button>
            <Button variant="text" fullWidth className="justify-start">
              <Link to="/restaurant/reports">Sales Reports</Link>
            </Button>
          </div>
        </nav>
      )
    }
