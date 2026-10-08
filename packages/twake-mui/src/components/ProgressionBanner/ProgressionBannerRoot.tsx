import { Alert, alertClasses, styled } from '@mui/material'

const ProgressionBannerRoot = styled(Alert, {
  shouldForwardProp: prop => prop !== 'background'
})<{ background?: string }>(({ theme, background }) => ({
  borderRadius: 0,
  // outranks the severity tint, which the dark scheme re-applies after this rule
  '&&': {
    backgroundColor: background ?? theme.vars.palette.background.contrast
  },
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
    // keeps the message beside the icon so only the action wraps
    [`& .${alertClasses.message}`]: { flexBasis: 0 },
    [`& .${alertClasses.action}`]: {
      width: '100%',
      paddingLeft: 0,
      justifyContent: 'end'
    }
  }
}))

export default ProgressionBannerRoot
