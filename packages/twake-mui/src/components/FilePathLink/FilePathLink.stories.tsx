import { Box, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import FilePathLink from './index'

const path =
  '/Partages reçus/Cozy 🗄 - Team/Customers & Partners 🛒/Xxxxxx (Xxxxxxxx)/4_Suivi opérationnel/Point de synchro'
const widths = [150, 250, 400]

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3>{title}</h3>
    {children}
  </section>
)

const meta: Meta<typeof FilePathLink> = {
  title: 'FilePathLink',
  component: FilePathLink,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    href: { control: 'text' },
    color: {
      control: 'select',
      options: ['textSecondary', 'textPrimary', 'primary', 'inherit']
    },
    underline: { control: 'select', options: ['hover', 'always', 'none'] },
    className: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: path,
    href: '/'
  }
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Section title="Default">
        <FilePathLink href="/">{path}</FilePathLink>
      </Section>
      <Section title="Underline always">
        <FilePathLink href="/" underline="always">
          {path}
        </FilePathLink>
      </Section>
      <Section title="Container widths">
        <Stack spacing={1}>
          {widths.map(width => (
            <Box key={width} sx={{ width }}>
              <FilePathLink href="/">{path}</FilePathLink>
            </Box>
          ))}
        </Stack>
      </Section>
    </Stack>
  )
}
