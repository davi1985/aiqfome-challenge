import { FoodPlace } from '@/@types'
import { HttpClient, HttpMethod } from '@/infra/http-client/protocols'
import { useEffect, useMemo, useState } from 'react'

type Response = {
  data: {
    foodPlaces: FoodPlace[]
  }
}

export const useFoodPlaces = (httClient: HttpClient) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState<FoodPlace[]>([])

  const openedEstablishments = useMemo(
    () => data.filter((item) => item.status === 'open'),
    [data]
  )

  const closedEstablishments = useMemo(
    () => data.filter((item) => item.status === 'closed'),
    [data]
  )

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await httClient.sendRequest<Response>({
          endpoint: '/api/food-places',
          method: HttpMethod.GET,
        })

        setData(data.foodPlaces)
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
    openedEstablishments,
    closedEstablishments,
  }
}
