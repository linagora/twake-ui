import { File, Icon } from '@linagora/twake-icons'
import {
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  TextFieldProps
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const options = [
  { value: 'value1', label: 'Item 1' },
  { value: 'value2', label: 'Item 2' },
  { value: 'value3', label: 'Item 3' }
]

const meta: Meta<typeof TextField> = {
  title: 'TextField',
  component: TextField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['outlined', 'filled', 'standard'] },
    size: { control: 'select', options: ['medium', 'small'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    multiline: { control: 'boolean' },
    select: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
    defaultValue: 'Sample text'
  }
}

const adornments = {
  startAdornment: (
    <InputAdornment position="start">
      <Icon icon={File} style={{ marginRight: 8 }} />
      Ko
    </InputAdornment>
  ),
  endAdornment: <InputAdornment position="end">Ko</InputAdornment>
}

const items = options.map(option => (
  <MenuItem key={option.value} value={option.value}>
    {option.label}
  </MenuItem>
))

// One enabled and one disabled field
const Pair: React.FC<TextFieldProps> = props => (
  <Stack direction="row" spacing={2}>
    <TextField {...props} />
    <TextField disabled {...props} />
  </Stack>
)

// Every example of the cozy-ui TextField doc, for one set of variant props
const Examples: React.FC<TextFieldProps & { withIcons?: boolean }> = ({
  withIcons,
  ...props
}) => {
  const input = withIcons ? adornments : undefined

  return (
    <Stack spacing={2}>
      <div>No label</div>
      <Pair slotProps={{ input }} {...props} />
      <div>Empty</div>
      <Pair label="Label" slotProps={{ input }} {...props} />
      <div>Placeholder</div>
      <Pair
        label="Label"
        placeholder="placeholder"
        slotProps={{ input, inputLabel: { shrink: true } }}
        {...props}
      />
      <div>Default value</div>
      <Pair
        label="Label"
        defaultValue="Default value"
        slotProps={{ input }}
        {...props}
      />
      <div>Multiline</div>
      <Pair label="Label" multiline rows={4} slotProps={{ input }} {...props} />
      <div>Select</div>
      <Pair label="Label" select defaultValue="value2" {...props}>
        {items}
      </Pair>
      <div>Multiple select</div>
      <Pair
        label="Label"
        select
        defaultValue={['value2', 'value3']}
        slotProps={{ select: { multiple: true } }}
        {...props}
      >
        {items}
      </Pair>
    </Stack>
  )
}

// Visual Regression - All inputs combined
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack direction="row" spacing={4} useFlexGap sx={{ flexWrap: 'wrap' }}>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Medium</h3>
        <Examples />
      </section>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Small</h3>
        <Examples size="small" />
      </section>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Helper text</h3>
        <Examples helperText="This is an helper text" />
      </section>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Error</h3>
        <Examples error />
      </section>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Error, helper text</h3>
        <Examples error helperText="This is an helper text" />
      </section>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Required, with icons</h3>
        <Examples required withIcons />
      </section>
    </Stack>
  )
}
