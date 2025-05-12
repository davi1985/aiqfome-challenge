import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    value
  )

export const getCartDataFromLocalStorage = <T = unknown>(
  key: string
): T | null => {
  try {
    const cartData = localStorage.getItem(key)

    if (!cartData) return null

    return JSON.parse(cartData) as T
  } catch (error) {
    console.log(`Failed to parse localStorage item for key ${key}:`, error)
    return null
  }
}
