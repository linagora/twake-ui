import { Button, ButtonProps, CircularProgress } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export interface LoadMoreProps extends Omit<
  ButtonProps,
  'children' | 'onClick' | 'loading'
> {
  /** Called when the next batch of data needs to be loaded. Can return a promise. */
  fetchMore: () => unknown
  label: React.ReactNode
}

const LoadMore: React.FC<LoadMoreProps> = ({ fetchMore, label, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  const startFetchMore = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    await fetchMore()
    setIsLoading(false)
  }, [isLoading, fetchMore])

  const handleClick = (): void => {
    void startFetchMore()
  }

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver((entries): void => {
      if (entries.some(entry => entry.isIntersecting)) void startFetchMore()
    })
    observer.observe(element)

    return (): void => observer.disconnect()
  }, [startFetchMore])

  return (
    <span ref={elementRef}>
      <Button variant="text" onClick={handleClick} {...props}>
        {isLoading ? <CircularProgress size={16} /> : label}
      </Button>
    </span>
  )
}

export default LoadMore
