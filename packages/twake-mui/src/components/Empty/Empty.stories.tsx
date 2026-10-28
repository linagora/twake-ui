import { Box, Button, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Icon, TwakeWorkplace } from '@linagora/twake-icons'

import { Empty, EmptyIconSize } from './index'

const iconSizes: EmptyIconSize[] = ['normal', 'medium', 'large']
const image = 'https://i.pravatar.cc/150?img=11'
const longTitle =
  'This is a very very long title, just to see and verify how it works with it'
const longText =
  'Ada Lovelace was an English mathematician and writer, chiefly known for her work on the Analytical Engine. She was the first to recognise that the machine had applications beyond pure calculation, and published the first algorithm intended to be carried out by such a machine.'

const meta: Meta<typeof Empty> = {
  title: 'Empty',
  component: Empty,
  tags: ['autodocs'],
  argTypes: {
    iconSize: { control: 'select', options: iconSizes },
    title: { control: 'text' },
    text: { control: 'text' },
    centered: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: TwakeWorkplace,
    iconSize: 'normal',
    title: 'This list is empty',
    text: 'Try adding some content to this list',
    centered: false
  }
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    {children}
  </section>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Section title="Icon sizes">
        {iconSizes.map(iconSize => (
          <Empty
            key={iconSize}
            icon={TwakeWorkplace}
            iconSize={iconSize}
            title="This list is empty"
            text="Try adding some content to this list"
          />
        ))}
      </Section>

      <Section title="Long title and text">
        <Empty icon={TwakeWorkplace} title={longTitle} text={longText} />
      </Section>

      <Section title="With content">
        <Empty
          icon={TwakeWorkplace}
          title="This list is empty"
          text="Try adding some content to this list"
        >
          <Button variant="contained" sx={{ mt: 2 }}>
            Try refreshing
          </Button>
        </Empty>
      </Section>

      <Section title="Centered">
        <Box sx={{ display: 'flex', height: 500, transform: 'scale(1)' }}>
          <Empty
            icon={TwakeWorkplace}
            title="This list is empty"
            text="Try adding some content to this list"
            centered
          />
        </Box>
      </Section>

      <Section title="Custom images">
        <Empty
          icon={TwakeWorkplace}
          title="With functional SVG"
          text="Try adding some content to this list"
        />
        <Empty
          icon={<img src={image} alt="" />}
          title="With IMG"
          text="Try adding some content to this list"
        />
        <Empty
          icon={
            <svg width="100" height="100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="var(--twake-palette-primary-main)"
                strokeWidth="4"
                fill="var(--twake-palette-background-paper)"
              />
            </svg>
          }
          title="With SVG"
          text="Try adding some content to this list"
        />
        <Empty
          icon={<Icon icon={TwakeWorkplace} />}
          title="With Icon component"
          text="Try adding some content to this list"
        />
      </Section>
    </Stack>
  )
}
