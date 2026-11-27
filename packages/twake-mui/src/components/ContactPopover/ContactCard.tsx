import { Box, IconButton, PopoverOrigin, styled } from '@mui/material'
import React, { useId } from 'react'

import { Icon } from '@linagora/twake-icons'
import { Cross } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import Popover from '../Popover/index.js'
import { AttendeeInfo } from './AttendeeInfo.js'
import de from './locales/de.json' with { type: 'json' }
import en from './locales/en.json' with { type: 'json' }
import es from './locales/es.json' with { type: 'json' }
import fr from './locales/fr.json' with { type: 'json' }
import it from './locales/it.json' with { type: 'json' }
import mn from './locales/mn.json' with { type: 'json' }
import ru from './locales/ru.json' with { type: 'json' }
import vi from './locales/vi.json' with { type: 'json' }

const locales = { de, en, es, fr, it, mn, ru, vi }

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

const DEFAULT_ANCHOR_ORIGIN: PopoverOrigin = {
  vertical: 'center',
  horizontal: 'right'
}
const DEFAULT_TRANSFORM_ORIGIN: PopoverOrigin = {
  vertical: 'center',
  horizontal: 'left'
}

export interface ContactCardProps {
  /** Whether the card is shown */
  open: boolean
  /** Element the card is anchored to */
  anchorEl: HTMLElement | null
  /** Contact display name */
  name: string
  /** Contact email address */
  email: string
  /** Picks the colour of the avatar, the name (else the email) by default */
  avatarColorKey?: string
  /** Point of the anchor the card is attached to */
  anchorOrigin?: PopoverOrigin
  /** Point of the card attached to the anchor */
  transformOrigin?: PopoverOrigin
  /** Shown under the contact, e.g. `ContactPopover.Actions` */
  children?: React.ReactNode
  'data-testid'?: string
  /** Called on Escape, a click outside and the close button */
  onClose: () => void
  /** Callback once the email is in the clipboard, with the copy button */
  onEmailCopy?: (email: string, button: HTMLElement) => void
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
}

/**
 * Card of a contact in a popover the app opens itself: a dialog named after
 * the contact, closed by Escape, a click outside or its close button
 */
const ContactCard = ({
  open,
  anchorEl,
  name,
  email,
  avatarColorKey,
  anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
  transformOrigin = DEFAULT_TRANSFORM_ORIGIN,
  children,
  'data-testid': testId,
  onClose,
  onEmailCopy,
  onMouseEnter,
  onMouseLeave
}: ContactCardProps): React.ReactElement => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const titleId = useId()

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      data-testid={testId}
      slotProps={{
        paper: {
          role: 'dialog',
          'aria-modal': true,
          'aria-labelledby': titleId,
          elevation: 4,
          sx: {
            borderRadius: 2,
            maxWidth: 'min(400px, calc(100% - 32px))'
          },
          onMouseEnter,
          onMouseLeave
        }
      }}
    >
      <StyledPopoverContent onClick={event => event.stopPropagation()}>
        <CloseButton
          size="small"
          onClick={onClose}
          aria-label={t('ContactPopover.closeButton')}
        >
          <Icon icon={Cross} size={16} />
        </CloseButton>
        <AttendeeInfo
          titleId={titleId}
          name={name}
          email={email}
          avatarColorKey={avatarColorKey}
          onEmailCopy={onEmailCopy}
        />
        {children}
      </StyledPopoverContent>
    </Popover>
  )
}

export default ContactCard
