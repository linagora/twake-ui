import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
  Stack
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof Checkbox> = {
  title: 'Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'error', 'default']
    },
    size: { control: 'select', options: ['medium', 'small'] },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    disableRipple: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <FormControlLabel control={<Checkbox {...args} />} label="Checkbox" />
  )
}

const noEffect: CheckboxProps = { disableRipple: true, sx: { p: 0 } }

const checkboxes: { label: string; props: CheckboxProps }[] = [
  { label: 'Checkbox', props: {} },
  { label: 'Small', props: { size: 'small' } },
  { label: 'Checked', props: { checked: true } },
  { label: 'Mixed', props: { indeterminate: true } },
  { label: 'Mixed checked', props: { indeterminate: true, checked: true } },
  { label: 'No effect', props: noEffect },
  { label: 'Small no effect', props: { ...noEffect, size: 'small' } }
]

const columns: { title: string; props: CheckboxProps }[] = [
  { title: 'Default', props: {} },
  { title: 'Disabled', props: { disabled: true } },
  { title: 'Error', props: { color: 'error' } },
  { title: 'Error disabled', props: { color: 'error', disabled: true } }
]

const Column: React.FC<{
  title: string
  props: CheckboxProps
  labelPlacement?: FormControlLabelProps['labelPlacement']
}> = ({ title, props, labelPlacement }) => (
  <Stack>
    <h4 style={{ margin: '0 0 8px' }}>{title}</h4>
    {checkboxes.map(checkbox => (
      <FormControlLabel
        key={checkbox.label}
        label={checkbox.label}
        labelPlacement={labelPlacement}
        control={<Checkbox {...checkbox.props} {...props} />}
      />
    ))}
  </Stack>
)

// Visual Regression - All selection components
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      {/* Checkbox */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Checkbox</h3>
        <Stack direction="row" spacing={4} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {columns.map(column => (
            <Column key={column.title} {...column} />
          ))}
        </Stack>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Checkbox, label before</h3>
        <Stack direction="row" spacing={4} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {columns.map(column => (
            <Column key={column.title} {...column} labelPlacement="start" />
          ))}
        </Stack>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Checkbox with complex label</h3>
        <FormControlLabel
          control={<Checkbox />}
          label={
            <>
              This is a <strong>complex</strong> text
            </>
          }
        />
      </section>
    </Stack>
  )
}
