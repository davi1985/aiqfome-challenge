import { FoodPlace } from '@/@types'
import { HttpClient, HttpMethod } from '@/infra/http-client/protocols'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Response = FoodPlace
type Params = {
  placeId: string
}

export const useGetProducts = (httClient: HttpClient) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState<FoodPlace>({} as FoodPlace)
  const { placeId } = useParams<Params>()

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await httClient.sendRequest<Response>({
          endpoint: `/api/food-places/${placeId}/products`,
          method: HttpMethod.GET,
        })

        setData(response as FoodPlace)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    error,
    data,
  }
}
