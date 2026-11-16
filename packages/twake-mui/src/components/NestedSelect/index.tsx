import { List, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import cx from 'classnames'
import React, { useState } from 'react'
import { useDebounce } from 'rooks'

import SearchBar from '../SearchBar'
import ItemRow from './ItemRow'
import { makeHistory } from './helpers'
import type { NestedSelectItem, NestedSelectProps } from './types'

const SEARCH_DELAY = 250

const NestedSelectRoot = styled('div', {
  shouldForwardProp: prop => prop !== 'hasTitle'
})<{ hasTitle: boolean }>({
  variants: [{ props: { hasTitle: false }, style: { marginTop: '4rem' } }]
})

const keepItem = (item: NestedSelectItem): NestedSelectItem => item

const getItemKey = (item: NestedSelectItem, index: number): React.Key =>
  item.key ?? (typeof item.title === 'string' ? item.title : index)

/**
 * Select to choose an item among a list. Clicking an item that has children
 * shows its children instead of selecting it.
 */
const NestedSelect = ({
  onSelect,
  isSelected,
  options,
  title,
  canSelectParent,
  transformParentItem = keepItem,
  radioPosition = 'right',
  searchOptions,
  ellipsis,
  noDivider,
  ContentComponent = List,
  HeaderComponent = null
}: NestedSelectProps): React.ReactElement => {
  const [history, setHistory] = useState(() =>
    makeHistory(options, canSelectParent)
  )
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState<NestedSelectItem[] | null>(
    null
  )
  const setSearchResultLater = useDebounce(setSearchResult, SEARCH_DELAY)

  const current = history[0]
  const level = history.length - 1
  const currentTitle = current.title ?? title
  const { children: _children, ...currentWithoutChildren } = current
  const parentItem = transformParentItem(currentWithoutChildren)
  const items = searchResult ?? current.children ?? []

  const handleBack = (): void => {
    setHistory(([, ...parents]) => parents)
  }

  const handleClickItem = (item: NestedSelectItem): void => {
    if (item.children && item.children.length > 0) {
      setHistory(previous => [item, ...previous])
    } else {
      onSelect(item)
    }
  }

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!searchOptions) return

    setSearchValue(event.target.value)
    setSearchResultLater(searchOptions.onSearch(event.target.value))
  }

  const handleSearchClear = (): void => {
    setSearchValue('')
    setSearchResultLater(null)
  }

  const renderItemRow = (
    item: NestedSelectItem,
    key: React.Key,
    isLast: boolean
  ): React.ReactElement => (
    <ItemRow
      key={key}
      item={item}
      onClick={handleClickItem}
      isSelected={isSelected(item, level)}
      radioPosition={radioPosition}
      isLast={isLast}
      ellipsis={ellipsis}
      noDivider={noDivider}
    />
  )

  const header =
    level === 0
      ? options.header
      : (current.header ??
        (typeof options.childrenHeader === 'function'
          ? options.childrenHeader(level)
          : options.childrenHeader))

  return (
    <NestedSelectRoot hasTitle={Boolean(currentTitle)}>
      {HeaderComponent && (
        <HeaderComponent
          title={currentTitle}
          showBack={level > 0}
          onClickBack={handleBack}
        />
      )}
      {header}
      <ContentComponent>
        {canSelectParent &&
          level > 0 &&
          renderItemRow(parentItem, 'parent', false)}
        {searchOptions && level === 0 && (
          <div
            className={cx('u-mh-1 u-mb-half', { 'u-mt-half': !currentTitle })}
          >
            <SearchBar
              placeholder={searchOptions.placeholderSearch}
              value={searchValue}
              onChange={handleSearchChange}
              onClear={handleSearchClear}
            />
          </div>
        )}
        {searchResult?.length === 0 ? (
          <Typography
            variant="body1"
            className="u-flex u-flex-justify-center u-mb-1"
          >
            {searchOptions?.noDataLabel}
          </Typography>
        ) : (
          items.map((item, index) =>
            renderItemRow(
              item,
              getItemKey(item, index),
              index === items.length - 1
            )
          )
        )}
      </ContentComponent>
    </NestedSelectRoot>
  )
}

export default NestedSelect
