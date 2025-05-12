import { FoodPlace } from '@/@types'
import { HttpClientImpl } from '@/infra/http-client/impl/http-client-impl'
import { HttpMethod } from '@/infra/http-client/protocols'
import { getCartDataFromLocalStorage } from '@/lib/utils'
import { useEffect, useState } from 'react'

type CartItem = {
  placeId: string
  selectedSize: 'médio' | 'grande' | string
  selectedSides: string[]
  selectedUtensil: string
  selectedExtras: string[]
  note: string
  drinks: {
    coke: number
    orange: number
    water: number
  }
  product: {
    id: string
    name: string
    description: string
    price: number
    newPrice: number
    image: string
    sizes: string[]
    icon: string
    sides: string[]
  }
}

type Cart = CartItem[]

export const useGetCartData = () => {
  const [cartData, setCartData] = useState<Cart>([])
  const [total, setTotal] = useState(0)
  const [foodPlace, setFoodPlace] = useState<FoodPlace>({} as FoodPlace)

  useEffect(() => {
    ;(async () => {
      const dataFromStorage = getCartDataFromLocalStorage<Cart>('cart')

      if (dataFromStorage) {
        setCartData(dataFromStorage)

        const placeId = dataFromStorage[0]?.placeId

        const foodPlaceData =
          await HttpClientImpl.create().sendRequest<FoodPlace>({
            endpoint: `/api/food-places/${placeId}/products`,
            method: HttpMethod.GET,
          })

        setFoodPlace(foodPlaceData)

        const calculatedTotal = dataFromStorage.reduce((acc, item) => {
          const drinksTotal =
            item.drinks.coke * 5 +
            item.drinks.orange * 5 +
            item.drinks.water * 3

          return acc + item.product.newPrice + drinksTotal
        }, 0)

        setTotal(calculatedTotal)
      }
    })()
  }, [])

  return { cartData, foodPlace, total }
}
