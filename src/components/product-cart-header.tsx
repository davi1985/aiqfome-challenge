import { formatCurrency } from '@/lib/utils'

type Props = {
  productName: string
  price: number
}

export const ProductCartHeader = ({ productName, price }: Props) => {
  return (
    <div className="flex">
      <div className="flex justify-between w-full">
        <span className="font-bold text-sm text-neutral-900">
          {productName}
        </span>
        <span className="font-bold text-purple-500 text-sm">
          {formatCurrency(price)}
        </span>
      </div>
    </div>
  )
}
