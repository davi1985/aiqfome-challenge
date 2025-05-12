import { NextRequest, NextResponse } from 'next/server'
import data from '../../../../../../public/data.json'

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ foodPlaceId: string }> }
) => {
  const { foodPlaceId } = await params

  const foodPlace = data.foodPlaces.find((item) => item.id === foodPlaceId)

  if (!foodPlace) {
    return NextResponse.json(
      { error: 'Estabelecimento não encontrado' },
      { status: 404 }
    )
  }

  return NextResponse.json(foodPlace, { status: 200 })
}
