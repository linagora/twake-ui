import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { AvatarSize } from '../Avatar'
import MemberAvatar from './MemberAvatar'

const sizes: AvatarSize[] = ['xs', 's', 'm', 'l', 'xl']
const image = 'https://i.pravatar.cc/150?img=11'
const brokenImage = 'https://example.invalid/avatar.png'

const meta: Meta<typeof MemberAvatar> = {
  title: 'Members/MemberAvatar',
  component: MemberAvatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    initials: { control: 'text' },
    avatarUrl: { control: 'text' },
    size: { control: 'select', options: sizes }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initials: 'AW',
    size: 'm'
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      {children}
    </Stack>
  </section>
)

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Row title="Initials">
        {sizes.map(size => (
          <MemberAvatar key={size} size={size} initials="AW" />
        ))}
      </Row>
      <Row title="Image">
        {sizes.map(size => (
          <MemberAvatar
            key={size}
            size={size}
            initials="AW"
            avatarUrl={image}
          />
        ))}
      </Row>
      <Row title="Image failing to load">
        {sizes.map(size => (
          <MemberAvatar
            key={size}
            size={size}
            initials="AW"
            avatarUrl={brokenImage}
          />
        ))}
      </Row>
    </Stack>
  )
}
