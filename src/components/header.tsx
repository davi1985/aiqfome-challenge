import { labels } from '@/constants'
import { Input } from './ui/input'

import { ChevronRight, MapPin, Search, UserRound } from 'lucide-react'
import Image from 'next/image'
export const Header = () => {
  return (
    <div className="flex w-full bg-purple-500 h-32 p-4 flex-col gap-4">
      <div className="flex items-center justify-between">
        <Image
          src={'/icons/logo.svg'}
          alt="brand icon"
          className="h-5 w-5"
          width={32}
          height={32}
        />

        <div className="flex items-center gap-2.5">
          <MapPin className="h-4 w-4 text-white" />

          <div className="flex flex-col">
            <span className="text-sm text-purple-200 font-bold leading-[19px]">
              {labels.header.address.status}
            </span>

            <span className="text-base text-white font-bold leading-[19px] flex items-center justify-center">
              {labels.header.address.info}
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>

        <UserRound className="h-5 w-5 text-white" />
      </div>
      <div className="relative flex items-center w-full">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-decorative" />
        <Input
          placeholder={labels.header.input.placeholder}
          className=" pl-8 bg-neutral-0 font-semibold text-sm leading-3.5 placeholder-text-light"
        />
      </div>
    </div>
  )
}
