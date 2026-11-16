import React from 'react'

import { Camera } from '@linagora/twake-icons'
import { useI18n } from 'twake-i18n'

import { ContactPopoverIconAction } from './ContactPopoverIconAction'

export interface ContactPopoverVideoActionProps {
  /** URL for video call action (e.g., Twake Meet link) */
  url?: string
  /** Callback when the action is clicked, used when no url is given */
  onClick?: () => void
  /** Disable the action button */
  disabled?: boolean
  /** Accessible name and tooltip of the action, defaults to "Start a video call" */
  label?: string
}

export const ContactPopoverVideoAction = ({
  url,
  onClick,
  disabled = false,
  label
}: ContactPopoverVideoActionProps): React.ReactElement => {
  const { t } = useI18n()
  return (
    <ContactPopoverIconAction
      icon={Camera}
      label={label ?? t('ContactPopover.videoButton')}
      url={url}
      onClick={onClick}
      disabled={disabled}
    />
  )
}
