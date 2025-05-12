'use client'

import { FoodPlace } from '@/components/food-place'
import { labels } from '@/constants'
import { useFoodPlaces } from '@/services/use-food-places'
import { HttpClientImpl } from '@/infra/http-client/impl/http-client-impl'

export const FoodPlacesSection = () => {
  const { openedEstablishments, closedEstablishments } = useFoodPlaces(
    HttpClientImpl.create()
  )

  return (
    <>
      <h1 className="text-xl font-extrabold leading-5 text-purple-500 mb-4">
        {labels.foodPlaces.opened}
      </h1>

      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        {openedEstablishments?.map((item) => (
          <FoodPlace place={item} key={item.id} />
        ))}
      </div>

      <h1 className="text-xl font-extrabold leading-5 text-purple-500 mt-6 mb-4">
        {labels.foodPlaces.closed}
      </h1>

      <div className="flex flex-col gap-4 opacity-55">
        {closedEstablishments?.map((item) => (
          <FoodPlace place={item} key={item.id} />
        ))}
      </div>
    </>
  )
}
