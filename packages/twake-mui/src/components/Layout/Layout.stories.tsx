import { Check, Download, Warn } from '@linagora/twake-icons'
import { Box, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import { Content, Layout, LayoutProps, Main } from './index'
import { Nav } from '../Nav'
import { NavDesktopDropdown } from '../NavDesktopDropdown'
import { NavDesktopLimiter } from '../NavDesktopLimiter'
import { NavIcon } from '../NavIcon'
import { NavItem } from '../NavItem'
import { NavLink } from '../NavLink'
import { NavText } from '../NavText'
import { Sidebar } from '../Sidebar'

const paragraph =
  'Ada Lovelace was an English mathematician chiefly known for her work on Charles Babbage’s proposed mechanical general-purpose computer, the Analytical Engine. She was the first to recognise that the machine had applications beyond pure calculation.'

const TopBar = (): React.ReactElement => (
  <Box
    id="coz-bar"
    role="banner"
    sx={theme => ({
      display: 'flex',
      alignItems: 'center',
      px: 2,
      minHeight: 48,
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: theme.vars.palette.background.paper,
      borderBottom: `1px solid ${theme.vars.palette.divider}`,
      position: 'fixed',
      top: 0,
      right: 0,
      zIndex: theme.zIndex.appBar,
      [theme.breakpoints.up('lg')]: { position: 'relative' }
    })}
  >
    Fake TopBar
  </Box>
)

const LayoutDemo = ({
  monoColumn = false,
  withTopBar = true,
  ...props
}: LayoutProps): React.ReactElement => {
  const [active, setActive] = useState(['Section 1', 'Subsection 1'])
  const makeProps = (
    route: string[]
  ): { selected: boolean; onClick: () => void } => ({
    selected: active.slice(0, route.length).join('/') === route.join('/'),
    onClick: () => setActive(route)
  })

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {withTopBar && <TopBar />}
      <Box role="application" sx={{ flex: '1 1 auto', minHeight: 0 }}>
        <Layout monoColumn={monoColumn} withTopBar={withTopBar} {...props}>
          {!monoColumn && (
            <Sidebar>
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
          )}
          <Main>
            <Content sx={{ p: 2 }}>
              <Typography variant="h5">{active.join(' / ')}</Typography>
              <p>---Start---</p>
              {Array.from(Array(6).keys()).map(i => (
                <p key={i}>{paragraph}</p>
              ))}
              <p>---END---</p>
            </Content>
          </Main>
        </Layout>
      </Box>
    </Box>
  )
}

const meta: Meta<typeof Layout> = {
  title: 'Layout',
  component: Layout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    monoColumn: { control: 'boolean' },
    withTopBar: { control: 'boolean' }
  },
  render: args => <LayoutDemo {...args} />
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { monoColumn: false, withTopBar: true }
}

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  args: { monoColumn: false, withTopBar: true }
}
