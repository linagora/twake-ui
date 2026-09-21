import { SxProps } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import React, { useContext } from 'react'

import { LayoutContext, TwoPanesProps } from './Layout'

const ContentRoot = styled('div', {
  shouldForwardProp: prop => prop !== 'monoColumn'
})<TwoPanesProps>(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  boxSizing: 'border-box',
  overflow: 'hidden auto',
  backgroundColor: theme.vars.palette.background.paper,
  height: '100%',
  variants: [
    {
      props: { monoColumn: false },
      style: {
        margin: '16px 16px 16px 0',
        borderRadius: 16,
        [theme.breakpoints.down('lg')]: { margin: 0, borderRadius: 0 }
      }
    }
  ]
}))

export interface ContentProps extends React.ComponentPropsWithoutRef<'div'> {
  sx?: SxProps<Theme>
}

export const Content = (props: ContentProps): React.ReactElement => {
  const { monoColumn } = useContext(LayoutContext)

  return <ContentRoot role="main" monoColumn={monoColumn} {...props} />
}
