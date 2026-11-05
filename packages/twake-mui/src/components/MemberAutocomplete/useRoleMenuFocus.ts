import { useState } from 'react'

interface RoleMenuFocus {
  isFocusKept: boolean
  handleRoleMenuOpen: () => void
  handleRoleMenuClose: () => void
  handleInputFocus: () => void
}

/**
 * Keeps the field shown as focused while the role menu, opened from the focused input,
 * is open. On close, the input gets the focus back if the menu took it.
 * @param inputId - Id of the input
 */
export const useRoleMenuFocus = (inputId: string): RoleMenuFocus => {
  const [isFocusKept, setFocusKept] = useState(false)

  const handleRoleMenuOpen = (): void => {
    setFocusKept(document.activeElement?.id === inputId)
  }

  // A menu shown as a bottom sheet on mobile leaves the focus on the input
  const handleRoleMenuClose = (): void => {
    if (!isFocusKept) return

    const input = document.getElementById(inputId)
    if (document.activeElement === input) setFocusKept(false)
    else input?.focus()
  }

  const handleInputFocus = (): void => {
    setFocusKept(false)
  }

  return {
    isFocusKept,
    handleRoleMenuOpen,
    handleRoleMenuClose,
    handleInputFocus
  }
}
