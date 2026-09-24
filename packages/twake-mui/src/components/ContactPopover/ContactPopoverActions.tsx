import { Box } from '@mui/material'
import React from 'react'

export interface ContactPopoverActionsProps {
  /** Action items rendered inside the actions bar */
  children: React.ReactNode
}

export const ContactPopoverActions = ({
  children
}: ContactPopoverActionsProps): JSX.Element => (
  <Box sx={{ display: 'flex', gap: 1 }}>{children}</Box>
)
