import {
  Badge,
  BadgeProps,
  Box,
  Button,
  ButtonProps,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { mergeSlotProps } from '@mui/material/utils'
import React, { useRef, useState } from 'react'

import { Camera, Icon, Pen, Spinner, Trash } from '@linagora/twake-icons'
import { useExtendI18n, useI18n } from 'twake-i18n'

import { useAlert } from '../../providers/AlertProvider/useAlert'
import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import it from './locales/it.json'
import ru from './locales/ru.json'
import vi from './locales/vi.json'

const locales = { de, en, es, fr, it, ru, vi }

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

type Status = 'PRESENT' | 'ABSENT' | 'LOADING'

export interface EditBadgeProps extends Omit<BadgeProps, 'badgeContent'> {
  /** Receives a timestamp that changes on each upload or deletion */
  src: (timestamp: number) => string
  onUpload: (file: File) => unknown
  onDelete: () => unknown
  componentsProps?: {
    /** Props spread to the badge button */
    button?: ButtonProps
  }
}

const EditButton = styled(Button)(({ theme }) => ({
  width: 40,
  minWidth: 'auto',
  padding: 0,
  borderRadius: '50%',
  outline: `4px solid ${theme.vars.palette.background.paper}`
}))

/** Badge with a button to upload or delete the image of its child, usually an Avatar */
const EditBadge = ({
  src,
  onUpload,
  onDelete,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  componentsProps,
  slotProps,
  children,
  ...props
}: EditBadgeProps): React.ReactElement => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const { showAlert } = useAlert()

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)
  const [status, setStatus] = useState<Status>('PRESENT')
  const [timestamp, setTimestamp] = useState(() => Date.now())

  const fileInputRef = useRef<HTMLInputElement>(null)

  const run = async (
    action: () => unknown,
    nextStatus: Status,
    alerts: 'upload' | 'delete'
  ): Promise<void> => {
    const previousStatus = status
    setStatus('LOADING')

    try {
      await action()
      setStatus(nextStatus)
      setTimestamp(Date.now())
      showAlert({
        message: t(`EditBadge.${alerts}.success`),
        severity: 'success'
      })
    } catch {
      setStatus(previousStatus)
      showAlert({ message: t(`EditBadge.${alerts}.error`), severity: 'error' })
    }
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0]
    // Without this, picking the same file again fires no change event
    event.target.value = ''
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      showAlert({ message: t('EditBadge.upload.file-size'), severity: 'error' })
      return
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      showAlert({ message: t('EditBadge.upload.file-type'), severity: 'error' })
      return
    }

    void run(() => onUpload(file), 'PRESENT', 'upload')
  }

  const childProps =
    status === 'PRESENT'
      ? {
          key: timestamp,
          src: src(timestamp),
          onError: (): void => setStatus('ABSENT')
        }
      : { key: timestamp }

  return (
    <>
      <Badge
        {...props}
        anchorOrigin={anchorOrigin}
        slotProps={{
          ...slotProps,
          // MUI hides the badge from assistive tech, here it holds a button
          badge: mergeSlotProps(slotProps?.badge, { 'aria-hidden': false })
        }}
        badgeContent={
          <EditButton
            {...componentsProps?.button}
            onClick={event => setMenuAnchor(event.currentTarget)}
          >
            <Icon icon={Pen} />
          </EditButton>
        }
      >
        {status === 'LOADING' ? (
          <>
            <Box sx={{ opacity: 0.5 }}>{children}</Box>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main'
              }}
            >
              <Icon icon={Spinner} spin size={24} />
            </Box>
          </>
        ) : (
          React.Children.map(children, child =>
            React.isValidElement(child)
              ? React.cloneElement(child, childProps)
              : child
          )
        )}
      </Badge>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
      <Menu
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem
          onClick={() => {
            setMenuAnchor(null)
            fileInputRef.current?.click()
          }}
        >
          <ListItemIcon>
            <Icon icon={Camera} />
          </ListItemIcon>
          <ListItemText primary={t('EditBadge.menu.update')} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenuAnchor(null)
            void run(onDelete, 'ABSENT', 'delete')
          }}
        >
          <ListItemIcon>
            <Icon icon={Trash} />
          </ListItemIcon>
          <ListItemText primary={t('EditBadge.menu.delete')} />
        </MenuItem>
      </Menu>
    </>
  )
}

export default EditBadge
