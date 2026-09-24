import { Cross, Icon, Magnifier } from '@linagora/twake-icons'
import { IconButton } from '@mui/material'
import debounce from '@mui/utils/debounce'
import cx from 'classnames'
import React, { forwardRef, useState, useMemo, useRef, useEffect } from 'react'

import { DisableHighlight } from './DisableHighlight'
import { FocusHighlight } from './FocusHighlight'
import { SearchBarButtonBase } from './SearchBarButtonBase'
import { SearchBarIconWrapper } from './SearchBarIconWrapper'
import { SearchBarInputBase } from './SearchBarInputBase'
import { SearchBarRoot } from './SearchBarRoot'
import { SearchBarTypography } from './SearchBarTypography'
import { SearchBarProps } from './types'

export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  (
    {
      placeholder,
      icon = Magnifier,
      size = 'small',
      type = 'search',
      label,
      componentsProps,
      disabledClear = false,
      disabledFocus = false,
      disabledHover = false,
      className,
      defaultValue = '',
      value,
      elevation = 1,
      disabled = false,
      onChange = (): void => {},
      onClear = (): void => {},
      onFocus = (): void => {},
      onBlur = (): void => {},
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState(defaultValue)
    const [isFocused, setIsFocused] = useState(false)

    const spreadValue = typeof value !== 'undefined' ? value : currentValue
    const isSelfControlledComp = typeof value === 'undefined'

    const onChangeRef = useRef(onChange)
    useEffect(() => {
      onChangeRef.current = onChange
    }, [onChange])

    const delayedOnChangeRef = useRef<ReturnType<typeof debounce>>()

    useEffect(() => {
      delayedOnChangeRef.current = debounce(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
          onChangeRef.current(ev)
        },
        375
      )
      return (): void => {
        delayedOnChangeRef.current?.clear()
      }
    }, [])

    const delayedOnChange = useMemo(() => {
      const fn = (ev: React.ChangeEvent<HTMLInputElement>): void => {
        delayedOnChangeRef.current?.(ev)
      }
      fn.clear = (): void => {
        delayedOnChangeRef.current?.clear()
      }
      return fn
    }, [])

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
      if (!isSelfControlledComp) return onChange(ev)

      const _value = ev.target.value

      delayedOnChange(ev)
      setCurrentValue(_value)
    }

    const handleClear = (ev: React.MouseEvent<HTMLButtonElement>): void => {
      delayedOnChange.clear()
      const mockEvent = {
        ...ev,
        target: { ...ev.target, value: '' }
      } as unknown as React.ChangeEvent<HTMLInputElement>
      onChange(mockEvent)
      onClear(ev)
      if (isSelfControlledComp) setCurrentValue('')
    }

    const handleFocus = (ev: React.FocusEvent<HTMLInputElement>): void => {
      onFocus(ev)
      setIsFocused(true)
    }

    const handleBlur = (ev: React.FocusEvent<HTMLInputElement>): void => {
      onBlur(ev)
      setIsFocused(false)
    }

    const effectivelyFocused = isFocused && !disabledFocus

    return (
      <SearchBarRoot
        component="form"
        elevation={elevation}
        searchSize={size}
        isFocused={effectivelyFocused}
        className={cx(className, {
          'SearchBar-focused': effectivelyFocused,
          'Mui-disabled': disabled
        })}
        ref={ref}
        onSubmit={(ev: React.FormEvent<HTMLDivElement>) => {
          ev.preventDefault()
          props.onSubmit?.(ev)
        }}
        {...props}
      >
        {type === 'button' ? (
          <SearchBarButtonBase
            disabled={disabled}
            aria-label={typeof label === 'string' ? label : 'Search'}
          >
            {icon && (
              <SearchBarIconWrapper className="SearchBar-icon">
                <Icon icon={icon} />
              </SearchBarIconWrapper>
            )}
            {typeof label === 'string' ? (
              <SearchBarTypography hasIcon={!!icon}>
                {label}
              </SearchBarTypography>
            ) : (
              label
            )}
          </SearchBarButtonBase>
        ) : (
          <>
            {icon && (
              <SearchBarIconWrapper className="SearchBar-icon">
                <Icon icon={icon} />
              </SearchBarIconWrapper>
            )}
            <SearchBarInputBase
              {...componentsProps?.inputBase}
              className={cx(componentsProps?.inputBase?.className)}
              searchSize={size}
              hasIcon={!!icon}
              placeholder={disabled ? undefined : placeholder}
              value={disabled ? placeholder : spreadValue}
              disabled={disabled}
              aria-label={placeholder || 'Search'}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </>
        )}
        {spreadValue && !disabledClear && type === 'search' && !disabled && (
          <IconButton
            size="small"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <Icon icon={Cross} />
          </IconButton>
        )}
        {!disabledHover && !disabled && (
          <FocusHighlight className="SearchBar-focusHighlight" />
        )}
        {disabled && (
          <DisableHighlight className="SearchBar-disableHighlight" />
        )}
      </SearchBarRoot>
    )
  }
)

SearchBar.displayName = 'SearchBar'

export default SearchBar
