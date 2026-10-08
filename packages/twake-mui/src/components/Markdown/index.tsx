import { Link, Typography } from '@mui/material'
import React from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

export interface MarkdownProps {
  content: string
}

type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const makeHeading = (variant: HeadingVariant): Components[HeadingVariant] => {
  const Heading: Components[HeadingVariant] = ({ children }) => (
    <Typography variant={variant} sx={{ mb: 2 }}>
      {children}
    </Typography>
  )
  return Heading
}

const components: Components = {
  a: ({ children, href }) => (
    <Link href={href} rel="noreferrer" target="_blank">
      {children}
    </Link>
  ),
  p: ({ children }) => (
    <Typography variant="body1" sx={{ mb: 2 }}>
      {children}
    </Typography>
  ),
  h1: makeHeading('h1'),
  h2: makeHeading('h2'),
  h3: makeHeading('h3'),
  h4: makeHeading('h4'),
  h5: makeHeading('h5'),
  h6: makeHeading('h6')
}

const remarkPlugins = [remarkGfm]

const Markdown: React.FC<MarkdownProps> = ({ content }) => (
  <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
    {content}
  </ReactMarkdown>
)

export default Markdown
