import { Link, LinkProps } from '@mui/material'
import React from 'react'

import FilePath from '../FilePath'

export interface FilePathLinkProps extends Omit<LinkProps, 'children'> {
  children?: string
}

const FilePathLink: React.FC<FilePathLinkProps> = ({ children, ...props }) => (
  <Link color="textSecondary" {...props}>
    <FilePath>{children}</FilePath>
  </Link>
)

export default FilePathLink
