import { Grid, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const variants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'button',
  'overline',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption'
] as const

const colors = [
  'inherit',
  'primary',
  'secondary',
  'textPrimary',
  'textSecondary',
  'textDisabled',
  'success',
  'error',
  'warning',
  'info'
] as const

const meta: Meta<typeof Typography> = {
  title: 'Typography',
  component: Typography,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: variants },
    color: { control: 'select', options: colors },
    align: {
      control: 'select',
      options: ['inherit', 'left', 'center', 'right', 'justify']
    },
    noWrap: { control: 'boolean' },
    gutterBottom: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'body1',
    children: 'This is sample typography text.'
  }
}

// Visual Regression - The cozy-ui grid, every variant for every colour
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Default colors</h3>
        <Stack spacing={1}>
          {variants.map(variant => (
            <Typography key={variant} variant={variant}>
              {variant}
            </Typography>
          ))}
        </Stack>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Colors</h3>
        <Grid container spacing={2}>
          {colors.map(color => (
            <Grid key={color} size={{ xs: 6, sm: 3, md: 2 }}>
              <Stack spacing={1}>
                <div>{color}</div>
                {variants.map(variant => (
                  <Typography key={variant} variant={variant} color={color}>
                    {variant}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </section>
    </Stack>
  )
}
