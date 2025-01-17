import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
    import { RouterProvider, createBrowserRouter } from 'react-router-dom'
    import { AuthProvider } from './context/AuthContext'
    import AdminLayout from './layouts/AdminLayout'
    import RestaurantLayout from './layouts/RestaurantLayout'
    import KitchenLayout from './layouts/KitchenLayout'
    import CustomerLayout from './layouts/CustomerLayout'
    import Login from './pages/Login'
    import Restaurants from './pages/admin/Restaurants'
    import MenuManagement from './pages/restaurant/MenuManagement'
    import OrderManagement from './pages/restaurant/OrderManagement'
    import SalesReports from './pages/restaurant/SalesReports'
    import KitchenDisplay from './pages/kitchen/KitchenDisplay'
    import OrderInterface from './pages/customer/OrderInterface'

    const queryClient = new QueryClient()

    const router = createBrowserRouter([
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            path: 'restaurants',
            element: <Restaurants />
          }
        ]
      },
      {
        path: '/restaurant',
        element: <RestaurantLayout />,
        children: [
          {
            path: 'menu',
            element: <MenuManagement />
          },
          {
            path: 'orders',
            element: <OrderManagement />
          },
          {
            path: 'reports',
            element: <SalesReports />
          }
        ]
      },
      {
        path: '/kitchen',
        element: <KitchenLayout />,
        children: [
          {
            path: 'display',
            element: <KitchenDisplay />
          }
        ]
      },
      {
        path: '/customer',
        element: <CustomerLayout />,
        children: [
          {
            path: 'order',
            element: <OrderInterface />
          }
        ]
      }
    ])

    export default function App() {
      return (
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      )
    }
