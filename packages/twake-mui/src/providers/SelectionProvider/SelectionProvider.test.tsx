// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import SelectionProvider from './index'
import { SelectionContextValue, useSelection } from './useSelection'

const setup = (): { current: SelectionContextValue } =>
  renderHook(() => useSelection(), {
    wrapper: ({ children }) => <SelectionProvider>{children}</SelectionProvider>
  }).result

describe('SelectionProvider', () => {
  it('toggles a single item', () => {
    const result = setup()

    act(() => result.current.toggleSelectedItem('a'))
    expect(result.current.selectedItemsId).toEqual(['a'])
    expect(result.current.isSelectionEnabled).toBe(true)

    act(() => result.current.toggleSelectedItem('a'))
    expect(result.current.selectedItemsId).toEqual([])
    expect(result.current.isSelectionEnabled).toBe(false)
  })

  it('selects all items whatever their order, then unselects them', () => {
    const result = setup()

    act(() => result.current.selectAll(['b', 'a']))
    expect(result.current.isSelectedAllItems(['a', 'b'])).toBe(true)
    expect(result.current.isSelectedAllItems(['a', 'b', 'c'])).toBe(false)

    act(() => result.current.toggleSelectAllItems(['a', 'b']))
    expect(result.current.selectedItemsId).toEqual([])
  })

  it('throws outside of a SelectionProvider', () => {
    expect(() => renderHook(() => useSelection())).toThrow(
      'useSelection must be used within a SelectionProvider'
    )
  })
})
