import { useState, useEffect } from 'react'
    import { useParams } from 'react-router-dom'
    import { Button, Card, Typography } from '@material-tailwind/react'
    import { getOrders } from '../../firebase/firestore'

    export default function SalesReports() {
      const { restaurantId } = useParams()
      const [orders, setOrders] = useState<any[]>([])
      const [timePeriod, setTimePeriod] = useState('today')

      useEffect(() => {
        if (restaurantId) {
          const fetchOrders = async () => {
            const data = await getOrders(restaurantId)
            setOrders(data.filter((order: any) => order.status === 'completed'))
          }
          fetchOrders()
        }
      }, [restaurantId, timePeriod])

      const filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt.seconds * 1000)
        const now = new Date()
        switch (timePeriod) {
          case 'today':
            return orderDate.toDateString() === now.toDateString()
          case 'week':
            const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
            return orderDate >= startOfWeek
          case 'month':
            return orderDate.getMonth() === now.getMonth()
          default:
            return true
        }
      })

      const totalSales = filteredOrders.reduce((sum, order) => sum + order.total, 0)

      return (
        <div className="p-8">
          <Typography variant="h2" className="mb-8">
            Sales Reports
          </Typography>
          <div className="flex gap-4 mb-8">
            <Button onClick={() => setTimePeriod('today')}>Today</Button>
            <Button onClick={() => setTimePeriod('week')}>This Week</Button>
            <Button onClick={() => setTimePeriod('month')}>This Month</Button>
          </div>
          <Card className="p-6">
            <Typography variant="h4" className="mb-4">
              Sales Summary
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h3">{filteredOrders.length}</Typography>
              </Card>
              <Card className="p-4">
                <Typography variant="h6">Total Revenue</Typography>
                <Typography variant="h3">${totalSales.toFixed(2)}</Typography>
              </Card>
              <Card className="p-4">
                <Typography variant="h6">Average Order Value</Typography>
                <Typography variant="h3">
                  ${(totalSales / (filteredOrders.length || 1)).toFixed(2)}
                </Typography>
              </Card>
            </div>
          </Card>
        </div>
      )
    }
