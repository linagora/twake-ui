// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Member } from '../MemberRow/types'
import { useMemberSuggestions } from './useMemberSuggestions'

const alice = { id: 'alice', name: 'Alice' }
const bob = { id: 'bob', name: 'Bob' }
const email = { id: 'carol@cozy.cc', name: 'carol@cozy.cc' }

type Params = Partial<Parameters<typeof useMemberSuggestions>[0]>

describe('useMemberSuggestions', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const setup = (params: Params) =>
    renderHook(
      (inputValue: string) =>
        useMemberSuggestions({
          inputValue,
          getSuggestions: (): Member[] => [],
          getMembersFromText: (): Member[] => [],
          minQueryLength: 3,
          debounceMs: 300,
          ...params
        }),
      { initialProps: 'al' }
    )

  it('shows the local suggestions at once below the minimum length', () => {
    const fetchSuggestions = vi.fn()
    const { result } = setup({
      getSuggestions: () => [alice],
      fetchSuggestions
    })

    expect(result.current.suggestions).toEqual([alice])
    expect(fetchSuggestions).not.toHaveBeenCalled()
  })

  it('shows the local suggestions at once, then the fetched ones first', async () => {
    const { result, rerender } = setup({
      getSuggestions: () => [alice],
      fetchSuggestions: async () => [bob, alice]
    })

    rerender('ali')
    expect(result.current.suggestions).toEqual([alice])
    expect(result.current.isFetching).toBe(true)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300)
    })

    expect(result.current.suggestions).toEqual([bob, alice])
    expect(result.current.isFetching).toBe(false)
  })

  it('stops suggesting the fetched members once the text changes', async () => {
    const { result, rerender } = setup({
      fetchSuggestions: async () => [bob],
      getMembersFromText: () => [email]
    })

    rerender('bob')
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300)
    })
    rerender('carol@cozy.cc')

    expect(result.current.suggestions).toEqual([email])
  })

  it('ignores the answer for an outdated text', async () => {
    const fetchSuggestions = vi.fn(async (query: string) =>
      query === 'ali' ? [bob] : []
    )
    const { result, rerender } = setup({ fetchSuggestions })

    rerender('ali')
    rerender('alic')
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300)
    })

    expect(fetchSuggestions).toHaveBeenCalledTimes(1)
    expect(fetchSuggestions).toHaveBeenCalledWith('alic')
    expect(result.current.suggestions).toEqual([])
  })

  it('suggests the members made from the text when nothing matches', () => {
    const { result } = setup({ getMembersFromText: () => [email] })

    expect(result.current.suggestions).toEqual([email])
  })
})
