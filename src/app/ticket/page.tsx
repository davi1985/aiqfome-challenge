import { ProductCartHeader } from '@/components/product-cart-header'
import { QuantitySelector } from '@/components/quantity-selector'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'

const Ticket = () => {
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
            <span className="text-sm font-bold text-text-light">
              seus itens em
            </span>
            <h2 className="text-base font-bold text-neutral-900">
              Matsuri Concept
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 border-b-4 border-neutral-100 p-4">
        <ProductCartHeader productName={'Ceviche de salmão'} price={19} />
        <QuantitySelector />

        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-bold text-xs text-text-light">• Tamanho</span>
            <span className="font-semibold text-xs text-decorative ml-3">
              médio
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-xs text-text-light">
              • Vai querer bebida ?
            </span>

            <span className="font-semibold text-xs text-text-light flex gap-2 ml-3">
              Coca-cola
              <span className="font-bold text-xs text-teal-400">
                +{formatCurrency(5)}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 border-b-4 border-neutral-100 p-4">
        <ProductCartHeader productName={'Temaki Filadélfia'} price={19} />
        <QuantitySelector />

        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-bold text-xs text-text-light">• Tamanho</span>
            <span className="font-semibold text-xs text-decorative ml-3">
              médio
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-xs text-text-light">
              • Vai querer bebida ?
            </span>

            <span className="font-semibold text-xs text-text-light flex gap-2 ml-3">
              Coca-cola
              <span className="font-bold text-xs text-teal-400">
                +{formatCurrency(5)}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 border-b-4 border-neutral-100 p-4">
        <ProductCartHeader productName={'Temaki Mix'} price={19} />
        <QuantitySelector />

        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-bold text-xs text-text-light">• Tamanho</span>
            <span className="font-semibold text-xs text-decorative ml-3">
              médio
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-xs text-text-light">
              • Vai querer bebida ?
            </span>

            <span className="font-semibold text-xs text-text-light flex gap-2 ml-3">
              Coca-cola
              <span className="font-bold text-xs text-teal-400">
                +{formatCurrency(5)}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 shadow-[0px_0px_15px_0px_#00000026] rounded-t-xl px-4 py-8 flex items-center w-full gap-7 bg-white">
        <div className="flex flex-col">
          <span className="font-bold text-sm text-neutral-900">Subtotal</span>
          <span className="font-extrabold text-purple-500 text-xl">
            {formatCurrency(112)}
          </span>
        </div>

        <div className="flex w-full">
          <Button className="bg-purple-500 w-full h-12 font-bold">
            Ir para pagamento
          </Button>
        </div>
      </div>
    </>
  )
}

export default Ticket
