import { Box, Typography } from '@linagora/twake-mui'
import React, { FC, useMemo } from 'react'

import { collectRules, isResponsiveVariant } from '../lib/introspect'
import { Chapter, Code, MONO, Prose, Rail, Section, useFilter } from './shared'

// Ordered: the first pattern that matches wins.
export const FAMILIES: [string, RegExp][] = [
  ['Spacing', /^\.u-[pm]-/],
  ['Position', /^\.u-(pos|top|bottom|left|right)-/],
  ['Dimensions', /^\.u-(w|h|miw|maw|mih|mah)-/],
  ['Display', /^\.u-(dn|di|db|dc|dib|dit|dt|dtc|dt-|hide|visuallyhidden)/],
  ['Flexbox', /^\.u-(flex|inline-flex)/],
  ['Text colors', /^\.u-(primary|secondary|error|success|warning|info|overlay|black|white|link)/],
  ['Background colors', /^\.u-bg-/],
  ['Typography', /^\.u-(fz|fw|fs|ta|lh|uppercase|lowercase|ellipsis|midellipsis|spacellipsis|breakword)/],
  ['Borders', /^\.u-(bdrs|bdw)-/],
  ['Opacity', /^\.u-o-/],
  ['Overflow', /^\.u-ov-/],
  ['Cursor', /^\.u-c-/],
  ['Stacks', /^\.u-(stack|row)-/],
  ['Media object', /^\.u-media/],
  ['Elevation', /^\.u-elevation-/],
  ['Misc', /^\.u-/]
]

export const familyAnchor = (family: string): string =>
  `classes-${family.toLowerCase().replace(/\s+/g, '-')}`

interface Entry {
  selector: string
  decls: [string, string][]
  responsive: boolean
}

const familyOf = (selector: string): string =>
  (FAMILIES.find(([, pattern]) => pattern.test(selector)) ?? ['Misc'])[0]

const useCatalogue = (): Map<string, Entry[]> =>
  useMemo(() => {
    const base = new Map<string, Entry>()
    const responsive = new Set<string>()

    for (const rule of collectRules()) {
      for (const selector of rule.selector.split(',').map(s => s.trim())) {
        if (!selector.startsWith('.u-')) continue
        // Direction variants (.u-mt-1, .u-ph-2) live in the Spacing chapter;
        // listing all 105 of them here buries everything else.
        if (/^\.u-[pm][tblrvh]-/.test(selector)) continue

        if (rule.media !== undefined && isResponsiveVariant(selector)) {
          responsive.add(selector.replace(/-(t|s|m)$/, ''))
          continue
        }

        const existing = base.get(selector)
        if (existing === undefined) {
          base.set(selector, { selector, decls: rule.decls, responsive: false })
        } else {
          existing.decls = [...existing.decls, ...rule.decls]
        }
      }
    }

    const grouped = new Map<string, Entry[]>()
    for (const entry of base.values()) {
      entry.responsive = responsive.has(entry.selector)
      const family = familyOf(entry.selector)
      grouped.set(family, [...(grouped.get(family) ?? []), entry])
    }

    for (const [family, entries] of grouped) {
      grouped.set(
        family,
        entries.sort((a, b) => a.selector.localeCompare(b.selector))
      )
    }

    return new Map(
      FAMILIES.map(([name]) => name)
        .filter(name => grouped.has(name))
        .map(name => [name, grouped.get(name) as Entry[]])
    )
  }, [])

const Badge: FC = () => (
  <Box
    component="span"
    sx={{
      fontFamily: MONO,
      fontSize: 11,
      lineHeight: 1.6,
      px: 0.75,
      borderRadius: '4px',
      color: 'text.secondary',
      backgroundColor: 'background.contrast'
    }}
  >
    -t -s -m
  </Box>
)

export const Classes: FC = () => {
  const catalogue = useCatalogue()
  const { query } = useFilter()
  const needle = query.trim().toLowerCase()

  const matching = useMemo(() => {
    if (needle === '') return catalogue

    const filtered = new Map<string, Entry[]>()
    for (const [family, entries] of catalogue) {
      const kept = entries.filter(entry =>
        entry.selector.toLowerCase().includes(needle)
      )
      if (kept.length > 0) filtered.set(family, kept)
    }
    return filtered
  }, [catalogue, needle])

  const total = Array.from(matching.values()).reduce(
    (sum, entries) => sum + entries.length,
    0
  )

  return (
    <Chapter id="classes" title="Class reference">
      <Prose>
        {needle === ''
          ? `${total} classes, read out of the loaded stylesheet — this list cannot fall out of sync with the CSS. `
          : `${total} classes match “${query}”. `}
        A <Badge /> badge means the class also exists with a breakpoint suffix.
        Padding and margin take a direction letter too; both are set out under{' '}
        <Typography
          component="a"
          href="#spacing"
          variant="body1"
          sx={{ color: 'primary.main', textDecoration: 'none', fontSize: 15 }}
        >
          Spacing
        </Typography>
        .
      </Prose>

      {total === 0 && (
        <Section title="No match" note={`nothing contains “${query}”`}>
          <Prose>Try a fragment such as flex, bdrs or elevation.</Prose>
        </Section>
      )}

      {Array.from(matching).map(([family, entries]) => (
        <Section
          key={family}
          id={familyAnchor(family)}
          title={family}
          note={`${entries.length}`}
        >
          <Rail columns="minmax(210px, auto) minmax(0, 1fr)">
            {entries.map(entry => (
              <React.Fragment key={entry.selector}>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Code>{entry.selector}</Code>
                  {entry.responsive && <Badge />}
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.6 }}
                >
                  {entry.decls
                    .map(([prop, value]) => `${prop}: ${value}`)
                    .join('; ')}
                </Typography>
              </React.Fragment>
            ))}
          </Rail>
        </Section>
      ))}
    </Chapter>
  )
}
