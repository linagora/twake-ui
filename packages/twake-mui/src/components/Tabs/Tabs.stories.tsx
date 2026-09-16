import { Stack, Tab } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Tabs, TabsProps } from './index'

const variants = ['standard', 'fullWidth', 'scrollable'] as const

const meta: Meta<typeof Tabs> = {
  title: 'Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: variants },
    narrowed: { control: 'boolean' },
    segmented: { control: 'boolean' },
    centered: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const Example: React.FC<TabsProps> = props => {
  const [value, setValue] = React.useState(0)
  const scrollable = props.variant === 'scrollable'

  return (
    <Tabs
      value={value}
      aria-label="simple tabs example"
      onChange={(_event, newValue: number) => setValue(newValue)}
      {...props}
    >
      <Tab
        label="Item One"
        id="simple-tab-0"
        aria-controls="simple-tabpanel-0"
      />
      <Tab
        label="Item Two"
        id="simple-tab-1"
        aria-controls="simple-tabpanel-1"
      />
      <Tab
        label="Item Disabled"
        id="simple-tab-3"
        aria-controls="simple-tabpanel-3"
        disabled
      />
      <Tab
        label="Item Three"
        id="simple-tab-2"
        aria-controls="simple-tabpanel-2"
      />
      {scrollable && <Tab label="Item Four" id="simple-tab-4" />}
      {scrollable && <Tab label="Item Five" id="simple-tab-5" />}
      {scrollable && <Tab label="Item Six" id="simple-tab-6" />}
    </Tabs>
  )
}

export const Default: Story = {
  args: { variant: 'standard' },
  render: args => <Example {...args} />
}

// Visual Regression - Every example of the cozy-ui Tabs doc
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4} sx={{ width: 800 }}>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Default</h3>
        <Example />
      </section>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Narrowed</h3>
        <Example narrowed />
      </section>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Segmented</h3>
        <Example segmented />
      </section>
      {variants.map(variant => (
        <section key={variant}>
          <h3 style={{ marginBottom: '12px' }}>{variant}</h3>
          <Stack spacing={4}>
            <Example variant={variant} />
            <Example variant={variant} segmented />
          </Stack>
        </section>
      ))}
    </Stack>
  )
}
