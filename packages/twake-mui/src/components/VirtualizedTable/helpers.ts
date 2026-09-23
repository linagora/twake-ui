import type { OrderDirection, Row } from './types'

export const getPath = (row: Row, path: string): unknown =>
  path
    .split('.')
    .reduce<unknown>(
      (value, key) =>
        value !== null && typeof value === 'object'
          ? (value as Row)[key]
          : undefined,
      row
    )

const ISO_DATE = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}/

const descendingComparator = (
  a: Row,
  b: Row,
  orderDirection: OrderDirection,
  orderBy: string,
  lang?: string
): number => {
  const aValue = getPath(a, orderBy) ?? ''
  const bValue = getPath(b, orderBy) ?? ''

  if (typeof aValue === 'string' && typeof bValue === 'string') {
    if (ISO_DATE.test(aValue)) {
      return new Date(bValue).getTime() - new Date(aValue).getTime()
    }

    if (!isNaN(parseInt(aValue))) {
      return parseInt(bValue) - parseInt(aValue)
    }

    const collator = new Intl.Collator(lang || 'en', {
      caseFirst: orderDirection === 'asc' ? 'upper' : 'lower'
    })

    return collator.compare(bValue, aValue)
  }

  return Number(bValue) - Number(aValue)
}

export const getComparator = (
  orderDirection: OrderDirection,
  orderBy: string,
  lang?: string
): ((a: Row, b: Row) => number) => {
  return orderDirection === 'desc'
    ? (a: Row, b: Row): number =>
        descendingComparator(a, b, orderDirection, orderBy, lang)
    : (a: Row, b: Row): number =>
        -descendingComparator(a, b, orderDirection, orderBy, lang)
}

export const stableSort = (
  rows: Row[],
  comparator: (a: Row, b: Row) => number
): Row[] => {
  return rows
    .map((row, index) => [row, index] as const)
    .sort((a, b) => comparator(a[0], b[0]) || a[1] - b[1])
    .map(([row]) => row)
}
