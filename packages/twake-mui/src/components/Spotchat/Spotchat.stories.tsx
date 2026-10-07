import { Button, ListItemButton, ListItemText } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Spotchat, SpotchatProps, SpotchatSection } from './index'

const meta: Meta<typeof Spotchat> = {
  title: 'Spotchat',
  component: Spotchat,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

const sections = [
  { title: 'Recent', items: ['Ada Lovelace', 'Alan Turing', 'Grace Hopper'] },
  { title: 'Directory', items: ['Announcements', 'Design', 'Engineering'] }
]

const hints = [
  { keys: '↑↓', label: 'Move' },
  { keys: '↵', label: 'Open' },
  { keys: 'Esc', label: 'Close' }
]

// The caller owns the results: filtering, the active one and the keys
const ExampleSpotchat: React.FC<Partial<SpotchatProps>> = props => {
  const [query, setQuery] = React.useState('')
  const [active, setActive] = React.useState(0)
  const listId = React.useId()
  const groups = sections
    .map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    }))
    .filter(section => section.items.length > 0)
  const options = groups.flatMap(section => section.items)
  const current = Math.min(active, options.length - 1)
  const optionId = (index: number): string => `${listId}-${index}`

  return (
    <Spotchat
      open
      label="Search"
      placeholder="Search a conversation"
      value={query}
      hints={hints}
      inputProps={{
        role: 'combobox',
        'aria-expanded': options.length > 0,
        'aria-controls': listId,
        'aria-activedescendant':
          options.length > 0 ? optionId(current) : undefined
      }}
      onChange={value => {
        setQuery(value)
        setActive(0)
      }}
      onKeyDown={event => {
        if (
          (event.key === 'ArrowDown' || event.key === 'ArrowUp') &&
          options.length > 0
        ) {
          event.preventDefault()
          const step = event.key === 'ArrowDown' ? 1 : -1
          setActive((current + step + options.length) % options.length)
        }
      }}
      {...props}
    >
      <div id={listId} role="listbox" aria-label="Search">
        {groups.map(section => (
          <SpotchatSection key={section.title} title={section.title}>
            {section.items.map(item => {
              const index = options.indexOf(item)
              return (
                <ListItemButton
                  key={item}
                  component="li"
                  id={optionId(index)}
                  role="option"
                  aria-selected={index === current}
                  selected={index === current}
                  sx={{ px: 2.5 }}
                  onClick={() => setActive(index)}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              )
            })}
          </SpotchatSection>
        ))}
      </div>
    </Spotchat>
  )
}

const OpenableSpotchat: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Spotchat</Button>
      {open && <ExampleSpotchat onClose={() => setOpen(false)} />}
    </>
  )
}

export const Default: Story = {
  render: () => <OpenableSpotchat />
}

// Visual Regression - in the flow of the page rather than over it
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <ExampleSpotchat
      disablePortal
      hideBackdrop
      disableAutoFocus
      disableScrollLock
      sx={{ position: 'static', '& .MuiDialog-container': { height: 'auto' } }}
    />
  )
}
