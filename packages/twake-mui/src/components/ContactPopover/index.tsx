import { Box, IconButton, Popover, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

import { Icon } from '@linagora/twake-icons'
import { Cross } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import { AttendeeInfo } from './AttendeeInfo'
import { ContactPopoverActions } from './ContactPopoverActions'
import { ContactPopoverCalendarAction } from './ContactPopoverCalendarAction'
import { ContactPopoverChatAction } from './ContactPopoverChatAction'
import { ContactPopoverEmailAction } from './ContactPopoverEmailAction'
import { ContactPopoverVideoAction } from './ContactPopoverVideoAction'
import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import it from './locales/it.json'
import ru from './locales/ru.json'
import vi from './locales/vi.json'

const locales = { de, en, es, fr, it, ru, vi }

const StyledPopoverContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  position: 'relative',
  minWidth: 'min(320px, calc(100vw - 32px))'
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
  /** Open the popover when the trigger is hovered, not only when clicked */
  openOnHover?: boolean
}

interface ContactPopoverComponent extends React.FC<ContactPopoverProps> {
  Actions: typeof ContactPopoverActions
  ChatAction: typeof ContactPopoverChatAction
  VideoAction: typeof ContactPopoverVideoAction
  CalendarAction: typeof ContactPopoverCalendarAction
  EmailAction: typeof ContactPopoverEmailAction
}

const ContactPopover: ContactPopoverComponent = ({
  name,
  email,
  children,
  onEmailCopy,
  onClose,
  disabled = false,
  openOnHover = true
}) => {
  useExtendI18n(locales)
  const { t } = useI18n()

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
        onMouseEnter={openOnHover ? handleTriggerMouseEnter : undefined}
        onMouseLeave={openOnHover ? handleTriggerMouseLeave : undefined}
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
              borderRadius: 2,
              maxWidth: 'min(400px, calc(100% - 32px))'
            },
            onMouseEnter: openOnHover ? handlePopoverMouseEnter : undefined,
            onMouseLeave: openOnHover ? handleMouseLeave : undefined
          }
        }}
      >
        <StyledPopoverContent onClick={event => event.stopPropagation()}>
          <CloseButton
            size="small"
            onClick={handleClose}
            aria-label={t('ContactPopover.closeButton')}
          >
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
