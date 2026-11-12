// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { Filter } from '@linagora/twake-icons'

import { Empty, EmptyIconLook } from './index'
import { theme } from '../../lib/theme'

afterEach(cleanup)

const iconOf = (iconLook?: EmptyIconLook): Element | null => {
  render(
    <ThemeProvider theme={theme}>
      <Empty icon={Filter} iconLook={iconLook} title="No rules" />
    </ThemeProvider>
  )
  screen.getByText('No rules')
  return document.querySelector('.Empty-icon')
}

describe('Empty', () => {
  it.each([
    ['tile', 'Empty-iconTile'],
    ['tinted', 'Empty-iconTinted']
  ] as const)(
    'draws a %s icon at 60 px, hidden from assistive technology',
    (iconLook, className) => {
      const icon = iconOf(iconLook)
      expect(icon?.classList.contains(className)).toBe(true)
      expect(icon?.getAttribute('aria-hidden')).toBe('true')
      expect(icon?.querySelector('svg')?.getAttribute('width')).toBe('60')
    }
  )

  it('keeps the large glyph by default', () => {
    const icon = iconOf()
    expect(icon?.tagName.toLowerCase()).toBe('svg')
    expect(icon?.getAttribute('width')).toBe('100%')
  })
})
