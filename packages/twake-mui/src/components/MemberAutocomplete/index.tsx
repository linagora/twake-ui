import { Autocomplete, Stack, TextField, Typography } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import React, { useId, useState } from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import Button from '../Button'
import { Member, MemberRole } from '../MemberRow/types'
import MemberAutocompleteActions from './MemberAutocompleteActions'
import MemberChip from './MemberChip'
import MemberSuggestion from './MemberSuggestion'
import { GetMembersFromText, getUnpickedMembers } from './helpers'
import { locales } from './locales'
import { useMemberInput } from './useMemberInput'
import { useMemberSuggestions } from './useMemberSuggestions'
import { useRoleMenuFocus } from './useRoleMenuFocus'

const LIMIT_TAGS = 3

const makeFieldSx = ({
  actionsWidth,
  hasMembers
}: {
  actionsWidth: number
  hasMembers: boolean
}): SxProps<Theme> => ({
  flexGrow: 1,
  '&& .MuiOutlinedInput-root.MuiAutocomplete-inputRoot': {
    padding: '.375rem .5625rem',
    ...(actionsWidth > 0 && {
      paddingRight: `calc(${actionsWidth}px + 1.5rem)`
    })
  },
  '&& .MuiAutocomplete-input': {
    padding: '.46875rem .25rem',
    ...(!hasMembers && { paddingLeft: '.4375rem' })
  }
})

const listboxSx: SxProps<Theme> = theme => ({
  maxHeight: '9rem',
  '& .MuiAutocomplete-option': {
    '&[aria-selected="true"]': { backgroundColor: 'transparent' },
    '&.Mui-focused, &:active, &[aria-selected="true"].Mui-focused': {
      backgroundColor: theme.vars.palette.action.selected
    }
  }
})

export interface MemberAutocompleteProps {
  /** Picked members, see `MemberRow` */
  value: Member[]
  /** Returns the local members matching a text */
  getSuggestions?: (text: string) => Member[]
  /** Resolves with the remote members matching a text, shown before the local ones */
  fetchSuggestions?: (text: string) => Promise<Member[] | undefined>
  /**
   * Turns a typed or pasted text (e.g. emails) into members, suggested when nothing matches.
   * Give them the `email` of the person, so that a suggested or picked one replaces them
   */
  getMembersFromText?: GetMembersFromText
  /** Text length from which `fetchSuggestions` is called */
  minQueryLength?: number
  /** Delay before calling `fetchSuggestions` */
  debounceMs?: number
  /** Roles the members can get */
  roles?: MemberRole[]
  /** Role given to the picked members */
  role?: string
  /** Title shown above the field */
  title?: string
  /** Placeholder of the field, shown while no member is picked */
  placeholder?: string
  /** Whether the suggestions are loading */
  loading?: boolean
  disabled?: boolean
  autoFocus?: boolean
  /** Called with the picked members */
  onChange: (members: Member[]) => void
  /** Called with the new role */
  onRoleChange?: (role: string) => void
  /** Shows a send button calling it */
  onSubmit?: () => void
}

const getNoSuggestions = (): Member[] => []

/** Field to pick the members to invite among suggestions, shown as chips */
const MemberAutocomplete = ({
  value,
  getSuggestions = getNoSuggestions,
  fetchSuggestions,
  getMembersFromText = getNoSuggestions,
  minQueryLength = 3,
  debounceMs = 300,
  roles,
  role,
  title,
  placeholder,
  loading = false,
  disabled = false,
  autoFocus = false,
  onChange,
  onRoleChange,
  onSubmit
}: MemberAutocompleteProps): React.JSX.Element => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const inputId = useId()
  const [inputValue, setInputValue] = useState('')
  const [actionsWidth, setActionsWidth] = useState(0)
  const { suggestions, isFetching } = useMemberSuggestions({
    inputValue,
    getSuggestions,
    fetchSuggestions,
    getMembersFromText,
    minQueryLength,
    debounceMs
  })
  const {
    isTextAddedOnBlur,
    handleChange,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    handleBlur
  } = useMemberInput({
    inputValue,
    value,
    suggestions,
    getMembersFromText,
    onInputValueChange: setInputValue,
    onChange
  })
  const {
    isFocusKept,
    handleRoleMenuOpen,
    handleRoleMenuClose,
    handleInputFocus
  } = useRoleMenuFocus(inputId)

  const titleId = `${inputId}-title`
  const isTitleShown = title !== undefined
  const isSubmitShown = onSubmit !== undefined
  const hasMembersToSend = value.length > 0 || isTextAddedOnBlur
  const isLoading = loading || isFetching
  const unpickedSuggestions = getUnpickedMembers(suggestions, value)
  const fieldPlaceholder = value.length === 0 ? placeholder : undefined

  return (
    <div>
      {isTitleShown && (
        <Typography id={titleId} variant="h5" className="u-mb-half">
          {title}
        </Typography>
      )}
      <Stack direction="row" sx={{ alignItems: 'flex-start' }}>
        <Autocomplete<Member, true, true, true>
          sx={makeFieldSx({ actionsWidth, hasMembers: value.length > 0 })}
          id={inputId}
          multiple
          freeSolo
          autoHighlight
          disableClearable
          limitTags={isFocusKept ? -1 : LIMIT_TAGS}
          disabled={disabled}
          options={unpickedSuggestions}
          value={value}
          inputValue={inputValue}
          filterOptions={allOptions => allOptions}
          getOptionLabel={option =>
            typeof option === 'string' ? option : (option.name ?? '')
          }
          isOptionEqualToValue={(option, picked) =>
            typeof picked !== 'string' && option.id === picked.id
          }
          slotProps={{
            paper: { className: 'u-mv-half u-bdrs-4' },
            listbox: { className: 'u-pv-half', sx: listboxSx }
          }}
          renderOption={({ key, className, ...optionProps }, suggestion) => (
            <li
              key={key}
              {...optionProps}
              className={`${className} u-p-0 u-mih-auto`}
            >
              <MemberSuggestion suggestion={suggestion} />
            </li>
          )}
          renderValue={(members, getItemProps) =>
            members.map((member, index) => {
              const { key, ...itemProps } = getItemProps({ index })
              return typeof member === 'string' ? null : (
                <MemberChip key={key} member={member} itemProps={itemProps} />
              )
            })
          }
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              type="email"
              placeholder={fieldPlaceholder}
              autoFocus={autoFocus}
              focused={isFocusKept || undefined}
              slotProps={{
                ...params.slotProps,
                input: {
                  ...params.slotProps.input,
                  endAdornment: (
                    <MemberAutocompleteActions
                      roles={roles}
                      role={role}
                      isLoading={isLoading}
                      disabled={disabled}
                      onRoleChange={onRoleChange}
                      onRoleMenuOpen={handleRoleMenuOpen}
                      onRoleMenuClose={handleRoleMenuClose}
                      onWidthChange={setActionsWidth}
                    />
                  )
                },
                htmlInput: {
                  ...params.slotProps.htmlInput,
                  'aria-labelledby': isTitleShown ? titleId : undefined,
                  onKeyDown: handleKeyDown,
                  onPaste: handlePaste
                }
              }}
              onFocus={handleInputFocus}
              onBlur={handleBlur}
            />
          )}
          onChange={handleChange}
          onInputChange={handleInputChange}
        />
        {isSubmitShown && (
          <Button
            className="u-ml-1"
            sx={{ marginTop: '.3125rem' }}
            disabled={disabled || !hasMembersToSend}
            onClick={onSubmit}
          >
            {t('MemberAutocomplete.send')}
          </Button>
        )}
      </Stack>
    </div>
  )
}

export default MemberAutocomplete
