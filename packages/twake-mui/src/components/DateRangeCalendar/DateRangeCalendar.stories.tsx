import { Box, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import DateRangeCalendar, { DateRangeCalendarProps } from './index'

const meta: Meta<typeof DateRangeCalendar> = {
  title: 'DateRangeCalendar',
  component: DateRangeCalendar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    displayMonth: '2026-09-01',
    today: '2026-10-20',
    locale: 'en-GB',
    previousMonthLabel: 'Previous month',
    nextMonthLabel: 'Next month'
  }
}

export default meta
type Story = StoryObj<typeof meta>

const PickingCalendar: React.FC<DateRangeCalendarProps> = props => {
  const [displayMonth, setDisplayMonth] = useState(props.displayMonth)
  const [start, setStart] = useState(props.start ?? null)
  const [end, setEnd] = useState(props.end ?? null)

  return (
    <DateRangeCalendar
      {...props}
      displayMonth={displayMonth}
      onDisplayMonthChange={setDisplayMonth}
      start={start}
      end={end}
      onPick={day => {
        if (start === null || end !== null) {
          setStart(day)
          setEnd(null)
        } else if (day < start) {
          setStart(day)
          setEnd(start)
        } else {
          setEnd(day)
        }
      }}
    />
  )
}

export const Default: Story = {
  args: { start: '2026-10-08', end: '2026-10-16' },
  render: args => (
    <Box sx={{ width: 480 }}>
      <PickingCalendar {...args} />
    </Box>
  )
}

export const OneMonth: Story = {
  args: { months: 1, displayMonth: '2026-10-01' },
  render: args => (
    <Box sx={{ width: 280 }}>
      <PickingCalendar {...args} />
    </Box>
  )
}

const noop = (): void => undefined

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: args => (
    <Stack spacing={4} sx={{ width: 480 }}>
      <DateRangeCalendar
        {...args}
        onDisplayMonthChange={noop}
        onPick={noop}
        start="2026-10-08"
        end="2026-10-16"
      />
      <DateRangeCalendar
        {...args}
        onDisplayMonthChange={noop}
        onPick={noop}
        min="2026-09-10"
        start="2026-09-29"
        end="2026-10-02"
      />
      <DateRangeCalendar
        {...args}
        months={1}
        displayMonth="2026-10-01"
        onDisplayMonthChange={noop}
        onPick={noop}
        start="2026-10-08"
        end="2026-10-08"
      />
    </Stack>
  )
}
