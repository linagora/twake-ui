import { ListItem } from '@mui/material'
import { styled } from '@mui/material/styles'

export const NavItemRoot = styled(ListItem, {
  shouldForwardProp: prop => prop !== 'secondary' && prop !== 'variant'
})<{
  variant?: 'primary' | 'secondary' | 'tertiary'
}>(({ theme, variant = 'primary' }) => {
  const isSecondary = variant === 'secondary'
  const isTertiary = variant === 'tertiary'

  return {
    padding: 0,
    minHeight: 36,
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 8,
    cursor: 'pointer',
    margin: '0 16px',
    width: 'calc(100% - 32px)',
    transition: theme.transitions.create('background-color'),
    '&:hover': {
      backgroundColor: theme.vars.palette.action.hover
    },
    [`&.Mui-selected, &:has(.Mui-selected), &:has(.active)`]: {
      color: theme.vars.palette.primary.main,
      backgroundColor: theme.vars.palette.action.selected,
      '&:hover': {
        backgroundColor: theme.vars.palette.action.focus
      }
    },
    [theme.breakpoints.down('lg')]: {
      display: 'block',
      height: 'auto',
      margin: '0 12px',
      flex: '0 0 40px',
      [`&.Mui-selected, &:has(.Mui-selected), &:has(.active)`]: {
        color: theme.vars.palette.text.primary,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent'
        }
      }
    },
    ...((isSecondary || isTertiary) && {
      margin: '3px 16px',
      [theme.breakpoints.down('lg')]: { display: 'none' },
      paddingLeft: isTertiary ? '3rem' : '2rem'
    })
  }
})
