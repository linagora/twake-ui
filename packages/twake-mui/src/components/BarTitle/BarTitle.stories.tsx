import { Box, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import BarTitle from './index'

const longTitle =
  'Ada Lovelace, born Augusta Ada Byron, was an English mathematician and writer chiefly known for her work on the Analytical Engine'

const BarArea: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ border: '1px solid red' }}>{children}</Box>
)

const meta: Meta<typeof BarTitle> = {
  title: 'BarTitle',
  component: BarTitle,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    noWrap: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'My transactions',
    noWrap: false
  },
  render: args => (
    <BarArea>
      <BarTitle {...args} />
    </BarArea>
  )
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <section>
        <h3>Basic usage</h3>
        <BarArea>
          <BarTitle>My transactions</BarTitle>
        </BarArea>
      </section>
      <section>
        <h3>Long title with ellipsis</h3>
        <BarArea>
          <BarTitle noWrap>{longTitle}</BarTitle>
        </BarArea>
      </section>
    </Stack>
  )
}
