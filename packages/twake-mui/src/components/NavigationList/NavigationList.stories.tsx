import {
  Divider,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Tab,
  Typography
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import { Bank, Gear, Icon, People, Right, Trash } from '@linagora/twake-icons'

import ListItem from '../ListItem'
import ListItemText from '../ListItemText'
import Tabs from '../Tabs'
import NavigationListHeader from './NavigationListHeader'
import NavigationListSection from './NavigationListSection'
import NavigationList from './index'

const rightArrow = (
  <ListItemSecondaryAction>
    <Icon icon={Right} size={16} className="u-mr-1" />
  </ListItemSecondaryAction>
)

const sections = (
  <>
    <NavigationListHeader>General</NavigationListHeader>
    <NavigationListSection>
      <ListItem>
        <ListItemIcon>
          <Icon icon={Gear} size={24} />
        </ListItemIcon>
        <ListItemText primary="General settings" />
        {rightArrow}
      </ListItem>
      <Divider variant="inset" />
      <ListItem>
        <ListItemIcon>
          <Icon icon={Gear} size={32} />
        </ListItemIcon>
        <ListItemText primary="A large icon does not change size of icon area" />
        {rightArrow}
      </ListItem>
      <Divider variant="inset" />
      <ListItem>
        <ListItemIcon>
          <Icon icon={People} size={16} />
        </ListItemIcon>
        <ListItemText
          primary="User preferences"
          secondary="Notifications and theme"
        />
        {rightArrow}
      </ListItem>
      <Divider variant="inset" />
      <ListItem>
        <ListItemIcon>
          <Icon icon={Trash} size={16} className="u-error" />
        </ListItemIcon>
        <ListItemText
          primary="Delete account"
          secondary="Permanently delete all your data"
          slotProps={{
            primary: { color: 'error' },
            secondary: { color: 'error' }
          }}
        />
      </ListItem>
    </NavigationListSection>
    <NavigationListHeader>Accounts</NavigationListHeader>
    <NavigationListSection>
      <ListItem>
        <ListItemIcon>
          <Icon icon={Bank} size={16} />
        </ListItemIcon>
        <ListItemText primary="Bank accounts" />
        {rightArrow}
      </ListItem>
    </NavigationListSection>
  </>
)

const TabsExample = (): React.ReactElement => {
  const [tab, setTab] = useState('nav')

  const handleChange = (_: React.SyntheticEvent, value: string): void =>
    setTab(value)

  return (
    <div>
      <Tabs value={tab} onChange={handleChange}>
        <Tab value="nav" label="Nav" />
        <Tab value="details" label="Details" />
      </Tabs>
      <Divider className="u-mb-1" />
      {tab === 'nav' ? <NavigationList>{sections}</NavigationList> : null}
      {tab === 'details' ? (
        <Typography variant="body1">
          Ada Lovelace wrote the first algorithm meant to be carried out by a
          machine.
        </Typography>
      ) : null}
    </div>
  )
}

const meta: Meta<typeof NavigationList> = {
  title: 'NavigationList',
  component: NavigationList,
  subcomponents: { NavigationListHeader, NavigationListSection },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
    className: { control: 'text' },
    style: { control: 'object' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: sections
  }
}

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <section>
        <NavigationList>{sections}</NavigationList>
      </section>
      <section>
        <TabsExample />
      </section>
    </Stack>
  )
}
