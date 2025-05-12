import { labels } from '@/constants'
import { Button } from './ui/button'

type Props = {
  label: string
  span: string
}

export const AddToCart = ({ label, span }: Props) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-col">
        <span className="font-bold text-neutral-700 text-base">{label}</span>
        <span className="text-neutral-500 text-xs font-bold">{span}</span>
      </div>

      <Button
        size={'xs'}
        className="font-bold text-xs text-white bg-neutral-700"
      >
        {labels.productDetails.size.required}
      </Button>
    </div>
  )
}
