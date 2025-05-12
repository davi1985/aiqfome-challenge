import { CircleDollarSign } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { Product } from './product'
import { FoodPlace } from '@/@types'

type Props = {
  products: FoodPlace['menu']
  foodPlaceId: string
}

export const Products = ({ products, foodPlaceId }: Props) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {products?.categories.map((item) => (
        <AccordionItem
          value={item.id}
          key={item.id}
          className="px-4 border-b-4 border-neutral-100"
        >
          <AccordionTrigger>
            <div>
              <div className="flex items-center gap-2">
                {item.name}
                {item.hasPromo ? (
                  <CircleDollarSign className="w-4 h-4 text-green-500" />
                ) : null}
              </div>
              <span className="font-semibold text-xs text-neutral-500">
                {item.description}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {item.products.map((product) => (
              <Product
                key={product.id}
                product={product}
                foodPlaceId={foodPlaceId}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
