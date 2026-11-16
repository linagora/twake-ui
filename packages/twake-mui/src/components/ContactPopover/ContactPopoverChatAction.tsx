import React from 'react'

import { Discuss } from '@linagora/twake-icons'
import { useI18n } from 'twake-i18n'

import { ContactPopoverIconAction } from './ContactPopoverIconAction'

export interface ContactPopoverChatActionProps {
  /** URL for chat action (e.g., Twake Chat link) */
  url?: string
  /** Callback when the action is clicked, used when no url is given */
  onClick?: () => void
  /** Disable the action button */
  disabled?: boolean
  /** Accessible name and tooltip of the action, defaults to "Open a chat" */
  label?: string
}

export const ContactPopoverChatAction = ({
  url,
  onClick,
  disabled = false,
  label
}: ContactPopoverChatActionProps): React.ReactElement => {
  const { t } = useI18n()
  return (
    <ContactPopoverIconAction
      icon={Discuss}
      label={label ?? t('ContactPopover.chatButton')}
      url={url}
      onClick={onClick}
      disabled={disabled}
    />
  )
}
