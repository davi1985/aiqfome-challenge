import { FoodPlace as Props } from '@/@types'
import { formatCurrency } from '@/lib/utils'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const FoodPlace = ({ place }: { place: Props }) => (
  <Link
    href={`/food-places/${place.id}/products`}
    className="bg-neutral-50 h-20 rounded-lg overflow-hidden flex hover"
    key={place.id}
  >
    <Image src={place.image} alt="banner" width={72} height={72} />

    <div className="p-3 flex flex-col gap-1">
      <span className="font-bold">{place.name}</span>
      <div className="flex items-center ">
        <div className="flex gap-1">
          {place.deliveryFee ? (
            <>
              <Image
                src={'/static/icons/delivery.svg'}
                alt="brand icon"
                className="h-5 w-5"
                width={32}
                height={32}
              />

              <span className="text-purple-500‚ font-bold text-sm">
                {formatCurrency(place.deliveryFee)}
              </span>
            </>
          ) : (
            <>
              <Image
                src={'/static/icons/motorcycle-1.svg'}
                alt="brand icon"
                className="h-5 w-5"
                width={32}
                height={32}
              />

              <span className="text-teal-600 font-bold text-sm">gratis</span>
            </>
          )}
        </div>

        <div className="w-1 h-1 bg-neutral-400 rounded-full ml-1 mr-1" />

        <div className="flex gap-1">
          <Star className="w-5 h-5 text-yellow-500" fill="#FFB300" />
          <span className="text-text-light font-bold text-sm">
            {place.rating}
          </span>
        </div>
      </div>
    </div>
  </Link>
)
