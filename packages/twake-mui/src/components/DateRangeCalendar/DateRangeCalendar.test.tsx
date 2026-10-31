// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React, { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { addDays, addMonths, monthWeeks, weekdayOf } from './helpers'
import DateRangeCalendar, { DateRangeCalendarProps } from './index'
import { theme } from '../../lib/theme'

afterEach(cleanup)

const setup = (props: Partial<DateRangeCalendarProps> = {}): void => {
  render(
    <ThemeProvider theme={theme}>
      <DateRangeCalendar
        displayMonth="2026-09-01"
        onDisplayMonthChange={vi.fn()}
        today="2026-10-20"
        onPick={vi.fn()}
        locale="en-GB"
        previousMonthLabel="Previous month"
        nextMonthLabel="Next month"
        {...props}
      />
    </ThemeProvider>
  )
}

const cell = (day: string): HTMLElement => {
  const element = document.querySelector<HTMLElement>(`[data-day="${day}"]`)
  if (element === null) throw new Error(`No ${day}`)
  return element
}

describe('helpers', () => {
  it('moves days and months, on the last day of a shorter month', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
    expect(addMonths('2026-01-31', 1)).toBe('2026-02-28')
    expect(addMonths('2026-01-15', -1)).toBe('2025-12-15')
  })

  it('counts the week from Monday', () => {
    expect(weekdayOf('2024-01-01')).toBe(0)
    expect(weekdayOf('2024-01-07')).toBe(6)
  })

  it('fills the weeks of a month with null out of it', () => {
    const weeks = monthWeeks('2026-02-01')
    expect(weeks[0]?.slice(0, 7).filter(day => day === null)).toHaveLength(6)
    expect(weeks[0]?.[6]).toBe('2026-02-01')
    expect(weeks.at(-1)?.[5]).toBe('2026-02-28')
    weeks.forEach(week => {
      expect(week).toHaveLength(7)
    })
  })
})

describe('DateRangeCalendar', () => {
  it('shows two named months by default, one when asked', () => {
    setup()
    expect(screen.getAllByRole('grid')).toHaveLength(2)
    expect(screen.queryByRole('grid', { name: 'September 2026' })).not.toBe(
      null
    )
    expect(screen.queryByRole('grid', { name: 'October 2026' })).not.toBe(null)
    cleanup()

    setup({ months: 1 })
    expect(screen.getAllByRole('grid')).toHaveLength(1)
  })

  it('tells the days of the range and today', () => {
    setup({ start: '2026-10-08', end: '2026-10-16' })

    expect(cell('2026-10-08').getAttribute('aria-selected')).toBe('true')
    expect(cell('2026-10-12').getAttribute('aria-selected')).toBe('true')
    expect(cell('2026-10-16').getAttribute('aria-selected')).toBe('true')
    expect(cell('2026-10-17').getAttribute('aria-selected')).toBe('false')
    expect(cell('2026-10-20').getAttribute('aria-current')).toBe('date')
  })

  it('picks a day, by the pointer and the keyboard, not a disabled one', () => {
    const onPick = vi.fn()
    setup({ onPick, min: '2026-09-10' })

    fireEvent.click(cell('2026-09-15'))
    expect(onPick).toHaveBeenLastCalledWith('2026-09-15')
    fireEvent.keyDown(cell('2026-09-16'), { key: 'Enter' })
    expect(onPick).toHaveBeenLastCalledWith('2026-09-16')
    onPick.mockClear()
    fireEvent.click(cell('2026-09-09'))
    fireEvent.keyDown(cell('2026-09-09'), { key: ' ' })
    expect(onPick).not.toHaveBeenCalled()
    expect(cell('2026-09-09').getAttribute('aria-disabled')).toBe('true')
  })

  it('has one tab stop: the start, today, else the first day shown', () => {
    setup({ start: '2026-10-08', end: '2026-10-16' })
    expect(cell('2026-10-08').tabIndex).toBe(0)
    expect(document.querySelectorAll('td[tabindex="0"]')).toHaveLength(1)
    cleanup()

    setup()
    expect(cell('2026-10-20').tabIndex).toBe(0)
    cleanup()

    setup({ displayMonth: '2026-01-01' })
    expect(cell('2026-01-01').tabIndex).toBe(0)
  })

  it('moves the focus with the keys, and the months past their edge', () => {
    const onDisplayMonthChange = vi.fn()
    setup({ start: '2026-09-15', onDisplayMonthChange })

    fireEvent.keyDown(cell('2026-09-15'), { key: 'ArrowRight' })
    expect(document.activeElement).toBe(cell('2026-09-16'))
    fireEvent.keyDown(cell('2026-09-16'), { key: 'Home' })
    expect(document.activeElement).toBe(cell('2026-09-14'))
    fireEvent.keyDown(cell('2026-09-14'), { key: 'PageDown' })
    expect(document.activeElement).toBe(cell('2026-10-14'))
    fireEvent.keyDown(cell('2026-10-14'), { key: 'PageDown' })
    expect(onDisplayMonthChange).toHaveBeenLastCalledWith('2026-10-01')
  })

  it('keeps the focus on an arrow used twice, and its month names', () => {
    const Controlled: React.FC = () => {
      const [displayMonth, setDisplayMonth] = useState('2026-09-01')
      return (
        <ThemeProvider theme={theme}>
          <DateRangeCalendar
            displayMonth={displayMonth}
            onDisplayMonthChange={setDisplayMonth}
            today="2026-10-20"
            onPick={vi.fn()}
            locale="en-GB"
            previousMonthLabel="Previous month"
            nextMonthLabel="Next month"
          />
        </ThemeProvider>
      )
    }
    render(<Controlled />)

    const arrow = screen.getByRole('button', { name: 'Next month' })
    arrow.focus()
    fireEvent.click(arrow)
    expect(arrow.isConnected).toBe(true)
    expect(document.activeElement).toBe(arrow)
    expect(screen.queryByRole('grid', { name: 'November 2026' })).not.toBe(null)
    fireEvent.click(arrow)
    expect(document.activeElement).toBe(arrow)
    expect(screen.queryByRole('grid', { name: 'December 2026' })).not.toBe(null)
  })

  it('says its grids select several days', () => {
    setup()

    screen.getAllByRole('grid').forEach(grid => {
      expect(grid.getAttribute('aria-multiselectable')).toBe('true')
    })
  })

  it('refuses a day after max', () => {
    const onPick = vi.fn()
    setup({ onPick, max: '2026-09-10' })

    fireEvent.click(cell('2026-09-11'))
    expect(onPick).not.toHaveBeenCalled()
    fireEvent.click(cell('2026-09-10'))
    expect(onPick).toHaveBeenCalledWith('2026-09-10')
  })

  it('selects only the two days when start comes after end, or are the same', () => {
    setup({ start: '2026-10-16', end: '2026-10-08' })
    expect(cell('2026-10-12').getAttribute('aria-selected')).toBe('false')
    expect(cell('2026-10-16').getAttribute('aria-selected')).toBe('true')
    expect(cell('2026-10-08').getAttribute('aria-selected')).toBe('true')
    cleanup()

    setup({ start: '2026-10-08', end: '2026-10-08' })
    expect(cell('2026-10-08').getAttribute('aria-selected')).toBe('true')
    expect(cell('2026-10-09').getAttribute('aria-selected')).toBe('false')
  })

  it('goes to the end of the week, and a year back with Shift', () => {
    const onDisplayMonthChange = vi.fn()
    setup({ start: '2026-09-15', onDisplayMonthChange })

    fireEvent.keyDown(cell('2026-09-15'), { key: 'End' })
    expect(document.activeElement).toBe(cell('2026-09-20'))
    fireEvent.keyDown(cell('2026-09-20'), { key: 'PageUp', shiftKey: true })
    expect(onDisplayMonthChange).toHaveBeenLastCalledWith('2025-09-01')
  })

  it('moves by the arrows of its months', () => {
    const onDisplayMonthChange = vi.fn()
    setup({ onDisplayMonthChange })

    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }))
    expect(onDisplayMonthChange).toHaveBeenLastCalledWith('2026-08-01')
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }))
    expect(onDisplayMonthChange).toHaveBeenLastCalledWith('2026-10-01')
  })
})
