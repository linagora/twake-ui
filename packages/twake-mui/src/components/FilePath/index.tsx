import { styled } from '@mui/material'
import { Theme } from '@mui/material/styles'
import React from 'react'

import MidEllipsis from '../MidEllipsis'

export interface FilePathProps {
  children?: string
  className?: string
}

const FilePathRoot = styled(MidEllipsis)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(12)
}))

const FilePath: React.FC<FilePathProps> = ({ children, className }) => (
  <FilePathRoot className={className}>{children}</FilePathRoot>
)

export default FilePath
