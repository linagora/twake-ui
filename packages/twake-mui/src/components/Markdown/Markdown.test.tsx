// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import Markdown from './index'

afterEach(cleanup)

describe('Markdown', () => {
  it('renders headings and paragraphs', () => {
    render(<Markdown content={'# Title\n\nSome text.'} />)

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Title')
    expect(screen.queryByText('Some text.')).not.toBe(null)
  })

  it('renders links that open in a new tab', () => {
    render(<Markdown content="[twake](https://twake.app)" />)

    const link = screen.getByRole('link', { name: 'twake' })

    expect(link.getAttribute('href')).toBe('https://twake.app')
    expect(link.getAttribute('target')).toBe('_blank')
  })

  it('renders strikethrough', () => {
    render(<Markdown content="~~gone~~" />)

    expect(document.querySelector('del')?.textContent).toBe('gone')
  })
})
