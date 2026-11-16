import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

interface MarkdownNode {
  type: string
  value?: unknown
  alt?: string | null
  children?: MarkdownNode[]
}

export const remarkPlugins = [remarkGfm]

const markdown = unified().use(remarkParse).use(remarkPlugins)

// Nodes whose children are blocks or cells: a space keeps their words apart
const BLOCKS = [
  'root',
  'blockquote',
  'footnoteDefinition',
  'list',
  'listItem',
  'table',
  'tableRow'
]

const getWords = (node: MarkdownNode): string => {
  if (node.type === 'image' || node.type === 'imageReference')
    return node.alt ?? ''
  if (node.type === 'break') return ' '
  if (typeof node.value === 'string') return node.value

  return (node.children ?? [])
    .map(getWords)
    .join(BLOCKS.includes(node.type) ? ' ' : '')
}

/**
 * Gives the words of a Markdown content on one line, without its syntax,
 * as the Markdown component shows them: for a preview
 */
export const getPlainTextFromMarkdown = (content: string): string =>
  getWords(markdown.runSync(markdown.parse(content)))
    .replace(/\s+/g, ' ')
    .trim()
