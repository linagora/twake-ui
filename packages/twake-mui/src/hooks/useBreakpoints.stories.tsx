import { Box, Chip, Stack, Typography, useTheme } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { FC } from 'react'

import { useBreakpoints } from './useBreakpoints'

const meta: Meta = {
  title: 'Hooks/useBreakpoints',
  parameters: { layout: 'padded' },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

const expectedRanges = {
  isMobile: '0 – 768',
  isTablet: '769 – 1023',
  isDesktop: '1024 – ∞',
  isExtraLarge: '1201 – ∞'
}

const BreakpointsTable: FC = () => {
  const theme = useTheme()
  const breakpoints = useBreakpoints()

  return (
    <Stack spacing={2}>
      <Typography variant="body2">
        Valeurs du thème : {JSON.stringify(theme.breakpoints.values)}
      </Typography>
      {Object.entries(breakpoints).map(([key, isActive]) => (
        <Stack
          key={key}
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center' }}
        >
          <Box sx={{ width: 140 }}>
            <Typography variant="body1">{key}</Typography>
          </Box>
          <Box sx={{ width: 120 }}>
            <Typography variant="body2" color="text.secondary">
              {expectedRanges[key as keyof typeof expectedRanges]}
            </Typography>
          </Box>
          <Chip
            label={String(isActive)}
            color={isActive ? 'success' : 'default'}
            size="small"
          />
        </Stack>
      ))}
    </Stack>
  )
}

export const Default: Story = {
  render: () => <BreakpointsTable />
}
