import React from 'react'

import { CalendarToday } from '@linagora/twake-icons'
import { useI18n } from 'twake-i18n'

import { ContactPopoverIconAction } from './ContactPopoverIconAction'

export interface ContactPopoverCalendarActionProps {
  /** URL for calendar action (e.g., view attendee's calendar) */
  url?: string
  /** Callback when the action is clicked, used when no url is given */
  onClick?: () => void
  /** Disable the action button */
  disabled?: boolean
  /** Accessible name and tooltip of the action, defaults to "Plan a meeting" */
  label?: string
}

export const ContactPopoverCalendarAction = ({
  url,
  onClick,
  disabled = false,
  label
}: ContactPopoverCalendarActionProps): React.ReactElement => {
  const { t } = useI18n()
  return (
    <ContactPopoverIconAction
      icon={CalendarToday}
      label={label ?? t('ContactPopover.calendarButton')}
      url={url}
      onClick={onClick}
      disabled={disabled}
    />
  )
}
