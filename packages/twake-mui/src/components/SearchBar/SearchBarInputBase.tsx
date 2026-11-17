import { InputBase, styled } from '@mui/material'

import { SearchBarProps } from './types'

const fontSizeToPixel = { small: 14, medium: 16, large: 16, auto: 16 }

export const SearchBarInputBase = styled(InputBase, {
  shouldForwardProp: prop => prop !== 'searchSize' && prop !== 'hasIcon'
})<{ searchSize: NonNullable<SearchBarProps['size']>; hasIcon: boolean }>(({
  theme,
  searchSize,
  hasIcon
}) => {
  return {
    flex: 1,
    [theme.breakpoints.down('md')]: {
      fontSize: fontSizeToPixel[searchSize]
    },
    // iOS Safari zooms the page into a field whose text is under 16 px
    [`${theme.breakpoints.down('md')} and (pointer: coarse)`]: {
      fontSize: 16
    },
    paddingLeft: !hasIcon ? '1rem' : undefined
  }
})
