import { styled } from '@mui/material/styles'

const ActionsBarActions = styled('div')(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'end',
  height: '100%',
  paddingRight: 48,
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    paddingRight: 0
  }
}))

export default ActionsBarActions
