import { Box, Typography, TypographyProps } from '@mui/material'
import React from 'react'

import MidEllipsis from '../MidEllipsis'

export interface FilenameProps {
  icon?: React.ReactNode
  /** Folder or file name */
  filename?: string
  /** File extension, rendered in the secondary text color */
  extension?: string
  /** Truncates the filename in its middle instead of its end */
  midEllipsis?: boolean
  variant?: TypographyProps['variant']
  /** Shown on a second line, under the name */
  path?: React.ReactNode
}

interface NameAndExtensionProps {
  filename?: string
  extension?: string
  midEllipsis: boolean
  variant: TypographyProps['variant']
}

const NameAndExtension: React.FC<NameAndExtensionProps> = ({
  filename,
  extension,
  midEllipsis,
  variant
}) => (
  <>
    {filename && (
      <Typography variant={variant} component="span" noWrap>
        {midEllipsis ? <MidEllipsis text={filename} /> : filename}
      </Typography>
    )}
    {extension && (
      <Typography variant={variant} component="span" color="textSecondary">
        {extension}
      </Typography>
    )}
  </>
)

const Filename: React.FC<FilenameProps> = ({
  icon,
  filename,
  extension,
  midEllipsis = false,
  variant = 'h6',
  path
}) => {
  const nameAndExtension = (
    <NameAndExtension
      filename={filename}
      extension={extension}
      midEllipsis={midEllipsis}
      variant={variant}
    />
  )
  const iconBox = icon && (
    <Box
      className="u-flex u-pos-relative u-mr-1"
      sx={path ? { float: 'left', top: 4 } : undefined}
    >
      {icon}
    </Box>
  )

  if (!path) {
    return (
      <div className="u-flex u-flex-items-center">
        {iconBox}
        {nameAndExtension}
      </div>
    )
  }

  return (
    <>
      {iconBox}
      <div className="u-flex">{nameAndExtension}</div>
      <Typography variant="body2" component="div" noWrap>
        {path}
      </Typography>
    </>
  )
}

export default Filename
