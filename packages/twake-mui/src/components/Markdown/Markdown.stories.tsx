import { Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import mountains from '../../stories/images/mountains.png'
import { getPlainTextFromMarkdown } from './helpers'
import Markdown from './index'

const content = `
# Demo

This is a text to test all possibilities of markdown.

## Headers

# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header

## Paragraphs

I really like using Markdown.

I think I'll use it to format all of my documents from now on.

## Emphasis

_Italic Text_

***Bold Text***

__Bold and Italic Text__

~~Strikethrough~~

<u>Underline</u>

## Lists

1. Ordered List Item 1
2. Ordered List Item 2
3. Ordered List Item 3

- Unordered List Item 1
- Unordered List Item 2
- Unordered List Item 3

## Links

[Link to GitHub](https://github.com/linagora/twake-ui)

## Images

![Mountains](${mountains} "Mountains")

## Code

Inline code: \`const variable = 'value';\`

Block code:
\`\`\`javascript function add(a, b) { return a + b; }\`\`\`

## Blockquotes

> This is a blockquote.
`

const meta: Meta<typeof Markdown> = {
  title: 'Markdown',
  component: Markdown,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { content }
}

export const Screenshot: Story = {
  tags: ['argos'],
  args: { content }
}

export const PlainText: Story = {
  args: {
    content:
      '# Demo\n\nSome **bold** text, a [link](https://twake.app) and a list:\n\n- first\n- second'
  },
  render: ({ content }) => (
    <Typography noWrap>{getPlainTextFromMarkdown(content)}</Typography>
  )
}
