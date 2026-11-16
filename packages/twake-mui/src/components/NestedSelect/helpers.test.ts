import { describe, expect, it } from 'vitest'

import { makeHistory } from './helpers'

describe('makeHistory', () => {
  it('is empty without options', () => {
    expect(makeHistory(undefined)).toEqual([])
  })

  it('holds only the options without focusedId', () => {
    const options = { id: '1', children: [] }
    expect(makeHistory(options)).toEqual([options])
  })

  it('holds only the options when focusedId is not found', () => {
    const options = { id: '1', focusedId: '2', children: [] }
    expect(makeHistory(options)).toEqual([options])
  })

  it('holds the parents of the focused item', () => {
    const subChild = { id: '3' }
    const child = { id: '2', children: [subChild] }
    const options = { id: '1', focusedId: '3', children: [child] }
    expect(makeHistory(options)).toEqual([child, options])
  })

  it('holds the focused item when it has children and can be selected', () => {
    const child = { id: '2', children: [] }
    const options = { id: '1', focusedId: '2', children: [child] }
    expect(makeHistory(options, true)).toEqual([child, options])
  })

  it('holds only the parent of the focused item when it cannot be selected', () => {
    const child = { id: '2', children: [] }
    const options = { id: '1', focusedId: '2', children: [child] }
    expect(makeHistory(options, false)).toEqual([options])
  })
})
