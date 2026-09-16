import { Check } from '@linagora/twake-icons'
import {
  Divider,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  Stack,
  Typography
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Switch, SwitchProps } from './index'

const colors = ['primary', 'secondary', 'success', 'default'] as const

const meta: Meta<typeof Switch> = {
  title: 'Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: colors },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    icon: { control: 'boolean', mapping: { true: Check, false: undefined } }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const StateSwitch: React.FC<SwitchProps> = ({ defaultChecked, ...props }) => {
  const [checked, setChecked] = React.useState(!!defaultChecked)

  return (
    <Switch
      checked={checked}
      onChange={event => setChecked(event.target.checked)}
      {...props}
    />
  )
}

export const Default: Story = {
  args: { color: 'primary' },
  render: args => <StateSwitch defaultChecked {...args} />
}

const Labelled: React.FC<{
  labelPlacement?: FormControlLabelProps['labelPlacement']
}> = ({ labelPlacement }) => (
  <Stack spacing={1}>
    <Typography variant="h4">With labels</Typography>
    <FormGroup row>
      <FormControlLabel
        control={<Switch color="primary" />}
        label="With label"
        labelPlacement={labelPlacement}
      />
      <FormControlLabel
        control={<Switch color="primary" checked />}
        label="With label - checked"
        labelPlacement={labelPlacement}
      />
    </FormGroup>
    <Typography variant="h5">With disable</Typography>
    {colors.map(color => (
      <FormGroup key={color} row>
        <FormControlLabel
          control={<Switch color={color} disabled />}
          label={color}
          labelPlacement={labelPlacement}
        />
        <FormControlLabel
          control={<Switch color={color} checked disabled />}
          label={`${color} - checked`}
          labelPlacement={labelPlacement}
        />
      </FormGroup>
    ))}
    <FormGroup row>
      <FormControlLabel
        control={<Switch color="primary" icon={Check} disabled />}
        label="primary with icon"
        labelPlacement={labelPlacement}
      />
      <FormControlLabel
        control={<Switch color="primary" icon={Check} checked disabled />}
        label="primary with icon - checked"
        labelPlacement={labelPlacement}
      />
    </FormGroup>
  </Stack>
)

// Visual Regression - Every example of the cozy-ui Switch doc
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={2}>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Colors, with icon</h3>
        {colors.map(color => (
          <Stack key={color} direction="row" sx={{ alignItems: 'center' }}>
            <Typography sx={{ width: 96 }}>{color}:</Typography>
            <Switch color={color} icon={Check} />
            <Switch color={color} icon={Check} checked />
          </Stack>
        ))}
      </section>
      <Divider />
      <section>
        <Labelled />
      </section>
      <Divider />
      <section>
        <h3 style={{ marginBottom: '12px' }}>Label before</h3>
        <Labelled labelPlacement="start" />
      </section>
    </Stack>
  )
}
