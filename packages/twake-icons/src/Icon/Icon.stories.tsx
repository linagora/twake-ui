import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Icon from './index'
import * as allIcons from '../Icons'

const iconNames = Object.keys(allIcons).sort()

const meta: Meta<typeof Icon> = {
  title: 'Icon/Playground',
  component: Icon,
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: iconNames,
      mapping: allIcons as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>,
    },
    size: { control: { type: 'range', min: 8, max: 96, step: 1 } },
    color: { control: { type: 'color' } },
    rotate: { control: { type: 'range', min: 0, max: 360, step: 15 } },
    width: { control: 'text' },
    height: { control: 'text' },
    spin: { control: 'boolean' },
    preserveColor: { control: 'boolean' },
    style: { control: 'object' }
  },
  args: {
    icon: 'Check',
    size: 24,
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Interactive: Story = {
  args: {
    icon: 'Check',
    size: 24,
    color: undefined,
    rotate: 0,
    spin: false,
    preserveColor: undefined,
    width: undefined,
    height: undefined,
    style: undefined
  },
}
