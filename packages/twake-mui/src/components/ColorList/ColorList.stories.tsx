import { Box, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import { COLORS } from './helpers'
import ColorList, { ColorListProps } from './index'

const meta: Meta<typeof ColorList> = {
  title: 'ColorList',
  component: ColorList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [undefined, 'small', 'medium']
    },
    selectedColor: {
      control: 'select',
      options: [undefined, ...COLORS]
    },
    customColorProps: { control: 'object' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const SelectableColorList: React.FC<ColorListProps> = props => {
  const [selectedColor, setSelectedColor] = useState(props.selectedColor)

  return (
    <ColorList
      {...props}
      selectedColor={selectedColor}
      onClick={setSelectedColor}
    />
  )
}

export const Default: Story = {
  args: {
    customColorProps: { enabled: true }
  },
  render: args => (
    <Box
      sx={{ width: args.size === 'medium' ? '100%' : { xs: '100%', md: 200 } }}
    >
      <SelectableColorList key={args.selectedColor} {...args} />
    </Box>
  )
}

const Section: React.FC<{
  title: string
  width?: number
  children: React.ReactNode
}> = ({ title, width, children }) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    <Box sx={{ width }}>{children}</Box>
  </section>
)

const customColorProps = { enabled: true }

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Section title="Small" width={200}>
        <ColorList
          size="small"
          selectedColor={COLORS[4]}
          customColorProps={customColorProps}
        />
      </Section>
      <Section title="Medium">
        <ColorList
          size="medium"
          selectedColor={COLORS[4]}
          customColorProps={customColorProps}
        />
      </Section>
      <Section title="Without custom color" width={200}>
        <ColorList size="small" />
      </Section>
    </Stack>
  )
}
