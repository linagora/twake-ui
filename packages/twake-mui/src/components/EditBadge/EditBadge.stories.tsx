import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { screen } from 'storybook/test'

import AlertProvider from '../../providers/AlertProvider'
import Avatar from '../Avatar'
import EditBadge, { EditBadgeProps } from './index'

const image = 'https://i.pravatar.cc/150?img=11'

const baseProps: Omit<EditBadgeProps, 'children'> = {
  src: () => image,
  onUpload: () => {},
  onDelete: () => {},
  componentsProps: { button: { 'aria-label': 'Edit avatar' } }
}

const meta: Meta<typeof EditBadge> = {
  title: 'EditBadge',
  component: EditBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story): React.ReactElement => (
      <AlertProvider>
        <Story />
      </AlertProvider>
    )
  ],
  argTypes: {
    src: { control: false },
    onUpload: { control: false },
    onDelete: { control: false },
    anchorOrigin: { control: 'object' },
    componentsProps: { control: 'object' },
    children: { control: false }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...baseProps,
    src: () => '',
    children: <Avatar size={94} alt="Avatar" />
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    <Stack direction="row" spacing={5} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {children}
    </Stack>
  </section>
)

const anchorOrigins = [
  { vertical: 'top', horizontal: 'right' },
  { vertical: 'top', horizontal: 'left' },
  { vertical: 'bottom', horizontal: 'right' },
  { vertical: 'bottom', horizontal: 'left' }
] as const

export const Screenshot: Story = {
  tags: ['argos'],
  parameters: { layout: 'padded' },
  args: baseProps,
  render: () => (
    <Stack spacing={4}>
      <Row title="Without image">
        <EditBadge {...baseProps} src={() => ''}>
          <Avatar size={94} alt="Avatar" />
        </EditBadge>
      </Row>
      <Row title="With image">
        <EditBadge {...baseProps}>
          <Avatar size={94} alt="Avatar" />
        </EditBadge>
      </Row>
      <Row title="Anchor origin">
        {anchorOrigins.map(anchorOrigin => (
          <EditBadge
            key={`${anchorOrigin.vertical}-${anchorOrigin.horizontal}`}
            {...baseProps}
            src={() => ''}
            anchorOrigin={anchorOrigin}
          >
            <Avatar size={94} alt="Avatar" />
          </EditBadge>
        ))}
      </Row>
      <Row title="Button props">
        <EditBadge
          {...baseProps}
          src={() => ''}
          componentsProps={{
            button: { 'aria-label': 'Edit avatar', color: 'error' }
          }}
        >
          <Avatar size={94} alt="Avatar" />
        </EditBadge>
      </Row>
      <Row title="Loading">
        <EditBadge
          {...baseProps}
          onDelete={() => new Promise(() => {})}
          componentsProps={{ button: { 'aria-label': 'Edit loading avatar' } }}
        >
          <Avatar size={94} alt="Avatar" />
        </EditBadge>
      </Row>
    </Stack>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText('Edit loading avatar'))
    await userEvent.click(await screen.findByText('Delete'))
  }
}

export const MenuOpen: Story = {
  tags: ['argos'],
  args: Default.args,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText('Edit avatar'))
    await screen.findByText('Update')
  }
}
