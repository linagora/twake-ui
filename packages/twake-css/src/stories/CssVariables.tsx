import { Box, Typography } from '@linagora/twake-mui'
import React, { FC, useEffect, useMemo, useState } from 'react'

import { collectRules, declaredVariables } from '../lib/introspect'
import { Chapter, Code, Prose, Rail, Section, Swatch } from './shared'

// Mirrors the groups of the Twake design library, in its reading order.
export const VARIABLE_GROUPS: [string, RegExp][] = [
  ['Text', /^--twake-palette-text-/],
  ['Action', /^--twake-palette-action-/],
  ['Divider', /^--twake-palette-divider/],
  ['Border', /^--twake-palette-border-/],
  ['Background', /^--twake-palette-background-/],
  ['Primary', /^--twake-palette-primary-/],
  ['Secondary', /^--twake-palette-secondary-/],
  ['Status', /^--twake-palette-(error|warning|info|success)-/],
  ['Common', /^--twake-palette-common-/],
  ['Grey', /^--twake-palette-grey-/]
]

const Z_INDEX_TARGET: Record<string, string> = {
  '--zIndex-nav': '--twake-zIndex-appBar',
  '--zIndex-bar': '--twake-zIndex-appBar',
  '--zIndex-drawer': '--twake-zIndex-drawer',
  '--zIndex-modal': '--twake-zIndex-modal',
  '--zIndex-popover': '--twake-zIndex-modal',
  '--zIndex-modal-footer': '--twake-zIndex-modal',
  '--zIndex-modal-toolbar': '--twake-zIndex-modal',
  '--zIndex-alert': '--twake-zIndex-snackbar'
}

type Mode = 'light' | 'dark'

const MODES: Mode[] = ['light', 'dark']

// An offscreen node carrying the other data-theme resolves the other mode.
const probe = (mode: Mode, names: string[]): Map<string, string> => {
  const node = document.createElement('div')
  node.setAttribute('data-theme', mode)
  node.style.display = 'none'
  document.body.appendChild(node)

  const style = getComputedStyle(node)
  const values = new Map(
    names.map(name => [name, style.getPropertyValue(name).trim()])
  )

  node.remove()

  return values
}

// Read after mount: twake-mui injects its stylesheet during the first commit.
interface Resolved {
  palette: string[]
  shadows: string[]
  values: Map<Mode, Map<string, string>>
}

const EMPTY: Resolved = { palette: [], shadows: [], values: new Map() }

const useVariables = (zIndex: string[]): Resolved => {
  const [resolved, setResolved] = useState<Resolved>(EMPTY)

  useEffect(() => {
    const palette = declaredVariables('--twake-palette-')
    const shadows = declaredVariables('--twake-shadows-').sort(
      (a, b) => Number(a.split('-').pop()) - Number(b.split('-').pop())
    )

    setResolved({
      palette,
      shadows,
      values: new Map(
        MODES.map(mode => [mode, probe(mode, [...palette, ...zIndex])])
      )
    })
  }, [zIndex])

  return resolved
}

const Quiet: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
    {children}
  </Typography>
)

const Pair: FC<{ mode: Mode; name: string; value?: string }> = ({
  mode,
  name,
  value
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
    <Swatch mode={mode} color={`var(${name})`} />
    <Quiet>{value}</Quiet>
  </Box>
)

export const CssVariables: FC = () => {
  const zIndex = useMemo(() => {
    const declared = new Set<string>()
    for (const rule of collectRules()) {
      if (rule.selector !== ':root') continue
      for (const [prop] of rule.decls) {
        if (prop.startsWith('--zIndex-')) declared.add(prop)
      }
    }
    return Array.from(declared)
  }, [])

  const { palette, shadows, values } = useVariables(zIndex)

  const visible = palette.filter(
    name =>
      // Channel and opacity variants are MUI plumbing.
      !/(channel|opacity)$/i.test(name) &&
      // Per-component colors MUI derives under a capitalised prefix
      // (--twake-palette-Alert-errorColor) are internal.
      !/^--twake-palette-[A-Z]/.test(name)
  )

  return (
    <Chapter id="variables" title="Theme variables">
      <Prose>
        Declared by vars.css, and emitted with the same values by
        TwakeMuiThemeProvider at runtime. Any of them can be used in your own
        CSS. Colors are resolved in both modes below.
      </Prose>

      {VARIABLE_GROUPS.map(([group, pattern], index) => {
        const names = visible.filter(
          name =>
            pattern.test(name) &&
            !VARIABLE_GROUPS.slice(0, index).some(([, earlier]) =>
              earlier.test(name)
            )
        )

        if (names.length === 0) return null

        return (
          <Section
            key={group}
            id={`variables-${group.toLowerCase()}`}
            title={group}
            note={`${names.length}`}
          >
            <Rail columns="minmax(0, auto) 1fr 1fr">
              <Box />
              <Quiet>Light</Quiet>
              <Quiet>Dark</Quiet>
              {names.map(name => (
                <React.Fragment key={name}>
                  <Code tone="var">{name}</Code>
                  {MODES.map(mode => (
                    <Pair
                      key={mode}
                      mode={mode}
                      name={name}
                      value={values.get(mode)?.get(name)}
                    />
                  ))}
                </React.Fragment>
              ))}
            </Rail>
          </Section>
        )
      })}

      <Section
        id="variables-shadows"
        title="Shadows"
        note={`${shadows.length} levels, shared by both modes`}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))',
            gap: 2.5
          }}
        >
          {shadows.map((name, level) => (
            <Box key={name}>
              <Box
                sx={{
                  height: 48,
                  borderRadius: '6px',
                  backgroundColor: 'background.paper',
                  boxShadow: `var(${name})`
                }}
              />
              <Box sx={{ mt: 1 }}>
                <Code>{`.u-elevation-${level}`}</Code>
              </Box>
            </Box>
          ))}
        </Box>
      </Section>

      <Section
        id="variables-zindex"
        title="Stacking order"
        note="deprecated — kept so existing code keeps working"
      >
        <Prose>
          cozy-ui ran these from -1 to 80 and pulled MUI down to match. twake-mui
          keeps MUI&apos;s 1000-1500 ramp, so the values are rebased onto it with
          the original order intact: arithmetic such as{' '}
          <Code tone="var">calc(var(--zIndex-modal) + 30)</Code> keeps working,
          against the right baseline this time.
        </Prose>
        <Box sx={{ mt: 2.5 }}>
          <Rail columns="auto auto minmax(0, 1fr)">
            {zIndex.map(name => (
              <React.Fragment key={name}>
                <Code tone="var">{name}</Code>
                <Quiet>{values.get('light')?.get(name)}</Quiet>
                {Z_INDEX_TARGET[name] !== undefined ? (
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Quiet>move to</Quiet>
                    <Code tone="var">{Z_INDEX_TARGET[name]}</Code>
                  </Box>
                ) : (
                  <Quiet>no MUI role — pick a local value on the same ramp</Quiet>
                )}
              </React.Fragment>
            ))}
          </Rail>
        </Box>
      </Section>
    </Chapter>
  )
}
