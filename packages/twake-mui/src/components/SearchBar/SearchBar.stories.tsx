import { Cloud } from '@linagora/twake-icons'
import { Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { SearchBar } from './index'

const sizes = ['small', 'medium', 'large', 'auto'] as const

const meta: Meta<typeof SearchBar> = {
  title: 'SearchBar',
  component: SearchBar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: sizes
    },
    type: {
      control: 'select',
      options: ['search', 'button']
    },
    elevation: { control: 'number' },
    disabled: { control: 'boolean' },
    disabledClear: { control: 'boolean' },
    disabledFocus: { control: 'boolean' },
    disabledHover: { control: 'boolean' },
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    value: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'small',
    elevation: 1
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section style={{ paddingBottom: '24px' }}>
    <h3 style={{ marginBottom: '12px', marginTop: 0 }}>{title}</h3>
    <Stack spacing={2}>{children}</Stack>
  </section>
)

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4} sx={{ width: '100%', maxWidth: 800 }}>
      <Row title="Sizes">
        {sizes.map(size => (
          <SearchBar key={size} size={size} placeholder={`Size: ${size}`} />
        ))}
      </Row>

      <Row title="Normal">
        <SearchBar size="small" />
        <SearchBar size="medium" defaultValue="Filled search" />
      </Row>

      <Row title="With elevation">
        <SearchBar size="small" elevation={10} />
      </Row>

      <Row title="Disabled">
        <SearchBar disabled size="small" />
        <SearchBar
          disabled
          size="small"
          defaultValue="Disabled filled search"
        />
      </Row>

      <Row title="Button type">
        <SearchBar
          type="button"
          size="small"
          label={
            <Typography color="primary">This is a custom label</Typography>
          }
        />
        <SearchBar
          type="button"
          size="medium"
          icon={Cloud}
          label="Button with string label"
        />
      </Row>

      <Row title="Options">
        <SearchBar
          size="small"
          defaultValue="Without clear button"
          disabledClear
        />
        <SearchBar size="small" disabledHover placeholder="Disabled hover" />
        <SearchBar size="small" disabledFocus placeholder="Disabled focus" />
        <SearchBar size="small" icon={Cloud} placeholder="Custom icon" />
      </Row>
    </Stack>
  )
}
