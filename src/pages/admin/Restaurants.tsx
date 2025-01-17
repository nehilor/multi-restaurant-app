import { useState, useEffect } from 'react'
    import { Button, Card, Input, Typography } from '@material-tailwind/react'
    import { createRestaurant, getRestaurants } from '../../firebase/firestore'
    import { useAuth } from '../../context/AuthContext'

    export default function Restaurants() {
      const { currentUser } = useAuth()
      const [restaurants, setRestaurants] = useState<any[]>([])
      const [newRestaurant, setNewRestaurant] = useState({
        name: '',
        location: '',
        owner: currentUser?.email || ''
      })

      useEffect(() => {
        const fetchRestaurants = async () => {
          const data = await getRestaurants()
          setRestaurants(data)
        }
        fetchRestaurants()
      }, [])

      const handleCreateRestaurant = async () => {
        if (!newRestaurant.name || !newRestaurant.location) return
        await createRestaurant(newRestaurant)
        setNewRestaurant({ name: '', location: '', owner: currentUser?.email || '' })
        const updatedRestaurants = await getRestaurants()
        setRestaurants(updatedRestaurants)
      }

      return (
        <div className="space-y-6">
          <Typography variant="h2" className="mb-4">
            Restaurant Management
          </Typography>

          <Card className="p-6 mb-8">
            <Typography variant="h4" className="mb-4">
              Create New Restaurant
            </Typography>
            <div className="space-y-4">
              <Input
                label="Restaurant Name"
                value={newRestaurant.name}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
              />
              <Input
                label="Location"
                value={newRestaurant.location}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })}
              />
              <Button onClick={handleCreateRestaurant}>Create Restaurant</Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="p-6">
                <Typography variant="h5">{restaurant.name}</Typography>
                <Typography variant="small" className="mt-2">
                  Location: {restaurant.location}
                </Typography>
                <Typography variant="small" className="mt-2">
                  Owner: {restaurant.owner}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      )
    }
