// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { I18n } from 'twake-i18n'

import MemberList from './index'
import { theme } from '../../lib/theme'

afterEach(cleanup)

describe('MemberList', () => {
  it('shows the owner first', () => {
    render(
      <ThemeProvider theme={theme}>
        <I18n lang="en" dictRequire={() => ({})}>
          <MemberList
            members={[
              { id: 'bob', name: 'Bob', role: 'editor' },
              { id: 'owner', name: 'Alice', isOwner: true }
            ]}
            roles={[{ value: 'editor', label: 'Editor' }]}
            onRoleChange={vi.fn()}
            onRemove={vi.fn()}
          />
        </I18n>
      </ThemeProvider>
    )

    const rows = screen.getAllByRole('listitem')
    expect(rows[0].textContent).toContain('Alice')
    expect(rows[1].textContent).toContain('Bob')
  })
})
