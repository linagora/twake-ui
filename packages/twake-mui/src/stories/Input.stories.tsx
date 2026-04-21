import { TextField, Select, MenuItem, Stack, Box } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof TextField> = {
  title: 'Input',
  component: TextField,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'Label',
    variant: 'outlined',
    defaultValue: 'Sample text'
  }
}

// Visual Regression - All inputs combined
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      {/* TextField Variants */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>TextField Variants</h3>
        <Stack spacing={2}>
          <TextField
            label="Outlined"
            variant="outlined"
            defaultValue="Sample text"
          />
          <TextField
            label="Filled"
            variant="filled"
            defaultValue="Sample text"
          />
          <TextField
            label="Standard"
            variant="standard"
            defaultValue="Sample text"
          />
        </Stack>
      </section>

      {/* TextField States */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>TextField States</h3>
        <Stack spacing={2}>
          <TextField
            label="Normal"
            variant="outlined"
            defaultValue="Sample text"
          />
          <TextField
            label="Disabled"
            variant="outlined"
            defaultValue="Cannot edit"
            disabled
          />
          <TextField
            label="Error"
            variant="outlined"
            defaultValue="Invalid value"
            error
            helperText="This field has an error"
          />
          <TextField label="Required" variant="outlined" required />
        </Stack>
      </section>

      {/* Select Component */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Select</h3>
        <Box sx={{ minWidth: 200 }}>
          <Select value={10} fullWidth>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Box>
      </section>
    </Stack>
  )
}
