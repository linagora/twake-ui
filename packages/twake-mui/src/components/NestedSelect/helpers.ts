import type { NestedSelectItem, NestedSelectOptions } from './types'

/** Path from the item matching `options.focusedId` up to `options`, deepest first */
export const makeHistory = (
  options: NestedSelectOptions | undefined,
  canSelectParent = false
): NestedSelectItem[] => {
  if (!options) return []

  const focusedId = options.focusedId ?? null
  if (!focusedId) return [options]

  const history: NestedSelectItem[] = []
  const findFocusedItem = (item: NestedSelectItem): boolean => {
    const isFound =
      item.children?.some(
        child => child.id === focusedId || findFocusedItem(child)
      ) ?? false

    if (isFound) {
      if (canSelectParent) {
        const focusedItem = item.children?.find(child => child.id === focusedId)
        if (focusedItem?.children) history.push(focusedItem)
      }
      history.push(item)
    }

    return isFound
  }

  return findFocusedItem(options) ? history : [options]
}
