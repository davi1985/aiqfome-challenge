import { Product } from '@/@types'
import { useReducer } from 'react'

type CartItem = Product & {
  quantity: number
}

type CartAction =
  | { type: 'ADD'; payload: Product }
  | { type: 'REMOVE'; payload: { id: string } }
  | { type: 'CLEAR' }

export const cartReducer = (state: CartItem[], action: CartAction) => {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((item) => item.id === action.payload.id)
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...state, { ...action.payload, quantity: 1 }]
    }

    case 'REMOVE': {
      const updated = state
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)

      return updated
    }

    case 'CLEAR': {
      return []
    }

    default:
      return state
  }
}
export function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, [])

  const addToCart = (product: Product) =>
    dispatch({ type: 'ADD', payload: product })

  const removeFromCart = (id: string) =>
    dispatch({ type: 'REMOVE', payload: { id } })

  const clearCart = () => dispatch({ type: 'CLEAR' })

  const totalPrice = cart.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  )

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalPrice,
  }
}
