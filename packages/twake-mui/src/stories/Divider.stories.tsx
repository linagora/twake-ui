import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof Divider> = {
  title: 'Divider',
  component: Divider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    variant: { control: 'select', options: ['fullWidth', 'inset', 'middle'] },
    textAlign: { control: 'select', options: ['left', 'center', 'right'] },
    flexItem: { control: 'boolean' },
    children: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Box sx={{ width: 320 }}>
      <Divider {...args} />
    </Box>
  )
}

// Visual Regression - Every example of the cozy-ui Divider doc
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4} sx={{ width: 480 }}>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Vertical division</h3>
        <Box
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            p: 2
          }}
        >
          <Typography sx={{ mb: 2 }}>
            Here is some content in a card.
          </Typography>
          <Divider />
          <Typography sx={{ mt: 2 }}>
            Other content in a card, that is unrelated to the first paragraph.
          </Typography>
        </Box>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Horizontal division</h3>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Typography sx={{ mr: 2 }}>Left block</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography sx={{ ml: 2 }}>Right block</Typography>
        </Stack>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Text, default alignment</h3>
        <Divider>Text Left</Divider>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Text, centered</h3>
        <Divider textAlign="center">Text Center</Divider>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Inset, in a list</h3>
        <List disablePadding>
          <ListItemButton>
            <ListItemText primary="First item" />
          </ListItemButton>
          <Divider variant="inset" />
          <ListItemButton>
            <ListItemText primary="Second item" />
          </ListItemButton>
        </List>
      </section>
    </Stack>
  )
}
