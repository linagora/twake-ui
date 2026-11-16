import { Box, Link, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import MidEllipsis from './index'

const longText =
  'Augusta Ada King-Noel, Countess of Lovelace (née Byron; 10 December 1815 – 27 November 1852) was an English mathematician and writer, chiefly known for her work on Charles Babbage’s proposed mechanical general-purpose computer, the Analytical Engine.'
const filename = 'my-very-long-file-name-from-last-summer-holidays.pdf'
const path = '/Documents/Administrative/Taxes/2025/Income statements'
const email = 'augusta.ada.king-noel.lovelace@analytical-engine.example.com'
const widths = [80, 150, 250, 400]

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3>{title}</h3>
    {children}
  </section>
)

const meta: Meta<typeof MidEllipsis> = {
  title: 'MidEllipsis',
  component: MidEllipsis,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    children: { control: 'text' },
    className: { control: 'text' },
    title: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: filename
  },
  render: args => (
    <Box sx={{ width: 250 }}>
      <MidEllipsis {...args} />
    </Box>
  )
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Section title="Text prop">
        <MidEllipsis text={longText} />
      </Section>
      <Section title="Children">
        <MidEllipsis>{longText}</MidEllipsis>
      </Section>
      <Section title="Text prop takes precedence over children">
        <MidEllipsis text="Shown from the text prop">
          Hidden children
        </MidEllipsis>
      </Section>
      <Section title="Text fitting its container">
        <MidEllipsis text="Ada Lovelace" />
      </Section>
      <Section title="Container widths">
        <Stack spacing={1}>
          {widths.map(width => (
            <Box key={width} sx={{ width }}>
              <MidEllipsis text={filename} />
            </Box>
          ))}
        </Stack>
      </Section>
      <Section title="Preserved whitespace">
        <Box sx={{ width: 250 }}>
          <MidEllipsis text="Spaces    kept    as    typed    in the name.txt" />
        </Box>
      </Section>
      <Section title="Inside Typography">
        <Stack spacing={1} sx={{ width: 250 }}>
          <Typography variant="h3" noWrap>
            <MidEllipsis text={filename} />
          </Typography>
          <Typography variant="h4" color="textPrimary" noWrap>
            <MidEllipsis text={filename} />
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <MidEllipsis text={email} />
          </Typography>
          <Typography variant="caption" color="textSecondary">
            <MidEllipsis text={path} />
          </Typography>
        </Stack>
      </Section>
      <Section title="Inside a link">
        <Box sx={{ width: 250 }}>
          <Link href="#">
            <MidEllipsis text={path} />
          </Link>
        </Box>
      </Section>
      <Section title="Custom className and native attributes">
        <Box sx={{ width: 250 }}>
          <MidEllipsis
            className="u-mh-1 u-error"
            title={filename}
            data-testid="mid-ellipsis"
            text={filename}
          />
        </Box>
      </Section>
    </Stack>
  )
}
