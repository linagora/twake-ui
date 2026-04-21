import { Typography, Paper, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof Typography> = {
  title: 'Typography',
  component: Typography,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {
  args: {
    variant: 'body1',
    children: 'This is sample typography text.'
  }
}

// Visual Regression - All typography combined
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Paper sx={{ p: 4, maxWidth: 600 }}>
      <Stack spacing={2}>
        {/* All Variants */}
        <section>
          <h3 style={{ marginBottom: '12px' }}>All Variants</h3>
          <Stack spacing={1}>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Typography variant="subtitle1">Subtitle 1</Typography>
            <Typography variant="subtitle2">Subtitle 2</Typography>
            <Typography variant="body1">
              Body 1 - This is the default body text style used for most
              content.
            </Typography>
            <Typography variant="body2">
              Body 2 - This is a smaller body text style for secondary content.
            </Typography>
            <Typography variant="button">Button Text</Typography>
            <Typography variant="caption">Caption text</Typography>
            <Typography variant="overline">OVERLINE TEXT</Typography>
          </Stack>
        </section>

        {/* Colors */}
        <section>
          <h3 style={{ marginBottom: '12px', marginTop: '24px' }}>Colors</h3>
          <Stack spacing={1}>
            <Typography color="primary">Primary color text</Typography>
            <Typography color="secondary">Secondary color text</Typography>
            <Typography color="error">Error color text</Typography>
            <Typography color="text.primary">Text primary color</Typography>
            <Typography color="text.secondary">Text secondary color</Typography>
          </Stack>
        </section>
      </Stack>
    </Paper>
  )
}
