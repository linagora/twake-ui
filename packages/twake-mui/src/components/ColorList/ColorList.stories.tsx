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
    getColorLabel: color => `Color ${color}`,
    customColorProps: { enabled: true, 'aria-label': 'Custom color' }
  },
  render: args => (
    <Box
      sx={{ width: args.size === 'medium' ? '100%' : { xs: '100%', md: 200 } }}
    >
      <SelectableColorList key={args.selectedColor} {...args} />
    </Box>
  )
}

export const ExtraColors: Story = {
  args: {
    extraColors: ['#617ADB', '#4896E5'],
    selectedColor: '#617ADB'
  },
  render: args => (
    <Box sx={{ width: { xs: '100%', md: 200 } }}>
      <SelectableColorList {...args} />
    </Box>
  )
}

export const CustomInput: Story = {
  args: {
    customColorProps: {
      enabled: true,
      'aria-label': 'Custom color',
      input: {
        label: 'Custom color (hexadecimal)',
        helperText: 'Format #RRGGBB, for example #1A2B3C',
        errorText: 'Enter a color as #RRGGBB'
      }
    }
  },
  render: args => (
    <Box sx={{ width: { xs: '100%', md: 280 } }}>
      <SelectableColorList {...args} />
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
      <Section title="Extra colors" width={200}>
        <ColorList
          size="small"
          extraColors={['#617ADB', '#4896E5']}
          selectedColor="#617ADB"
        />
      </Section>
      <Section title="Custom input" width={280}>
        <ColorList
          size="small"
          selectedColor="#1A2B3C"
          customColorProps={{
            enabled: true,
            input: {
              label: 'Custom color (hexadecimal)',
              helperText: 'Format #RRGGBB, for example #1A2B3C'
            }
          }}
        />
      </Section>
      <Section title="Custom input, invalid" width={280}>
        <ColorList
          size="small"
          selectedColor="#12"
          customColorProps={{
            enabled: true,
            input: {
              label: 'Custom color (hexadecimal)',
              errorText: 'Enter a color as #RRGGBB',
              showError: true
            }
          }}
        />
      </Section>
    </Stack>
  )
}
