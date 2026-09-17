import { Typography } from '@linagora/twake-mui'
import React, { FC, useMemo } from 'react'

import { collectRules } from '../lib/introspect'
import { Chapter, Code, Prose, Rail, Section, Swatch } from './shared'

interface Color {
  name: string
  value: string
  variable: string | null
}

// Read from the stylesheet rather than kept as a list: every `.u-bg-*` class
// has a `.u-*` twin, so the background rules are the catalogue.
const useColors = (): Color[] =>
  useMemo(
    () =>
      collectRules()
        .filter(rule => /^\.u-bg-(?!transparent)/.test(rule.selector))
        .map(rule => {
          const value = rule.decls[0][1].replace(' !important', '')
          return {
            name: rule.selector.replace('.u-bg-', ''),
            value,
            variable: value.match(/var\((--[\w-]+)\)/)?.[1] ?? null
          }
        }),
    []
  )

export const Colors: FC = () => {
  const colors = useColors()

  return (
    <Chapter id="colors" title="Colors">
      <Prose>
        Every color comes as text and as background. Both read a token from{' '}
        <Code tone="var">vars.css</Code> — the same one twake-mui gives its
        components — so a class and a component always land on the same value.
        Switch the theme in the toolbar and they move together.
      </Prose>

      <Section title="Palette" note={`${colors.length} colors`}>
        <Rail columns="auto auto auto minmax(0, 1fr)">
          {colors.map(({ name, value, variable }) => (
            <React.Fragment key={name}>
              <Swatch color={value} />
              <Code>{`.u-${name}`}</Code>
              <Code>{`.u-bg-${name}`}</Code>
              {variable === null ? (
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                  {value} — a scrim, the same in both modes
                </Typography>
              ) : (
                <Code tone="var">{variable}</Code>
              )}
            </React.Fragment>
          ))}
        </Rail>
      </Section>

      <Section title="Links" note="u-link colors the four link states">
        <a className="u-link" href="#colors">
          A link carrying <Code>.u-link</Code>
        </a>
      </Section>
    </Chapter>
  )
}
