import { styled, Theme } from '@mui/material/styles'

export const NavLinkRoot = styled('div')(({ theme }: { theme: Theme }) => ({
  padding: 8,
  width: '100%',
  height: '100%',
  minHeight: 0,
  gap: 0,
  borderRadius: 8,
  lineHeight: 1.375,
  color: theme.vars.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover, &:focus, &:active': {
    backgroundColor: 'transparent'
  },
  '&.selected, &.active': {
    color: theme.vars.palette.primary.main,
    backgroundColor: 'transparent',
    '&:hover': { backgroundColor: 'transparent' },
    '& svg, & span': {
      color: theme.vars.palette.primary.main
    }
  },
  [theme.breakpoints.down('lg')]: {
    display: 'block',
    height: 'auto',
    margin: 0,
    padding: 0,
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(11),
    lineHeight: '12px',
    '&.selected, &.active': {
      color: theme.vars.palette.text.primary,
      '&:hover': { backgroundColor: 'transparent' },
      '& svg, & span': {
        color: theme.vars.palette.text.primary
      }
    }
  }
}))
