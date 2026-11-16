import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { AvatarSize } from '../Avatar'
import { COLORS } from '../ColorList/helpers'
import MemberGroupAvatar from './MemberGroupAvatar'

const sizes: AvatarSize[] = ['xs', 's', 'm', 'l', 'xl']

const meta: Meta<typeof MemberGroupAvatar> = {
  title: 'Members/MemberGroupAvatar',
  component: MemberGroupAvatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: sizes },
    color: { control: 'select', options: COLORS }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'm'
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      sx={{ alignItems: 'center', flexWrap: 'wrap' }}
    >
      {children}
    </Stack>
  </section>
)

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Row title="Sizes">
        {sizes.map(size => (
          <MemberGroupAvatar key={size} size={size} />
        ))}
      </Row>
      <Row title="Colors">
        {COLORS.map(color => (
          <MemberGroupAvatar key={color} color={color} />
        ))}
      </Row>
    </Stack>
  )
}
