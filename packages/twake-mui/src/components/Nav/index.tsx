import { List } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import React from 'react'

const NavRoot = styled(List)(({ theme }: { theme: Theme }) => ({
  margin: '24px 0',
  padding: 0,
  [theme.breakpoints.down('lg')]: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '6px 0 4px'
  }
}))

export type NavProps = React.ComponentProps<typeof NavRoot>

export const Nav = (props: NavProps): React.ReactElement => (
  <nav>
    <NavRoot {...props} />
  </nav>
)
