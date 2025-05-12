import { MinusIcon, Pencil, PlusIcon } from 'lucide-react'

export const QuantitySelector = () => (
  <div className="flex items-center justify-end gap-2">
    <span className="font-bold text-teal-400 flex items-center mr-6">
      <Pencil className="h-4 w-4 text-teal-400 mr-1" />
      Editar
    </span>

    <div className="flex items-center gap-4">
      <button className="rounded-full border border-teal-400 hover:bg-gray-100 p-1.5 cursor-pointer">
        <MinusIcon className="w-4 h-4 text-teal-400" />
      </button>

      <span className="font-bold text-sm">2</span>

      <button className="rounded-full border border-teal-400 hover:bg-gray-100 p-1.5 cursor-pointer">
        <PlusIcon className="w-4 h-4 text-teal-400" />
      </button>
    </div>
  </div>
)
