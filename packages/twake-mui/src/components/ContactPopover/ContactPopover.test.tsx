// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { I18n } from 'twake-i18n'

import ContactPopover from './index'
import { theme } from '../../lib/theme'

afterEach(cleanup)

const setup = (children: React.ReactNode): void => {
  render(
    <ThemeProvider theme={theme}>
      <I18n lang="en" dictRequire={() => ({})}>
        <ContactPopover name="John Doe" email="john.doe@example.com">
          <span>John Doe</span>
          {children}
        </ContactPopover>
      </I18n>
    </ThemeProvider>
  )
  fireEvent.click(screen.getByText('John Doe'))
}

describe('ContactPopover', () => {
  it('names its close and icon action buttons', () => {
    setup(
      <ContactPopover.Actions>
        <ContactPopover.CalendarAction url="https://calendar.example.com" />
        <ContactPopover.ChatAction url="https://chat.example.com" />
        <ContactPopover.VideoAction url="https://meet.example.com" />
      </ContactPopover.Actions>
    )

    expect(screen.queryByRole('button', { name: 'Close' })).not.toBe(null)
    expect(screen.queryByRole('link', { name: 'Plan a meeting' })).not.toBe(
      null
    )
    expect(screen.queryByRole('link', { name: 'Open a chat' })).not.toBe(null)
    expect(screen.queryByRole('link', { name: 'Start a video call' })).not.toBe(
      null
    )
  })

  it('names a disabled action with its label', () => {
    setup(
      <ContactPopover.Actions>
        <ContactPopover.ChatAction label="Cannot chat with John" disabled />
      </ContactPopover.Actions>
    )

    const chat = screen.getByRole('button', { name: 'Cannot chat with John' })
    expect((chat as HTMLButtonElement).disabled).toBe(true)
  })

  it('calls onClick when an action has no url', () => {
    const onEmail = vi.fn()
    const onCalendar = vi.fn()
    setup(
      <ContactPopover.Actions>
        <ContactPopover.EmailAction onClick={onEmail} />
        <ContactPopover.CalendarAction onClick={onCalendar} />
      </ContactPopover.Actions>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Send an email' }))
    fireEvent.click(screen.getByRole('button', { name: 'Plan a meeting' }))
    expect(onEmail).toHaveBeenCalledTimes(1)
    expect(onCalendar).toHaveBeenCalledTimes(1)
  })
})
