import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { Check } from '../Icons'
import Icon from './index'

describe('Icon', () => {
  it('hides an icon without a label from assistive technologies', () => {
    const svg = renderToStaticMarkup(<Icon icon={Check} />)

    expect(svg).toContain('aria-hidden="true"')
    expect(svg).toContain('focusable="false"')
    expect(svg).not.toContain('role="img"')
  })

  it('hides an icon given by its sprite name too', () => {
    expect(renderToStaticMarkup(<Icon icon="check" />)).toContain(
      'aria-hidden="true"'
    )
  })

  it.each([
    ['aria-label', { 'aria-label': 'Done' }],
    ['aria-labelledby', { 'aria-labelledby': 'done-label' }],
    ['title', { title: 'Done' }]
  ])('shows an icon named by %s as an image', (_name, label) => {
    const svg = renderToStaticMarkup(<Icon icon={Check} {...label} />)

    expect(svg).toContain('role="img"')
    expect(svg).not.toContain('aria-hidden')
  })

  it('names an icon labelled by its title alone with that title', () => {
    expect(renderToStaticMarkup(<Icon icon={Check} title="Done" />)).toContain(
      'aria-label="Done"'
    )
  })

  it('names an icon by its title when its aria-label is undefined', () => {
    expect(
      renderToStaticMarkup(
        <Icon icon={Check} title="Done" aria-label={undefined} />
      )
    ).toContain('aria-label="Done"')
  })

  it('keeps an aria-label over the title', () => {
    const svg = renderToStaticMarkup(
      <Icon icon={Check} aria-label="Done" title="Finished" />
    )

    expect(svg).toContain('aria-label="Done"')
    expect(svg).not.toContain('aria-label="Finished"')
  })

  it("keeps the caller's own aria-hidden on an icon without a label", () => {
    const svg = renderToStaticMarkup(<Icon icon={Check} aria-hidden={false} />)

    expect(svg).toContain('aria-hidden="false"')
    expect(svg).not.toContain('aria-hidden="true"')
  })

  it("keeps the caller's own role on a labelled icon", () => {
    const svg = renderToStaticMarkup(
      <Icon icon={Check} aria-label="Done" role="presentation" />
    )

    expect(svg).toContain('role="presentation"')
    expect(svg).not.toContain('role="img"')
  })

  it('gives an empty alt to a PNG icon without a label', () => {
    expect(renderToStaticMarkup(<Icon icon="/logo.png" />)).toContain('alt=""')
  })

  it('gives no empty alt to a labelled PNG icon', () => {
    expect(
      renderToStaticMarkup(<Icon icon="/logo.png" aria-label="Logo" />)
    ).not.toContain('alt=""')
  })
})
