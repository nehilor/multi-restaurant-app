// Add these functions to existing firestore.ts
    export const updateOrderStatus = async (
      restaurantId: string,
      orderId: string,
      status: string
    ) => {
      const orderRef = doc(db, `restaurants/${restaurantId}/orders`, orderId)
      await updateDoc(orderRef, { status })
    }

    export const getOrdersByStatus = async (restaurantId: string, status: string) => {
      const q = query(
        collection(db, `restaurants/${restaurantId}/orders`),
        where('status', '==', status)
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
