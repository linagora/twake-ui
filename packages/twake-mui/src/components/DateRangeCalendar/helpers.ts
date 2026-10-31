/** A local day, `YYYY-MM-DD`: it compares as text and never moves with the time zone */
export type Day = string

const pad = (value: number): string => String(value).padStart(2, '0')

/** The local day of `date` */
export const dayOf = (date: Date): Day =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/** Midnight (local time) of `day` */
export const dateOf = (day: Day): Date => {
  const [year = 0, month = 1, date = 1] = day.split('-').map(Number)
  return new Date(year, month - 1, date)
}

export const addDays = (day: Day, days: number): Day => {
  const date = dateOf(day)
  return dayOf(
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
  )
}

/** `day` moved by `months` months, on the last day of a shorter month */
export const addMonths = (day: Day, months: number): Day => {
  const date = dateOf(day)
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + months + 1,
    0
  ).getDate()
  return dayOf(
    new Date(
      date.getFullYear(),
      date.getMonth() + months,
      Math.min(date.getDate(), lastDay)
    )
  )
}

/** The first day of the month of `day` */
export const monthOf = (day: Day): Day => `${day.slice(0, 7)}-01`

/** 0 for a Monday … 6 for a Sunday */
export const weekdayOf = (day: Day): number => (dateOf(day).getDay() + 6) % 7

/**
 * The weeks of the month starting on `month`, Monday first: null for the cells
 * before its first day and after its last one
 */
export const monthWeeks = (month: Day): (Day | null)[][] => {
  const first = monthOf(month)
  const next = addMonths(first, 1)
  const cells: (Day | null)[] = Array.from(
    { length: weekdayOf(first) },
    () => null
  )
  for (let day = first; day < next; day = addDays(day, 1)) cells.push(day)
  while (cells.length % 7 !== 0) cells.push(null)
  return Array.from({ length: cells.length / 7 }, (_, week) =>
    cells.slice(week * 7, week * 7 + 7)
  )
}
