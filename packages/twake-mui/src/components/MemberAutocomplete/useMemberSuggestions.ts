import { useEffect, useRef, useState } from 'react'

import { Member } from '../MemberRow/types'
import { GetMembersFromText, makeSuggestions } from './helpers'

interface UseMemberSuggestionsParams {
  inputValue: string
  getSuggestions: (text: string) => Member[]
  fetchSuggestions?: (text: string) => Promise<Member[] | undefined>
  getMembersFromText: GetMembersFromText
  minQueryLength: number
  debounceMs: number
}

interface MemberSuggestions {
  suggestions: Member[]
  isFetching: boolean
}

const fetchMembersOrNone = async (
  fetchSuggestions: UseMemberSuggestionsParams['fetchSuggestions'],
  query: string
): Promise<Member[]> => {
  try {
    return (await fetchSuggestions?.(query)) ?? []
  } catch {
    return []
  }
}

/**
 * Computes the members to suggest for the typed text. The local ones and the ones made
 * from the text are always up to date. The fetched ones come first once `fetchSuggestions`
 * answers for the current text.
 */
export const useMemberSuggestions = ({
  inputValue,
  getSuggestions,
  fetchSuggestions,
  getMembersFromText,
  minQueryLength,
  debounceMs
}: UseMemberSuggestionsParams): MemberSuggestions => {
  const [fetched, setFetched] = useState<{ query: string; members: Member[] }>({
    query: '',
    members: []
  })
  const fetchSuggestionsRef = useRef(fetchSuggestions)
  useEffect(() => {
    fetchSuggestionsRef.current = fetchSuggestions
  })

  const query = inputValue.trim()
  const isRemoteQuery =
    fetchSuggestions !== undefined && query.length >= minQueryLength
  const isFetching = isRemoteQuery && fetched.query !== query

  useEffect(() => {
    if (!isRemoteQuery) return

    let isOutdated = false
    const keepFetchedMembers = async (): Promise<void> => {
      const members = await fetchMembersOrNone(
        fetchSuggestionsRef.current,
        query
      )
      if (!isOutdated) setFetched({ query, members })
    }
    const timeout = setTimeout(() => {
      void keepFetchedMembers()
    }, debounceMs)

    return (): void => {
      isOutdated = true
      clearTimeout(timeout)
    }
  }, [query, isRemoteQuery, debounceMs])

  if (query.length === 0) return { suggestions: [], isFetching: false }

  const fetchedSuggestions = fetched.query === query ? fetched.members : []
  const suggestions = makeSuggestions(
    [...fetchedSuggestions, ...getSuggestions(query)],
    getMembersFromText(query)
  )

  return { suggestions, isFetching }
}
