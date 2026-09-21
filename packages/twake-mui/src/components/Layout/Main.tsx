import { SxProps } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import React, { useContext } from 'react'

import { LayoutContext, TwoPanesProps, twoPanes } from './Layout'

/** Height of the top bar, which is out of the Layout but overlaps it */
const TOP_BAR_HEIGHT = 48

const MainRoot = styled('main', {
  shouldForwardProp: prop => prop !== 'monoColumn' && prop !== 'withTopBar'
})<TwoPanesProps & { withTopBar?: boolean }>(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  flex: '1 1 auto',
  boxSizing: 'border-box',
  overflow: 'hidden',
  height: '100%',
  variants: [
    { props: { monoColumn: false }, style: twoPanes(theme) },
    {
      props: { withTopBar: true },
      style: {
        [theme.breakpoints.down('lg')]: {
          '&::before': {
            content: '""',
            display: 'block',
            height: TOP_BAR_HEIGHT,
            width: '100%',
            backgroundColor: theme.vars.palette.background.paper
          }
        }
      }
    }
  ]
}))

export interface MainProps extends React.ComponentPropsWithoutRef<'main'> {
  sx?: SxProps<Theme>
}

export const Main = (props: MainProps): React.ReactElement => {
  const { monoColumn, withTopBar } = useContext(LayoutContext)

  return <MainRoot monoColumn={monoColumn} withTopBar={withTopBar} {...props} />
}
