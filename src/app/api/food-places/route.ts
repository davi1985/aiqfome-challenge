import { NextResponse } from 'next/server'

import data from '../../../../public/data.json'

export const GET = async () => {
  new Promise((resolve) => setTimeout(resolve, 600))

  return NextResponse.json({ data }, { status: 200 })
}
