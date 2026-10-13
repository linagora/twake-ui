import { Icon, Magnifier } from '@linagora/twake-icons'
import { Box, DialogTitle, InputBase, Typography } from '@mui/material'
import React, { useId } from 'react'

import { Dialog, DialogProps } from '../Dialog'

export interface SpotModalHint {
  /** The keys, as drawn: « ↑↓ », « ↵ », « Esc » */
  keys: string
  label: string
}

export interface SpotModalProps extends Omit<
  DialogProps,
  'title' | 'onChange' | 'onKeyDown' | 'children'
> {
  title: React.ReactNode
  inputLabel: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  /** Arrows and Enter: the results and their selection belong to the caller */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  inputRef?: React.Ref<HTMLInputElement>
  /** The combobox attributes of the field (`aria-controls`…) */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> &
    Record<string, unknown>
  bottomHints?: readonly SpotModalHint[]
  children?: React.ReactNode
}

// TODO: when CozyDialogs is migrated, see what this dialog can share with it
const SpotModal: React.FC<SpotModalProps> = ({
  title,
  inputLabel,
  placeholder,
  value,
  onChange,
  onKeyDown,
  inputRef,
  inputProps,
  bottomHints = [],
  children,
  slotProps,
  ...props
}) => {
  const titleId = useId()

  return (
    <Dialog
      size="medium"
      aria-labelledby={titleId}
      {...props}
      slotProps={{
        ...slotProps,
        paper: {
          ...slotProps?.paper,
          sx: {
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            // Same height whatever the number of results: the field never
            // jumps; high on the screen, as Spotlight
            height: { md: 'min(70vh, 640px)' },
            alignSelf: { md: 'flex-start' },
            mt: { md: '12vh' },
            borderRadius: { md: '16px' }
          }
        }
      }}
    >
      <DialogTitle
        id={titleId}
        sx={{
          px: 2.5,
          pt: 2,
          pb: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        {title}
      </DialogTitle>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2.5,
          py: 2,
          borderBottom: 1,
          borderColor: 'divider',
          color: 'text.secondary'
        }}
      >
        <Icon icon={Magnifier} size={24} aria-hidden />
        <InputBase
          inputRef={inputRef}
          fullWidth
          autoComplete="off"
          autoFocus
          placeholder={placeholder}
          value={value}
          inputProps={{ 'aria-label': inputLabel, ...inputProps }}
          sx={{ fontSize: 20, color: 'text.primary' }}
          onChange={event => onChange(event.target.value)}
          onKeyDown={onKeyDown}
        />
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>{children}</Box>
      {bottomHints.length > 0 && (
        <Box
          aria-hidden
          sx={theme => ({
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: 2,
            px: 2.5,
            py: 1,
            borderTop: 1,
            borderColor: 'divider',
            backgroundColor: theme.vars.palette.background.default
          })}
        >
          {bottomHints.map(hint => (
            <Typography
              key={hint.keys}
              variant="caption"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}
            >
              <Box
                component="kbd"
                sx={theme => ({
                  px: 0.75,
                  borderRadius: '6px',
                  border: 1,
                  borderColor: 'divider',
                  backgroundColor: theme.vars.palette.background.paper,
                  fontFamily: 'inherit'
                })}
              >
                {hint.keys}
              </Box>
              {hint.label}
            </Typography>
          ))}
        </Box>
      )}
    </Dialog>
  )
}

export default SpotModal
