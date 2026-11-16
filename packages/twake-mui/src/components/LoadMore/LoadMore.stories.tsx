import { Box, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import LoadMore, { LoadMoreProps } from './index'

const sleep = (timeout: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, timeout))

const InfiniteList: React.FC<
  Omit<LoadMoreProps, 'fetchMore'> & Partial<Pick<LoadMoreProps, 'fetchMore'>>
> = ({ fetchMore: onFetchMore, ...props }) => {
  const [elements, setElements] = useState([1, 2])

  const fetchMore = async (): Promise<void> => {
    onFetchMore?.()
    await sleep(1000)
    setElements(previous => [...previous, previous.length + 1])
  }

  return (
    <Box sx={{ height: 300, overflow: 'auto' }}>
      <Typography>Scroll down to load more.</Typography>
      {elements.map(element => (
        <Box key={element} sx={{ bgcolor: 'grey.500', height: 160, mb: 1 }} />
      ))}
      {elements.length < 25 && <LoadMore fetchMore={fetchMore} {...props} />}
    </Box>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3>{title}</h3>
    {children}
  </section>
)

const meta: Meta<typeof LoadMore> = {
  title: 'LoadMore',
  component: LoadMore,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    fetchMore: { action: 'fetchMore' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Load more'
  },
  render: args => <InfiniteList {...args} />
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Section title="Button">
        <LoadMore label="Load more" fetchMore={() => {}} />
      </Section>
      <Section title="Loading">
        <LoadMore label="Load more" fetchMore={() => new Promise(() => {})} />
      </Section>
    </Stack>
  )
}
