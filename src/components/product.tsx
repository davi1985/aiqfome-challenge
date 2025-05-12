import { Product as Props } from '@/@types'
import { formatCurrency } from '@/lib/utils'
import { CircleDollarSign } from 'lucide-react'
import Link from 'next/link'

type ProductProps = {
  product: Props
  foodPlaceId: string
}

export const Product = ({ product, foodPlaceId }: ProductProps) => {
  return (
    <Link
      href={`/food-places/${foodPlaceId}/products/${product.id}`}
      className="flex justify-between px-2 mb-6 last:mb-0"
    >
      <div className="flex flex-col">
        <span className="font-semibold text-sm">{product.name}</span>
        <span className="text-xs text-text-light line-clamp-2">
          {product.description}
        </span>
      </div>

      <div className="flex flex-col">
        {product.newPrice ? (
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-text-light line-through">
              {formatCurrency(product.price)}
            </span>

            <div className="flex items-center gap-2">
              <CircleDollarSign className="w-3 h-3 text-green-500" />
              <span className="text-xs font-bold text-green-500">
                {formatCurrency(product.newPrice)}
              </span>
            </div>
          </div>
        ) : (
          <>
            <span className="text-xs font-bold text-text-light">
              a partir de
            </span>
            <span className="text-sm font-bold text-text-light">
              {formatCurrency(product.price)}
            </span>
          </>
        )}
      </div>
    </Link>
  )
}
