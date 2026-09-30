import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof Accordion> = {
  title: 'Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    defaultExpanded: { control: 'boolean' },
    disabled: { control: 'boolean' },
    disableGutters: { control: 'boolean' },
    square: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof Accordion>

const Item = ({
  label,
  ...props
}: Omit<React.ComponentProps<typeof Accordion>, 'children'> & {
  label: string
}): React.ReactElement => (
  <Accordion {...props}>
    <AccordionSummary>
      Click to expand/collapse the {label} item
    </AccordionSummary>
    <AccordionDetails>
      <Typography sx={{ m: 2 }}>
        Lorem ipsum dolor sit amet consectetur
      </Typography>
    </AccordionDetails>
  </Accordion>
)

export const Default: Story = {
  render: args => (
    <div style={{ width: 400, maxWidth: '100%' }}>
      <Item {...args} label="first" />
      <Item {...args} label="second" />
      <Item {...args} label="third" />
    </div>
  )
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
    <Stack spacing={4} sx={{ width: 400, maxWidth: '100%' }}>
      <Section title="Default">
        <Item label="first" />
        <Item label="second" />
        <Item label="third" />
      </Section>
      <Section title="Expanded">
        <Item label="first" defaultExpanded />
        <Item label="second" />
      </Section>
      <Section title="Disabled">
        <Item label="first" disabled />
      </Section>
    </Stack>
  )
}
