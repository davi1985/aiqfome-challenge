export type FoodPlace = {
  id: string
  name: string
  image: string
  status: 'open' | 'closed'
  deliveryFee: number | null
  rating: number
  menu: Menu
}

export type Menu = {
  categories: Category[]
}

export type Category = {
  id: string
  name: string
  description: string
  hasPromo: boolean
  products: Product[]
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  newPrice: number
  image: string
  icon: string
  sizes: string[]
  sides: string[]
}
