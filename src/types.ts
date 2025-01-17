export interface Restaurant {
      id: string
      name: string
      location: string
      owner: string
      createdAt: Date
    }

    export interface Product {
      id: string
      name: string
      price: number
      category: string
      availability: boolean
      restaurantId: string
    }

    export interface Order {
      id: string
      restaurantId: string
      products: Array<{
        id: string
        name: string
        quantity: number
        price: number
      }>
      total: number
      status: 'pending' | 'in-preparation' | 'completed'
      createdAt: Date
    }

    export interface User {
      id: string
      email: string
      role: 'admin' | 'restaurant'
      restaurantId?: string
    }
