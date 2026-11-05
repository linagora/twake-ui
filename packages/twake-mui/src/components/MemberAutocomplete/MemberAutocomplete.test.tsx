// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { I18n } from 'twake-i18n'

import { theme } from '../../lib/theme'
import { Member } from '../MemberRow/types'
import MemberAutocomplete, { MemberAutocompleteProps } from './index'

afterEach(cleanup)

const getMembersFromText = (text: string): Member[] =>
  (text.match(/[^\s,;]+@[^\s,;]+/g) ?? []).map(email => ({
    id: email,
    name: email
  }))

const renderField = (props: MemberAutocompleteProps): React.JSX.Element => (
  <ThemeProvider theme={theme}>
    <I18n lang="en" dictRequire={() => ({})}>
      <MemberAutocomplete placeholder="Add people" {...props} />
    </I18n>
  </ThemeProvider>
)

describe('MemberAutocomplete', () => {
  const setup = () => {
    const onChange = vi.fn()
    render(renderField({ value: [], getMembersFromText, onChange }))
    return { onChange, input: screen.getByPlaceholderText('Add people') }
  }

  it('adds a member per pasted email', () => {
    const { onChange, input } = setup()

    fireEvent.paste(input, {
      clipboardData: { getData: () => 'alice@cozy.cc, bob@cozy.cc' }
    })

    expect(onChange).toHaveBeenCalledWith([
      { id: 'alice@cozy.cc', name: 'alice@cozy.cc' },
      { id: 'bob@cozy.cc', name: 'bob@cozy.cc' }
    ])
  })

  it('adds the typed email on Space', () => {
    const { onChange, input } = setup()

    fireEvent.change(input, { target: { value: 'alice@cozy.cc' } })
    fireEvent.keyDown(input, { key: ' ' })

    expect(onChange).toHaveBeenCalledWith([
      { id: 'alice@cozy.cc', name: 'alice@cozy.cc' }
    ])
  })

  it('adds the typed email when leaving the field', () => {
    const { onChange, input } = setup()

    fireEvent.change(input, { target: { value: 'alice@cozy.cc' } })
    fireEvent.blur(input)

    expect(onChange).toHaveBeenCalledWith([
      { id: 'alice@cozy.cc', name: 'alice@cozy.cc' }
    ])
  })

  it('picks the highlighted suggestion on Enter', () => {
    const alice = { id: 'alice', name: 'Alice' }
    const onChange = vi.fn()
    render(renderField({ value: [], getSuggestions: () => [alice], onChange }))
    const input = screen.getByPlaceholderText('Add people')

    fireEvent.change(input, { target: { value: 'al' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onChange).toHaveBeenCalledWith([alice])
  })

  it('keeps typed a text giving no member on Enter', () => {
    const { onChange, input } = setup()

    fireEvent.change(input, { target: { value: 'alice' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onChange).not.toHaveBeenCalled()
    expect((input as HTMLInputElement).value).toBe('alice')
  })

  it('keeps the typed text when the picked members come in a new array', () => {
    const alice = { id: 'alice', name: 'Alice' }
    const { rerender } = render(
      renderField({ value: [alice], onChange: vi.fn() })
    )
    const input = screen.getByRole<HTMLInputElement>('combobox')

    fireEvent.change(input, { target: { value: 'bo' } })
    rerender(renderField({ value: [alice], onChange: vi.fn() }))

    expect(input.value).toBe('bo')
  })

  it('enables Send only for a typed text that gives members', () => {
    const getMembersWithDomain = (text: string): Member[] =>
      (text.match(/\S+@\S+\.\S+/g) ?? []).map(email => ({ id: email }))
    render(
      renderField({
        value: [],
        getMembersFromText: getMembersWithDomain,
        onChange: vi.fn(),
        onSubmit: vi.fn()
      })
    )
    const input = screen.getByPlaceholderText('Add people')
    const send = screen.getByRole<HTMLButtonElement>('button', {
      name: 'Send'
    })

    fireEvent.change(input, { target: { value: 'bob@example' } })
    expect(send.disabled).toBe(true)

    fireEvent.change(input, { target: { value: 'bob@example.com' } })
    expect(send.disabled).toBe(false)
  })
})
