import { TableCell, TableSortLabel } from '@mui/material'
import React from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import it from './locales/it.json'
import ru from './locales/ru.json'
import vi from './locales/vi.json'
import type { Column, OrderDirection } from './types'

const locales = { de, en, es, fr, it, ru, vi }

interface HeadCellProps {
  column: Column
  orderBy?: string
  orderDirection: OrderDirection
  onClick: () => void
}

export const HeadCell: React.FC<HeadCellProps> = ({
  column,
  orderBy,
  orderDirection,
  onClick
}) => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const isActive = orderBy === column.id

  return (
    <TableCell
      sx={{ width: column.width, maxWidth: column.maxWidth }}
      className={column.noWrap ? 'u-ellipsis' : undefined}
      align={column.textAlign ?? 'left'}
      padding={column.disablePadding ? 'none' : 'normal'}
      sortDirection={isActive ? orderDirection : false}
    >
      {column.sortable !== false ? (
        <TableSortLabel
          active={isActive}
          direction={isActive ? orderDirection : 'asc'}
          onClick={onClick}
        >
          {column.label}
          {isActive && (
            <span className="u-visuallyhidden">
              {orderDirection === 'desc'
                ? t('VirtualizedTable.sortedDesc')
                : t('VirtualizedTable.sortedAsc')}
            </span>
          )}
        </TableSortLabel>
      ) : (
        column.label
      )}
    </TableCell>
  )
}
