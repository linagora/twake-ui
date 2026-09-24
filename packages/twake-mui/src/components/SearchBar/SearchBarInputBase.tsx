import { InputBase, styled } from '@mui/material'

import { SearchBarProps } from './types'

const fontSizeToPixel = { small: 14, medium: 16, large: 16, auto: 16 }

export const SearchBarInputBase = styled(InputBase, {
  shouldForwardProp: prop => prop !== 'searchSize' && prop !== 'hasIcon'
})<{ searchSize: NonNullable<SearchBarProps['size']>; hasIcon: boolean }>(({
  searchSize,
  hasIcon
}) => {
  return {
    flex: 1,
    fontSize: fontSizeToPixel[searchSize],
    paddingLeft: !hasIcon ? '1rem' : undefined
  }
})
