import { CircleFilled, Icon, Link } from '@linagora/twake-icons'
import { Avatar, Box } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Badge, BadgeProps } from './index'

const colors = [
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info'
] as const

const sizes = ['small', 'medium', 'large'] as const

const iconSizes = { small: 16, medium: 24, large: 32 }

const anchorOrigins = [
  { vertical: 'top', horizontal: 'right' },
  { vertical: 'top', horizontal: 'left' },
  { vertical: 'bottom', horizontal: 'right' },
  { vertical: 'bottom', horizontal: 'left' }
] as const

const meta: Meta<typeof Badge> = {
  title: 'Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: colors },
    variant: { control: 'select', options: ['standard', 'dot'] },
    size: { control: 'select', options: sizes },
    overlap: { control: 'select', options: ['circular', 'rectangular'] },
    withBorder: { control: 'boolean' },
    showZero: { control: 'boolean' },
    invisible: { control: 'boolean' },
    badgeContent: { control: 'number' },
    max: { control: 'number' },
    anchorOrigin: { control: 'object' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const Target: React.FC<{ size?: BadgeProps['size'] }> = ({
  size = 'medium'
}) => (
  <Box component="span" sx={{ color: 'text.secondary', display: 'flex' }}>
    <Icon icon={CircleFilled} size={iconSizes[size]} />
  </Box>
)

export const Default: Story = {
  args: {
    badgeContent: 4,
    color: 'primary',
    children: <Target />
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      {children}
    </div>
  </section>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Row title="Colors">
        {colors.map(color => (
          <Badge key={color} color={color} badgeContent={4}>
            <Target />
          </Badge>
        ))}
      </Row>

      <Row title="Dot">
        {colors.map(color => (
          <Badge key={color} color={color} variant="dot">
            <Target />
          </Badge>
        ))}
      </Row>

      <Row title="Sizes">
        {sizes.map(size => (
          <Badge key={size} color="primary" size={size} badgeContent={4}>
            <Target size={size} />
          </Badge>
        ))}
        {sizes.map(size => (
          <Badge key={size} color="primary" size={size} variant="dot">
            <Target size={size} />
          </Badge>
        ))}
      </Row>

      <Row title="Without border">
        <Badge color="primary" badgeContent={4} withBorder={false}>
          <Target />
        </Badge>
        <Badge color="primary" variant="dot" withBorder={false}>
          <Target />
        </Badge>
      </Row>

      <Row title="Anchor origin (circular)">
        {anchorOrigins.map(anchorOrigin => (
          <Badge
            key={`${anchorOrigin.vertical}-${anchorOrigin.horizontal}`}
            color="primary"
            badgeContent={4}
            anchorOrigin={anchorOrigin}
          >
            <Target />
          </Badge>
        ))}
      </Row>

      <Row title="Anchor origin (rectangular)">
        {anchorOrigins.map(anchorOrigin => (
          <Badge
            key={`${anchorOrigin.vertical}-${anchorOrigin.horizontal}`}
            color="primary"
            badgeContent={4}
            overlap="rectangular"
            anchorOrigin={anchorOrigin}
          >
            <Target />
          </Badge>
        ))}
      </Row>

      <Row title="Content">
        <Badge color="error" badgeContent={0}>
          <Target />
        </Badge>
        <Badge color="error" badgeContent={0} showZero={false}>
          <Target />
        </Badge>
        <Badge color="error" badgeContent={120} max={99}>
          <Target />
        </Badge>
        <Badge color="error" badgeContent={4} invisible>
          <Target />
        </Badge>
      </Row>

      <Row title="Double badges">
        <Badge
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Box
              sx={{
                height: 24,
                minWidth: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                color: 'text.icon',
                boxShadow: 3
              }}
            >
              <Badge color="error" variant="dot" size="small">
                <Icon icon={Link} size={16} />
              </Badge>
            </Box>
          }
        >
          <Avatar>CD</Avatar>
        </Badge>
      </Row>
    </div>
  )
}
