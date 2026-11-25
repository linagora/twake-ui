import { Box, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useEffect, useRef } from 'react'
import { waitFor, within } from 'storybook/test'

import { Plus } from '@linagora/twake-icons'

import ExtendableFab, { ExtendableFabProps } from './index.js'

const meta: Meta<typeof ExtendableFab> = {
  title: 'ExtendableFab',
  component: ExtendableFab,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: {
    label: 'Create',
    icon: Plus,
    color: 'primary',
    size: 'medium',
    scrollOptions: { delay: 250 }
  },
  argTypes: {
    label: { control: 'text' },
    icon: { control: false },
    follow: { control: false },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'inherit']
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    scrollOptions: { control: 'object' },
    disabled: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const ScrollingList = (args: ExtendableFabProps): React.ReactElement => {
  const listRef = useRef<HTMLDivElement>(null)
  return (
    <Box sx={{ position: 'relative', height: 320, width: 320 }}>
      <Box ref={listRef} sx={{ height: '100%', overflowY: 'auto', p: 2 }}>
        {Array.from({ length: 40 }, (_, index) => (
          <Box key={index} sx={{ py: 1 }}>
            File {index + 1}
          </Box>
        ))}
      </Box>
      <ExtendableFab
        {...args}
        follow={listRef}
        sx={{ position: 'absolute', right: 16, bottom: 16 }}
      />
    </Box>
  )
}

export const Default: Story = {
  render: args => (
    <Box sx={{ p: 2 }}>
      <Box sx={{ pb: 2 }}>Scroll the list: the button folds until it stops</Box>
      <ScrollingList {...args} />
    </Box>
  )
}

const DELAY = 200

// Each row follows its own box; the folded one keeps turning the wheel, so
// it stays folded however long the screenshot takes
const Row = ({ scrolling }: { scrolling: boolean }): React.ReactElement => {
  const rowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!scrolling) return
    const interval = setInterval(() => {
      rowRef.current?.dispatchEvent(new WheelEvent('wheel', { bubbles: true }))
      rowRef.current?.dispatchEvent(new Event('scroll'))
    }, DELAY / 4)
    return (): void => clearInterval(interval)
  }, [scrolling])

  return (
    <Stack
      ref={rowRef}
      data-testid={scrolling ? 'folded' : 'extended'}
      direction="row"
      spacing={2}
      useFlexGap
      sx={{ flexWrap: 'wrap' }}
    >
      {(['small', 'medium', 'large'] as const).map(size => (
        <ExtendableFab
          key={size}
          label="Create"
          icon={Plus}
          color="primary"
          size={size}
          follow={rowRef}
          scrollOptions={{ delay: DELAY }}
        />
      ))}
      <ExtendableFab
        label="Create"
        icon={Plus}
        color="inherit"
        follow={rowRef}
        scrollOptions={{ delay: DELAY }}
      />
    </Stack>
  )
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Row scrolling={false} />
      <Row scrolling />
    </Stack>
  ),
  play: async ({ canvas }) => {
    const folded = within(canvas.getByTestId('folded')).getAllByRole('button')
    await waitFor(() => {
      const isFolded = folded.every(button => {
        const { width, height } = button.getBoundingClientRect()
        return width === height
      })
      if (!isFolded) throw new Error('The second row is not folded yet')
    })
  }
}
