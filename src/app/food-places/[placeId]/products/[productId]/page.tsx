'use client'

import { AddToCart } from '@/components/add-to-cart'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { labels } from '@/constants'
import { useHeader } from '@/contexts/header'
import { useCart } from '@/services/use-cart'
import { useGetProductDetails } from '@/services/use-get-product-details'
import { HttpClientImpl } from '@/infra/http-client/impl/http-client-impl'
import { formatCurrency } from '@/lib/utils'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

const utensils = [
  { id: 1, name: 'Hashi' },
  { id: 2, name: 'Garfo e faca descartável', price: 1 },
]

const extra = [
  { id: 1, name: 'Biscoito da sorte', price: 2 },
  { id: 2, name: 'Rolinho primavera', price: 8 },
  { id: 3, name: 'guioza', price: 6 },
]

type FormData = {
  size: string
  sides: string[]
  drinks: {
    coke: number
    orange: number
    water: number
  }
  utensils: string
  extras: string[]
  note: string
}

const ProductDetailPage = () => {
  const { data, placeId } = useGetProductDetails(HttpClientImpl.create())
  const router = useRouter()
  const { handleHiddenSearchInput } = useHeader()
  const { totalPrice, addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedSides, setSelectedSides] = useState<string[]>([])
  const [selectedUtensil, setSelectedUtensil] = useState<string>('')
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [drinks, setDrinks] = useState({
    coke: 0,
    orange: 0,
    water: 0,
  })

  const handleCheckboxChange = (name: string) => {
    setSelectedExtras((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    )
  }

  const toggleSide = (item: string) => {
    setSelectedSides((prev) =>
      prev.includes(item)
        ? prev.filter((side) => side !== item)
        : [...prev, item]
    )
  }

  const addDrink = (drink: keyof typeof drinks) =>
    setDrinks((prev) => ({ ...prev, [drink]: prev[drink] + 1 }))

  const removeDrink = (drink: keyof typeof drinks) =>
    setDrinks((prev) => ({
      ...prev,
      [drink]: Math.max(0, prev[drink] - 1),
    }))

  const drinksMap = [
    { key: 'coke', label: labels.productDetails.drinks.items.coke },
    { key: 'orange', label: labels.productDetails.drinks.items.orange },
    { key: 'water', label: labels.productDetails.drinks.items.water },
  ] as const

  useLayoutEffect(() => {
    handleHiddenSearchInput()
  }, [handleHiddenSearchInput])

  const handleAddOrder = () => {
    const orderData = {
      selectedSize,
      selectedSides,
      selectedUtensil,
      selectedExtras,
      note,
      drinks,
      product: data,
      placeId,
    }

    addToCart(data)

    localStorage.setItem('cart', JSON.stringify([orderData]))
  }

  return (
    <div className="flex flex-col">
      <div className="flex aspect-w-16 aspect-h-9">
        <img
          src={data?.image}
          alt="banner"
          className="object-cover w-full h-48"
        />
      </div>

      <div className="border-b-4 border-b-neutral-100 flex flex-col p-4">
        <h2 className="font-bold text-xl text-neutral-700">{data.name}</h2>

        <span className="font-bold text-neutral-500 text-sm flex items-center">
          {labels.productDetails.priceFrom}
          <span className="text-purple-500 font-extrabold text-lg ml-2">
            {formatCurrency(data.price)}
          </span>
        </span>

        <span className="font-bold text-neutral-500 text-sm">
          {data.description}
        </span>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="font-extrabold text-neutral-700 text-base">
              {labels.productDetails.quantity}
            </span>
            <span className="text-neutral-500 text-sm font-semibold">
              {labels.productDetails.total}
              <span className="ml-2 font-bold text-neutral-700 text-sm">
                {formatCurrency(totalPrice)}
              </span>
            </span>
          </div>

          <Button
            size={'default'}
            onClick={handleAddOrder}
            className="bg-neutral-500 font-bold text-sm text-white"
          >
            {labels.productDetails.add}
          </Button>
        </div>
      </div>

      <div className="border-b-4 border-b-neutral-100 flex flex-col p-4">
        <AddToCart
          label={labels.productDetails.size.label}
          span={labels.productDetails.size.span}
        />

        <div className="space-x-4">
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
            {data?.sizes?.map((item) => (
              <div key={item} className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={item} />
                  <Label htmlFor={item} className="text-neutral-500 text-sm">
                    {item}
                  </Label>
                </div>

                <div className="text-purple-500 font-bold text-sm">
                  {formatCurrency(data.price)}
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="border-b-4  border-b-neutral-100 flex flex-col p-4">
        <AddToCart
          label={labels.productDetails.sides.label}
          span={labels.productDetails.sides.span}
        />

        <div className="space-x-4">
          <RadioGroup defaultValue="option-one">
            {data?.sides?.map((item) => (
              <div className="flex items-center space-x-2" key={item}>
                <Checkbox
                  id={item}
                  checked={selectedSides.includes(item)}
                  onCheckedChange={() => toggleSide(item)}
                />
                <Label htmlFor={item} className="text-neutral-500 text-sm">
                  {item}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="border-b-4 border-b-neutral-100 flex flex-col p-4 gap-4">
        <AddToCart
          label={labels.productDetails.drinks.label}
          span={labels.productDetails.drinks.span}
        />

        {drinksMap.map((drink) => (
          <div className="flex items-center justify-between" key={drink.key}>
            <div className="flex items-center gap-4">
              <button
                onClick={() => removeDrink(drink.key)}
                className="rounded-full bg-neutral-100 border-neutral-100 border hover:bg-gray-100 p-1.5 cursor-pointer"
              >
                <MinusIcon className="w-4 h-4" />
              </button>

              <span className="font-bold text-sm">{drinks[drink.key]}</span>

              <button
                onClick={() => addDrink(drink.key)}
                className="rounded-full border border-teal-400 hover:bg-gray-100 p-1.5 cursor-pointer"
              >
                <PlusIcon className="w-4 h-4 text-teal-400" />
              </button>

              <span className="font-bold text-neutral-500">{drink.label}</span>
            </div>

            <span className="text-purple-500 font-bold text-sm">
              +{formatCurrency(5)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-b-4 border-b-neutral-100 flex flex-col p-4 gap-4">
        <AddToCart
          label={labels.productDetails.utensils.label}
          span={labels.productDetails.utensils.span}
        />

        <div className="space-x-4">
          <RadioGroup
            value={selectedUtensil}
            onValueChange={setSelectedUtensil}
          >
            {utensils.map(({ id, name, price }) => (
              <div key={id.toString()} className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={name} id={id.toString()} />
                  <Label
                    htmlFor={id.toString()}
                    className="text-neutral-500 text-sm"
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

      <div className="border-b-4 border-b-neutral-100 flex flex-col p-4 gap-4">
        <AddToCart
          label={labels.productDetails.more.label}
          span={labels.productDetails.more.span}
        />

        <div className="space-x-4">
          <RadioGroup defaultValue="option-one">
            {extra.map(({ id, name, price }) => (
              <div
                key={id.toString()}
                className="flex justify-between items-center"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={name}
                    checked={selectedExtras.includes(name)}
                    onCheckedChange={() => handleCheckboxChange(name)}
                  />
                  <Label htmlFor={name} className="text-neutral-500 text-sm">
                    {name}
                  </Label>
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
        <Textarea
          placeholder={labels.productDetails.textarea.placeholder}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center pt-6 mt-11 bg-neutral-100">
        <span className="font-bold text-purple-700 text-sm">
          {labels.productDetails.footer.text}
        </span>

        <div className="px-6 py-4 w-full">
          <Button
            className="w-full h-12 bg-purple-500 font-bold text-base"
            onClick={() => router.push('/ticket')}
          >
            {labels.productDetails.footer.button}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
