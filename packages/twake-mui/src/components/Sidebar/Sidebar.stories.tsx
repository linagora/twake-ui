import { Check, Download, Warn } from '@linagora/twake-icons'
import { Box, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import { Nav } from '../Nav'
import { NavDesktopDropdown } from '../NavDesktopDropdown'
import { NavDesktopLimiter } from '../NavDesktopLimiter'
import { NavIcon } from '../NavIcon'
import { NavItem } from '../NavItem'
import { NavLink } from '../NavLink'
import { NavText } from '../NavText'
import { Sidebar, SidebarProps } from './index'

const SidebarDemo = (props: SidebarProps): React.ReactElement => {
  const [active, setActive] = useState(['Section 1', 'Subsection 1'])
  const makeProps = (
    route: string[]
  ): { selected: boolean; onClick: () => void } => ({
    selected: active.slice(0, route.length).join('/') === route.join('/'),
    onClick: () => setActive(route)
  })

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar {...props}>
        <Nav>
          <NavItem>
            <NavLink {...makeProps(['Section 1'])}>
              <NavIcon icon={Warn} />
              <NavText>Section 1</NavText>
            </NavLink>
          </NavItem>
          <NavDesktopLimiter>
            {Array.from(Array(10).keys()).map(i => (
              <NavItem secondary key={i}>
                <NavLink {...makeProps(['Section 1', `Subsection ${i}`])}>
                  <NavText>Subsection {i}</NavText>
                </NavLink>
              </NavItem>
            ))}
          </NavDesktopLimiter>
          <NavItem>
            <NavLink {...makeProps(['Section 2'])}>
              <NavIcon icon={Check} />
              <NavText>Section 2</NavText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink {...makeProps(['Section 3'])}>
              <NavIcon icon={Download} />
              <NavText>Section 3</NavText>
            </NavLink>
          </NavItem>
          <NavDesktopDropdown label="Section 4">
            {Array.from(Array(6).keys()).map(i => (
              <NavItem secondary key={i}>
                <NavLink {...makeProps(['Section 4', `Subsection ${i}`])}>
                  <NavText>Subsection {i}</NavText>
                </NavLink>
              </NavItem>
            ))}
          </NavDesktopDropdown>
        </Nav>
      </Sidebar>
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography variant="h5">{active.join(' / ')}</Typography>
      </Box>
    </Box>
  )
}

const meta: Meta<typeof Sidebar> = {
  title: 'Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  render: args => <SidebarDemo {...args} />
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos']
}
