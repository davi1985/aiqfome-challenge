'use client'

import { ProductCartHeader } from '@/components/product-cart-header'
import { QuantitySelector } from '@/components/quantity-selector'
import { Button } from '@/components/ui/button'
import { labels } from '@/constants'
import { useGetCartData } from '@/hooks/use-get-cart-data'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'

const Ticket = () => {
  const { foodPlace, total, cartData } = useGetCartData()

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="flex items-center gap-2">
          <Image
            src={'/static/matsuri.png'}
            alt="banner"
            className="object-cover rounded-sm"
            width={36}
            height={36}
          />

          <div className="flex flex-col">
            <span className="text-sm font-bold text-neutral-500">
              {labels.ticket.header}
            </span>
            <h2 className="text-base font-bold text-neutral-900">
              {foodPlace?.name}
            </h2>
          </div>
        </div>
      </div>

      {cartData.map((item) => {
        const { id, name, newPrice } = item.product
        const { selectedSize, drinks } = item

        const drinkLabels = Object.entries(drinks)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, quantity]) => quantity > 0)
          .map(([type, quantity]) => {
            const label = {
              coke: 'Coca-cola',
              orange: 'Suco de laranja',
              water: 'Água',
            }[type]

            const price = type === 'water' ? 3 : 5

            return (
              <span
                key={type}
                className="font-semibold text-xs text-neutral-500 flex gap-2 ml-3"
              >
                {label} x{quantity}
                <span className="font-bold text-xs text-teal-400">
                  +{formatCurrency(price * quantity)}
                </span>
              </span>
            )
          })

        return (
          <div
            key={id + selectedSize + JSON.stringify(drinks)}
            className="flex flex-col gap-1.5 border-b-4 border-neutral-100 p-4"
          >
            <ProductCartHeader productName={name} price={newPrice} />
            <QuantitySelector />

            <div className="flex flex-col">
              <div className="flex flex-col">
                <span className="font-bold text-xs text-neutral-500">
                  • {labels.ticket.size}
                </span>
                <span className="font-semibold text-xs text-decorative ml-3">
                  {selectedSize}
                </span>
              </div>

              {drinkLabels.length > 0 && (
                <div className="flex flex-col">
                  <span className="font-bold text-xs text-neutral-500">
                    • {labels.ticket.drink}
                  </span>
                  {drinkLabels}
                </div>
              )}
            </div>
          </div>
        )
      })}

      <div className="fixed bottom-0 shadow-[0px_0px_15px_0px_#00000026] rounded-t-xl px-4 py-8 flex items-center w-full gap-7 bg-white">
        <div className="flex flex-col">
          <span className="font-bold text-sm text-neutral-900">
            {labels.ticket.subtotal}
          </span>
          <span className="font-extrabold text-purple-500 text-xl">
            {formatCurrency(total)}
          </span>
        </div>

        <div className="flex w-full">
          <Button className="bg-purple-500 w-full h-12 font-bold">
            {labels.ticket.button}
          </Button>
        </div>
      </div>
    </>
  )
}

export default Ticket
