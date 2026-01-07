import { Components } from '@mui/material/styles'

import { radius } from '../radius'

export const dialogOverrides = (): Components['MuiDialog'] => {
  return {
    styleOverrides: {
      paper: {
        borderRadius: radius.md,
        boxShadow:
          '0 1px 3px 0 rgba(0, 0, 0, 0.30), 0 4px 8px 3px rgba(0, 0, 0, 0.15)'
      }
    }
  }
}

export const dialogTitleOverrides = (): Components['MuiDialogTitle'] => {
  return {
    styleOverrides: {
      root: {
        padding: '12px 32px',
        fontSize: 17,
        fontWeight: 400,
        lineHeight: 1.273,
        letterSpacing: '0'
      }
    }
  }
}

export const dialogContentOverrides = (): Components['MuiDialogContent'] => {
  return {
    styleOverrides: {
      root: {
        padding: '24px 32px'
      }
    }
  }
}

export const dialogActionsOverrides = (): Components['MuiDialogActions'] => {
  return {
    styleOverrides: {
      root: {
        padding: '16px 32px'
      }
    }
  }
}
