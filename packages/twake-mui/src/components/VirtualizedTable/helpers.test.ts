import { describe, expect, it } from 'vitest'

import { getComparator, stableSort } from './helpers'

const values = (rows: Record<string, unknown>[], key: string): unknown[] =>
  rows.map(row => row[key])

describe('stableSort', () => {
  describe('sorts strings, case-aware, with a numeric string last', () => {
    const rows = [
      { name: 'b' },
      { name: 'A' },
      { name: 'B' },
      { name: 'a' },
      { name: '10' }
    ]

    it('asc', () => {
      const sorted = stableSort(rows, getComparator('asc', 'name', 'fr'))
      expect(values(sorted, 'name')).toStrictEqual(['A', 'a', 'B', 'b', '10'])
    })

    it('desc', () => {
      const sorted = stableSort(rows, getComparator('desc', 'name', 'fr'))
      expect(values(sorted, 'name')).toStrictEqual(['B', 'b', 'A', 'a', '10'])
    })
  })

  describe('sorts numbers and keeps equal values in input order', () => {
    const rows = [
      { number: 40 },
      { number: 1 },
      { number: 8 },
      { number: 30 },
      { number: 40 }
    ]

    it('asc', () => {
      const sorted = stableSort(rows, getComparator('asc', 'number', 'fr'))
      expect(values(sorted, 'number')).toStrictEqual([1, 8, 30, 40, 40])
    })

    it('desc', () => {
      const sorted = stableSort(rows, getComparator('desc', 'number', 'fr'))
      expect(values(sorted, 'number')).toStrictEqual([40, 40, 30, 8, 1])
    })
  })

  describe('sorts numeric strings as numbers', () => {
    const rows = [
      { number: '40' },
      { number: '1' },
      { number: '8' },
      { number: '30' },
      { number: '40' }
    ]

    it('asc', () => {
      const sorted = stableSort(rows, getComparator('asc', 'number', 'fr'))
      expect(values(sorted, 'number')).toStrictEqual([
        '1',
        '8',
        '30',
        '40',
        '40'
      ])
    })

    it('desc', () => {
      const sorted = stableSort(rows, getComparator('desc', 'number', 'fr'))
      expect(values(sorted, 'number')).toStrictEqual([
        '40',
        '40',
        '30',
        '8',
        '1'
      ])
    })
  })

  describe('sorts ISO dates chronologically', () => {
    const rows = [
      { date: '2025-05-01T12:00:00.0000+01:00' },
      { date: '2025-08-01T12:00:00.0000+01:00' },
      { date: '2025-01-01T12:00:00.0000+01:00' },
      { date: '2025-04-01T12:00:00.0000+01:00' }
    ]

    it('asc', () => {
      const sorted = stableSort(rows, getComparator('asc', 'date', 'fr'))
      expect(values(sorted, 'date')).toStrictEqual([
        '2025-01-01T12:00:00.0000+01:00',
        '2025-04-01T12:00:00.0000+01:00',
        '2025-05-01T12:00:00.0000+01:00',
        '2025-08-01T12:00:00.0000+01:00'
      ])
    })

    it('desc', () => {
      const sorted = stableSort(rows, getComparator('desc', 'date', 'fr'))
      expect(values(sorted, 'date')).toStrictEqual([
        '2025-08-01T12:00:00.0000+01:00',
        '2025-05-01T12:00:00.0000+01:00',
        '2025-04-01T12:00:00.0000+01:00',
        '2025-01-01T12:00:00.0000+01:00'
      ])
    })
  })

  it('sorts on a dotted path', () => {
    const rows = [{ contact: { name: 'b' } }, { contact: { name: 'a' } }]
    const sorted = stableSort(rows, getComparator('asc', 'contact.name'))
    expect(
      sorted.map(row => (row.contact as { name: string }).name)
    ).toStrictEqual(['a', 'b'])
  })
})
