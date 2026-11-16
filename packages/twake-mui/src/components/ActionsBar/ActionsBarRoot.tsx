import { AppBar } from '@mui/material'
import { styled } from '@mui/material/styles'

const ActionsBarRoot = styled(AppBar)(({ theme }) => ({
  top: 0,
  right: 22,
  width: 'calc(100% - 44px)',
  height: '3rem',
  zIndex: 'var(--zIndex-selection)',
  borderRadius: '0 0 16px 16px',
  boxShadow: theme.vars.shadows[1],
  [theme.breakpoints.down('md')]: {
    top: 'auto',
    bottom: 0,
    right: 0,
    width: '100%',
    height: '4rem',
    borderRadius: '16px 16px 0 0',
    boxShadow: theme.vars.shadows[8]
  }
}))

export default ActionsBarRoot
