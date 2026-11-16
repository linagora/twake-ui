import { createContext, useContext } from 'react'

export interface SelectionContextValue {
  selectedItemsId: string[]
  addSelectedItem: (itemId: string) => void
  removeSelectedItem: (itemId: string) => void
  toggleSelectedItem: (itemId: string) => void
  selectAll: (itemsId: string[]) => void
  toggleSelectAllItems: (itemsId: string[]) => void
  isSelectedItem: (itemId: string) => boolean
  isSelectionEnabled: boolean
  isSelectedAllItems: (itemsId: string[]) => boolean
}

export const SelectionContext = createContext<SelectionContextValue | null>(
  null
)

export const useSelection = (): SelectionContextValue => {
  const context = useContext(SelectionContext)

  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider')
  }
  return context
}
