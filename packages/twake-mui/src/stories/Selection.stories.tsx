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
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => <FormControlLabel control={<Checkbox />} label="Checkbox" />
}

// Visual Regression - All selection components
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      {/* Checkbox States */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Checkbox States</h3>
        <Stack direction="row" spacing={4}>
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label="Unchecked"
          />
          <FormControlLabel
            control={<Checkbox checked={true} />}
            label="Checked"
          />
          <FormControlLabel
            control={<Checkbox indeterminate={true} />}
            label="Indeterminate"
          />
          <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
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
