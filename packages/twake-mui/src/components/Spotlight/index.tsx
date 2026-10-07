import { Icon, Magnifier } from '@linagora/twake-icons'
import { Box, InputBase, Typography } from '@mui/material'
import React, { useId } from 'react'

import { Dialog, DialogProps } from '../Dialog'

export interface SpotlightHint {
  /** The keys, as drawn: « ↑↓ », « ↵ », « Esc » */
  keys: string
  label: string
}

export interface SpotlightProps extends Omit<
  DialogProps,
  'title' | 'onChange' | 'onKeyDown' | 'children'
> {
  /** The accessible name of the dialog and of its field */
  label: string
  /** Shown above the field; the dialog is named by `label` without it */
  title?: React.ReactNode
  placeholder?: string
  value: string
  onChange: (value: string) => void
  /** Arrows and Enter: the results and their selection belong to the caller */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  inputRef?: React.Ref<HTMLInputElement>
  /** The combobox attributes of the field (`aria-controls`…) */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> &
    Record<string, unknown>
  /** The keys at the bottom */
  hints?: readonly SpotlightHint[]
  children?: React.ReactNode
}

/**
 * A large dialog high on the screen, a big search field on top, the results
 * below and the keys at the bottom, as Spotlight on a Mac. Full screen on
 * mobile, as every `Dialog` but the small one.
 */
export const Spotlight: React.FC<SpotlightProps> = ({
  label,
  title,
  placeholder,
  value,
  onChange,
  onKeyDown,
  inputRef,
  inputProps,
  hints = [],
  children,
  slotProps,
  ...props
}) => {
  const titleId = useId()

  return (
    <Dialog
      size="medium"
      aria-label={title ? undefined : label}
      aria-labelledby={title ? titleId : undefined}
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
      {title && (
        <Typography
          id={titleId}
          component="h2"
          variant="h6"
          sx={{ px: 2.5, pt: 2, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          {title}
        </Typography>
      )}
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
          placeholder={placeholder}
          value={value}
          inputProps={{ 'aria-label': label, ...inputProps }}
          sx={{ fontSize: 20, color: 'text.primary' }}
          onChange={event => onChange(event.target.value)}
          onKeyDown={onKeyDown}
        />
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>{children}</Box>
      {hints.length > 0 && (
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
          {hints.map(hint => (
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

export interface SpotlightSectionProps extends React.ComponentPropsWithoutRef<'ul'> {
  /** The small title above the results of the group */
  title: string
}

/** A group of results under a small title. Its children are list items. */
export const SpotlightSection: React.FC<SpotlightSectionProps> = ({
  title,
  children,
  ...props
}) => {
  const titleId = useId()

  return (
    <Box
      component="ul"
      role="group"
      aria-labelledby={titleId}
      {...props}
      sx={{ m: 0, p: 0, mb: 1 }}
    >
      <Typography
        id={titleId}
        component="li"
        role="presentation"
        variant="caption"
        color="text.secondary"
        sx={{
          listStyle: 'none',
          display: 'block',
          px: 2.5,
          pt: 1,
          pb: 0.5,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  )
}

export default Spotlight
