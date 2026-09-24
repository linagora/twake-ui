import { Icon } from '@linagora/twake-icons'
import { Cross } from '@linagora/twake-icons'
import { Box, IconButton, Popover, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

import { useExtendI18n } from 'twake-i18n'

import { AttendeeInfo } from './AttendeeInfo'
import { ContactPopoverActions } from './ContactPopoverActions'
import { ContactPopoverCalendarAction } from './ContactPopoverCalendarAction'
import { ContactPopoverChatAction } from './ContactPopoverChatAction'
import { ContactPopoverEmailAction } from './ContactPopoverEmailAction'
import { ContactPopoverVideoAction } from './ContactPopoverVideoAction'
import en from './locales/en.json'
import fr from './locales/fr.json'
import ru from './locales/ru.json'
import vi from './locales/vi.json'

const locales = { en, fr, ru, vi }

const StyledPopoverContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  position: 'relative',
  minWidth: 320
}))

const CloseButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 8,
  right: 8
}))

export interface ContactPopoverProps {
  /** Attendee display name */
  name: string
  /** Attendee email address */
  email: string
  /** Children element that triggers the popover, plus optional ContactPopover.Actions */
  children: React.ReactNode
  /** Callback when email is copied to clipboard */
  onEmailCopy?: (email: string) => void
  /** Callback when the popover closes */
  onClose?: () => void
  /** Disable the popover (render children only) */
  disabled?: boolean
}

interface ContactPopoverComponent extends React.FC<ContactPopoverProps> {
  Actions: typeof ContactPopoverActions
  ChatAction: typeof ContactPopoverChatAction
  VideoAction: typeof ContactPopoverVideoAction
  CalendarAction: typeof ContactPopoverCalendarAction
  EmailAction: typeof ContactPopoverEmailAction
}

export const ContactPopover: ContactPopoverComponent = ({
  name,
  email,
  children,
  onEmailCopy,
  onClose,
  disabled = false
}) => {
  useExtendI18n(locales)

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const clearOpenTimeout = (): void => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }
  }

  const clearCloseTimeout = (): void => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const handleTriggerMouseEnter = (
    event: React.MouseEvent<HTMLElement>
  ): void => {
    clearCloseTimeout()
    clearOpenTimeout()
    const target = event.currentTarget
    if (anchorEl) {
      setAnchorEl(target)
      return
    }
    openTimeoutRef.current = setTimeout(() => {
      setAnchorEl(target)
    }, 500)
  }

  const handleTriggerMouseLeave = (): void => {
    clearOpenTimeout()

    if (anchorEl) return
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setAnchorEl(null)
    }, 200)
  }

  const handlePopoverMouseEnter = (): void => {
    clearCloseTimeout()
    clearOpenTimeout()
  }

  const handleMouseLeave = (): void => {
    clearOpenTimeout()
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setAnchorEl(null)
    }, 200)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    clearOpenTimeout()
    clearCloseTimeout()
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleClose = (): void => {
    clearOpenTimeout()
    clearCloseTimeout()
    setAnchorEl(null)
    onClose?.()
  }

  useEffect(() => {
    return (): void => {
      clearOpenTimeout()
      clearCloseTimeout()
    }
  }, [])

  const childrenArray = React.Children.toArray(children)
  const actionsChild = childrenArray.find(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && child.type === ContactPopoverActions
  )
  const triggerChildren = childrenArray.filter(child => child !== actionsChild)

  if (disabled) {
    return <>{triggerChildren}</>
  }

  return (
    <div>
      <div
        onClick={handleClick}
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleClick(event as unknown as React.MouseEvent<HTMLElement>)
          }
        }}
        role="button"
        tabIndex={0}
        style={{
          display: 'inline-block',
          width: 'fit-content',
          cursor: 'pointer'
        }}
      >
        {triggerChildren}
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        slotProps={{
          paper: {
            elevation: 4,
            sx: {
              borderRadius: 2
            },
            onMouseEnter: handlePopoverMouseEnter,
            onMouseLeave: handleMouseLeave
          }
        }}
      >
        <StyledPopoverContent>
          <CloseButton size="small" onClick={handleClose}>
            <Icon icon={Cross} size={16} />
          </CloseButton>
          <AttendeeInfo name={name} email={email} onEmailCopy={onEmailCopy} />
          {actionsChild}
        </StyledPopoverContent>
      </Popover>
    </div>
  )
}

ContactPopover.Actions = ContactPopoverActions
ContactPopover.ChatAction = ContactPopoverChatAction
ContactPopover.VideoAction = ContactPopoverVideoAction
ContactPopover.CalendarAction = ContactPopoverCalendarAction
ContactPopover.EmailAction = ContactPopoverEmailAction

export {
  ContactPopoverActions,
  ContactPopoverChatAction,
  ContactPopoverVideoAction,
  ContactPopoverCalendarAction,
  ContactPopoverEmailAction
}

export default ContactPopover
