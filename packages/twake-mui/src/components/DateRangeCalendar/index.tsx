import { Box, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useId, useRef, useState } from 'react'

import { Icon, Left, Right } from '@linagora/twake-icons'

import {
  addDays,
  addMonths,
  dateOf,
  monthOf,
  monthWeeks,
  weekdayOf
} from './helpers'
import type { Day } from './helpers'

export type { Day as DateRangeDay } from './helpers'

export interface DateRangeCalendarProps {
  /** One month, or two side by side. Defaults to two */
  months?: 1 | 2
  /** A day of the first month shown */
  displayMonth: Day
  onDisplayMonthChange: (month: Day) => void
  /** The range picked so far; a single day has the same start and end */
  start?: Day | null
  end?: Day | null
  /** The days that can be picked, null for no bound */
  min?: Day | null
  max?: Day | null
  /** Marked on the grid, the day the Tab key reaches without a start */
  today: Day
  onPick: (day: Day) => void
  /** The language of the names of the months and the days */
  locale: string
  previousMonthLabel: string
  nextMonthLabel: string
  'data-testid'?: string
}

const CELL_SIZE = 32

const isBetween = (day: Day, from: Day | null, to: Day | null): boolean =>
  from !== null && to !== null && day >= from && day <= to

const makeBand = (
  band: string,
  isStart: boolean,
  isEnd: boolean,
  isInRange: boolean
): string => {
  if (!isInRange || (isStart && isEnd)) return 'none'
  if (isStart) return `linear-gradient(to right, transparent 50%, ${band} 50%)`
  if (isEnd) return `linear-gradient(to left, transparent 50%, ${band} 50%)`
  return `linear-gradient(${band}, ${band})`
}

const NavArrow: React.FC<{
  label: string
  isNext: boolean
  onClick: () => void
}> = ({ label, isNext, onClick }) => (
  <Tooltip title={label}>
    <IconButton onClick={onClick} size="small">
      <Icon icon={isNext ? Right : Left} aria-hidden="true" />
    </IconButton>
  </Tooltip>
)

interface DayCellProps {
  day: Day
  /** The whole date, its accessible name */
  label: string
  isStart: boolean
  isEnd: boolean
  isInRange: boolean
  isToday: boolean
  isDisabled: boolean
  isTabStop: boolean
  onFocus: () => void
  onPick: () => void
  onKeyDown: (event: React.KeyboardEvent) => void
}

const DayCell: React.FC<DayCellProps> = ({
  day,
  label,
  isStart,
  isEnd,
  isInRange,
  isToday,
  isDisabled,
  isTabStop,
  onFocus,
  onPick,
  onKeyDown
}) => {
  const isEdge = isStart || isEnd
  return (
    <Box
      component="td"
      role="gridcell"
      data-day={day}
      tabIndex={isTabStop ? 0 : -1}
      aria-label={label}
      aria-selected={isInRange || isEdge}
      aria-disabled={isDisabled || undefined}
      aria-current={isToday ? 'date' : undefined}
      onFocus={onFocus}
      onClick={onPick}
      onKeyDown={onKeyDown}
      sx={{
        height: CELL_SIZE,
        p: 0,
        cursor: isDisabled ? 'default' : 'pointer',
        userSelect: 'none',
        backgroundImage: theme =>
          makeBand(
            theme.alpha(
              theme.vars.palette.primary.main,
              theme.vars.palette.action.selectedOpacity
            ),
            isStart,
            isEnd,
            isInRange
          ),
        // The ring goes around the disc, not the cell
        '&:focus-visible': { outline: 'none' },
        '&:focus-visible > div': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 1
        }
      }}
    >
      <Box
        sx={{
          width: CELL_SIZE,
          height: CELL_SIZE,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          typography: 'caption',
          color: isEdge
            ? 'primary.contrastText'
            : isDisabled
              ? 'text.disabled'
              : 'text.primary',
          bgcolor: isEdge
            ? 'primary.main'
            : isToday && !isInRange
              ? 'action.selected'
              : undefined,
          '&:hover': isEdge || isDisabled ? {} : { bgcolor: 'action.hover' }
        }}
      >
        {Number(day.slice(8))}
      </Box>
    </Box>
  )
}

/**
 * The days of one or two months to pick a range from, a grid as the APG date
 * picker dialog: arrows, Home and End, Page Up and Page Down (a year with
 * Shift), Enter or Space picks. The week starts on Monday.
 */
const DateRangeCalendar: React.FC<DateRangeCalendarProps> = ({
  months = 2,
  displayMonth,
  onDisplayMonthChange,
  start = null,
  end = null,
  min = null,
  max = null,
  today,
  onPick,
  locale,
  previousMonthLabel,
  nextMonthLabel,
  'data-testid': testId
}) => {
  const baseId = useId()
  const gridRef = useRef<HTMLDivElement>(null)
  const shouldFocusRef = useRef(false)
  const [focusedDay, setFocusedDay] = useState<Day>(start ?? today)
  // A new start from outside becomes the day the Tab key reaches
  const [shownStart, setShownStart] = useState(start)
  if (start !== shownStart) {
    setShownStart(start)
    if (start !== null) setFocusedDay(start)
  }
  const firstShown = monthOf(displayMonth)
  const shownMonths = Array.from({ length: months }, (_, index) =>
    addMonths(firstShown, index)
  )
  const lastShown = addMonths(firstShown, months - 1)
  const isShown = (day: Day): boolean =>
    monthOf(day) >= firstShown && monthOf(day) <= lastShown
  const tabDay = isShown(focusedDay) ? focusedDay : firstShown
  const isDisabled = (day: Day): boolean =>
    (min !== null && day < min) || (max !== null && day > max)

  const monthName = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric'
  })
  const dayName = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  const weekdayNarrow = new Intl.DateTimeFormat(locale, { weekday: 'narrow' })
  const weekdayLong = new Intl.DateTimeFormat(locale, { weekday: 'long' })
  // A week from Monday: 2024-01-01 was one
  const week = Array.from({ length: 7 }, (_, index) =>
    addDays('2024-01-01', index)
  )

  useEffect(() => {
    if (!shouldFocusRef.current) return
    shouldFocusRef.current = false
    gridRef.current
      ?.querySelector<HTMLElement>(`[data-day="${focusedDay}"]`)
      ?.focus()
  }, [focusedDay, displayMonth])

  const moveFocus = (day: Day): void => {
    shouldFocusRef.current = true
    setFocusedDay(day)
    if (monthOf(day) < firstShown) onDisplayMonthChange(monthOf(day))
    else if (monthOf(day) > lastShown)
      onDisplayMonthChange(addMonths(monthOf(day), 1 - months))
  }

  const handleKeyDown = (event: React.KeyboardEvent, day: Day): void => {
    const moves: Record<string, () => Day> = {
      ArrowLeft: () => addDays(day, -1),
      ArrowRight: () => addDays(day, 1),
      ArrowUp: () => addDays(day, -7),
      ArrowDown: () => addDays(day, 7),
      Home: () => addDays(day, -weekdayOf(day)),
      End: () => addDays(day, 6 - weekdayOf(day)),
      PageUp: () => addMonths(day, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(day, event.shiftKey ? 12 : 1)
    }
    const move = moves[event.key]
    if (move !== undefined) {
      event.preventDefault()
      moveFocus(move())
      return
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!isDisabled(day)) onPick(day)
    }
  }

  return (
    <Box
      ref={gridRef}
      sx={{ display: 'flex', gap: 4, width: '100%' }}
      data-testid={testId}
    >
      {shownMonths.map((month, index) => {
        const titleId = `${baseId}-${index}`
        return (
          // By position: an arrow stays in place and keeps the focus
          <Box
            key={index}
            sx={{
              flex: '1 1 0',
              minWidth: 0,
              position: 'relative',
              // The line between the two months
              '& + &::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: -16,
                borderLeft: '1px solid',
                borderColor: 'divider'
              }
            }}
          >
            <Box
              sx={{
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {index === 0 ? (
                <NavArrow
                  label={previousMonthLabel}
                  isNext={false}
                  onClick={() => {
                    onDisplayMonthChange(addMonths(firstShown, -1))
                  }}
                />
              ) : (
                <Box sx={{ width: CELL_SIZE }} />
              )}
              <Box
                id={titleId}
                aria-live="polite"
                sx={{
                  typography: 'body2',
                  color: 'text.primary',
                  textAlign: 'center',
                  '&::first-letter': { textTransform: 'uppercase' }
                }}
              >
                {monthName.format(dateOf(month))}
              </Box>
              {index === shownMonths.length - 1 ? (
                <NavArrow
                  label={nextMonthLabel}
                  isNext
                  onClick={() => {
                    onDisplayMonthChange(addMonths(firstShown, 1))
                  }}
                />
              ) : (
                <Box sx={{ width: CELL_SIZE }} />
              )}
            </Box>
            <Box
              component="table"
              role="grid"
              aria-multiselectable="true"
              aria-labelledby={titleId}
              sx={{
                width: '100%',
                borderCollapse: 'collapse',
                tableLayout: 'fixed'
              }}
            >
              <thead>
                <tr>
                  {week.map(day => (
                    <Box
                      component="th"
                      key={day}
                      scope="col"
                      abbr={weekdayLong.format(dateOf(day))}
                      sx={{
                        height: CELL_SIZE,
                        p: 0,
                        typography: 'caption',
                        color: 'text.secondary',
                        textAlign: 'center'
                      }}
                    >
                      {weekdayNarrow.format(dateOf(day))}
                    </Box>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthWeeks(month).map(days => (
                  <tr key={days.find(day => day !== null) ?? month}>
                    {days.map((day, column) =>
                      day === null ? (
                        <td key={`empty-${column}`} />
                      ) : (
                        <DayCell
                          key={day}
                          day={day}
                          label={dayName.format(dateOf(day))}
                          isStart={day === start}
                          isEnd={day === end}
                          isInRange={isBetween(day, start, end)}
                          isToday={day === today}
                          isDisabled={isDisabled(day)}
                          isTabStop={day === tabDay}
                          onFocus={() => {
                            setFocusedDay(day)
                          }}
                          onPick={() => {
                            setFocusedDay(day)
                            if (!isDisabled(day)) onPick(day)
                          }}
                          onKeyDown={event => {
                            handleKeyDown(event, day)
                          }}
                        />
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default DateRangeCalendar
