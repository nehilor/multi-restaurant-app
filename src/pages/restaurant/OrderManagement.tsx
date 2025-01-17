import { useState, useEffect } from 'react'
    import { useParams } from 'react-router-dom'
    import { Button, Card, Typography } from '@material-tailwind/react'
    import { getOrders, updateOrderStatus } from '../../firebase/firestore'
    import { useAuth } from '../../context/AuthContext'

    export default function OrderManagement() {
      const { restaurantId } = useParams()
      const { currentUser } = useAuth()
      const [orders, setOrders] = useState<any[]>([])

      useEffect(() => {
        if (restaurantId) {
          const fetchOrders = async () => {
            const data = await getOrders(restaurantId)
            setOrders(data)
          }
          fetchOrders()
        }
      }, [restaurantId])

      const handleUpdateStatus = async (orderId: string, status: string) => {
        if (!restaurantId) return
        await updateOrderStatus(restaurantId, orderId, status)
        const updatedOrders = await getOrders(restaurantId)
        setOrders(updatedOrders)
      }

      return (
        <div className="space-y-6">
          <Typography variant="h2" className="mb-4">
            Order Management
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="p-6">
                <Typography variant="h5">Order #{order.id.slice(0, 6)}</Typography>
                <Typography variant="small" className="mt-2">
                  Status: {order.status}
                </Typography>
                <div className="mt-4 space-y-2">
                  {order.products.map((product: any) => (
                    <div key={product.id} className="flex justify-between">
                      <span>{product.name}</span>
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleUpdateStatus(order.id, 'in-preparation')}
                    disabled={order.status !== 'pending'}
                  >
                    Start Preparation
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleUpdateStatus(order.id, 'completed')}
                    disabled={order.status !== 'in-preparation'}
                  >
                    Mark as Completed
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    }
