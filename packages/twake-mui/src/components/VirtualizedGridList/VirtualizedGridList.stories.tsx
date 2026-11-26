import { Box, Paper, Typography, styled } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import VirtualizedGridList, { VirtualizedGridListProps } from './index.js'

const items = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`)

const GridListRoot = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: theme.spacing(1),
  padding: theme.spacing(1)
}))

const components: VirtualizedGridListProps['components'] = {
  List: GridListRoot
}

const renderItem = (index: number): React.ReactElement => (
  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
    <Typography variant="body2">{items[index]}</Typography>
  </Paper>
)

const meta: Meta<typeof VirtualizedGridList> = {
  title: 'VirtualizedGridList',
  component: VirtualizedGridList,
  tags: ['autodocs'],
  decorators: [
    (Story): React.ReactElement => (
      <Box sx={{ height: 400, border: 1, borderColor: 'divider' }}>
        <Story />
      </Box>
    )
  ],
  argTypes: {
    items: { control: 'object' },
    totalCount: { control: 'number' },
    overscan: { control: 'number' },
    useWindowScroll: { control: 'boolean' },
    components: { control: false },
    context: { control: false },
    itemContent: { control: false }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items,
    components,
    itemContent: renderItem
  }
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <VirtualizedGridList
      items={items}
      components={components}
      itemContent={renderItem}
    />
  )
}
