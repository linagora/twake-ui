import { Box, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import ListSkeleton, { ListSkeletonProps } from './index.js'

const meta: Meta<typeof ListSkeleton> = {
  title: 'ListSkeleton',
  component: ListSkeleton,
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 1 } },
    hasSecondary: { control: 'boolean' },
    withSubheader: { control: 'boolean' },
    divider: { control: 'boolean' }
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
    count: 5,
    hasSecondary: false,
    withSubheader: false,
    divider: false
  }
}

interface ExampleProps extends ListSkeletonProps {
  title: string
}

const Example: React.FC<ExampleProps> = ({ title, ...props }) => (
  <section>
    <h3>{title}</h3>
    <ListSkeleton count={3} {...props} />
  </section>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Example title="Default" />
      <Example title="With secondary" hasSecondary />
      <Example title="With subheader" withSubheader />
      <Example title="With divider" divider />
      <Example
        title="With secondary, subheader and divider"
        hasSecondary
        withSubheader
        divider
      />
    </Stack>
  )
}
