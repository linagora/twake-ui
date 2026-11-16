import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import MemberRoleMenu, { MemberRoleMenuProps } from './MemberRoleMenu'

const roles = [
  { value: 'viewer', label: 'Viewer' },
  { value: 'editor', label: 'Editor' }
]

const member = { id: 'bob', name: 'Bob', initials: 'B' }

const StatefulMemberRoleMenu = (
  props: Omit<MemberRoleMenuProps, 'onChange'>
): React.JSX.Element => {
  const [value, setValue] = useState(props.value)

  return <MemberRoleMenu {...props} value={value} onChange={setValue} />
}

const meta: Meta<typeof MemberRoleMenu> = {
  title: 'Members/MemberRoleMenu',
  component: MemberRoleMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'select', options: roles.map(role => role.value) },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' }
  },
  render: args => <StatefulMemberRoleMenu {...args} />
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    member,
    value: 'editor',
    roles
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
      {children}
    </Stack>
  </section>
)

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Row title="Sizes">
        {(['small', 'medium', 'large'] as const).map(size => (
          <MemberRoleMenu
            key={size}
            value="editor"
            roles={roles}
            size={size}
            onChange={() => {}}
          />
        ))}
      </Row>
      <Row title="Disabled">
        <MemberRoleMenu
          value="viewer"
          roles={roles}
          disabled
          onChange={() => {}}
        />
      </Row>
    </Stack>
  )
}
