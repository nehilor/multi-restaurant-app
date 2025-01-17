import { useState, useEffect } from 'react'
    import { useParams } from 'react-router-dom'
    import { Button, Card, Input, Typography } from '@material-tailwind/react'
    import { createProduct, getProducts } from '../../firebase/firestore'

    export default function MenuManagement() {
      const { restaurantId } = useParams()
      const [menuItems, setMenuItems] = useState<any[]>([])
      const [newItem, setNewItem] = useState({
        name: '',
        price: 0,
        category: '',
        availability: true
      })

      useEffect(() => {
        if (restaurantId) {
          const fetchMenu = async () => {
            const data = await getProducts(restaurantId)
            setMenuItems(data)
          }
          fetchMenu()
        }
      }, [restaurantId])

      const handleCreateItem = async () => {
        if (!restaurantId || !newItem.name || !newItem.price) return
        await createProduct(restaurantId, newItem)
        setNewItem({ name: '', price: 0, category: '', availability: true })
        const updatedMenu = await getProducts(restaurantId)
        setMenuItems(updatedMenu)
      }

      return (
        <div className="space-y-6">
          <Typography variant="h2" className="mb-4">
            Menu Management
          </Typography>

          <Card className="p-6 mb-8">
            <Typography variant="h4" className="mb-4">
              Add New Menu Item
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <Input
                type="number"
                label="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
              />
              <Input
                label="Category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              />
              <Button onClick={handleCreateItem}>Add Item</Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="p-6">
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="small" className="mt-2">
                  Price: ${item.price.toFixed(2)}
                </Typography>
                <Typography variant="small" className="mt-2">
                  Category: {item.category}
                </Typography>
                <Typography variant="small" className="mt-2">
                  Status: {item.availability ? 'Available' : 'Unavailable'}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      )
    }
