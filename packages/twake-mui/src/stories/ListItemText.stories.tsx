import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const longText =
  'Augusta Ada King, Countess of Lovelace (née Byron; 10 December 1815 – 27 November 1852) was an English mathematician and writer.'

const meta: Meta<typeof ListItemText> = {
  title: 'ListItemText',
  component: ListItemText,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    primary: { control: 'text' },
    secondary: { control: 'text' },
    inset: { control: 'boolean' },
    disableTypography: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    primary: "I'm a primary text",
    secondary: "I'm a secondary text"
  },
  render: args => (
    <List sx={{ width: 320 }}>
      <ListItem>
        <ListItemText {...args} />
      </ListItem>
    </List>
  )
}

// Visual Regression - Every example of the cozy-ui ListItemText doc
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4} sx={{ width: 480 }}>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Primary text</h3>
        <ListItemText primary="I'm a list item text" />
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>With secondary text</h3>
        <ListItemText
          primary="I'm a primary text"
          secondary="I'm a secondary text"
        />
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Custom content</h3>
        <ListItemText>
          <Typography variant="body1">I&apos;m a primary text</Typography>
          <Typography
            component="a"
            href="https://cozy.io"
            variant="caption"
            color="textSecondary"
          >
            {longText}
          </Typography>
        </ListItemText>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Ellipsis</h3>
        <ListItemText primary={longText} secondary={longText} />
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>In a list</h3>
        <List disablePadding>
          <ListItem>
            <ListItemText primary="I'm a primary text" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="I'm a primary text"
              secondary="I'm a secondary text"
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={longText} secondary={longText} />
          </ListItem>
        </List>
      </section>
    </Stack>
  )
}
