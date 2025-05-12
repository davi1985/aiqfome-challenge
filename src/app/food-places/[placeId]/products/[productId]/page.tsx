'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useGetProductDetails } from '@/hooks/use-get-product-details'
import { HttpClientImpl } from '@/infra/http-client/impl/http-client-impl'
import { formatCurrency } from '@/lib/utils'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const utensils = [
  { id: 1, name: 'Hashi' },
  { id: 2, name: 'Garfo e faca descartável', price: 1 },
]

const extra = [
  { id: 1, name: 'Biscoito da sorte', price: 2 },
  { id: 2, name: 'Rolinho primavera', price: 8 },
  { id: 3, name: 'guioza', price: 6 },
]

const ProductDetailPage = () => {
  const { data } = useGetProductDetails(HttpClientImpl.create())
  const router = useRouter()

  return (
    <div className="flex flex-col">
      <div className="flex aspect-w-16 aspect-h-9">
        <img
          src={data?.image}
          alt="banner"
          className="object-cover w-full h-48"
        />
      </div>

      <div className="border-b-4 flex flex-col p-4">
        <h2 className="font-bold text-xl text-neutral-700">{data.name}</h2>

        <span className="font-bold text-text-light text-sm flex items-center">
          a partir de
          <span className="text-purple-500 font-extrabold text-lg ml-2">
            {formatCurrency(data.price)}
          </span>
        </span>

        <span className="font-bold text-text-light text-sm">
          {data.description}
        </span>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="font-bold text-neutral-700 text-base">
              Quantos ?
            </span>
            <span className="text-text-light font-semibold">
              Total:
              <span className="ml-2 font-bold text-neutral-700">
                {formatCurrency(19)}
              </span>
            </span>
          </div>

          <Button
            size={'default'}
            className="bg-text-light font-bold text-sm text-white"
          >
            Adicionar
          </Button>
        </div>
      </div>

      <div className="border-b-4 flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="font-bold text-neutral-700 text-base">
              Qual o tamanho ?
            </span>
            <span className="text-text-light text-xs font-semibold">
              escolha 1
            </span>
          </div>

          <Button
            size={'xs'}
            className="font-bold text-xs text-white bg-neutral-700"
          >
            Obrigatório
          </Button>
        </div>

        <div className="space-x-4">
          <RadioGroup defaultValue="option-one">
            {data?.sizes?.map((item) => (
              <div key={item} className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={item} />
                  <Label htmlFor={item} className="text-text-light text-sm">
                    {item}
                  </Label>
                </div>

                {/* {data?.newPrice ? (
                  <div>
                    <span>de {formatCurrency(data.price)} por</span>
                    <span>{formatCurrency(data.newPrice)}</span>
                  </div>
                ) : ( */}
                <div className="text-purple-500 font-bold text-sm">
                  {formatCurrency(data.price)}
                </div>
                {/* )} */}
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="border-b-4 flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="font-bold text-neutral-700 text-base">
              Acompanhamentos
            </span>
            <span className="text-text-light text-xs font-semibold">
              escolha de 1 a 2
            </span>
          </div>

          <Button
            size={'xs'}
            className="font-bold text-xs text-white bg-neutral-700"
          >
            Obrigatório
          </Button>
        </div>

        <div className="space-x-4">
          <RadioGroup defaultValue="option-one">
            {data?.sides?.map((item) => (
              <div className="flex items-center space-x-2" key={item}>
                <Checkbox id={item} />
                <label
                  htmlFor={item}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="border-b-4 flex flex-col p-4 gap-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="font-bold text-neutral-700 text-base">
              Vai querer bebida ?
            </span>
            <span className="text-text-light text-xs font-semibold">
              escolha quantos quiser
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="rounded-full bg-neutral-100 border-neutral-100 border hover:bg-gray-100 p-1.5 cursor-pointer">
              <MinusIcon className="w-4 h-4" />
            </button>

            <span className="font-bold text-sm">0</span>

            <button className="rounded-full border border-teal-400 hover:bg-gray-100 p-1.5 cursor-pointer">
              <PlusIcon className="w-4 h-4 text-teal-400" />
            </button>

            <span className="font-bold text-text-light">Coca-cola</span>
          </div>
          <span className="text-purple-500 font-bold text-sm">
            +{formatCurrency(5)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="rounded-full border border-neutral-100 bg-neutral-100 hover:bg-gray-100 p-1.5 cursor-pointer">
              <MinusIcon className="w-4 h-4" />
            </button>

            <span className="font-bold text-sm">0</span>

            <button className="rounded-full border border-teal-400 hover:bg-gray-100 p-1.5 cursor-pointer">
              <PlusIcon className="w-4 h-4 text-teal-400" />
            </button>

            <span className="font-bold text-text-light">Fanta Laranja</span>
          </div>

          <span className="text-purple-500 font-bold text-sm">
            +{formatCurrency(5)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="rounded-full border border-neutral-100 bg-neutral-100 hover:bg-gray-100 p-1.5 cursor-pointer">
              <MinusIcon className="w-4 h-4" />
            </button>

            <span className="font-bold text-sm">0</span>

            <button className="rounded-full border border-teal-400 hover:bg-gray-100 p-1.5 cursor-pointer">
              <PlusIcon className="w-4 h-4 text-teal-400" />
            </button>

            <span className="font-bold text-text-light">Água sem gás</span>
          </div>

          <span className="text-purple-500 font-bold text-sm">
            +{formatCurrency(5)}
          </span>
        </div>
      </div>

      <div className="border-b-4 flex flex-col p-4 gap-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="font-bold text-neutral-700 text-base">
              Precisa de talher ?
            </span>
            <span className="text-text-light text-xs font-semibold">
              escolha até 1
            </span>
          </div>
        </div>

        <div className="space-x-4">
          <RadioGroup defaultValue="option-one">
            {utensils.map(({ id, name, price }) => (
              <div key={id} className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={name} id={id.toString()} />
                  <Label
                    htmlFor={id.toString()}
                    className="text-text-light text-sm"
                  >
                    {name}
                  </Label>
                </div>

                {price && (
                  <div className="text-purple-500 font-bold text-sm">
                    {formatCurrency(price)}
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="border-b-4 flex flex-col p-4 gap-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="font-bold text-neutral-700 text-base">
              Mais alguma coisa ?
            </span>
            <span className="text-text-light text-xs font-semibold">
              escolha até 2
            </span>
          </div>
        </div>

        <div className="space-x-4">
          <RadioGroup defaultValue="option-one">
            {extra.map(({ id, name, price }) => (
              <div key={id} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox id={id.toString()} />
                  <label
                    htmlFor={id.toString()}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {name}
                  </label>
                </div>

                <div className="text-purple-500 font-bold text-sm">
                  +{formatCurrency(price)}
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="p-4">
        <Textarea placeholder="alguma observação do item? • opcional \nex: tirar algum ingrediente, ponto do prato" />
      </div>

      <div className="w-full flex flex-col items-center justify-center pt-6 mt-11 bg-neutral-100">
        <span className="font-bold text-purple-700 text-sm">
          Feito com 💜 em Maringá-PR
        </span>

        <div className="px-6 py-4 w-full">
          <Button
            className="w-full h-12 bg-purple-500 font-bold text-base"
            onClick={() => router.push('/ticket')}
          >
            Ver ticket
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
