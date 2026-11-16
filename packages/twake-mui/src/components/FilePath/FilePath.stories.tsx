import { Box, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import FilePath from './index'

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

const meta: Meta<typeof FilePath> = {
  title: 'FilePath',
  component: FilePath,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: path
  }
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Section title="Default">
        <FilePath>{path}</FilePath>
      </Section>
      <Section title="Container widths">
        <Stack spacing={1}>
          {widths.map(width => (
            <Box key={width} sx={{ width }}>
              <FilePath>{path}</FilePath>
            </Box>
          ))}
        </Stack>
      </Section>
      <Section title="Custom className">
        <FilePath className="u-error">{path}</FilePath>
      </Section>
    </Stack>
  )
}
