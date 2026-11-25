import { TableCell, TableSortLabel, Skeleton } from '@mui/material'
import React from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import de from './locales/de.json' with { type: 'json' }
import en from './locales/en.json' with { type: 'json' }
import es from './locales/es.json' with { type: 'json' }
import fr from './locales/fr.json' with { type: 'json' }
import it from './locales/it.json' with { type: 'json' }
import ru from './locales/ru.json' with { type: 'json' }
import vi from './locales/vi.json' with { type: 'json' }
import type { Column, OrderDirection } from './types.js'

const locales = { de, en, es, fr, it, ru, vi }

interface HeadCellProps {
  column: Column
  orderBy?: string
  orderDirection: OrderDirection
  onClick: () => void
  isLoading?: boolean
}

export const HeadCell: React.FC<HeadCellProps> = ({
  column,
  orderBy,
  orderDirection,
  onClick,
  isLoading
}) => {
  useExtendI18n(locales)
  const { t } = useI18n()
  const isActive = orderBy === column.id

  const content = isLoading ? (
    <>
      <span className="u-visuallyhidden">{column.label}</span>
      <Skeleton animation="wave" width={50} />
    </>
  ) : (
    column.label
  )

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
          {content}
          {isActive && (
            <span className="u-visuallyhidden">
              {orderDirection === 'desc'
                ? t('VirtualizedTable.sortedDesc')
                : t('VirtualizedTable.sortedAsc')}
            </span>
          )}
        </TableSortLabel>
      ) : (
        content
      )}
    </TableCell>
  )
}
