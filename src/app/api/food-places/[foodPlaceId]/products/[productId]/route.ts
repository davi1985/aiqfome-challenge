import { NextRequest, NextResponse } from 'next/server'
import data from '../../../../../../../public/data.json'

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ foodPlaceId: string; productId: string }> }
) => {
  const { foodPlaceId, productId } = await params

  const foodPlace = data.foodPlaces.find((item) => item.id === foodPlaceId)

  const product = foodPlace?.menu
    .categories!.flatMap((cat) => cat.products)
    .find(({ id }) => id === productId)

  if (!product) {
    return NextResponse.json(
      { error: 'Estabelecimento não encontrado' },
      { status: 404 }
    )
  }

  return NextResponse.json(product, { status: 200 })
}
