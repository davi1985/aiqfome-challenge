'use client'

import { Products } from '@/components/products'
import { labels } from '@/constants'
import { useHeader } from '@/contexts/header'
import { useGetProducts } from '@/hooks/use-get-products'
import { HttpClientImpl } from '@/infra/http-client/impl/http-client-impl'
import { formatCurrency } from '@/lib/utils'
import { ChevronRightIcon, Heart, Share2, Star } from 'lucide-react'
import Image from 'next/image'
import { useLayoutEffect } from 'react'

const FoodPlacePage = () => {
  const { data } = useGetProducts(HttpClientImpl.create())
  const { handleHiddenSearchInput } = useHeader()

  useLayoutEffect(() => {
    handleHiddenSearchInput()
  }, [handleHiddenSearchInput])

  return (
    <>
      <div className="flex flex-col px-4 py-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Image
              src={data?.image}
              alt="banner"
              className="object-cover rounded-sm"
              width={36}
              height={36}
            />

            <h2 className="text-xl font-extrabold text-neutral-900">
              {data.name}
            </h2>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-3 p-1.5">
              <Share2 className="w-4 h-4 -scale-100 text-purple-700" />
              <Heart className="w-4 h-4 text-purple-700" />
            </div>

            <div className="flex items-center gap-1">
              <span className="text-teal-400 font-bold">
                {labels.foodPlace.moreInfo}
              </span>
              <ChevronRightIcon className="w-3 h-3 text-teal-400" />
            </div>
          </div>

          <div className="flex items-center gap-[6px]">
            <div className="flex items-center gap-1">
              <Image
                src={'/static/icons/motorcycle-2.svg'}
                alt="banner"
                className="object-cover rounded-sm"
                width={24}
                height={24}
              />

              <span className="text-purple-500 font-bold text-sm flex items-center gap-1">
                {formatCurrency(data.deliveryFee ?? 0)}
                <ChevronRightIcon className="w-2 h-2 text-purple-500" />
              </span>
            </div>

            <div className="w-1 h-1 bg-decorative rounded-full" />

            <span className="font-bold text-xs text-neutral-500">
              {labels.foodPlace.today}
            </span>

            <div className="w-1 h-1 bg-decorative rounded-full" />

            <span className="font-bold text-xs text-neutral-500">
              {labels.foodPlace.distance}
            </span>
          </div>

          <div className="bg-neutral-20 px-2 py-1.5 w-fit rounded-sm">
            <span className="text-teal-600 font-bold text-xs">
              {labels.foodPlace.feeDeliveryLabel} {formatCurrency(35)}
            </span>
          </div>

          <div className="flex flex-col gap-1 font-bold text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" fill="#FFB300" />
                <span className="text-neutral-500">
                  {data.rating}
                  {labels.foodPlace.stars}
                </span>
                <ChevronRightIcon className="w-2.5 h-2.5 text-neutral-500" />
              </div>
              <div className="w-1 h-1 bg-decorative rounded-full" />

              <span className="text-neutral-500">
                {labels.foodPlace.closeTime}
              </span>
            </div>

            <span className="text-neutral-500">
              {labels.foodPlace.minOrderValue} {formatCurrency(15)}
            </span>
          </div>
        </div>
      </div>

      <Products products={data.menu} foodPlaceId={data.id} />
    </>
  )
}

export default FoodPlacePage
