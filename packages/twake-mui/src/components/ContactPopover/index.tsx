import { PopoverOrigin } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

import ContactCard from './ContactCard'
import { ContactPopoverActions } from './ContactPopoverActions'
import { ContactPopoverCalendarAction } from './ContactPopoverCalendarAction'
import { ContactPopoverChatAction } from './ContactPopoverChatAction'
import { ContactPopoverEmailAction } from './ContactPopoverEmailAction'
import { ContactPopoverVideoAction } from './ContactPopoverVideoAction'

export interface ContactPopoverProps {
  /** Attendee display name */
  name: string
  /** Attendee email address */
  email: string
  /** Children element that triggers the popover, plus optional ContactPopover.Actions */
  children: React.ReactNode
  /** Callback once the email is in the clipboard, with the copy button */
  onEmailCopy?: (email: string, button: HTMLElement) => void
  /** Callback when the popover closes */
  onClose?: () => void
  /** Disable the popover (render children only) */
  disabled?: boolean
  /** Open the popover when the trigger is hovered, not only when clicked */
  openOnHover?: boolean
  /** Point of the trigger the popover is attached to */
  anchorOrigin?: PopoverOrigin
  /** Point of the popover attached to the trigger */
  transformOrigin?: PopoverOrigin
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
  openOnHover = true,
  anchorOrigin,
  transformOrigin
}) => {
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
      <ContactCard
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        name={name}
        email={email}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClose={handleClose}
        onEmailCopy={onEmailCopy}
        onMouseEnter={openOnHover ? handlePopoverMouseEnter : undefined}
        onMouseLeave={openOnHover ? handleMouseLeave : undefined}
      >
        {actionsChild}
      </ContactCard>
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
