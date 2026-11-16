import { Paper, Stack } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV2'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import type { DateValidationError } from '@mui/x-date-pickers/models'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { enUS } from 'date-fns/locale'
import React, { useState } from 'react'

const description = `
To pick a date, a time or a month, use [MUI X Date Pickers](https://mui.com/x/react-date-pickers/), installed in the app with \`date-fns\`. Their popups are built on MUI components that twake-mui themes. Their field is a \`PickersTextField\`, which twake-mui does not theme yet: its radius, border colors and gutters still differ from a \`TextField\`.

Wrap the app once in a \`LocalizationProvider\`, with the date-fns locale and the picker texts of the user's language. Twake apps use date-fns 2.30.0, so import the adapter from \`@mui/x-date-pickers/AdapterDateFnsV2\`:

\`\`\`jsx
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV2'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { frFR } from '@mui/x-date-pickers/locales'
import { fr } from 'date-fns/locale'

<LocalizationProvider
  dateAdapter={AdapterDateFns}
  adapterLocale={fr}
  localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText}
>
  <App />
</LocalizationProvider>
\`\`\`
`

const MIN_DATE = new Date(2025, 0, 10)

const getErrorMessage = (error: DateValidationError): string | null => {
  if (error === 'minDate') return 'The date must be on or after 01/10/2025'
  if (error === 'invalidDate') return 'Invalid date'
  return null
}

const ExampleDatePicker = (): React.JSX.Element => {
  const [value, setValue] = useState<Date | null>(new Date(2025, 0, 8))
  const [error, setError] = useState<DateValidationError>(null)

  return (
    <DatePicker
      label="Expiration date"
      value={value}
      minDate={MIN_DATE}
      onChange={setValue}
      onError={setError}
      slotProps={{
        textField: { helperText: getErrorMessage(error) },
        actionBar: { actions: ['clear', 'today', 'cancel', 'accept'] }
      }}
    />
  )
}

const ExampleModes = (): React.JSX.Element => (
  <Stack spacing={2}>
    <TimePicker label="Time" defaultValue={new Date(2025, 0, 15, 14, 30)} />
    <DateTimePicker
      label="Date and time"
      defaultValue={new Date(2025, 0, 15, 14, 30)}
    />
  </Stack>
)

const ExampleMonthPicker = (): React.JSX.Element => {
  const [value, setValue] = useState<Date | null>(new Date(2025, 7))

  return (
    <Stack spacing={2}>
      <Paper>
        <DateCalendar
          views={['year', 'month']}
          openTo="month"
          value={value}
          onChange={setValue}
        />
      </Paper>
      <DatePicker
        label="Month"
        views={['year', 'month']}
        openTo="month"
        value={value}
        onChange={setValue}
      />
    </Stack>
  )
}

const meta: Meta = {
  title: 'DatePicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: description } }
  },
  decorators: [
    (Story): React.JSX.Element => (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
        <Story />
      </LocalizationProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A date field with `minDate`: `onError` gives the validation error, shown in `slotProps.textField.helperText`, and `slotProps.actionBar.actions` adds the clear and today buttons. The value is before `minDate`, so the error message shows.'
      }
    }
  },
  render: () => <ExampleDatePicker />
}

export const Modes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A time field with `TimePicker`, and a date and time field with `DateTimePicker`.'
      }
    }
  },
  render: () => <ExampleModes />
}

export const MonthPicker: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A month picker, inline with `DateCalendar` or as a field with `DatePicker`, both with `views={['year', 'month']}` and `openTo=\"month\"`."
      }
    }
  },
  render: () => <ExampleMonthPicker />
}
