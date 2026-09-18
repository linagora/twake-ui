import { Bottom, Icon, IconProps, Top } from '@linagora/twake-icons'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemIconProps,
  Typography,
  listItemButtonClasses,
  listItemIconClasses
} from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import React, { Children, isValidElement, useState } from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'

const NavList = styled(List)(({ theme }: { theme: Theme }) => ({
  margin: '24px 0',
  padding: 0,
  [theme.breakpoints.down('lg')]: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '6px 0 4px'
  }
}))

export type NavProps = React.ComponentProps<typeof NavList>

export const Nav = (props: NavProps): React.ReactElement => (
  <nav>
    <NavList {...props} />
  </nav>
)

export const NavItem = styled(ListItem, {
  shouldForwardProp: prop => prop !== 'secondary'
})<{ secondary?: boolean }>(
  ({ theme, secondary }: { theme: Theme; secondary?: boolean }) => ({
    padding: 0,
    height: 36,
    [theme.breakpoints.down('lg')]: {
      display: 'block',
      height: 'auto',
      margin: '0 12px',
      flex: '0 0 40px'
    },
    ...(secondary && {
      height: 'auto',
      margin: '3px 0',
      [theme.breakpoints.down('lg')]: { display: 'none' },
      [`& .${listItemButtonClasses.root}`]: {
        margin: '0 16px 0 2.8rem',
        padding: '8px 16px',
        height: 'auto',
        fontSize: theme.typography.pxToRem(14),
        [`&.${listItemButtonClasses.selected}, &.active`]: {
          color: theme.vars.palette.secondary.contrastText,
          backgroundColor: theme.vars.palette.secondary.main
        }
      }
    })
  })
)

export type NavItemProps = React.ComponentProps<typeof NavItem>

export const NavLink = styled(ListItemButton)(
  ({ theme }: { theme: Theme }) => ({
    margin: '0 16px',
    padding: '0 8px',
    height: '100%',
    borderRadius: 8,
    lineHeight: 1.375,
    color: theme.vars.palette.text.primary,
    [`&.${listItemButtonClasses.selected}, &.active`]: {
      color: theme.vars.palette.primary.main,
      backgroundColor: theme.vars.palette.action.selected,
      '&:hover': { backgroundColor: theme.vars.palette.action.selected },
      [`& .${listItemIconClasses.root}`]: {
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
      color: theme.vars.palette.text.secondary,
      [`&.${listItemButtonClasses.selected}, &.active`]: {
        color: theme.vars.palette.text.primary,
        backgroundColor: 'transparent',
        [`& .${listItemIconClasses.root}`]: {
          color: theme.vars.palette.text.primary
        }
      }
    }
  })
)

export type NavLinkProps = React.ComponentProps<typeof NavLink>

const NavIconRoot = styled(ListItemIcon)(({ theme }: { theme: Theme }) => ({
  minWidth: 0,
  marginRight: 12,
  color: theme.vars.palette.text.primary,
  [theme.breakpoints.down('lg')]: {
    display: 'block',
    marginRight: 0,
    color: theme.vars.palette.text.secondary,
    '& svg': { margin: '4px auto 5px', width: 16, height: 16 }
  }
}))

export interface NavIconProps extends ListItemIconProps {
  icon: IconProps['icon']
}

export const NavIcon = ({
  icon,
  ...props
}: NavIconProps): React.ReactElement => (
  <NavIconRoot {...props}>
    <Icon icon={icon} aria-hidden="true" focusable="false" />
  </NavIconRoot>
)

export const NavText = styled('span')(({ theme }: { theme: Theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 500,
  letterSpacing: '.15px',
  [theme.breakpoints.down('lg')]: {
    display: 'block',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    fontSize: theme.typography.pxToRem(12)
  }
}))

export type NavTextProps = React.ComponentProps<typeof NavText>

export interface NavDesktopLimiterProps {
  children: React.ReactNode
  max?: number
  showMoreLabel?: string
  showLessLabel?: string
}

export const NavDesktopLimiter = ({
  children,
  max = 5,
  showMoreLabel = 'Show More',
  showLessLabel = 'Show Less'
}: NavDesktopLimiterProps): React.ReactElement | null => {
  const [viewingAll, setViewingAll] = useState(false)
  const { isMobile } = useBreakpoints()
  const items = Children.toArray(children).filter(isValidElement)
  const amountHidden = Math.max(0, items.length - max)

  if (isMobile) return null

  return (
    <>
      {viewingAll ? items : items.slice(0, max)}
      {amountHidden > 0 && (
        <NavItem secondary>
          <NavLink onClick={() => setViewingAll(current => !current)}>
            <NavIcon icon={viewingAll ? Top : Bottom} />
            <NavText>
              {viewingAll
                ? showLessLabel
                : `${showMoreLabel} (${amountHidden})`}
            </NavText>
          </NavLink>
        </NavItem>
      )}
    </>
  )
}

export interface NavDesktopDropdownProps {
  label: string
  children: React.ReactNode
  defaultOpen?: boolean
  limit?: number
}

export const NavDesktopDropdown = ({
  label,
  children,
  defaultOpen = true,
  limit = 5
}: NavDesktopDropdownProps): React.ReactElement | null => {
  const { isDesktop } = useBreakpoints()
  const [open, setOpen] = useState(defaultOpen)
  const isActivated =
    Children.toArray(children).filter(isValidElement).length > limit

  const onToggle = (): void => setOpen(current => !current)

  if (!isDesktop) return null

  return (
    <>
      <ListItem
        onClick={isActivated ? onToggle : undefined}
        sx={{
          minHeight: 48,
          py: 1,
          px: 2,
          justifyContent: 'space-between',
          cursor: isActivated ? 'pointer' : undefined
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        {isActivated && (
          <Typography
            component="span"
            sx={{ display: 'flex', ml: '5px', color: 'text.secondary' }}
          >
            <Icon icon={Bottom} size={10} rotate={open ? 0 : -90} />
          </Typography>
        )}
      </ListItem>
      {open && children}
    </>
  )
}
