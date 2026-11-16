import React, { ReactNode, useState } from 'react'

import { SelectionContext } from './useSelection'

export interface SelectionProviderProps {
  children?: ReactNode
}

/** Shares the ids of the selected items with its children */
const SelectionProvider: React.FC<SelectionProviderProps> = ({ children }) => {
  const [selectedItemsId, setSelectedItemsId] = useState<string[]>([])

  const isSelectedItem = (itemId: string): boolean =>
    selectedItemsId.includes(itemId)

  const addSelectedItem = (itemId: string): void =>
    setSelectedItemsId(current => [...current, itemId])

  const removeSelectedItem = (itemId: string): void =>
    setSelectedItemsId(current => current.filter(id => id !== itemId))

  const toggleSelectedItem = (itemId: string): void =>
    isSelectedItem(itemId)
      ? removeSelectedItem(itemId)
      : addSelectedItem(itemId)

  const selectAll = (itemsId: string[]): void => setSelectedItemsId(itemsId)

  const unselectAll = (): void => setSelectedItemsId([])

  const isSelectedAllItems = (itemsId: string[]): boolean =>
    itemsId.length === selectedItemsId.length && itemsId.every(isSelectedItem)

  const toggleSelectAllItems = (itemsId: string[]): void =>
    isSelectedAllItems(itemsId) ? unselectAll() : selectAll(itemsId)

  return (
    <SelectionContext.Provider
      value={{
        selectedItemsId,
        addSelectedItem,
        removeSelectedItem,
        toggleSelectedItem,
        selectAll,
        toggleSelectAllItems,
        isSelectedItem,
        isSelectionEnabled: selectedItemsId.length > 0,
        isSelectedAllItems
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}

export default SelectionProvider
