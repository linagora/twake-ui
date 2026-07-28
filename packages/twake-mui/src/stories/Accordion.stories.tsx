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
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Accordion>

const AccordionGroup = (): React.ReactElement => (
  <Stack spacing={2} sx={{ width: 400 }}>
    <Accordion>
      <AccordionSummary>
        Click to expand/collapse the first item
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Lorem ipsum dolor sit amet consectetur</Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary>
        Click to expand/collapse the second item
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Lorem ipsum dolor sit amet consectetur</Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary>
        Click to expand/collapse the third item
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Lorem ipsum dolor sit amet consectetur</Typography>
      </AccordionDetails>
    </Accordion>
  </Stack>
)

export const Docs: Story = {
  render: () => <AccordionGroup />
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => <AccordionGroup />
}
