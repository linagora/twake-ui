import { Box, Typography } from '@linagora/twake-mui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { FC, useState } from 'react'

import { Classes, FAMILIES, familyAnchor } from './Classes'
import { Colors } from './Colors'
import { CssVariables, VARIABLE_GROUPS } from './CssVariables'
import { Spacing } from './Spacing'
import { Body, Code, FilterContext, MONO, Nav, Page, Prose } from './shared'

const NAV: [string, string][][] = [
  [
    ['colors', 'Colors'],
    ['spacing', 'Spacing'],
    ['variables', 'Variables'],
    ['classes', 'Classes']
  ],
  [
    ...VARIABLE_GROUPS.map(
      ([group]) => [`variables-${group.toLowerCase()}`, group] as [string, string]
    ),
    ['variables-shadows', 'Shadows'],
    ['variables-zindex', 'Stacking']
  ],
  FAMILIES.map(([family]) => [familyAnchor(family), family] as [string, string])
]

const Requirement: FC<{ children: React.ReactNode; note: string }> = ({
  children,
  note
}) => (
  <Box sx={{ mt: 2 }}>
    <Box
      sx={{
        fontFamily: MONO,
        fontSize: 13,
        px: 1.5,
        py: 1,
        borderRadius: '6px',
        backgroundColor: 'background.contrast',
        width: 'fit-content',
        maxWidth: '100%',
        overflowX: 'auto'
      }}
    >
      {children}
    </Box>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ fontSize: 13, mt: 0.75, maxWidth: '68ch' }}
    >
      {note}
    </Typography>
  </Box>
)

const Documentation: FC = () => {
  const [query, setQuery] = useState('')

  return (
    <FilterContext.Provider value={{ query, setQuery }}>
      <Page>
        <Nav groups={NAV} />
        <Body>
          <Box sx={{ pt: 6 }}>
            <Typography
              variant="h3"
              sx={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.02em' }}
            >
              twake-css
            </Typography>
            <Prose>
              The Twake palette as --twake-* CSS variables, and the utility classes
              that replace <Code tone="var">cozy-ui.utils.min.css</Code>. Two
              files, and two ways to get the variables into the page.
            </Prose>

            <Requirement note="In a React app. TwakeMuiThemeProvider emits the variables at runtime and sets data-theme on the document, so only the classes are needed.">
              import &apos;@linagora/twake-css/dist/utils.css&apos;
            </Requirement>

            <Requirement note="Anywhere else — Svelte, a page served by cozy-stack, plain HTML. No JavaScript: the page follows prefers-color-scheme, and an explicit data-theme on <html> has the last word.">
              import &apos;@linagora/twake-css/dist/vars.css&apos;
              <br />
              import &apos;@linagora/twake-css/dist/utils.css&apos;
            </Requirement>
          </Box>

          <Colors />
          <Spacing />
          <CssVariables />
          <Classes />
        </Body>
      </Page>
    </FilterContext.Provider>
  )
}

const meta = {
  title: 'twake-css',
  component: Documentation
} satisfies Meta<typeof Documentation>

export default meta

export const Documentation_: StoryObj<typeof meta> = { name: 'Documentation' }
