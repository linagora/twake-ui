import { Stack, TextField } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import PasswordField from './index'

// TextFieldProps is a union, which Storybook cannot infer args from
const meta: Meta<typeof TextField> = {
  title: 'PasswordField',
  component: PasswordField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    size: { control: 'select', options: ['small', 'medium'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'Cl4ude€st1Nu@ge'
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {children}
    </Stack>
  </section>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Row title="Default">
        <PasswordField defaultValue="Cl4ude€st1Nu@ge" />
        <PasswordField label="Password" defaultValue="Cl4ude€st1Nu@ge" />
        <PasswordField label="Password" />
      </Row>

      <Row title="Sizes">
        <PasswordField size="small" defaultValue="Cl4ude€st1Nu@ge" />
        <PasswordField size="medium" defaultValue="Cl4ude€st1Nu@ge" />
      </Row>

      <Row title="States">
        <PasswordField
          label="Disabled"
          disabled
          defaultValue="Cl4ude€st1Nu@ge"
        />
        <PasswordField
          label="Error"
          error
          helperText="Wrong password"
          defaultValue="Cl4ude€st1Nu@ge"
        />
      </Row>
    </Stack>
  )
}
