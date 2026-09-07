import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import {
  Checkbox,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Box
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof Checkbox> = {
  title: 'Selection',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'error', 'warning', 'success', 'default']
    },
    size: { control: 'select', options: ['small', 'medium'] },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof Checkbox>

const CHECKBOX_COLORS = ['primary', 'error', 'warning', 'success'] as const

export const Default: Story = {
  args: { color: 'primary', size: 'medium' },
  render: args => (
    <FormControlLabel control={<Checkbox {...args} />} label="Checkbox" />
  )
}

// Visual Regression - All selection components
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      {/* Checkbox colors */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Checkbox Colors</h3>
        <Stack spacing={1}>
          {CHECKBOX_COLORS.map(color => (
            <Stack
              key={color}
              direction="row"
              spacing={4}
              sx={{ alignItems: 'center' }}
            >
              <Box sx={{ width: 80 }}>{color}</Box>
              <FormControlLabel
                control={<Checkbox color={color} />}
                label="Unchecked"
              />
              <FormControlLabel
                control={<Checkbox color={color} checked />}
                label="Checked"
              />
              <FormControlLabel
                control={<Checkbox color={color} indeterminate />}
                label="Indeterminate"
              />
              <FormControlLabel
                control={<Checkbox color={color} checked disabled />}
                label="Disabled"
              />
            </Stack>
          ))}
        </Stack>
      </section>

      {/* Checkbox sizes */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Checkbox Sizes</h3>
        <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
          <FormControlLabel
            control={<Checkbox size="small" checked />}
            label="Small"
          />
          <FormControlLabel
            control={<Checkbox size="medium" checked />}
            label="Medium"
          />
          <Checkbox size="small" checked />
          <Checkbox size="medium" checked />
        </Stack>
      </section>

      {/* Toggle Buttons */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Toggle Buttons</h3>
        <Box>
          <ToggleButtonGroup value={['bold']}>
            <ToggleButton value="bold" aria-label="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </section>
    </Stack>
  )
}
