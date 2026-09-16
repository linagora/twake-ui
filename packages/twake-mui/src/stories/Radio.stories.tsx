import {
  Box,
  FormControlLabel,
  FormControlLabelProps,
  Radio,
  RadioGroup,
  Stack
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof Radio> = {
  title: 'Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'error', 'default']
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    edge: { control: 'select', options: [false, 'start', 'end'] }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <FormControlLabel control={<Radio {...args} />} label="Radio" />
  )
}

// The cozy-ui doc group, `secondary` being its error-coloured "intent"
const Group: React.FC<{
  labelPlacement?: FormControlLabelProps['labelPlacement']
}> = ({ labelPlacement }) => (
  <RadioGroup aria-label="radio" name="radioName" defaultValue="item1">
    <FormControlLabel
      value="item1"
      label="This is a radio button"
      labelPlacement={labelPlacement}
      control={<Radio />}
    />
    <FormControlLabel
      value="item2"
      label="This is an intent radio button"
      labelPlacement={labelPlacement}
      control={<Radio color="error" />}
    />
    <FormControlLabel
      value="item3"
      label="This is a disabled radio button"
      labelPlacement={labelPlacement}
      control={<Radio disabled />}
    />
    <FormControlLabel
      value="item4"
      label="This is a checked disabled radio button"
      labelPlacement={labelPlacement}
      control={<Radio checked disabled />}
    />
    <FormControlLabel
      value="item5"
      label="This is a edge start radio button"
      labelPlacement={labelPlacement}
      control={<Radio edge="start" />}
    />
    <FormControlLabel
      value="item6"
      label="This is a edge end radio button"
      labelPlacement={labelPlacement}
      control={<Radio edge="end" />}
    />
  </RadioGroup>
)

const DashedBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      width: '3rem',
      height: '3rem',
      border: '2px dashed #ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    {children}
  </Box>
)

// Visual Regression - Every example of the cozy-ui Radios doc
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Radios</h3>
        <Group />
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Radios, label before</h3>
        <Group labelPlacement="start" />
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>States</h3>
        <Stack direction="row">
          {(['primary', 'error'] as const).map(color =>
            [false, true].map(disabled =>
              [false, true].map(checked => (
                <Radio
                  key={`${color}-${disabled}-${checked}`}
                  color={color}
                  disabled={disabled}
                  checked={checked}
                />
              ))
            )
          )}
        </Stack>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Position</h3>
        <Stack direction="row" spacing={2}>
          <DashedBox>
            <Radio edge={false} sx={{ border: '1px solid red' }} />
          </DashedBox>
          <DashedBox>
            <Radio edge="start" sx={{ border: '1px solid red' }} />
          </DashedBox>
          <DashedBox>
            <Radio edge="end" sx={{ border: '1px solid red' }} />
          </DashedBox>
        </Stack>
      </section>
    </Stack>
  )
}
