import { useState, useEffect } from 'react'
    import { useParams } from 'react-router-dom'
    import { Button, Card, Typography } from '@material-tailwind/react'
    import { getProducts, createOrder } from '../../firebase/firestore'

    export default function OrderInterface() {
      const { restaurantId } = useParams()
      const [menuItems, setMenuItems] = useState<any[]>([])
      const [cart, setCart] = useState<any[]>([])
      const [orderPlaced, setOrderPlaced] = useState(false)

      useEffect(() => {
        if (restaurantId) {
          const fetchMenu = async () => {
            const data = await getProducts(restaurantId)
            setMenuItems(data.filter((item: any) => item.availability))
          }
          fetchMenu()
        }
      }, [restaurantId])

      const addToCart = (item: any) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id)
        if (existingItem) {
          setCart(
            cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          )
        } else {
          setCart([...cart, { ...item, quantity: 1 }])
        }
      }

      const handlePlaceOrder = async () => {
        if (!restaurantId || cart.length === 0) return
        const order = {
          products: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
          status: 'pending',
          createdAt: new Date()
        }
        await createOrder(restaurantId, order)
        setCart([])
        setOrderPlaced(true)
        setTimeout(() => setOrderPlaced(false), 3000)
      }

      return (
        <div className="p-8">
          <Typography variant="h2" className="mb-8">
            Place Your Order
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Typography variant="h4" className="mb-4">
                Menu
              </Typography>
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <Card key={item.id} className="p-4 flex justify-between items-center">
                    <div>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="small">${item.price.toFixed(2)}</Typography>
                    </div>
                    <Button size="sm" onClick={() => addToCart(item)}>
                      Add to Cart
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <Typography variant="h4" className="mb-4">
                Your Order
              </Typography>
              <Card className="p-4">
                {cart.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.name}</span>
                          <span>
                            {item.quantity} x ${item.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>
                        ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                      </span>
                    </div>
                    <Button className="mt-4" fullWidth onClick={handlePlaceOrder}>
                      Place Order
                    </Button>
                  </>
                ) : (
                  <Typography>Your cart is empty</Typography>
                )}
              </Card>
              {orderPlaced && (
                <div className="mt-4 p-4 bg-green-500 text-white rounded">
                  Order placed successfully!
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
