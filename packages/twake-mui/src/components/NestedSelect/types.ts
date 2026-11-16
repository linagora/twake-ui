import type React from 'react'

export interface NestedSelectItemAction {
  /**
   * Called as a function with the item and `props`, so that a returned
   * `ListItemSecondaryAction` is placed outside the row button
   */
  Component(props: { item: NestedSelectItem }): React.ReactNode
  props?: object
}

export interface NestedSelectItem {
  /** Matched against `focusedId` to open the select on this item */
  id?: string
  /** React key of the row, `title` is used without it */
  key?: string
  title?: React.ReactNode
  description?: React.ReactNode
  /** Shown on the left of the row */
  icon?: React.ReactElement
  /** Shown before the radio */
  info?: React.ReactNode
  /** Shown above the list of this item's children */
  header?: React.ReactNode
  /** Items shown instead of selecting this one */
  children?: NestedSelectItem[]
  /** Shown on the right of the row */
  action?: NestedSelectItemAction
}

export interface NestedSelectOptions extends NestedSelectItem {
  /** Opens the select on the item with this `id` */
  focusedId?: string | null
  /** Shown above the children of any item, unless the item has its own `header` */
  childrenHeader?: React.ReactNode | ((level: number) => React.ReactNode)
}

export interface NestedSelectSearchOptions {
  placeholderSearch: string
  noDataLabel: string
  onSearch: (value: string) => NestedSelectItem[]
}

export interface NestedSelectHeaderProps {
  title?: React.ReactNode
  showBack: boolean
  onClickBack: () => void
}

export type NestedSelectRadioPosition = 'left' | 'right'

export interface NestedSelectProps {
  /** Called with the chosen item, unless it has children */
  onSelect: (item: NestedSelectItem) => void
  /** Whether the row looks selected, `level` being the depth of the shown list */
  isSelected: (item: NestedSelectItem, level: number) => boolean
  options: NestedSelectOptions
  /** Shown when the current item has no title */
  title?: React.ReactNode
  /** Shows the parent item at the top of its children, to select it */
  canSelectParent?: boolean
  /** Changes the parent item before it is shown at the top of its children */
  transformParentItem?: (item: NestedSelectItem) => NestedSelectItem
  radioPosition?: NestedSelectRadioPosition
  /** Shows a search bar above the first level */
  searchOptions?: NestedSelectSearchOptions
  /** Ellipses the row texts, `true` by default */
  ellipsis?: boolean
  /** Removes the divider between rows */
  noDivider?: boolean
  /** Wraps the rows */
  ContentComponent?: React.ElementType<{ children?: React.ReactNode }>
  /** Shows the title and the back button */
  HeaderComponent?: React.ComponentType<NestedSelectHeaderProps> | null
}
