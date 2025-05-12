import { Product } from '@/@types'
import { HttpClient, HttpMethod } from '@/infra/http-client/protocols'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Params = {
  placeId: string
  productId: string
}

export const useGetProductDetails = (httClient: HttpClient) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState<Product>({} as Product)
  const { placeId, productId } = useParams<Params>()

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await httClient.sendRequest({
          endpoint: `/api/food-places/${placeId}/products/${productId}`,
          method: HttpMethod.GET,
        })

        setData(response as Product)
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
    placeId,
  }
}
