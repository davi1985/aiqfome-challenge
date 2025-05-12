import { Loader } from 'lucide-react'

export const Loading = () => (
  <div className="flex w-full items-center justify-center min-h-[calc(100vh-8rem)]">
    <Loader className="animate-spin text-purple-500" />
  </div>
)
