import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type HeaderContextData = {
  showSearchInput: boolean
  handleHiddenSearchInput: () => void
}
export const HeaderProviderContext = createContext<HeaderContextData>(
  {} as HeaderContextData
)

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [showSearchInput, setShowSearchInput] = useState(true)

  const handleHiddenSearchInput = useCallback(
    () => setShowSearchInput(false),
    []
  )

  const values = useMemo(
    () => ({ showSearchInput, handleHiddenSearchInput }),
    [handleHiddenSearchInput, showSearchInput]
  )

  return (
    <HeaderProviderContext.Provider value={values}>
      {children}
    </HeaderProviderContext.Provider>
  )
}

export const useHeader = () => {
  const context = useContext(HeaderProviderContext)

  return context
}
