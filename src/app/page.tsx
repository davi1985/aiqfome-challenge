'use client'

import { FoodPlace } from '@/components/food-place'
import { Footer } from '@/components/footer'
import { useFoodPlaces } from '@/hooks/use-food-places'

import { HttpClientImpl } from '@/infra/http-client/impl/http-client-impl'
import Image from 'next/image'

const Home = () => {
  const { openedEstablishments, closedEstablishments, error } = useFoodPlaces(
    HttpClientImpl.create()
  )

  if (error) {
    return <div>ocorreu um erro ao ler dados dos estabelecimentos</div>
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-center">
        <Image
          src={'/images/banner.png'}
          alt="banner"
          className="object-cover"
          width={500}
          height={128}
        />
      </div>

      <div className="px-4 py-6">
        <h1 className="text-xl font-extrabold leading-5 text-purple-500 mb-4">
          Abertos
        </h1>

        <div className="flex flex-col gap-4">
          {openedEstablishments?.map((item) => (
            <FoodPlace place={item} key={item.id} />
          ))}
        </div>

        <h1 className="text-xl font-extrabold leading-5 text-purple-500 mt-6 mb-4">
          Fechados
        </h1>

        <div className="flex flex-col gap-4">
          {closedEstablishments?.map((item) => (
            <FoodPlace place={item} key={item.id} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
