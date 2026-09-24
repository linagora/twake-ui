import { Paper, styled } from '@mui/material'

import { SearchBarProps } from './types'

const sizeToPixel = { small: 40, medium: 48, large: 56, auto: 'auto' }
const radiusBySize = { small: 20, medium: 24, large: 28, auto: 24 }

export const SearchBarRoot = styled(Paper, {
  shouldForwardProp: prop => prop !== 'searchSize' && prop !== 'isFocused'
})<{ searchSize: NonNullable<SearchBarProps['size']>; isFocused: boolean }>(({
  theme,
  searchSize,
  isFocused
}) => {
  return {
    display: 'flex',
    boxSizing: 'border-box',
    position: 'relative',
    alignItems: 'center',
    height: sizeToPixel[searchSize],
    flex: 'auto',
    borderRadius: radiusBySize[searchSize],
    borderStyle: 'solid',
    borderWidth: 1,
    paddingRight: '0.5rem',
    borderColor: isFocused ? theme.palette.primary.main : 'transparent',
    backgroundColor: isFocused
      ? theme.palette.background.paper
      : theme.palette.background.default,
    transition: theme.transitions.create(['border-color', 'background-color']),
    '&:hover': {
      '&:not(.Mui-disabled):not(.SearchBar-focused)': {
        '& .SearchBar-focusHighlight': {
          opacity: 1
        }
      }
    },
    '&.Mui-disabled': {
      '& .SearchBar-icon': {
        color: theme.palette.text.disabled
      },
      '& .SearchBar-disableHighlight': {
        opacity: 1
      }
    }
  }
})
