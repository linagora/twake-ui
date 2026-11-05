import { CircularProgress, Stack } from '@mui/material'
import React, { useLayoutEffect, useRef } from 'react'

import MemberRoleMenu from '../MemberRow/MemberRoleMenu'
import { MemberRole } from '../MemberRow/types'

interface MemberAutocompleteActionsProps {
  roles?: MemberRole[]
  role?: string
  isLoading: boolean
  disabled: boolean
  onRoleChange?: (role: string) => void
  onRoleMenuOpen: () => void
  onRoleMenuClose: () => void
  onWidthChange: (width: number) => void
}

const MemberAutocompleteActions = ({
  roles,
  role,
  isLoading,
  disabled,
  onRoleChange,
  onRoleMenuOpen,
  onRoleMenuClose,
  onWidthChange
}: MemberAutocompleteActionsProps): React.JSX.Element | null => {
  const rootRef = useRef<HTMLDivElement>(null)
  const isRoleMenuShown = roles !== undefined && role !== undefined
  const hasActions = isLoading || isRoleMenuShown

  useLayoutEffect(() => {
    onWidthChange(rootRef.current ? rootRef.current.offsetWidth : 0)
  }, [roles, role, isLoading, onWidthChange])

  if (!hasActions) return null

  return (
    // Clicks and keys in the role menu, portaled or not, bubble to the Autocomplete root,
    // which would focus the input, remove the last member or pick a suggestion
    <Stack
      ref={rootRef}
      direction="row"
      className="u-pos-absolute u-right-m"
      sx={{ top: '.375rem', height: '2.375rem', alignItems: 'center', gap: 1 }}
      onClick={event => event.stopPropagation()}
      onKeyDown={event => event.stopPropagation()}
    >
      {isLoading && <CircularProgress size={16} />}
      {isRoleMenuShown && (
        <MemberRoleMenu
          value={role}
          roles={roles}
          size="small"
          disabled={disabled}
          onChange={newRole => onRoleChange?.(newRole)}
          onOpen={onRoleMenuOpen}
          onClose={onRoleMenuClose}
        />
      )}
    </Stack>
  )
}

export default MemberAutocompleteActions
