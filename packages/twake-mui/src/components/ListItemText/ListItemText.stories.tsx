import { Box, List, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { ListItemText } from './index'

const longText =
  'Ada Lovelace wrote the first algorithm meant to be carried out by a machine, long before any computer existed to run it.'

const meta: Meta<typeof ListItemText> = {
  title: 'ListItemText',
  component: ListItemText,
  tags: ['autodocs'],
  argTypes: {
    primary: { control: 'text' },
    secondary: { control: 'text' },
    ellipsis: { control: 'boolean' },
    inset: { control: 'boolean' },
    disableTypography: { control: 'boolean' }
  },
  decorators: [
    (Story): React.ReactElement => (
      <Box sx={{ maxWidth: 480 }}>
        <Story />
      </Box>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    primary: "I'm a primary text",
    secondary: "I'm a secondary text",
    ellipsis: true
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3>{title}</h3>
    {children}
  </section>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Row title="Primary text">
        <ListItemText primary="I'm a list item text" />
      </Row>
      <Row title="Secondary text">
        <ListItemText
          primary="I'm a primary text"
          secondary="I'm a secondary text"
        />
      </Row>
      <Row title="Custom">
        <ListItemText>
          <Typography variant="body1">I&apos;m a primary text</Typography>
          <Typography
            component="a"
            href="http://cozy.io"
            variant="caption"
            color="textSecondary"
          >
            {longText}
          </Typography>
        </ListItemText>
      </Row>
      <Row title="Ellipsis">
        <ListItemText primary={longText} secondary={longText} />
      </Row>
      <Row title="Without ellipsis">
        <ListItemText
          primary={longText}
          secondary={longText}
          ellipsis={false}
        />
      </Row>
      <Row title="Dense">
        <List dense disablePadding>
          <ListItemText
            primary="I'm a primary text"
            secondary="I'm a secondary text"
          />
        </List>
      </Row>
      <Row title="Inset">
        <ListItemText inset primary="I'm a primary text" />
      </Row>
      <Row title="Slot props">
        <ListItemText
          primary="I'm a primary text"
          secondary="I'm a secondary text"
          slotProps={{
            primary: { variant: 'caption' },
            secondary: { color: 'inherit', variant: 'body1' }
          }}
        />
      </Row>
    </Stack>
  )
}
