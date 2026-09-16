import { Icon, Link } from '@linagora/twake-icons'
import { AvatarGroup, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { supportedColors } from './helpers'
import { Avatar, AvatarSize } from './index'

const sizes: AvatarSize[] = ['xs', 's', 'm', 'l', 'xl']
const image = 'https://i.pravatar.cc/150?img=11'

const meta: Meta<typeof Avatar> = {
  title: 'Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['none', ...supportedColors]
    },
    size: {
      control: 'select',
      options: sizes
    },
    textColor: { control: 'color' },
    border: { control: 'boolean' },
    innerBorder: { control: 'boolean' },
    disabled: { control: 'boolean' },
    display: {
      control: 'select',
      options: ['initial', 'inline']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'JD'
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {children}
    </Stack>
  </section>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Row title="Sizes">
        {sizes.map(size => (
          <React.Fragment key={size}>
            <Avatar size={size} color="sunrise" />
            <Avatar size={size} color="sunrise">
              AB
            </Avatar>
            <Avatar size={size} color="sunrise">
              <Icon icon={Link} />
            </Avatar>
          </React.Fragment>
        ))}
      </Row>

      <Row title="Colors">
        {supportedColors.map(color => (
          <Avatar key={color} color={color} size="l">
            {color.slice(0, 2).toUpperCase()}
          </Avatar>
        ))}
      </Row>

      <Row title="Name-based colors">
        <Avatar size="l">Alice</Avatar>
        <Avatar size="l">Bob</Avatar>
        <Avatar size="l">Charlie</Avatar>
        <Avatar size="l">Diana</Avatar>
      </Row>

      <Row title="Default color">
        <Avatar src={image} alt="Image" />
        <Avatar color="none" src={image} alt="Image, no color" />
        <Avatar color="sunrise" src={image} alt="Image, sunrise" />
        <Avatar />
        <Avatar color="none" />
        <Avatar color="sunrise" />
        <Avatar>AB</Avatar>
        <Avatar color="none">BC</Avatar>
        <Avatar color="sunrise">CD</Avatar>
      </Row>

      <Row title="Custom size and color">
        <Avatar color="sunrise" size={94}>
          DE
        </Avatar>
        <Avatar color="#0000ff">EF</Avatar>
        <Avatar color="grey" textColor="white">
          FG
        </Avatar>
      </Row>

      <Row title="Borders">
        <Avatar size="l">Default</Avatar>
        <Avatar size="l" border>
          Border
        </Avatar>
        <Avatar size="l" innerBorder>
          Inner
        </Avatar>
        <Avatar size="l" border innerBorder>
          Both
        </Avatar>
        <Avatar size="l" color="none" border innerBorder>
          <Icon icon={Link} />
        </Avatar>
      </Row>

      <Row title="Disabled">
        <Avatar size="l" disabled>
          AB
        </Avatar>
        <Avatar size="l" disabled color="sunrise">
          CD
        </Avatar>
        <Avatar size="l" disabled src={image} alt="Disabled" />
        <Avatar size="l" disabled color="none">
          <Icon icon={Link} />
        </Avatar>
      </Row>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Grouped</h3>
        <Stack spacing={1}>
          {sizes.map(size => (
            <Stack key={size} direction="row" sx={{ alignItems: 'center' }}>
              <AvatarGroup
                max={4}
                slotProps={{ surplus: { className: `size-${size}` } }}
              >
                <Avatar size={size} color={supportedColors[0]}>
                  AB
                </Avatar>
                <Avatar size={size} color={supportedColors[1]}>
                  BC
                </Avatar>
                <Avatar size={size} src={image} alt="Image" />
                <Avatar size={size} color={supportedColors[4]}>
                  EF
                </Avatar>
                <Avatar size={size} color={supportedColors[5]}>
                  FG
                </Avatar>
              </AvatarGroup>
              <Avatar size={size} color="none" border innerBorder>
                <Icon icon={Link} />
              </Avatar>
            </Stack>
          ))}
        </Stack>
      </section>
    </Stack>
  )
}
