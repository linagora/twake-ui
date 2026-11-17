// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { I18n } from 'twake-i18n'

import ContactCard, { ContactCardProps } from './ContactCard'
import ContactPopover from './index'
import { setupFrameClipboard } from '../../lib/setupFrameClipboard.test-utils'
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

  it('names its dialog after the contact', () => {
    setup(null)

    expect(screen.queryByRole('dialog', { name: 'John Doe' })).not.toBe(null)
  })
})

describe('ContactCard', () => {
  const renderCard = (props: Partial<ContactCardProps> = {}): void => {
    render(
      <ThemeProvider theme={theme}>
        <I18n lang="en" dictRequire={() => ({})}>
          <ContactCard
            open
            anchorEl={document.body}
            name="John Doe"
            email="john.doe@example.com"
            onClose={() => undefined}
            {...props}
          />
        </I18n>
      </ThemeProvider>
    )
  }

  it('colours its avatar from the key the app gives', () => {
    renderCard({ avatarColorKey: 'john.doe@example.com' })
    const byEmail = screen.getByText('JD').className
    cleanup()
    renderCard()

    expect(screen.getByText('JD').className).not.toBe(byEmail)
  })

  it('is named by the email when the contact has no name', () => {
    renderCard({ name: '' })

    expect(
      screen.queryByRole('dialog', { name: 'john.doe@example.com' })
    ).not.toBe(null)
  })

  describe('in a frame other than the app', () => {
    const { getFrame, appWrite, frameWrite } = setupFrameClipboard()

    it('copies the email with the clipboard of its frame and tells the app', async () => {
      const frameWindow = getFrame().contentWindow as Window
      const onEmailCopy = vi.fn()
      renderCard({ anchorEl: frameWindow.document.body, onEmailCopy })

      const copy = within(frameWindow.document.body).getByTitle('Copy email')
      fireEvent.click(copy)
      await waitFor(() => {
        expect(onEmailCopy).toHaveBeenCalledWith('john.doe@example.com', copy)
      })
      expect(frameWrite).toHaveBeenCalledWith('john.doe@example.com')
      expect(appWrite).not.toHaveBeenCalled()
    })
  })
})
