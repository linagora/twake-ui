import type {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason
} from '@mui/material'
import type React from 'react'

import { Member } from '../MemberRow/types'
import {
  GetMembersFromText,
  getUnpickedMembers,
  isEmailLike,
  makeMembersFromValue,
  resolveKnownMembers
} from './helpers'

interface UseMemberInputParams {
  inputValue: string
  value: Member[]
  suggestions: Member[]
  getMembersFromText: GetMembersFromText
  onInputValueChange: (inputValue: string) => void
  onChange: (members: Member[]) => void
}

interface MemberInput {
  isTextAddedOnBlur: boolean
  handleChange: (
    event: React.SyntheticEvent,
    newValue: (Member | string)[],
    reason: AutocompleteChangeReason
  ) => void
  handleInputChange: (
    event: React.SyntheticEvent,
    newInputValue: string,
    reason: AutocompleteInputChangeReason
  ) => void
  handleKeyDown: (event: React.KeyboardEvent) => void
  handlePaste: (event: React.ClipboardEvent) => void
  handleBlur: () => void
}

/**
 * Turns the typed text into members on Enter, Space, paste and blur. A text giving no member
 * stays typed, and a member for a suggested or picked person is replaced by it.
 */
export const useMemberInput = ({
  inputValue,
  value,
  suggestions,
  getMembersFromText,
  onInputValueChange,
  onChange
}: UseMemberInputParams): MemberInput => {
  const getKnownMembersFromText = (text: string): Member[] =>
    resolveKnownMembers(getMembersFromText(text), [...value, ...suggestions])

  const addMembersFromText = (text: string): boolean => {
    const members = getKnownMembersFromText(text)
    if (members.length === 0) return false

    onChange([...value, ...getUnpickedMembers(members, value)])
    return true
  }

  const handleChange: MemberInput['handleChange'] = (
    _event,
    newValue,
    reason
  ) => {
    const typedText = newValue.find(item => typeof item === 'string')
    const isUnknownText =
      typedText !== undefined && getKnownMembersFromText(typedText).length === 0
    if (isUnknownText) {
      // On Enter, MUI commits the typed text rather than the suggestion it highlighted itself
      const highlightedSuggestion = getUnpickedMembers(suggestions, value)[0]
      if (highlightedSuggestion === undefined) return

      onChange([...value, highlightedSuggestion])
      onInputValueChange('')
      return
    }

    onChange(makeMembersFromValue(newValue, getKnownMembersFromText))
    if (reason !== 'removeOption') onInputValueChange('')
  }

  // The Autocomplete empties the text whenever `value` gets longer, even for a text kept typed
  const handleInputChange: MemberInput['handleInputChange'] = (
    _event,
    newInputValue,
    reason
  ) => {
    if (reason === 'input') onInputValueChange(newInputValue)
  }

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === ' ' && addMembersFromText(inputValue)) {
      event.preventDefault()
      onInputValueChange('')
    }
  }

  const handlePaste = (event: React.ClipboardEvent): void => {
    if (addMembersFromText(event.clipboardData.getData('text'))) {
      event.preventDefault()
    }
  }

  const isTextAddedOnBlur =
    isEmailLike(inputValue) && getKnownMembersFromText(inputValue).length > 0

  const handleBlur = (): void => {
    if (isTextAddedOnBlur && addMembersFromText(inputValue)) {
      onInputValueChange('')
    }
  }

  return {
    isTextAddedOnBlur,
    handleChange,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    handleBlur
  }
}
