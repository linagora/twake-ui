import {
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps
} from '@mui/material'
import React, { forwardRef, useState } from 'react'

export interface ListItemTextProps extends Omit<MuiListItemTextProps, 'ref'> {
  ellipsis?: boolean
}

interface Titles {
  primary?: string
  secondary?: string
}

const ListItemText = forwardRef<HTMLDivElement, ListItemTextProps>(
  ({ ellipsis = true, slotProps, ...props }, ref) => {
    const primarySlot = slotProps?.primary
    const [titles, setTitles] = useState<Titles>({})

    // A title belongs to the text it was measured on: a new text, or no
    // ellipsis, drops it on this render rather than on the next hover
    const shown = [ellipsis, props.primary, props.secondary, props.children]
    const [titlesShown, setTitlesShown] = useState(shown)
    if (shown.some((value, index) => value !== titlesShown[index])) {
      setTitlesShown(shown)
      setTitles({})
    }

    // Read on hover rather than on render: a cut depends on the width then
    const titleIfCut =
      (slot: keyof Titles) =>
      (event: React.MouseEvent<HTMLElement>): void => {
        const text = event.currentTarget
        const title =
          text.scrollWidth > text.clientWidth
            ? (text.textContent ?? undefined)
            : undefined
        setTitles(current =>
          current[slot] === title ? current : { ...current, [slot]: title }
        )
      }

    return (
      <MuiListItemText
        ref={ref}
        {...props}
        // A primary or secondary slot replaces these defaults, ellipsis included
        slotProps={{
          ...slotProps,
          primary:
            typeof primarySlot === 'function'
              ? primarySlot
              : {
                  // Keeps a caption primary out of the theme's grey caption rule
                  color: 'inherit',
                  ...(primarySlot ?? {
                    noWrap: ellipsis,
                    title: titles.primary,
                    onMouseEnter: ellipsis ? titleIfCut('primary') : undefined
                  })
                },
          secondary: slotProps?.secondary ?? {
            variant: 'caption',
            noWrap: ellipsis,
            title: titles.secondary,
            onMouseEnter: ellipsis ? titleIfCut('secondary') : undefined
          }
        }}
      />
    )
  }
)

ListItemText.displayName = 'ListItemText'

export default ListItemText
