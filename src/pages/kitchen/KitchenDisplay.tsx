import { useState, useEffect } from 'react'
    import { useParams } from 'react-router-dom'
    import { Typography } from '@material-tailwind/react'
    import { getOrders } from '../../firebase/firestore'

    export default function KitchenDisplay() {
      const { restaurantId } = useParams()
      const [orders, setOrders] = useState<any[]>([])

      useEffect(() => {
        if (restaurantId) {
          const fetchOrders = async () => {
            const data = await getOrders(restaurantId)
            setOrders(data.filter((order: any) => order.status !== 'completed'))
          }
          fetchOrders()
          const interval = setInterval(fetchOrders, 5000)
          return () => clearInterval(interval)
        }
      }, [restaurantId])

      return (
        <div className="p-8 bg-gray-900 min-h-screen">
          <Typography variant="h2" className="text-white mb-8">
            Kitchen Display
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`p-6 rounded-lg ${
                  order.status === 'pending'
                    ? 'bg-red-500'
                    : order.status === 'in-preparation'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
              >
                <Typography variant="h5" className="text-white">
                  Order #{order.id.slice(0, 6)}
                </Typography>
                <div className="mt-4 space-y-2">
                  {order.products.map((product: any) => (
                    <div key={product.id} className="flex justify-between text-white">
                      <span>{product.name}</span>
                      <span>Qty: {product.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
