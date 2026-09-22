import { Box, Typography } from '@linagora/twake-mui'
import React, { FC } from 'react'

import { Chapter, Code, Prose, Rail, Section } from './shared'

const SCALE: [string, string, string][] = [
  ['0', '0', 'spacing(0)'],
  ['half', '8px', 'spacing(1)'],
  ['1', '16px', 'spacing(2)'],
  ['1-half', '24px', 'spacing(3)'],
  ['2', '32px', 'spacing(4)'],
  ['2-half', '40px', 'spacing(5)'],
  ['3', '48px', 'spacing(6)']
]

const DIRECTIONS: [string, string, string][] = [
  ['', 'all four sides', '.u-p-1'],
  ['t', 'top', '.u-mt-1'],
  ['b', 'bottom', '.u-mb-1'],
  ['l', 'left', '.u-pl-1'],
  ['r', 'right', '.u-pr-1'],
  ['v', 'top and bottom', '.u-pv-1'],
  ['h', 'left and right', '.u-ph-1']
]

const BREAKPOINTS: [string, string, string][] = [
  ['-t', 'up to 480px', '.u-p-1-t'],
  ['-s', 'up to 768px', '.u-mt-2-s'],
  ['-m', 'up to 1023px', '.u-flex-column-m']
]

const STACK = ['xs', 's', 'm', 'l', 'xl', 'xxl']

const Quiet: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
    {children}
  </Typography>
)

export const Spacing: FC = () => (
  <Chapter id="spacing" title="Spacing">
    <Prose>
      Padding and margin sit on the same 8px grid as MUI, counted with a
      different step: the classes count in rem, MUI in half-rem. So{' '}
      <Code>.u-p-1</Code> is 16px while <Code tone="var">sx=&#123;&#123; p: 1
      &#125;&#125;</Code> is 8px.
    </Prose>

    <Section title="Scale" note="stops at 3 — beyond that, use sx or local CSS">
      <Rail columns="auto auto auto minmax(0, 1fr)">
        {SCALE.map(([name, px, mui]) => (
          <React.Fragment key={name}>
            <Code>{`.u-p-${name}`}</Code>
            <Quiet>{px}</Quiet>
            <Code tone="var">{mui}</Code>
            <Box
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: '5px',
                width: 'fit-content'
              }}
            >
              <Box className={`u-p-${name}`}>
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: '3px',
                    backgroundColor: 'common.white'
                  }}
                />
              </Box>
            </Box>
          </React.Fragment>
        ))}
      </Rail>
    </Section>

    <Section title="Directions" note="a letter picks which sides move">
      <Rail columns="auto auto minmax(0, 1fr)">
        {DIRECTIONS.map(([letter, label, example]) => (
          <React.Fragment key={label}>
            <Code>{letter === '' ? '—' : letter}</Code>
            <Quiet>{label}</Quiet>
            <Code>{example}</Code>
          </React.Fragment>
        ))}
      </Rail>
    </Section>

    <Section title="Breakpoints" note="a suffix narrows a class to small screens">
      <Rail columns="auto auto minmax(0, 1fr)">
        {BREAKPOINTS.map(([suffix, width, example]) => (
          <React.Fragment key={suffix}>
            <Code>{suffix}</Code>
            <Quiet>{width}</Quiet>
            <Code>{example}</Code>
          </React.Fragment>
        ))}
      </Rail>
      <Prose>
        These are max-width queries, so they stack: on a 400px screen a{' '}
        <Code>-t</Code>, a <Code>-s</Code> and an <Code>-m</Code> class all match
        and the last one declared wins. The class reference marks which families
        take them.
      </Prose>
    </Section>

    <Section title="Stacks" note="margin between direct children, edges untouched">
      <Rail columns="auto minmax(0, 1fr)">
        {STACK.map(name => (
          <React.Fragment key={name}>
            <Code>{`.u-stack-${name}`}</Code>
            <Box className={`u-stack-${name}`}>
              <Box
                sx={{ height: 10, borderRadius: '3px', backgroundColor: 'primary.main' }}
              />
              <Box
                sx={{ height: 10, borderRadius: '3px', backgroundColor: 'primary.main' }}
              />
            </Box>
          </React.Fragment>
        ))}
      </Rail>
      <Prose>
        <Code>.u-row-*</Code> is the horizontal equivalent.
      </Prose>
    </Section>
  </Chapter>
)
