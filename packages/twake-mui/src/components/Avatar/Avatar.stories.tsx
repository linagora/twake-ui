import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { supportedColors } from './helpers'
import { Avatar } from './index'

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
      options: ['xs', 's', 'm', 'l', 'xl']
    },
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

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Sizes */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar size="xs">XS</Avatar>
          <Avatar size="s">S</Avatar>
          <Avatar size="m">M</Avatar>
          <Avatar size="l">L</Avatar>
          <Avatar size="xl">XL</Avatar>
        </div>
      </section>

      {/* Colors */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Colors</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {supportedColors.map(color => (
            <Avatar key={color} color={color} size="l">
              {color.slice(0, 2).toUpperCase()}
            </Avatar>
          ))}
        </div>
      </section>

      {/* Name-based colors */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Name-based Colors</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Avatar size="l">Alice</Avatar>
          <Avatar size="l">Bob</Avatar>
          <Avatar size="l">Charlie</Avatar>
          <Avatar size="l">Diana</Avatar>
        </div>
      </section>

      {/* With Image */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>With Image</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Avatar
            src="https://i.pravatar.cc/150?img=11"
            alt="User 1"
            size="l"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=12"
            alt="User 2"
            size="l"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=13"
            alt="User 3"
            size="l"
          />
        </div>
      </section>

      {/* Border Variants */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Border Variants</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
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
        </div>
      </section>

      {/* Disabled State */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Disabled State</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Avatar size="l" disabled>
            D
          </Avatar>
          <Avatar
            size="l"
            disabled
            src="https://i.pravatar.cc/150?img=14"
            alt="Disabled"
          />
        </div>
      </section>
    </div>
  )
}
