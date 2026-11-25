import { Box, List, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import ListItemSkeleton, { ListItemSkeletonProps } from './index.js'

const meta: Meta<typeof ListItemSkeleton> = {
  title: 'ListItemSkeleton',
  component: ListItemSkeleton,
  tags: ['autodocs'],
  argTypes: {
    hasSecondary: { control: 'boolean' },
    divider: { control: 'boolean' },
    gutters: {
      control: 'select',
      options: ['default', 'double', 'disabled']
    }
  },
  decorators: [
    (Story): React.ReactElement => (
      <Box sx={{ maxWidth: 480 }}>
        <List>
          <Story />
        </List>
      </Box>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hasSecondary: false,
    divider: false,
    gutters: 'default'
  }
}

interface ExampleProps extends ListItemSkeletonProps {
  title: string
}

const Example: React.FC<ExampleProps> = ({ title, ...props }) => (
  <section>
    <h3>{title}</h3>
    <ListItemSkeleton {...props} />
  </section>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Example title="Default" />
      <Example title="With secondary" hasSecondary />
      <Example title="With divider" divider />
      <Example title="Disabled gutters" gutters="disabled" />
      <Example title="Double gutters" gutters="double" />
      <Example
        title="With secondary, divider and double gutters"
        hasSecondary
        divider
        gutters="double"
      />
    </Stack>
  )
}
