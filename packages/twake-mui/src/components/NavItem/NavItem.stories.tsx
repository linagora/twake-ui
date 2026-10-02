import { Folder, Heart, Warn, Dots, Icon } from '@linagora/twake-icons'
import { IconButton } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { NavIcon } from '../NavIcon'
import { NavLink } from '../NavLink'
import { NavText } from '../NavText'
import { NavItem, NavItemProps } from './index'

const icons = { Heart, None: undefined }

const secondaryActions = {
  None: undefined,
  Dots: (
    <IconButton
      size="small"
      edge="end"
      sx={{ p: 0.5 }}
      onClick={event => event.stopPropagation()}
    >
      <Icon icon={Dots} rotate={90} size={10} />
    </IconButton>
  )
}

type NavItemStoryArgs = NavItemProps & {
  text: string
  secondaryText: string
  tertiaryText: string
  tertiaryIcon: keyof typeof icons
  leftIcon: keyof typeof icons
  divider: boolean
  badge: number | string
  hasIndicator: boolean
  secondaryAction: keyof typeof secondaryActions
  hasDropdown: boolean
  disablePadding: boolean
}

const meta: Meta<NavItemStoryArgs> = {
  title: 'NavItem',
  component: NavItem as React.ComponentType<NavItemStoryArgs>,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'The indentation variant of the NavItem.'
    },
    selected: { control: 'boolean' },
    text: { control: 'text' },
    secondaryText: { control: 'text' },
    tertiaryText: { control: 'text' },
    tertiaryIcon: {
      options: Object.keys(icons),
      control: { type: 'select' }
    },
    leftIcon: {
      options: Object.keys(icons),
      control: { type: 'select' }
    },
    divider: { control: 'boolean' },
    badge: { control: 'text' },
    hasIndicator: { control: 'boolean' },
    secondaryAction: {
      options: Object.keys(secondaryActions),
      mapping: secondaryActions,
      control: { type: 'select' }
    },
    hasDropdown: { control: 'boolean' },
    disablePadding: { control: 'boolean' }
  }
}

export default meta

type Story = StoryObj<NavItemStoryArgs>

export const Default: Story = {
  args: {
    variant: 'primary',
    selected: false,
    text: 'Item',
    secondaryText: '',
    tertiaryText: '',
    tertiaryIcon: 'None',
    leftIcon: 'Heart',
    divider: false,
    badge: 1,
    hasIndicator: true,
    secondaryAction: 'Dots',
    hasDropdown: false,
    disablePadding: true
  },
  render: ({
    selected,
    text,
    secondaryText,
    tertiaryText,
    tertiaryIcon,
    leftIcon,
    divider,
    badge,
    hasIndicator,
    secondaryAction,
    hasDropdown,
    disablePadding,
    ...args
  }) => {
    const IconComponent = icons[leftIcon]
    const TertiaryIconComponent = icons[tertiaryIcon]

    return (
      <div style={{ width: 300 }}>
        <NavItem
          {...args}
          hasIndicator={hasIndicator}
          badge={badge}
          secondaryAction={secondaryAction}
          divider={divider}
          disablePadding={disablePadding}
        >
          <NavLink hasDropdown={hasDropdown} selected={selected}>
            {IconComponent && <NavIcon icon={IconComponent} />}
            <NavText
              secondaryText={secondaryText}
              tertiaryText={tertiaryText}
              tertiaryIcon={
                TertiaryIconComponent ? <TertiaryIconComponent /> : undefined
              }
            >
              {text}
            </NavText>
          </NavLink>
        </NavItem>
      </div>
    )
  }
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: 300
        }}
      >
        <section>
          <h3>Primary</h3>
          <NavItem
            disablePadding
            hasIndicator
            badge={1}
            secondaryAction={secondaryActions.Dots}
          >
            <NavLink hasDropdown>
              <NavIcon icon={Heart} />
              <NavText secondaryText="Secondary" tertiaryText="Tertiary">
                Primary Item
              </NavText>
            </NavLink>
          </NavItem>
        </section>
        <section>
          <h3>Secondary</h3>
          <NavItem disablePadding variant="secondary" selected>
            <NavLink hasDropdown>
              <NavText>Secondary Item</NavText>
            </NavLink>
          </NavItem>
        </section>
        <section>
          <h3>Tertiary</h3>
          <NavItem disablePadding variant="tertiary">
            <NavLink>
              <NavText tertiaryIcon={<Warn />}>Tertiary Item</NavText>
            </NavLink>
          </NavItem>
        </section>
        <section>
          <h3>Divider</h3>
          <NavItem disablePadding divider>
            <NavLink>
              <NavIcon icon={Folder} />
              <NavText>Item with Divider</NavText>
            </NavLink>
          </NavItem>
        </section>
      </div>
    )
  }
}
